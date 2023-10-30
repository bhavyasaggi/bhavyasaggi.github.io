---
title: Data Patterns
eleventyNavigation:
  parent: /pages/system-design/
  order: 3
---

# Data Patterns for Distributed Systems

- concurrency
- database isolation
  - Read Uncommitted
  - Read Committed
  - Repeatable Read
  - Serializable
- saving passwords

## CAP Theorem

- **Consistency**: Every read receives the most recent write or an error
  - _Strong Consistency_: Strong consistency ensures that all replicas in a distributed system have the same view of data at all times.
  - _Weak Consistency_: Weak consistency allows temporary inconsistencies or delays in data synchronization across replicas.
  - _Eventual Consistency_: Eventual consistency guarantees that if no further updates are made to a data item, eventually, all replicas will converge and become consistent.
- **Availability**: Every request receives a (non-error) response - without the guarantee that it contains the most recent write
- **Partition tolerance**: The system continues to operate despite an arbitrary number of messages being dropped (or delayed) by the network between nodes

## Structured Data Modelling

- OLTP
  - Relational
  - ACID Properties
- OLAP
  - Columnar
  - Analytical

## Semi-Structured Data Modelling

- Key-Value / In-Memory
- Wide Column (Time-series / Geospatial)
- Graph
- Document
- Blob / Rich-Text
  - Block
  - File
  - Object

## Big Data

## Event-driven System

Message Queue

- RabbitMQ
- Kafka

### Idempotency and Ordering

Idempotency is a property of an operation that allows it to be applied multiple times without changing the result.

Our goal is to create events that are either naturally idempotent, or if necessary, introduce additional data into the event in order to make it idempotent.

out-of-order events

we introduce any concurrency into either the source or destination of the events, it could result in them being processed in a non-deterministic order.

## Cache Mechanism

- In-Memory
  - WriteThrough
  - ReadThrough
  - Write-Around
  - Write-Back
- Distributed
  - Eviction
  - Invalidation

Examples

- Redis
- Memcached

### CDN
