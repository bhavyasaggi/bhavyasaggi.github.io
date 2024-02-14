import { MultiSelect } from '@mantine/core'

import { useAppDispatch, useAppSelector } from '@/store/redux'
import { actionSetFilter } from '@/store/sliceDocumentSelector'

import type { DSSubsidiaryType } from '@/types/DocumentSelector'

export default function DocumentSelectorSubsidiaryFilter({
  subsidiaries,
}: {
  subsidiaries: Array<DSSubsidiaryType>
}) {
  const subsidiaryFilter = useAppSelector(
    (store) => store.documentSelector.subsidiaryFilter || {}
  )

  const dispatch = useAppDispatch()

  const Subsidiarieselection = Object.keys(subsidiaryFilter)

  const SubsidiaryOptions = subsidiaries.map(({ id, name }) => ({
    value: id,
    label: name,
  }))

  return (
    <MultiSelect
      placeholder='Subsidiary'
      multiple
      searchable
      value={Subsidiarieselection}
      data={SubsidiaryOptions}
      onChange={(values) => {
        dispatch(
          actionSetFilter({
            type: 'subsidiaryFilter',
            values: values,
          })
        )
      }}
    />
  )
}
