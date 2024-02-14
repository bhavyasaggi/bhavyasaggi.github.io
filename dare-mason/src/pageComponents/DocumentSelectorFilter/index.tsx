import { Box, Group, Text } from '@mantine/core'

import DocumentSelectorLocationFilter from './LocationFilter'
import DocumentSelectorTemplateFilter from './TemplateFilter'
import DocumentSelectorSubsidiaryFilter from './SubsidiaryFilter'
import DocumentSelectorSeniorityFilter from './SeniorityFilter'

import type {
  DSTemplateType,
  DSLocationType,
  DSSubsidiaryType,
  DSSeniorityType,
} from '@/types/DocumentSelector'
import DocumentSelectorSearchFilter from './SearchFilter'

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
  return (
    <Box>
      <Text>Available Documents</Text>
      <DocumentSelectorSearchFilter />
      <Text>Filter By:</Text>
      <Group>
        <DocumentSelectorTemplateFilter templates={templates} />
        <DocumentSelectorLocationFilter locations={locations} />
      </Group>
      <Group>
        <DocumentSelectorSubsidiaryFilter subsidiaries={subsidiaries} />
        <DocumentSelectorSeniorityFilter seniorities={seniorities} />
      </Group>
    </Box>
  )
}
