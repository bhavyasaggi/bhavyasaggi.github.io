import DocumentSelector from '@/pageComponents/DocumentSelector'
import { Box, Stack, Text } from '@mantine/core'

export default function Home() {
  return (
    <Stack p='xl' miw='100vw' mih='100vh' className='flex-center'>
      <Box>
        <Text>Select the agreements, notices & documents you want to sign</Text>
      </Box>
      <DocumentSelector />
    </Stack>
  )
}
