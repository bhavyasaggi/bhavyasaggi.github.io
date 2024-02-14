import { MultiSelect } from '@mantine/core'

import { useAppDispatch, useAppSelector } from '@/store/redux'
import { actionSetFilter } from '@/store/sliceDocumentSelector'

import type { DSSubsidiaryType } from '@/types/DocumentSelector'

export default function DocumentSelectorTemplateFilter({
  templates,
}: {
  templates: Array<DSSubsidiaryType>
}) {
  const templateFilter = useAppSelector(
    (store) => store.documentSelector.templateFilter || {}
  )

  const dispatch = useAppDispatch()

  const templateselection = Object.keys(templateFilter)

  const SubsidiaryOptions = templates.map(({ id, name }) => ({
    value: id,
    label: name,
  }))

  return (
    <MultiSelect
      placeholder='Job Templates'
      multiple
      searchable
      value={templateselection}
      data={SubsidiaryOptions}
      onChange={(values) => {
        dispatch(
          actionSetFilter({
            type: 'templateFilter',
            values: values,
          })
        )
      }}
    />
  )
}
