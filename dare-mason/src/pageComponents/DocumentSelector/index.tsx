import { Card, Group, Stack } from '@mantine/core'

import DocumentSelectorFilter from '@/pageComponents/DocumentSelectorFilter'
import DocumentSelectorFromList from '@/pageComponents/DocumentSelectorFromList'
import DocumentSelectorToList from '@/pageComponents/DocumentSelectorToList'

import documents from '@/constants/documents.json'

import styles from './styles.module.scss'

export default function DocumentSelector() {
  return (
    <Group align='normal'>
      <Card p='lg' className={styles.cardWrapper}>
        <Stack>
          <DocumentSelectorFilter
            templates={documents.templates}
            locations={documents.locations}
            subsidiaries={documents.subsidiaries}
            seniorities={documents.seniorities}
          />
          <DocumentSelectorFromList templates={documents.templates} />
        </Stack>
      </Card>
      <Card p='lg' className={styles.cardWrapper}>
        <DocumentSelectorToList templates={documents.templates} />
      </Card>
    </Group>
  )
}
