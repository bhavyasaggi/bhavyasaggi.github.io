# Dare-Hoppscotch

Implement an Issues list, similar to [Linear](https://linear.app/)'s.

- **Code Architecture**: Cross-Platform Architectures in Monorepo
  - **Build process**: with optional Intrumentation.
  - **Documentation**: Decision & Design Documentation, with Test Suites
- **Best Practices**:Planning Features & Development Cycles. Balance User, Business, & Technical requirements.
- **Knowledge Growth**
- **Performance**: Bulk Data Manipulation with low-latency
- **User Experience**: high-fps UI, with animations

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

## Asumptions

- No Auth is present, all data is available to anyone who visits.
- Data is fetched progressive as soon as user lands on the web-app, and does not refresh.
- Data is lost on reload, and needs to be re-fetched (could be improved by leveraging indexedDB or service-worker)
- The tracker displays data present in an issue, in a linear-list format.\
  (Click to open details, is not implemented.)
- For faster data-fetching and maintaining paginated view, pre-segment the data into groups in memory.
- Leverage react-bootstrap as UI Library
  - Allows for global stylesheet and accessability.
- Display "Sync" Progress to indicate how much data has been loaded on client (in Web Worker).
- Display Tracker-List via the Virtualized pattern, ie. render only a segment of list that is in user's view, to keep DOM lightweight.

## Implementation

The code is part of a monorepo (via yarn-workspaces).

- **Fetching Data**
  - Fetch all pages in background in a web-worker & maintain the list of issues in memory (could be improved by lerveraging indexedDD).
- **Web-Worker**:
  - The webworker performs its tasks in chunks, so pre-emptive requests could be handled.
  - The web-worker has following exposed endpoints
    - _FetchIssues_: Grabs the issue-list from list of urls, and maps them in memory
    - _GetIssues_: Gets a list of issues from memory, with specific filters (like group, page, limit)
- **In-Memory Data**
  - `dataListTickets`: List of issue objects
  - `dataGroupTickets`: Map of issue groups
    - `dataGroupTickets[groupName-groupType]`: List of issue-ids under the group-value pair, eg. `status-triage`
- **Pages**
  - _Home_: Home Page, containing introduction and Link to Tracker Dashboard
  - _Tracker_: Root Tracker dashboard, displaying list of all issues
    - _Tracker/Group_: Grouped Tracker dashboard, displayed list of issues grouped by specific group
- **Issue List** (_BeeLine_)
  - Maintain a 'Sync' progress, to display how much data is available to render in WebWorker's memory
  - Leverage 'Virutalization' to render only the items near the viewport, to keep DOM lightweight.
  - Query the Web-Worker for next list of issues to display on tracker.

## Improvments

- Backup the fetched tracker-data into persistent storage and hydrate from it before making network calls
- Free browser memory in favor of repeated Web-Worker calls.
- Leverage a dictionary for Internationalization.

## Code Structure

- `/src`
  - `/components`: Collection of individual Components that do not depend on siblings
    - `/[Component]`
      - `/index.tsx`: Component
      - `/index.spec.tsx`: Jest Test Suite
      - `/style.module.scss`: CSS-Modules stylesheet
      - `/hooks.tsx`: React hooks for the component
      - `/provider.tsx`: React Context Provider & hooks
      - `/store.tsx`: Redux Store's slice
      - `/worker.tsx`: Web Worker
      - `/[SubComponent]`: Components that may use one-another
        - `/index.tsx`
        - `/index.spec.tsx`: Optional Test Suite
        - `/style.module.scss`
  - `/hooks`: Collection of globally available react hooks
    - `/[useHook].tsx`
  - `/store`: Store initializer (usually Redux)
    - `/redux.ts`
  - `/constants`: Global constant files (or dictionaries)
    - `/[constants].json`
  - `/styles`: Global Stylesheets
    - `/[.style].scss`
  - `/pages`: Next.js Page Router
    - `/[page]/index.tsx`
  - `/specs`: Integrated UI Test suites for pages
    - `/[path].spec.tsx`

## Execution

- Running Dev Mode
  - `yarn dare:hoppscotch`
- Running tests
  - `yarn dare:hoppscotch:test`
- Running build
  - `yarn dare:hoppscotch:build`

## TODO

- Write test cases
