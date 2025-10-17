---
layout: base.liquid
title: System Design
eleventyNavigation:
  key: /system-design/
  order: 5
  excerpt: Architecture patterns, scalability, design principles
---

- **Layered Architecture**

  ```mermaid
  flowchart LR
      A[Presentation Layer<br/>UI, Controllers] --> B[Business Layer<br/>Domain Logic]
      B --> C[Persistence Layer<br/>Data Access]
      C --> D[Database Layer<br/>Storage]
  ```

- **Microservices** vs **Monolith**

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

## UI Architecture Patterns

- **MVC** (Model-View-Controller)

  ```mermaid
  flowchart LR
      U[User Input] --> C[Controller]
      C --> M[Model]
      M --> V[View]
      V --> U
  ```

  - **Model**: Data and business logic
  - **View**: UI representation
  - **Controller**: Handles user input

- **MVP** (Model-View-Presenter)

  ```mermaid
  flowchart LR
      U[User Input] --> V[View]
      V <--> P[Presenter]
      P <--> M[Model]
  ```

  - View is passive, Presenter handles all logic
  - Better testability than MVC

- **MVVM** (Model-View-ViewModel)

  ```mermaid
  flowchart LR
    U[User Input] --> V[View]
    V <--> VM[ViewModel]
    VM <--> M[Model]
  ```

  - Data binding between View and ViewModel
  - Popular in WPF, Angular, Vue.js

- **MVI** (Model-View-Intent)

  ```mermaid
  flowchart LR
      I[Intent] --> M[Model]
      M --> V[View]
      V --> I
  ```

  - Unidirectional data flow
  - Reactive programming approach

- **VIPER** (iOS Architecture):\
  Read more: <https://medium.com/@pinarkocak/understanding-viper-pattern-619fa9a0b1f1>
  - _View_: UI components
  - _Interactor_: Business logic
  - _Presenter_: View logic
  - _Entity_: Data models
  - _Router_: Navigation logic

## Essential Resources

- [System Design Primer](https://github.com/donnemartin/system-design-primer)
- [High Scalability](http://highscalability.com/)
- [AWS Architecture Center](https://aws.amazon.com/architecture/)
- [Software Craftsmanship](https://blog.cleancoder.com/uncle-bob/2011/01/17/software-craftsmanship-is-about.html)
