import {
  Accordion,
  Text,
  ScrollArea,
  Group,
  Switch,
  ActionIcon,
  Stack,
} from '@mantine/core'
import { IconArrowRight, IconEdit } from '@tabler/icons-react'

import { useAppDispatch, useAppSelector } from '@/store/redux'
import { actionSetSelection } from '@/store/sliceDocumentSelector'

import toShowDocument from '@/utils/toShowDocument'

import styles from './styles.module.scss'

import type { DSTemplateType } from '@/types/DocumentSelector'

interface DocumentSelectorFromListProps {
  templates: Array<DSTemplateType>
}

export default function DocumentSelectorFromList({
  templates,
}: DocumentSelectorFromListProps) {
  const selection = useAppSelector((store) => store.documentSelector.selection)

  const dispatch = useAppDispatch()

  const searchFilter = useAppSelector(
    (store) => store.documentSelector.searchFromFilter
  )
  const templateFilter = useAppSelector(
    (store) => store.documentSelector.templateFilter
  )
  const locationFilter = useAppSelector(
    (store) => store.documentSelector.locationFilter
  )
  const subsidiaryFilter = useAppSelector(
    (store) => store.documentSelector.subsidiaryFilter
  )
  const seniorityFilter = useAppSelector(
    (store) => store.documentSelector.seniorityFilter
  )

  // Omit Documents
  let totalDocuments = 0
  const renderTemplates = templates
    .map((template) => {
      const newTemplate = { ...template }
      newTemplate.documents = newTemplate.documents?.filter((document) => {
        return toShowDocument(
          { ...document, template: template.id },
          {
            searchFilter,
            templateFilter,
            locationFilter,
            subsidiaryFilter,
            seniorityFilter,
          }
        )
      })
      totalDocuments += newTemplate.documents.length
      return newTemplate
    })
    .filter((template) => template.documents?.length > 0)

  const renderDocumentIds = renderTemplates
    .map(({ documents }) => documents.map(({ id }) => id))
    .flat(2)

  return (
    <Stack>
      <Group>
        <Text mr='auto' fz='sm' fw='500'>
          {totalDocuments} Available Documents
        </Text>
        <Switch
          label='Select All'
          onChange={(e) => {
            dispatch(
              actionSetSelection({
                ids: renderDocumentIds,
                value: e.target.checked,
              })
            )
          }}
        />
      </Group>
      <ScrollArea
        offsetScrollbars
        scrollbars='y'
        type='always'
        h={250}
        style={{
          borderRadius: '4px',
          border: '1px solid orange',
          overflow: 'hidden',
        }}
      >
        <Accordion transitionDuration={300}>
          {renderTemplates.map(
            ({ id: templateId, name: templateName, documents }) => (
              <Accordion.Item key={templateId} value={templateId}>
                <Accordion.Control className={styles.fromListHeader}>
                  {templateName}
                </Accordion.Control>
                <Accordion.Panel>
                  <Stack gap='4px'>
                    {documents?.map(
                      ({ id: documentId, name: documentName }) => (
                        <Group
                          key={documentId}
                          p='4px'
                          gap='4px'
                          className='hover'
                        >
                          <Text mr='auto'>{documentName}</Text>
                          {selection[documentId] ? (
                            <ActionIcon
                              variant='outline'
                              color='gray'
                              size='xs'
                              className='rounded-sm'
                              onClick={() =>
                                window.alert('Unknown Edit Action')
                              }
                            >
                              <IconEdit size='1rem' color='black' />
                            </ActionIcon>
                          ) : (
                            <ActionIcon
                              variant='outline'
                              color='gray'
                              size='xs'
                              className='rounded-sm'
                              onClick={() => {
                                dispatch(
                                  actionSetSelection({
                                    ids: [documentId],
                                    value: true,
                                  })
                                )
                              }}
                            >
                              <IconArrowRight size='1rem' color='black' />
                            </ActionIcon>
                          )}
                        </Group>
                      )
                    )}
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>
            )
          )}
        </Accordion>
      </ScrollArea>
    </Stack>
  )
}
