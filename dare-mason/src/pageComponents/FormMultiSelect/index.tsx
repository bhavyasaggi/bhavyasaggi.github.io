import React, { useState } from 'react'
import {
  Button,
  Combobox,
  ScrollArea,
  Text,
  TextInput,
  useCombobox,
} from '@mantine/core'
import { IconChevronDown, IconSearch } from '@tabler/icons-react'

export interface FormMultiSelectProps {
  label: string
  values: Array<string>
  data: Array<{ value: string; label: string }>
  onChange: (value: string[]) => void
}

export default function FormMultiSelect({
  label,
  values,
  data,
  onChange,
}: FormMultiSelectProps) {
  const [search, setSearch] = useState('')

  const combobox = useCombobox({})

  const mergedData: Array<{ value: string; label: string; selected: boolean }> =
    []
  for (let dataIdx = 0, valueIdx = 0; dataIdx < data.length; dataIdx++) {
    const { value, label } = data[dataIdx]
    if (value === values[valueIdx]) {
      mergedData.push({ value, label, selected: true })
      valueIdx++
    } else {
      mergedData.push({ value, label, selected: false })
    }
  }

  const isActive = values.length > 0

  return (
    <Combobox
      store={combobox}
      size='sm'
      shadow='sm'
      offset={4}
      width='300px'
      onOptionSubmit={(option) => {
        if (values.includes(option)) {
          onChange(values.filter((v) => v !== option))
        } else {
          onChange(values.concat(option))
        }
      }}
    >
      <Combobox.Target>
        <Button
          variant='outline'
          color='gray'
          size='xs'
          rightSection={<IconChevronDown size='1rem' />}
          onClick={() => {
            combobox.toggleDropdown()
          }}
          w='100%'
        >
          <Text fz='sm' c='dark'>
            {label}
          </Text>
        </Button>
      </Combobox.Target>
      <Combobox.Dropdown>
        <TextInput
          leftSection={<IconSearch color='black' size='1rem' />}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
          }}
        />
        <Combobox.Options>
          <ScrollArea.Autosize
            offsetScrollbars
            scrollbars='y'
            type='always'
            h={100}
          >
            {mergedData.map(({ value, label, selected }) =>
              !search || label.includes(search) ? (
                <Combobox.Option
                  key={value}
                  value={value}
                  mt='2px'
                  mb='2px'
                  c={selected ? 'white' : undefined}
                  bg={selected ? 'dark' : undefined}
                  className='rounded-sm hover'
                >
                  {label}
                </Combobox.Option>
              ) : null
            )}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}
