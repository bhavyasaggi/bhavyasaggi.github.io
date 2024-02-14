import { MultiSelect } from '@mantine/core'

import { useAppDispatch, useAppSelector } from '@/store/redux'
import { actionSetFilter } from '@/store/sliceDocumentSelector'

import type { DSSeniorityType } from '@/types/DocumentSelector'

export default function DocumentSelectorSeniorityFilter({
  seniorities,
}: {
  seniorities: Array<DSSeniorityType>
}) {
  const seniorityFilter = useAppSelector(
    (store) => store.documentSelector.seniorityFilter || {}
  )

  const dispatch = useAppDispatch()

  const senioritieselection = Object.keys(seniorityFilter)

  const SeniorityOptions = seniorities.map(({ id, name }) => ({
    value: id,
    label: name,
  }))

  return (
    <MultiSelect
      placeholder='Seniority'
      multiple
      searchable
      value={senioritieselection}
      data={SeniorityOptions}
      onChange={(values) => {
        dispatch(
          actionSetFilter({
            type: 'seniorityFilter',
            values: values,
          })
        )
      }}
    />
  )
}
