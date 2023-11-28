## Context to the problem:

Thrive Stack is a SaaS platform that acts as a functional backbone enabling any B2B SaaS product
organization to become PLG (Product Led Growth) enabled.

Out of the many features that Thrive Stack has, one of the features is to let its developers from SaaS
companies build Workflows. Workflows are a series of steps/nodes/actions arranged in a sequence
of execution.

e.g. Workflow: A developer from a SaaS Organization builds a Signup Workflow for Users to sign up
for their product and start using the product. The workflow that he will build looks like below:

- Node1(Redirect User to a signup page)
- Node2(Authenticate User)
- Node3 (Save User details post signup)
- Node4 (Redirect User to the product landing page)

Each Node has configurations. These configurations can be dependent on other configurations. Listed below are some examples that each node can have:

| Node  | Configuration                                   |
| ----- | ----------------------------------------------- |
| Node1 | URL to Redirect                                 |
| Node2 | Auth0, Provider-URL, Client-ID, Client-Password |

Once the workflows are configured and saved, they can be promoted to different environments
defined by the Customer’s Dev Team

# Terminologies

1. **Environments**: Environment can be Dev, QA, UAT, and PROD of our customers
2. **Workflows**: Workflows are a set of steps, that help to build multiple complex steps as a
   single functionality. E.g. After the user logins it should be redirected to a page and a valid
   plan. So here Authentication, redirection, and tenant validation can be steps that will be
   stitched in a workflow.
3. **Feature**: The feature can be a self-serve, pricing builder, or environment manager
4. Sub-Feature/node: It can be an Authentication node or redirection Node as mentioned in
   workflows.
5. **Configuration Category**: A category describes the type of a configuration. For example, an
   Auth0 configuration can belong to a category of IDP (Identity Provider). Another example is
   the HubSpot configuration can belong to the category of CRM. A category dictates a
   configuration variable whether it can be reused in multiple environments or workflows.
6. **Configuration variables or variables**: These are the smallest unit that holds the information
   about a configuration. For e.g. A variable named auth0_tenant1_config1 can contain a
   configuration like `{“client_id”:“xxxx”,”client_secret”:”ddffe”,”redirection_uri”:”xyz.com”}`

## Problem statement – Configuration Manager

Out of the many features, Thrive Stack has a capability that lets the Customer’s Dev Team visualize
and manage configurations and their dependencies across Environments and Workflows. This feature
is called Configuration Manager.
As a potential Developer of the Thrive Stack Team, you are tasked with building Configuration
Manager which will be used by the SaaS company’s Engineering team.

| Environments | Features  | Sub-Features | Category | Configuration |
| ------------ | --------- | ------------ | -------- | ------------- |
| Environments | Workflows | Features     | Category | Configuration |

## Assumptions

- Single Tenant, Single User in a view.
- Keeping endpoints un-Authenticated for simplicity's sake
- Show subset of everything, but unselected.
- Make progression click-aware:

  | Left Chain | Right Chain | Populate Direction | Description                      |
  | ---------- | ----------- | ------------------ | -------------------------------- |
  | Absent     | Absent      | N/A                | No click allowed on preselection |
  | Absent     | Present     | X                  | XXX                              |
  | Present    | Absent      | X                  | XXX                              |
  | Present    | Present     | X                  | XXX                              |

## Decisions

- Edges (Relations) are more important than visual nodes.\
  (because of many-to-many relationships with same node sharing)
- Inital items, Selected Items, & Filtered Items would be the shown in each column in-order.
- Save 3 Datasets
  - Available Items (Environments, Features , Sub-Features, Category, Configuration)\
    & their meta (like id, and name).
  - Edge Values (Edge Value Id => config key-values)
  - Edge Meta (Button-Top Mapping from Items hierarchy) => Edge Value Id

## Back-of-the-Envelope Calculation

Max Data Support assumption:

- 1K tenants
- 100 environments
- 1M workflows
- 1K Features
- 1M Categories
- 1K Configurations
- 1K Variables

If everyone uses everything, we can reach a limit of `1K * 100 * 1M * 1K * 1M * 1K * 1K`, ie. `10^26` edges.\
We can uniquely identify each edge with a keysize of `log(10^26)`, ie. `26 bits` or `4 bytes`.

### DB_Items

Total Entries would be `1K + 100 + 1M + 1K + 1M + 1K + 1K` or `2004100`, which would require `log(2004100)` or `7 bits` or `1 byte` keys. And each field would have max-size of `4 Kb`.

Therefore, max size should be under `2 Gb`

### DB_Edge_Value

Translates to acutal configuration key-value pair.

Each variable would have id & name key of max-size of 1Kb, rounding up to 2Kb for each variable-entry. Since each configuration has 1K variable-entries, therefore max-size of each config => `1K*2Kb` => `2Mb`.

- `10^17 *  2Kb`
- `2 * 10^8 Gb`

This is problematic, and would require sharding! Luckily we can simply do it by distributing on edgeID. And to uniquely identify in alphanumeric incrementing id (base 36), we'd need `log(2*10^8)/log(36)` => `6` length key => `6 bytes`

### DB_Edge_Meta

Each field would have id & name key of max-size of 1Kb, rounding up to 2Kb for each item-entry.

- (1K + 100 + 1M + 10K + 1M + 1K) \* 2Kb
- 2004204000 bytes
- 16 Gb

- 1 reference => 1K Char Key => 1Kb (rounded up to 2Kb)
- 1 Variable => 1K Char Key, 2K Char Value => 3Kb (rounded up to 4Kb)
- Sharding dataset by
  - Tenants
  -
- Worst Case: All edges are consumed by everyone:
  - `1K * 100 * 1M * 10K * 1M * 1K * 4Kb`
  - `4*10^17 bytes` => `4*10^8 Gb`

## Object Entity Blueprint

```json
[
  {
    "id": "env-dev",
    "workflows": [
      {
        "id": "env-dev_wf-signup",
        "features": [
          {
            "id": "env-dev_wf-signup_feature-auth",
            "categories": [
              {
                "id": "env-dev_wf-signup_feature-auth_category-login",
                "keys": [
                  {
                    "id": "env-dev_wf-signup_feature-auth_category-login_key-username",
                    "type": "string",
                    "name": "",
                    "value": "---"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]
```
