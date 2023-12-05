# Introduction

The goal of the task is to verify the following attributes:

- How you structure your code to allow for maximum modularity and customisation.
- How you deal with performance issues when dealing with large datasets.
- How you deal with user experience issues when dealing with heavy calculations
- How you document your decisions and communicate the ideas.

You will be judged for the following factors:

- **Performance**: Rendering your list should ideally not freeze up the application, we will be evaluating how many frames are dropped (at 60FPS) trying to render the list and navigating through it.
- **User Experience**: The computation in this challenge is intentionally massive. We will be evaluating how you present this to the user while the data is loaded in.
- **Code Architecture**: We will be looking into how extensible your code is for if a condition changed (for example, more 'group by' options being added, data source changed etc.). This will also be the grounds of the round of interview after this.
- **Documentation**: How well you have documented your code and explained how your implementation works.
- **Best Practices**: Proper formatting, commits, proper folder structure etc.

These are things which are optional, but if you do end up implementing, we will give you points for.

- Using TypeScript
- Clean UI and animations

## Problem Statement

To implement an Issues list, similar to Linear's.\
Sample Dataset: `https://sfe-interview.hoppscotch.com/issues-<<page_number>>.json`\
where `page_number` ranges from 1 to 10.

The JSON contains a single field named tickets , that is an array of objects (ticket), with the following schema:

- `teamID` : One of "_HFE_", "_HBE_", or "_HP_" based on it being a frontend, backend or product team ticket.
- `id` : Starts with the _teamID_ followed by a dash and then a 3 digit ID, this should be unique for all entries.
- `title` : A sentence describing a work to be done, make sure this makes sense corresponding to the team given.
- `parentID` : If this ticket is a subticket of another ticket, this should be the ID of that ticket, else, null
- `status` : One of _Triage_ , _Backlog_ , _Todo_ , _In Progress_ , _In Review_ or _Done_ .
- `labels` : An array of the following possible strings: "_Bug_", "_Feature_", "_Performance_", "_Security_", "_Documentation_", "_User Request_", "_Immediate_", "_Next Release_", "_Major Release_"
- `priority` : One of "_none_", "_low_", "_medium_", "_high_", "_critical_"
- `assignee` : Name of the assignee if one is assigned, else null

## Requirements

- The user should be able to group the list for the following categories: **status** , **labels** , **priority** , **assignee** (no assignee vs assigned to someone should be enough)
- The list items for the individual ticket entry should show all the data present in the ticket. (Since there are no profile pictures provided for assignees, you can render just the initials if you want.)
- The list view should not be paginated. You cannot have a "Next Page"/"Previous Page" style of paginated view. You can still opt for Infinite Scrolling if that is possible.
- You can have a loading state for when you are loading data in.
