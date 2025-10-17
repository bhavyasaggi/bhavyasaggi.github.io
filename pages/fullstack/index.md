---
layout: base.liquid
title: Fullstack
eleventyNavigation:
  key: /fullstack/
  order: 3
  excerpt: API design, databases, authentication, deployment
---

- **Databases**
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
- **API**
  - Polling vs Webhooks: Polling requires client to request data periodically, where webhooks captures data when server emits events.
  - REST vs WebSockets: API design could be Stateless (eg. REST), whereas Real-time bidirectional communication could be supported by Websockets
  - _BFF_ (Backend for Frontend): Optimize backend for specific client interfaces.\
    Read more: <https://learn.microsoft.com/en-us/azure/architecture/patterns/backends-for-frontends>
- **CI/CD**
  Because automated release process is often preceded by automated testing, CI/CD are used together and enable application deployment any time by clicking a button.\
  Read more: <https://www.redhat.com/en/topics/devops/what-is-ci-cd>
  - **CI** (_Continuous Integration_) allow changes to central repository, and often trigger automated test suites.
  - **CD** (_Continuous Delivery/Deployment_) allows deployment after code changes to an environment after the build stage. Some deployment strategies may look like:
    - Blue-Green: Two production alternating servers.
    - Canary: Slow feature adoption.
    - Rolling updates: Linear service upgradation.

To improve QPS or CPU usage to handle incremental load, systems evolve to become more complex.\
Read more: <https://aws.amazon.com/what-is/scaling/>

- **Vertical Scaling**: Add more power (CPU, RAM) to existing machine.
- **Horizontal Scaling**: Add more machines to the pool. Requires load balancing and service coordination:
  - _Load Balancer_: Distribute incoming requests across multiple servers
    - Round Robin: Requests distributed evenly
    - Least Connections: Route to server with fewest active connections
    - IP Hash: Route based on client IP
    - Weighted: Distribute based on server capacity
  - _Connection Pool_: Split monolith into independent "micro-services", and reuse database connections to reduce overhead.\
    Read more: <https://microservices.io/>
  - _Database Optimization_:
    - DB Cache: Redis, Memcached for faster data access.
    - DB Replication: Read replicas for load distribution.
    - DB Sharding: Horizontal partitioning of data.\
      Read more: <https://www.digitalocean.com/community/tutorials/understanding-database-sharding>
    - CQRS: Command Query Responsibility Segregation.\
      Read more: <https://docs.microsoft.com/en-us/azure/architecture/patterns/cqrs>

Read More:

- [The Twelve-Factor App](https://12factor.net/)
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

## System Architecture

Transactional Messaging and Event-Driven Architecture.\
Read more: <https://medium.com/@platform.engineers/transactional-messaging-and-event-driven-architecture-a-technical-overview-f96a23d7aa26>

Important to build Zero-Trust Architecture

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
