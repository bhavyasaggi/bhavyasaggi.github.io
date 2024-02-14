import { useAppDispatch } from '@/store/redux'
import { actionSetFilter } from '@/store/sliceDocumentSelector'
import { ActionIcon, Badge, Group, Text } from '@mantine/core'
import { IconX } from '@tabler/icons-react'

const getBadgeColor = (type: string) => {
  let color = '#264653'
  switch (type) {
    case 'templateFilter':
      color = '#2a9d8f'
      break
    case 'locationFilter':
      color = '#e9c46a'
      break
    case 'subsidiaryFilter':
      color = '#f4a261'
      break
    case 'seniorityFilter':
      color = '#e76f51'
      break
    default:
      break
  }
  return color
}

export default function DocumentSelectorFilterTag({
  type,
  hidden,
  values,
  value,
  label,
}: {
  type:
    | 'templateFilter'
    | 'locationFilter'
    | 'subsidiaryFilter'
    | 'seniorityFilter'
  hidden: boolean
  values: Array<string>
  value: string
  label: string
}) {
  const dispatch = useAppDispatch()
  if (hidden) {
    return null
  }

  const badgeColor = getBadgeColor(type)
  return (
    <Group
      py='2px'
      px='6px'
      className='rounded hover'
      style={{
        color: badgeColor,
        background: badgeColor + '33',
      }}
    >
      <Text size='sm'>{label}</Text>
      <ActionIcon
        size='xs'
        variant='subtle'
        color='gray'
        onClick={() => {
          dispatch(
            actionSetFilter({
              type,
              values: values.filter((v) => v !== value),
            })
          )
        }}
      >
        <IconX size='1rem' color={badgeColor} />
      </ActionIcon>
    </Group>
  )
}
