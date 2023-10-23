---
title: Data Patterns
eleventyNavigation:
  parent: /pages/system-designs/
  order: 3
---

# Data Patterns for Distributed Systems

## Message Queue

- RabbitMQ
- Kafka

## Cache Mechanism

- In-Memory
  - WriteThrough
  - ReadThrough
  - Write-Around
  - Write-Back
- Distributed
  - Eviction
  - Invalidation

## Relational Data Modelling

- ACID Properties

## Non-Relational Data Modelling

- CAP Theorem
  - **Consistency**: Every read receives the most recent write or an error
    - _Strong Consistency_: Strong consistency ensures that all replicas in a distributed system have the same view of data at all times.
    - _Weak Consistency_: Weak consistency allows temporary inconsistencies or delays in data synchronization across replicas.
    - _Eventual Consistency_: Eventual consistency guarantees that if no further updates are made to a data item, eventually, all replicas will converge and become consistent.
  - **Availability**: Every request receives a (non-error) response - without the guarantee that it contains the most recent write
  - **Partition tolerance**: The system continues to operate despite an arbitrary number of messages being dropped (or delayed) by the network between nodes
