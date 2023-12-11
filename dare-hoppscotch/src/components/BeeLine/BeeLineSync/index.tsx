import React from 'react'

import Stack from 'react-bootstrap/Stack'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { useBeeLineWorkerMeta } from '../provider'

function BeeLineSyncRaw({ title = '' }: { title?: string }) {
  const { progress: workerProgress, loaded: workerLoaded } =
    useBeeLineWorkerMeta()

  return (
    <Stack direction='horizontal' className='border-bottom p-3 text-end'>
      <div className='d-inline-block ms-0 me-auto lead'>{title}</div>
      <div className='rounded p-2 bg-secondary'>
        <ProgressBar
          aria-disabled={!workerLoaded}
          variant={workerProgress < 0 ? 'danger' : 'dark'}
          min={0}
          max={100}
          now={Math.abs(workerProgress)}
          label={`Sync: ${Math.abs(workerProgress)}%`}
          striped
          className='opacity-75'
          style={{ width: '300px' }}
        />
      </div>
    </Stack>
  )
}

const BeeLineSync = React.memo(BeeLineSyncRaw)

export default BeeLineSync
