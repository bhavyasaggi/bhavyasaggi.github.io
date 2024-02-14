import {
  Accordion,
  Box,
  Text,
  ScrollArea,
  Group,
  ActionIcon,
  TextInput,
} from '@mantine/core'
import { IconX } from '@tabler/icons-react'

import { useAppDispatch, useAppSelector } from '@/store/redux'
import {
  actionSetSelection,
  actionSetToSearch,
} from '@/store/sliceDocumentSelector'

import type { DSTemplateType } from '@/types/DocumentSelector'

interface DocumentSelectorToListProps {
  templates: Array<DSTemplateType>
}

export default function DocumentSelectorToList({
  templates,
}: DocumentSelectorToListProps) {
  const searchFilter = useAppSelector(
    (store) => store.documentSelector.searchToFilter
  )

  const selectedDocumentsMap = useAppSelector(
    (store) => store.documentSelector.selection
  )

  const dispatch = useAppDispatch()

  return (
    <Box>
      <Text>Selected Documents</Text>
      <TextInput
        value={searchFilter}
        onChange={(e) => {
          dispatch(actionSetToSearch(e.target.value))
        }}
      />
      <ScrollArea h={250}>
        <Accordion>
          {templates.map(
            ({ documents }) =>
              documents?.map(({ id: documentId, name: documentName }) =>
                (!searchFilter || documentName.includes(searchFilter)) &&
                selectedDocumentsMap[documentId] ? (
                  <Group key={documentId}>
                    <Text>{documentName}</Text>
                    <ActionIcon
                      variant='outline'
                      onClick={() => {
                        dispatch(
                          actionSetSelection({
                            ids: [documentId],
                            value: false,
                          })
                        )
                      }}
                    >
                      <IconX />
                    </ActionIcon>
                  </Group>
                ) : null
              )
          )}
        </Accordion>
      </ScrollArea>
    </Box>
  )
}
