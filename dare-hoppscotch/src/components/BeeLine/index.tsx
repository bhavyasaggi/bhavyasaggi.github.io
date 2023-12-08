import React from 'react'

import BeeLineSync from './BeeLineSync'
import BeeLineIssues from './BeeLineIssues'

import BeeLineProvider from './provider'

export default function BeeLine({
  title = '',
  sections = [],
}: {
  title?: string
  sections?: any
}) {
  return (
    <BeeLineProvider>
      <BeeLineSync title={title} />

      {sections && sections.length ? (
        sections.map(({ id: sectionId, displayName: sectionName }: any) => (
          <React.Fragment key={sectionId}>
            <BeeLineIssues title={sectionName} section={sectionId} />
          </React.Fragment>
        ))
      ) : (
        <BeeLineIssues title='Issues' section='' />
      )}
    </BeeLineProvider>
  )
}
