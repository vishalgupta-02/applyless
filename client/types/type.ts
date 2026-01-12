export interface jobCardTypes {
  _id?: string
  company: string
  title: string
  location: string
  currentStatus: string
  createdAt: string
  updatedAt: string
  notes: string
  salary: number
  jobUrl: string
  description: string
}

export interface formDataTypes {
  company: string
  title: string
  currentStatus: string
  description: string
  jobUrl: string
  location: string
  notes: string
  salary: string
}
