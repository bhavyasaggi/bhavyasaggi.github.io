---
layout: base.liquid
title: System Design
eleventyNavigation:
  key: /system-design/
  order: 5
  excerpt: Architecture patterns, scalability, design principles
---

New-age Tech Problems. How to instantaneously serve millions of users?

- Process &rarr; Store &rarr; Reconcile &rarr; Serve &rarr; Notify

A single monolith architecture is not viable anymore. Solution? Minimize the architecture & replicate them.
Leads to the development of 'Distributed Systems', and not only for data, but for connections as well.
Focus on Consistency and Availability.

## System Architecture

Architectures are not (or should not) be about frameworks. Architectures should not be supplied by frameworks.
Frameworks are tools to be used, not architectures to be conformed to. If your architecture is based on frameworks, then it cannot be based on your use cases.

Consider web or service-based architecture only, on basis of following factors:

- Latency
- Consistency
- Throughput
- Availability

Commonly used Infrastructure Patterns that should be known, are as follows:

- **Layered Architecture**

  ```mermaid
  flowchart LR
      A[Presentation Layer<br/>UI, Controllers] --> B[Business Layer<br/>Domain Logic]
      B --> C[Persistence Layer<br/>Data Access]
      C --> D[Database Layer<br/>Storage]
  ```

- Service-Oriented Architecture Pattern
  - Enterprise service bus
- Microservices Architecture Pattern
  - Service Registry/Discovery
- Client-Server Architecture Pattern
- Event-driven Architecture Pattern
- Blackboard Architecture Pattern
- Master-Slave Architecture Pattern
- Circuit Breaker Architecture Pattern
- Peer-to-Peer Architecture Pattern

Read more: <https://learn.microsoft.com/en-us/azure/architecture/patterns/>

### Microservices vs Monolith

| Monolith                              | Microservices        |
| ------------------------------------- | -------------------- |
| Simple deployment                     | Independent scaling  |
| Easy testing                          | Technology diversity |
| Better performance (no network calls) | Fault isolation      |
| Easier debugging                      | Team autonomy        |

When to use Microservices:

- Large, complex applications
- Multiple teams
- Different scaling requirements
- Need for technology diversity

## Back of the envelope estimation

// ??

## Popular Algorithms

- Data Lookup
  - GeoHash: Location based service
  - QuadTree: Location based service
  - Trie: AutoComplete
  - Bloom Filter: Lookup Hash
  - Snowflake: Distributed Unique ID Generator
- Balancing
  - Consistent Hashing: Cluster Load-Balancing
  - Leaky / Token Bucket: Rate Limiting
- File Transfer
  - Rsync

## Popular Examples

- High Level System Design
  - Notification System
  - Timeline System
  - Chat System
  - Collaboration System
  - Media System
    - On-Demand Large Media Service
    - Live-Streaming Media Service
  - Financial System
    - Payment System
    - Stock-Exchange System
- Low Level System Design
  - Bulk Data Processing
  - Autocomplete System

## Essential Resources

- [System Design Primer](https://github.com/donnemartin/system-design-primer)
- [High Scalability](http://highscalability.com/)
- [AWS Architecture Center](https://aws.amazon.com/architecture/)
- [Software Craftsmanship](https://blog.cleancoder.com/uncle-bob/2011/01/17/software-craftsmanship-is-about.html)
- <https://refactoring.guru/design-patterns/catalog>
- <https://www.patterns.dev/#patterns>
