import { Box, Grid, Group, Stack, Text } from '@mantine/core'

import { useAppDispatch, useAppSelector } from '@/store/redux'
import { actionSetFilter } from '@/store/sliceDocumentSelector'

import FormMultiSelect from '../FormMultiSelect'

import DocumentSelectorSearchFilter from './SearchFilter'
import DocumentSelectorFilterTag from './FilterTag'

import type {
  DSTemplateType,
  DSLocationType,
  DSSubsidiaryType,
  DSSeniorityType,
} from '@/types/DocumentSelector'

interface DocumentSelectorFilterProps {
  templates: Array<DSTemplateType>
  locations: Array<DSLocationType>
  subsidiaries: Array<DSSubsidiaryType>
  seniorities: Array<DSSeniorityType>
}

export default function DocumentSelectorFilter({
  locations,
  templates,
  subsidiaries,
  seniorities,
}: DocumentSelectorFilterProps) {
  const templateFilter = useAppSelector(
    (store) => store.documentSelector.templateFilter || {}
  )
  const locationFilter = useAppSelector(
    (store) => store.documentSelector.locationFilter || {}
  )
  const subsidiaryFilter = useAppSelector(
    (store) => store.documentSelector.subsidiaryFilter || {}
  )
  const seniorityFilter = useAppSelector(
    (store) => store.documentSelector.seniorityFilter || {}
  )

  const templateSelection = Object.keys(templateFilter)
  const locationSelection = Object.keys(locationFilter)
  const subsidiarySelection = Object.keys(subsidiaryFilter)
  const senioritySelection = Object.keys(seniorityFilter)

  const templateOptions = templates.map(({ id, name }) => ({
    value: id,
    label: name,
  }))
  const locationOptions = locations.map(({ id, name }) => ({
    value: id,
    label: name,
  }))
  const subsidiaryOptions = subsidiaries.map(({ id, name }) => ({
    value: id,
    label: name,
  }))
  const seniorityOptions = seniorities.map(({ id, name }) => ({
    value: id,
    label: name,
  }))

  const dispatch = useAppDispatch()

  const hasFilter = [
    templateFilter,
    locationFilter,
    subsidiaryFilter,
    seniorityFilter,
  ].some((filter) => Object.keys(filter).length > 0)

  return (
    <Stack>
      <Text fw='500'>Available Documents</Text>
      <DocumentSelectorSearchFilter />
      <Text fz='sm' fw='500'>
        Filter By:
      </Text>
      <Grid>
        <Grid.Col span={6}>
          <FormMultiSelect
            label='Job Templates'
            values={templateSelection}
            data={templateOptions}
            onChange={(values) => {
              dispatch(
                actionSetFilter({
                  type: 'templateFilter',
                  values: values,
                })
              )
            }}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <FormMultiSelect
            label='Locations'
            values={locationSelection}
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
        </Grid.Col>
        <Grid.Col span={6}>
          <FormMultiSelect
            label='Subsidiary'
            values={subsidiarySelection}
            data={subsidiaryOptions}
            onChange={(values) => {
              dispatch(
                actionSetFilter({
                  type: 'subsidiaryFilter',
                  values: values,
                })
              )
            }}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <FormMultiSelect
            label='Seniority'
            values={senioritySelection}
            data={seniorityOptions}
            onChange={(values) => {
              dispatch(
                actionSetFilter({
                  type: 'seniorityFilter',
                  values: values,
                })
              )
            }}
          />
        </Grid.Col>
      </Grid>
      {hasFilter ? (
        <Group
          wrap='wrap'
          p='8px'
          gap='8px'
          className='rounded'
          style={{
            border: '2px solid whitesmoke',
          }}
        >
          {templateOptions.map(({ value, label }) => (
            <DocumentSelectorFilterTag
              key={value}
              type='templateFilter'
              hidden={Boolean(
                !Object.keys(templateFilter).length || !templateFilter[value]
              )}
              value={value}
              values={templateSelection}
              label={label}
            />
          ))}
          {locationOptions.map(({ value, label }) => (
            <DocumentSelectorFilterTag
              key={value}
              type='locationFilter'
              hidden={Boolean(
                !Object.keys(locationFilter).length || !locationFilter[value]
              )}
              value={value}
              values={locationSelection}
              label={label}
            />
          ))}
          {subsidiaryOptions.map(({ value, label }) => (
            <DocumentSelectorFilterTag
              key={value}
              type='subsidiaryFilter'
              hidden={Boolean(
                !Object.keys(subsidiaryFilter).length ||
                  !subsidiaryFilter[value]
              )}
              value={value}
              values={subsidiarySelection}
              label={label}
            />
          ))}
          {seniorityOptions.map(({ value, label }) => (
            <DocumentSelectorFilterTag
              key={value}
              type='seniorityFilter'
              hidden={Boolean(
                !Object.keys(seniorityFilter).length || !seniorityFilter[value]
              )}
              value={value}
              values={senioritySelection}
              label={label}
            />
          ))}
        </Group>
      ) : null}
    </Stack>
  )
}
