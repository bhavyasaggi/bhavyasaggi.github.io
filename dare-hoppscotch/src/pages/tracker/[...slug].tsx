import Head from 'next/head'
import { useRouter } from 'next/router'

import BeeLine from '@/components/BeeLine'

import beeLineGroups from '@/constants/beeLineGroups.json'

export default function TrackerDashboardGrouped() {
  const router = useRouter()
  const { slug } = router.query
  const slugArray = Array.isArray(slug) ? slug : [slug]
  const groupBy = slugArray[1] || slugArray[0]

  const { id, displayName, values } =
    beeLineGroups.find(({ id: blgId }) => blgId === groupBy) || {}

  if (!id) {
    return <div>Invalid Section!</div>
  }

  return (
    <>
      <Head>
        <title>Tracker Dashboard: {displayName}</title>
      </Head>
      <BeeLine title={`Dashboard: ${displayName}`} sections={values} />
    </>
  )
}
