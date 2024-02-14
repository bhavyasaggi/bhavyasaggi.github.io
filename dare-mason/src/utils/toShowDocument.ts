import type { DSDocumentType } from '@/types/DocumentSelector'

export default function toShowDocument(
  { id, name, template, location, subsidiary, seniority }: DSDocumentType,
  {
    searchFilter,
    templateFilter,
    locationFilter,
    subsidiaryFilter,
    seniorityFilter,
  }: {
    searchFilter: string | undefined
    templateFilter: Record<string, boolean | undefined>
    locationFilter: Record<string, boolean | undefined>
    subsidiaryFilter: Record<string, boolean | undefined>
    seniorityFilter: Record<string, boolean | undefined>
  }
) {
  const doSearchFilter = !searchFilter || String(name).includes(searchFilter!)
  const doTemplateFilter =
    !template ||
    !templateFilter ||
    !Object.keys(templateFilter).length ||
    templateFilter[template] === true
  const doLocationFilter =
    !location ||
    !locationFilter ||
    !Object.keys(locationFilter).length ||
    locationFilter[location] === true
  const doSubsidiaryFilter =
    !subsidiary ||
    !subsidiaryFilter ||
    !Object.keys(subsidiaryFilter).length ||
    subsidiaryFilter[subsidiary] === true
  const doSeniorityFilter =
    !seniority ||
    !seniorityFilter ||
    !Object.keys(seniorityFilter).length ||
    seniorityFilter[seniority] === true

  return (
    doSearchFilter &&
    doTemplateFilter &&
    doLocationFilter &&
    doSubsidiaryFilter &&
    doSeniorityFilter
  )
}
