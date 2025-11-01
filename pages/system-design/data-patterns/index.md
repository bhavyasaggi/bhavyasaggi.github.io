---
layout: base.liquid
title: Data Patterns
eleventyNavigation:
  key: /system-design/data-patterns/
  parent: /system-design/
---

<https://blog.bytebytego.com/p/understanding-database-types>

- concurrency
- database isolation
  - Read Uncommitted
  - Read Committed
  - Repeatable Read
  - Serializable
- saving passwords

## Structured Data Modelling

- OLTP
  - Relational
  - ACID (Atomicity, Consistency, Isolation, Durability)
- OLAP
  - Columnar
  - Analytical
  - BASE (Basically-Available, Soft-State, Eventual-Consistency)

### SQL Best Practices

```sql
-- Indexing strategies
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_posts_user_created ON posts(user_id, created_at);

-- Efficient queries
SELECT u.name, COUNT(p.id) as post_count
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
WHERE u.created_at >= '2024-01-01'
GROUP BY u.id, u.name
HAVING COUNT(p.id) > 5;

-- Transactions
BEGIN;
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
  UPDATE accounts SET balance = balance + 100 WHERE id = 2;
  INSERT INTO transactions (from_id, to_id, amount) VALUES (1, 2, 100);
COMMIT;
```

## Semi-Structured Data Modelling

- Key-Value / In-Memory
- Wide Column (Time-series / Geospatial)
- Graph
- Document
- Blob / Rich-Text
  - Block
  - File
  - Object

### NoSQL Patterns

```js
// MongoDB aggregation
db.orders.aggregate([
  { $match: { status: "completed" } },
  {
    $group: {
      _id: "$customerId",
      totalSpent: { $sum: "$amount" },
      orderCount: { $sum: 1 },
    },
  },
  { $sort: { totalSpent: -1 } },
  { $limit: 10 },
]);

// Redis caching patterns
const cacheKey = `user:${userId}`;
const cached = await redis.get(cacheKey);
if (cached) return JSON.parse(cached);

const user = await db.users.findById(userId);
await redis.setex(cacheKey, 3600, JSON.stringify(user));
return user;
```

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

## Data Performance

- **Read Replicas**: Scale read operations
- **Sharding**: Horizontal partitioning
- **Federation**: Split databases by function
- **Denormalization**: Trade storage for query performance

## Cache Mechanism

- **Cache-Aside**: Application manages cache
- **Write-Through**: Write to cache and database simultaneously
- **Write-Behind**: Write to cache first, database later
- **Write-Around**: Write to database, bypass the cache.
- **Refresh-Ahead**: Proactively refresh cache before expiration

Examples

- Redis
- Memcached

### Cache Eviction

To free up space for new entries, or when the cache runs out of space, or triggered by time-based policies.

Eviction Policies:

- Least Recently Used (LRU): Removes the least recently used item first.
- Least Frequently Used (LFU): Removes the least frequently accessed item.
- First In, First Out (FIFO): Evicts the oldest item first.
- Random: Evicts an item randomly.

### Cache Invalidation

Eliminate entries ensuring that the cache does not serve outdated or incorrect data.

Invalidation Policies:

- Event-Based: When a specific event occurs, or after a certain time period has passed.
- Explicit: Triggered explicitly by the application or system.
