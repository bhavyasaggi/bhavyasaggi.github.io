import { TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'

import { useAppDispatch, useAppSelector } from '@/store/redux'
import { actionSetFromSearch } from '@/store/sliceDocumentSelector'

export default function DocumentSelectorSearchFilter() {
  const searchFilter = useAppSelector(
    (store) => store.documentSelector.searchFromFilter
  )

  const dispatch = useAppDispatch()

  return (
    <TextInput
      placeholder='Search'
      value={searchFilter}
      leftSection={<IconSearch color='black' size='1rem' />}
      onChange={(e) => {
        dispatch(actionSetFromSearch(e.target.value))
      }}
    />
  )
}
