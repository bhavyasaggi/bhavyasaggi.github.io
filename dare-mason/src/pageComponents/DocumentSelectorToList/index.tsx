import {
  Box,
  Stack,
  Text,
  ScrollArea,
  Group,
  ActionIcon,
  TextInput,
} from '@mantine/core'
import {
  IconArrowLeft,
  IconCheck,
  IconSearch,
  IconX,
} from '@tabler/icons-react'

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
    <Stack h='100%'>
      <Text fw='500'>Selected Documents</Text>
      <TextInput
        value={searchFilter}
        leftSection={<IconSearch color='black' size='1rem' />}
        onChange={(e) => {
          dispatch(actionSetToSearch(e.target.value))
        }}
      />
      {Object.keys(selectedDocumentsMap).length ? (
        <ScrollArea.Autosize
          offsetScrollbars
          scrollbars='y'
          type='always'
          mah={420}
          className='rounded'
          style={{
            border: '1px solid green',
          }}
        >
          <Stack p='4px' gap='4px'>
            {templates.map(
              ({ documents }) =>
                documents?.map(({ id: documentId, name: documentName }) =>
                  (!searchFilter || documentName.includes(searchFilter)) &&
                  selectedDocumentsMap[documentId] ? (
                    <Group key={documentId} p='4px'>
                      <IconCheck size='1rem' color='green' />
                      <Text mr='auto'>{documentName}</Text>
                      <ActionIcon
                        variant='outline'
                        color='gray'
                        size='xs'
                        className='rounded-sm'
                        onClick={() => {
                          dispatch(
                            actionSetSelection({
                              ids: [documentId],
                              value: false,
                            })
                          )
                        }}
                      >
                        <IconX size='1rem' color='black' />
                      </ActionIcon>
                    </Group>
                  ) : null
                )
            )}
          </Stack>
        </ScrollArea.Autosize>
      ) : (
        <Box
          p='lg'
          flex='1 1 auto'
          ta='center'
          c='gray'
          bg='whitesmoke'
          className='rounded'
        >
          <IconArrowLeft size='64px' />
          <Text>
            Select documents from left panel to have employees review them &
            provide a signature acknowledging review
          </Text>
        </Box>
      )}
    </Stack>
  )
}
