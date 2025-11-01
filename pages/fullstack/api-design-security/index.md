---
layout: base.liquid
title: API Design & Security
eleventyNavigation:
  key: /fullstack/api-design-security/
  order: 2
  parent: /fullstack/
---

API service should be **stateless**, meaning each request should contain all the necessary information for processing(via query-params, body, or headers), while providing a clear **error messages** (& correct HTTP status code). A request **validation** allows for better structure, and **versioning** allows introduction of new features without breaking existing ones. Eg, `/v1/resource`.

While it is a good practice to add a **Gateway / Load Balancer** in front of a service, it should also provide additional features:

- **Security**: Zero Trust Network. SSL-first.
- **Connection Pool**: Reuse connections to database.
- **AllowList**: Prevent unknown access
  - _CORS_: Cross-Origin Resource Sharing
- **Rate Limiting**: Prevent over-usage.

A nginx config example:

```conf
lol
```

**HTTP Status Codes:**

- `200` OK - Success
- `201` Created - Resource created
- `204` No Content - Success, no response body
- `400` Bad Request - Client error
- `401` Unauthorized - Authentication required
- `403` Forbidden - Access denied
- `404` Not Found - Resource doesn't exist
- `409` Conflict - Resource conflict
- `422` Unprocessable Entity - Validation error
- `500` Internal Server Error - Server error

## SOAP

## REST

### REST API Best Practices

```text
GET    /api/users          # List users
GET    /api/users/123      # Get specific user
POST   /api/users          # Create user
PUT    /api/users/123      # Update user (full)
PATCH  /api/users/123      # Update user (partial)
DELETE /api/users/123      # Delete user
```

## GraphQL

Usage example:

```graphql
# Schema
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
}

type Query {
  user(id: ID!): User
  users(limit: Int, offset: Int): [User!]!
}

type Mutation {
  createUser(input: CreateUserInput!): User!
  updateUser(id: ID!, input: UpdateUserInput!): User!
}
```

```js
// Resolver
const resolvers = {
  Query: {
    user: (_, { id }) => getUserById(id),
    users: (_, { limit, offset }) => getUsers(limit, offset),
  },
  Mutation: {
    createUser: (_, { input }) => createUser(input),
  },
  User: {
    posts: (user) => getPostsByUserId(user.id),
  },
};
```

## RPC

### tRPC

### gRPC

High Performance and Type-Safety

## Messaging Queue

Decoupling Through Asynchronous Messaging
