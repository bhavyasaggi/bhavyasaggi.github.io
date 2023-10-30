---
title: System Design
eleventyNavigation:
  parent: /pages/
  order: 51
---

# System Design

## Principles

- DRY
- KISs
- MVP (Minimum Viable Product)

## Factors

- Latency
- Consistency
- Throughput
- Availability

## Paradigms

- Scaling
  - Horizontal Scaling
  - Vertical Scaling
- Paritioning
  - Horizontal Partitioning
  - Vertical Partitioning
- Sharding
- Concurrency
  - Serially
  - Serially Batch
  - Pessimistic Locking
  - Optimistic Locking
- Resource Locking

## Upgradation

- Load Balancer
- Split Services to Clusters
- Split DB by Service
- Optimize DB Operation
  - DB Cache
  - DB Replication (Master-Slave) for Operations (Read-Write)
- Split & Parition DB

Leads to

- Load Balancer
- Application Cluster
- Services
- Cache
- Master-Slave DB
