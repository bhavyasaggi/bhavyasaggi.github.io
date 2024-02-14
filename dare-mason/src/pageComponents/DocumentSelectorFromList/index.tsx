import {
  Accordion,
  Box,
  Text,
  ScrollArea,
  Group,
  Switch,
  Button,
  ActionIcon,
} from '@mantine/core'
import { IconArrowRight, IconEdit } from '@tabler/icons-react'

import { useAppDispatch, useAppSelector } from '@/store/redux'
import { actionSetSelection } from '@/store/sliceDocumentSelector'

import toShowDocument from '@/utils/toShowDocument'

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
    <Box>
      <Group>
        <Text>{totalDocuments} Available Documents</Text>
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
      <ScrollArea h={250}>
        <Accordion>
          {renderTemplates.map(
            ({ id: templateId, name: templateName, documents }) => (
              <Accordion.Item key={templateId} value={templateId}>
                <Accordion.Control>{templateName}</Accordion.Control>
                <Accordion.Panel>
                  <Box>
                    {documents?.map(
                      ({ id: documentId, name: documentName }) => (
                        <Group key={documentId}>
                          <Text>{documentName}</Text>

                          {selection[documentId] ? (
                            <ActionIcon
                              variant='outline'
                              onClick={() =>
                                window.alert('Unknown Edit Action')
                              }
                            >
                              <IconEdit />
                            </ActionIcon>
                          ) : (
                            <ActionIcon
                              variant='outline'
                              onClick={() => {
                                dispatch(
                                  actionSetSelection({
                                    ids: [documentId],
                                    value: true,
                                  })
                                )
                              }}
                            >
                              <IconArrowRight />
                            </ActionIcon>
                          )}
                        </Group>
                      )
                    )}
                  </Box>
                </Accordion.Panel>
              </Accordion.Item>
            )
          )}
        </Accordion>
      </ScrollArea>
    </Box>
  )
}
