interface DSBaseType {
  id: string
  name: string
}

export interface DSDocumentType extends DSBaseType {
  template?: string
  location?: string
  subsidiary?: string
  seniority?: string
}

export interface DSTemplateType extends DSBaseType {
  documents: Array<DSDocumentType>
}

export interface DSLocationType extends DSBaseType {}

export interface DSSubsidiaryType extends DSBaseType {}

export interface DSSeniorityType extends DSBaseType {}
