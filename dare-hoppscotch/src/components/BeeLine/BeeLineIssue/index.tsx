import Badge from 'react-bootstrap/Badge'
import Stack from 'react-bootstrap/Stack'

import Stickerize from '@/components/Stickerize'

function BeeLineIssueStatusIcon({ status }: { status: string }) {
  let value = ''
  switch (String(status).replace(/\s/g, '').toLowerCase()) {
    case 'triage':
      value = '🩺'
      break
    case 'backlog':
      value = '🗃️'
      break
    case 'todo':
      value = '📝'
      break
    case 'inprogress':
      value = '🚀'
      break
    case 'inreview':
      value = '🔎'
      break
    case 'done':
      value = '📌'
      break
    default:
      break
  }
  if (!value) {
    return null
  }
  return (
    <Stickerize title={status} className='rounded-circle'>
      {value}
    </Stickerize>
  )
}

function BeeLineIssuePriorityIcon({ priority }: { priority: string }) {
  let value = ''
  switch (String(priority).replace(/\s/g, '').toLowerCase()) {
    case 'none':
      value = '☝️'
      break
    case 'low':
      value = '✌️'
      break
    case 'medium':
      value = '👌'
      break
    case 'high':
      value = '🖖'
      break
    case 'critical':
      value = '✋'
      break
    default:
      break
  }
  if (!value) {
    return null
  }
  return (
    <Stickerize title={priority} className='rounded-circle'>
      {value}
    </Stickerize>
  )
}

function BeeLineIssueAssigneeIcon({ assignee }: { assignee: string }) {
  const initials = String(assignee)
    .split(/\s/)
    .map((s) => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  return (
    <Stickerize bg='info' text='light'>
      {initials}
    </Stickerize>
  )
}

export default function BeeLineIssue({
  teamID,
  id,
  title,
  parentID,
  status,
  labels,
  priority,
  assignee,
}: {
  teamID: string
  id: string
  title: string
  parentID: string
  status: string
  labels: string[]
  priority: string
  assignee: string
}) {
  return (
    <Stack
      direction='horizontal'
      gap={1}
      className='h-100 w-100 bg-dark text-light'
    >
      <Badge
        bg='secondary'
        pill
        className='text-nowrap text-truncate overflow-hidden'
        style={{ width: '60px' }}
      >
        {teamID}
      </Badge>
      <div
        className='text-nowrap text-truncate overflow-hidden'
        style={{ width: '80px' }}
      >
        {id}
      </div>
      <BeeLineIssuePriorityIcon priority={priority} />
      <BeeLineIssueStatusIcon status={status} />
      <div className='flex-shrink-1 flex-grow-1 text-nowrap text-truncate overflow-hidden'>
        {title}
      </div>
      <div>
        {parentID ? (
          <Badge bg='secondary' text='light'>
            {parentID}
          </Badge>
        ) : null}
      </div>
      <Stack direction='horizontal' gap={1} className='ms-auto me-0'>
        {(Array.isArray(labels) ? labels : [labels]).map((label, lIdx) =>
          label ? (
            <Badge key={lIdx} bg='warning'>
              {label}
            </Badge>
          ) : null
        )}
      </Stack>
      <BeeLineIssueAssigneeIcon assignee={assignee} />
    </Stack>
  )
}
