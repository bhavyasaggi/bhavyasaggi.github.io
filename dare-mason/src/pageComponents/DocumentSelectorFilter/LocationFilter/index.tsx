import { MultiSelect } from '@mantine/core'

import { useAppDispatch, useAppSelector } from '@/store/redux'
import { actionSetFilter } from '@/store/sliceDocumentSelector'

import type { DSLocationType } from '@/types/DocumentSelector'

export default function DocumentSelectorLocationFilter({
  locations,
}: {
  locations: Array<DSLocationType>
}) {
  const locationFilter = useAppSelector(
    (store) => store.documentSelector.locationFilter || {}
  )

  const dispatch = useAppDispatch()

  const locationSelection = Object.keys(locationFilter)

  const locationOptions = locations.map(({ id, name }) => ({
    value: id,
    label: name,
  }))

  return (
    <MultiSelect
      placeholder='Locations'
      multiple
      searchable
      value={locationSelection}
      data={locationOptions}
      onChange={(values) => {
        dispatch(
          actionSetFilter({
            type: 'locationFilter',
            values: values,
          })
        )
      }}
    />
  )
}
