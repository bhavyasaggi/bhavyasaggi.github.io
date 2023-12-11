import React, { useRef, useEffect, useState } from 'react'

import Nav from 'react-bootstrap/Nav'
import Stack from 'react-bootstrap/Stack'
import Tab from 'react-bootstrap/Tab'
import Spinner from 'react-bootstrap/Spinner'

import BeeLineSync from './BeeLineSync'
import BeeLineIssues from './BeeLineIssues'

export default function BeeLine({
  title = '',
  sections = [],
}: {
  title?: string
  sections?: any
}) {
  const heightContainerRef = useRef<any>(null)
  const [heightAvailable, setHeightAvailable] = useState(0)

  useEffect(() => {
    const heightContainer: HTMLElement | null = heightContainerRef.current
    if (heightContainer) {
      const windowHeight = heightContainer.offsetHeight
      setHeightAvailable(windowHeight)
    }
  }, [])

  return (
    <Stack direction='vertical' className='min-vh-100'>
      <div className='flex-grow-0 flex-shrink-0'>
        <BeeLineSync title={title} />
      </div>
      <div ref={heightContainerRef} className='flex-grow-1 flex-shrink-1'>
        {!heightAvailable ? (
          <div className='d-flex align-items-center justify-content-center'>
            <Spinner animation='border' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </Spinner>
          </div>
        ) : null}
        {heightAvailable && sections && sections.length ? (
          <Tab.Container
            key={sections?.[0]?.id}
            defaultActiveKey={sections?.[0]?.id}
          >
            <Stack direction='horizontal' className='align-items-stretch'>
              <Nav variant='pills' className='border-end p-2 flex-column'>
                {sections.map(
                  ({ id: sectionId, displayName: sectionName }: any) => (
                    <Nav.Item key={sectionId}>
                      <Nav.Link eventKey={sectionId}>{sectionName}</Nav.Link>
                    </Nav.Item>
                  )
                )}
              </Nav>
              <Tab.Content className='flex-grow-1 flex-shrink-0'>
                {sections.map(
                  ({ id: sectionId, displayName: sectionName }: any) => (
                    <Tab.Pane
                      key={sectionId}
                      eventKey={sectionId}
                      title={sectionName}
                      className='rounded-0'
                    >
                      <BeeLineIssues
                        height={heightAvailable}
                        section={sectionId}
                      />
                    </Tab.Pane>
                  )
                )}
              </Tab.Content>
            </Stack>
          </Tab.Container>
        ) : null}
        {heightAvailable && (!sections || !sections.length) ? (
          <BeeLineIssues height={heightAvailable} section='' />
        ) : null}
      </div>
    </Stack>
  )
}
