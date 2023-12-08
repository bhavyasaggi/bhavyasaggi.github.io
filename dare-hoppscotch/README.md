# Dare-Hoppscotch

## Expectations

- **Code Architecture**: Cross-Platform Architectures in Monorepo
  - **Build process**: with optional Intrumentation.
  - **Documentation**: Decision & Design Documentation, with Test Suites
- **Best Practices**:Planning Features & Development Cycles. Balance User, Business, & Technical requirements.
- **Knowledge Growth**
- **Performance**: Bulk Data Manipulation with low-latency
- **User Experience**: high-fps UI, with animations

## Challenge

Implement an Issues list, similar to [Linear](https://linear.app/)'s.

## Requirement

- A fake dataset of about ~1,000,000 issues to render in a list view.

  - Split into 10 files of ~160,000 issues each (36MB).
  - `https://sfe-interview.hoppscotch.com/issues-<<page_number>>.json`

    ```json
    {
      "tickets": [
        {
          "teamID": "HFE|HBE|HP",
          "id": "{teamID}-###"
          "title": "xxxxxx",
          "parentID": "{id}",
          "status": "Triage|Backlog|Todo|In Progress|In Review|Done",
          "labels": "Bug|Feature|Performance|Security|Documentation|User Request|Immediate|Next Release|Major Release",
          "priority": "none|low|medium|high|critical",
          "assignee": "xxxxxx|null"
        }
      ]
    }
    ```

  - group the list for the following categories:
    - `status` , `labels` , `priority` , `assignee` (assigned or unassigned)
  - The list items for should show all the data present in the ticket.
  - No Pagination. Leverage Infinite Scroll.
  - May have loading state
  - Using TypeScript
  - Clean UI and animations
