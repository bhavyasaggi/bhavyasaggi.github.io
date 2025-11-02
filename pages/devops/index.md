---
layout: base.liquid
title: DevOps
eleventyNavigation:
  key: /devops/
  order: 4
---

## Observability

- Datadog
- New Relic
- Sentry

## Monitoring

- Application Metrics: Eg. monit
- Health-checks: Eg. UptimeKuma

## Logging

Eg. Prometheus + Grafana

**Instrumentation / Telemetry**: Eg. OpenTelemetry allows taking future decision, based on current system behavior.

## Alerting

- Gotify

---

## Virtualization / Containerization

All services, including applications, databases, etc. require hardware resources, execution environment, maybe networking capabilities to perform optimally. Hence, it becomes critical to ensure there are enough resources available without cross-application interference. Following are popular efforts in this direction:

- **Sandboxing** allows running application in an isolated environment to protect system resources.
- **Virtualization** allows creation of virtual versions of computer resources, allowing multiple instances of isolated environments on the same hardware or across a distributed system. Eg. Vagrant.
- **Containerization** allows running applications and their dependencies in isolated containers, where containers may share the same operating system kernel but are isolated from other containers. Eg. Docker

### Docker

### Docker Compose

---

## Orchestration / Infrastructure-as-Code

But as scale grows, _Orchestration_ is required to manage the lifecycle of applications including handling tasks like deployment, scaling, load balancing, and networking. To make all these easier, _Infrastructure-as-Code_ is an emerging term to avoid manual setups and rely on a single-source of truth files.

### Kubernetes

- Manifests
- ConfigMaps
- Secrets

Tools/Extensions:

- Lens
- Istio
- Helm charts
- Argo CD
- Velero

### Infrastructure as Code

- _Provisioning_: Eg. Terraform
- _Configuration Management_: Eg. Ansible
- _Secrets_: Eg. Vault
- _Service Mesh_: Eg. Consul
- _Service Discovery_: Eg. Traefik

---

## Popular Stacks

- ELK
  - ElasticSearch
  - Logstash
  - Kibana
- OpenSearch
  - Prometheus
  - Grafana
