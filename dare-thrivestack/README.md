# Dare-Thrivestack

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

## Terminologies

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

## Possible Solution

### Assumptions

- Single Tenant, Single User in a view.
- Keeping endpoints un-Authenticated for simplicity's sake
- Levels of selection
  - Unselected
  - Hightlight (current-options)
  - Select (user-click)
- Make progression click-aware:
  - One Select select per view
  - Multiple filter per column

### Decisions

- Edges (Relations) are more important than visual nodes. As the relationships are context-aware, ie. Next relationship from a node depends on the previous relationship.
- Inital items, Highlighted Items, & Selected Items would be the shown in each column in sored order, with min. count of 10.
- Save 2 Datasets
  - Available Items (Environments, Features , Sub-Features, Category, Configuration)\
    & their meta (like id, and name).
  - Edge Values [edgeId, ...nodeId]
- Could leverage following possibilities
  - Fetch all data during initial load, and process on FE (in web-worker)
  - Fetch data from BE, progressively. For optimization:
    - Progressive Filters, can be evaluated on UI.
    - Keep cache of Filter Journey for quick undo.

### Design

- Column Keys: `[tenant, env, wf, feat, cat, cfg, key]`
- BE Response:

  ```text
  {
    edgeCount: x,
    edges: [],
    nodeCount: {...[colKey]: x},
    nodes: {...[colKey]:{...x}}
  }
  ```

- Render `nodes`
  - Create a Column for each `colKey`
  - Render nodes under each Column.
    - Mark node 'active': if `nodes[colKey].active`
    - Mark node 'selected': if `colKey === select.type && node[colKey].id === && select.id`
  - Append "+ x More" if `edgeCount > nodes[colKey].length`
- Render `edges`
  - Break edge into smaller paths from `col1` to `col2`.
  - Assign paths a color, and render them between nodes under `col1` & `col2`
- Filter
  - Elements
    - Search Type-ahead
    - Option List-view
    - Apply\
      (Optional, as updating view on change incurs re-renders, & intermediatary updates are not consumed by user)\
      (If Apply button is not required, can simply debounce UI updates to filter select)
  - Applied on Column, not including current selection in filter: Remove Selection
  - Applied on Column, including current selection in filter: Happy Case
- Select
  - Node
    - Show all edges including the selected node.
    - Highlight connected Edges
  - Edge
    - TODO: Make all other edges gray
- Error
  - Error data is kept in 'key'-node, as Variable(key-value) is shared across all edges
  - Keep 'Error-Codes'. But for this exercise we'll consider only "Failure".
- Color Scheme
  - All Nodes: White
  - Highlighted Nodes: Bordered Gold
  - Selected Node: Gold
  - Error Node (`key` column)
    - Highlighted: Bordered Red
    - Selected Node: Red
  -

### Back-of-the-Envelope Calculation

Max Data Support assumption:

- 1 / 1K tenants
- 10 / 100 environments
- 100 / 1M workflows
- 100 / 1K Features
- 100 / 1M Categories
- 100 / 1K Configurations
- 100 /1K Variables

If everyone uses everything, we can reach a limit of `1K * 100 * 1M * 1K * 1M * 1K * 1K`, ie. `10^26` edges.\
We can uniquely identify each edge with a keysize of `log(10^26)`, ie. `26 bits` or `4 bytes`.

#### Items

Each item would be detailed description of each entity in system.

| uniqKey | type | name | metaValue |
| ------- | ---- | ---- | --------- |
| xx      | xx   | xx   | xx        |

Total Entries would be `1K + 100 + 1M + 1K + 1M + 1K + 1K` or `2004100`, which can be represented by concatenated string of `3+2+6+3+6+3+3` or `26 bits` or `4 bytes`.\
Therefore, after including the `2 Kb` value, the each tuple value should be `4Kb`, and max size should be under `8 Gb`.

Blueprint:

```json
[
  {
    "id": "",
    "type": "tenant|environment|workflow|feature|category|config|variable|",
    "name": "",
    "value": "{}"
  }
]
```

#### Edges

Each Edge translates to acutal configuration key-value pair from tenant.

| uniqKey | tenantKey | envKey | workflowKey | featureKey | categoryKey | configKey | varKey |
| ------- | --------- | ------ | ----------- | ---------- | ----------- | --------- | ------ |
| xx      | xxx       | xxx    | xxx         | xxx        | xxx         | xxx       | xxx    |

Each variable would have id of size: `4 bytes`.\
Therefore, each tuple with 7 fields of similar size: `7*4 bytes` or `28 bytes`

DB size would be around `10^26 * 28 bytes` or `3 * 10^18 Gb`. This is problematic, and would require sharding!\
Luckily we can simply do it by distributing on edgeID.

Notes: Keeping the data non-normalized and replicated, we incur higher storage but lower lookups.\
But, what if we normalize the data halfway? That would not work since each node-path resolve to unique varKeyValue :(

Blueprint:

```json
[
  {
    "id": "",
    "tenant": "tenant-self",
    "environment": "env-dev",
    "workflow": "wf-signup",
    "feature": "feature-auth",
    "category": "category-login",
    "config": "config-legacy",
    "variable": "key-username",
    "value": "------",
    "error": "------"
  }
]
```
