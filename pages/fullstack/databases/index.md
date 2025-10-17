---
layout: base.liquid
title: Databases
eleventyNavigation:
  key: /fullstack/databases/
  order: 1
  parent: /fullstack/
---

- Sharding
- Partitioning
  - Horizontal Partitioning
  - Vertical Partitioning
- Concurrency
  - Serially
  - Serially Batch
  - Pessimistic Locking
  - Optimistic Locking
- Resource Locking

_CAP Theorem_: A modern (distributed) database system can only guarantee 2 out of 3:

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

### Consistency - Availability

`[]_-`

Eg. MySQL

### Availability - Partition-Tolerance

`[]_- + []_-`

Eg. CouchDB

### Consistency - Partition-Tolerance

`[]-[]-[]_-`

Eg. Redis

## Additional Database types

### Realtime Data

Columnar. Eg. Autocomplete, Notifications.

- _Kafka_
- _RabbitMQ_
- _Postgres CDC_

### Geological / Spatial Data

Eg. OpenStreetMap

- _Solr_
- _Typesense_
