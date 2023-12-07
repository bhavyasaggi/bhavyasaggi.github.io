import React from 'react'

import BeeLineProvider from './provider'
import BeeLineSync from './BeeLineSync'
import BeeLineIssues from './BeeLineIssues'

export default function BeeLine() {
  return (
    <BeeLineProvider>
      <BeeLineSync />
      <BeeLineIssues />
    </BeeLineProvider>
  )
}
