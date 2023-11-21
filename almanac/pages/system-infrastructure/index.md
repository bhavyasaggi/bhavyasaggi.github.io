---
title: System Infrastructure
eleventyNavigation:
  parent: /pages/
  order: 53
---

# System Infrastructure

## Deployment

## Monitoring

- Datadog
- New Relic
- Sentry

## Alerting

## Upgradation

To improve QPS or CPU usage to handle incremental load, systems evolve to become more complex.
Generic steps that are undertaken to improve infrastructure performance are:

- Load Balancer
- Split Services to Clusters
- Split DB by Service
- Optimize DB Operation
  - DB Cache
  - DB Replication (Master-Slave) for Operations (Read-Write)

### DB Upgradation

To further improve DB perfomance, a distributed approach could be utilized.
But following items must be considered:

- Sharding
- Paritioning
  - Horizontal Partitioning
  - Vertical Partitioning
- Concurrency
  - Serially
  - Serially Batch
  - Pessimistic Locking
  - Optimistic Locking
- Resource Locking

### Service Upgradation

Some services require more attention than others to manage QPS/CPU usage, leading to 'Scaling':

- Horizontal Scaling
- Vertical Scaling
