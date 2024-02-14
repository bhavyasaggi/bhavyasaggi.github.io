import { Card, Group } from '@mantine/core'

import DocumentSelectorFilter from '@/pageComponents/DocumentSelectorFilter'
import DocumentSelectorFromList from '@/pageComponents/DocumentSelectorFromList'
import DocumentSelectorToList from '@/pageComponents/DocumentSelectorToList'

import documents from '@/constants/documents.json'

export default function DocumentSelector() {
  return (
    <Group>
      <Card>
        <DocumentSelectorFilter
          templates={documents.templates}
          locations={documents.locations}
          subsidiaries={documents.subsidiaries}
          seniorities={documents.seniorities}
        />
        <DocumentSelectorFromList templates={documents.templates} />
      </Card>
      <Card>
        <DocumentSelectorToList templates={documents.templates} />
      </Card>
    </Group>
  )
}
