---
layout: base.liquid
title: Fullstack
eleventyNavigation:
  key: /fullstack/
  order: 3
  excerpt: API design, databases, authentication, deployment
---

HTTP Status Codes

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

Because automated release process is often preceded by automated testing, CI/CD are used together and enable application deployment any time by clicking a button.\
Read more: <https://www.redhat.com/en/topics/devops/what-is-ci-cd>

- **CI** (_Continuous Integration_) allow changes to central repository, and often trigger automated test suites.
- **CD** (_Continuous Delivery/Deployment_) allows deployment after code changes to an environment after the build stage. Some deployment strategies may look like:
  - Blue-Green: Two production alternating servers.
  - Canary: Slow feature adoption.
  - Rolling updates: Linear service upgradation.

---

## Databases

- Concurrency
  - Serially
  - Serially Batch
  - Pessimistic Locking
  - Optimistic Locking
- Resource Locking

**CAP Theorem**: A modern (distributed) database system can only guarantee 2 out of 3:

- **Consistency**: All nodes see same data simultaneously. Every read receives the most recent write or an error.
  - _Strong Consistency_: Strong consistency ensures that all replicas in a distributed system have the same view of data at all times.
  - _Weak Consistency_: Weak consistency allows temporary inconsistencies or delays in data synchronization across replicas.
  - _Eventual Consistency_: Eventual consistency guarantees that if no further updates are made to a data item, eventually, all replicas will converge and become consistent.
- **Availability**: System remains operational. Every request receives a (non-error) response, without the guarantee that it contains the most recent write.
- **Partition tolerance**: The system continues to operate despite an arbitrary number of messages being dropped (or delayed) by the network between nodes

Which leads to different implementation ideologies

- _ACID_ Properties: (consistency over availability)
  - **Atomicity**: All or nothing transactions.
  - **Consistency**: Data integrity maintained.
  - **Isolation**: Concurrent transactions don't interfere.
  - **Durability**: Committed data survives system failures.
- _BaSE_ Properties: (availability over consistency)
  - **Basically available**: Transaction is not blocked by other.
  - **Soft state**: Transient or temporary states allowed.
  - **Eventually consistent**: Consistency on concurrent completion.

Read more: <https://aws.amazon.com/compare/the-difference-between-acid-and-base-database/>

Some popular databases:

- _MariaDB_: MySQL-compatible relational DB with enhanced features | [Docs](https://mariadb.org/documentation/)
- _MongoDB_: Document-based NoSQL database | [Docs](https://docs.mongodb.com/)
- _Postgres_: Advanced open-source relational database | [Docs](https://www.postgresql.org/docs/)
  - _TimescaleDB_: Time-series extension for PostgreSQL | [Docs](https://docs.timescale.com/)
- _Redis_: In-memory data store for caching & sessions | [Docs](https://redis.io/documentation)
- _Cassandra_: Wide-column NoSQL for big data | [Docs](https://cassandra.apache.org/doc/)
- _neo4j_: Graph database | [Docs](https://neo4j.com/docs/)
- Other Databases
  - _CockroachDB_: Distributed SQL database | [Docs](https://www.cockroachlabs.com/docs/)
  - _CouchDB_: Document DB with HTTP API | [Docs](https://docs.couchdb.org/)
  - _PouchDB_: Client-side CouchDB | [Docs](https://pouchdb.com/guides/)
  - _DuckDB_: Analytical SQL database | [Docs](https://duckdb.org/docs/)

> Consistency - Availability: `[]_-` : MySQL
>
> Availability - Partition-Tolerance: `[]_- + []_-` : CouchDB
>
> Consistency - Partition-Tolerance: `[]-[]-[]_-` : Redis

Additional Database types:

- **Realtime Data**: Columnar. Eg. Autocomplete, Notifications.
  - _Kafka_
  - _RabbitMQ_
  - _Postgres CDC_
- **Geological / Spatial Data**: Eg. OpenStreetMap
  - _Solr_
  - _Typesense_

---

## API

API service should provide a clear **error messages** (& correct HTTP status code). A request **validation** allows for better structure, and **versioning** allows introduction of new features without breaking existing ones. Eg, `/v1/resource`.

> - Polling vs Webhooks: Polling requires client to request data periodically, where webhooks captures data when server emits events.
> - _BFF_ (Backend for Frontend): Optimize backend for specific client interfaces.\
>   Read more: <https://learn.microsoft.com/en-us/azure/architecture/patterns/backends-for-frontends>

**API Variants**: ??

- _REST_: Stateless endpoints that leverage HTTP Methods. Each request should contain all the necessary information for processing(via query-params, body, or headers),

  ```text
  GET    /api/users          # List users
  GET    /api/users/123      # Get specific user
  POST   /api/users          # Create user
  PUT    /api/users/123      # Update user (full)
  PATCH  /api/users/123      # Update user (partial)
  DELETE /api/users/123      # Delete user
  ```

- _WebSockets_: Real-time bidirectional communication.

- _SOAP_: ??

- _GraphQL_: ??

- _RPC_

  - `tRPC`
  - `gRPC`: High Performance and Type-Safety

- _Messaging Queue_: Async Event-driven Architecture.

---

## System Architecture

Transactional Messaging and Event-Driven Architecture.\
Read more: <https://medium.com/@platform.engineers/transactional-messaging-and-event-driven-architecture-a-technical-overview-f96a23d7aa26>

Important to build Zero-Trust Architecture

While it is a good practice to add a **Gateway / Load Balancer** in front of a service, it should also provide additional features:

- **Security**: Zero Trust Network. SSL-first.
- **Connection Pool**: Reuse connections to database.
- **AllowList**: Prevent unknown access
  - _CORS_: Cross-Origin Resource Sharing
- **Rate Limiting**: Prevent over-usage.

To improve QPS or CPU usage to handle incremental load, systems evolve to become more complex.\
Read more: <https://aws.amazon.com/what-is/scaling/>

- **Vertical Scaling**: Add more power (CPU, RAM) to existing machine.
- **Horizontal Scaling**: Add more machines to the pool. Requires load balancing and service coordination:
  - _Load Balancer_: Distribute incoming requests across multiple servers
    - Round Robin: Requests distributed evenly
    - Least Connections: Route to server with fewest active connections
    - IP Hash: Route based on client IP
    - Weighted: Distribute based on server capacity
  - _Connection Pool_: Split monolith into independent "micro-services", and reuse database connections to reduce overhead.
  - _Database Optimization_:
    - DB Cache: Redis, Memcached for faster data access.
    - DB Replication: Read replicas for load distribution.
    - DB Sharding: Horizontal partitioning of data.\
      Read more: <https://www.digitalocean.com/community/tutorials/understanding-database-sharding>
    - CQRS: Command Query Responsibility Segregation.\
      Read more: <https://docs.microsoft.com/en-us/azure/architecture/patterns/cqrs>

---

## Backend as a Service (BaaS)

- **Supabase**: Open-source Firebase alternative with Postgres\
  Read more: <https://supabase.com/>
- **PocketBase**: Single-file Go backend with admin UI\
  Read more: <https://pocketbase.io/>
- **Appwrite**: Self-hosted backend server for web & mobile\
  Read more: <https://appwrite.io/>

## Platform as a Service (PaaS)

- **Coolify**\
  Read more: <https://coolify.io/>
- **CapRover**\
  Read more: <https://caprover.com/>
- **Netlify**: JAMstack deployment with edge functions\
  Read more: <https://netlify.com/>
- **Railway**\
  Read more: <https://railway.app/>
- **Render**\
  Read mre: <https://render.com/>

## Essential External Resources

- [The Twelve-Factor App](https://12factor.net/)
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Microservice Architecture](https://microservices.io/)
