export interface IPatient {
  doctorId: string
  name: string
  email: string
  age: number
  gender: string
  contact: string
  appointment_date: string
  additional_notes?: string
  active?: boolean
  prescriptions?: Prescription[]
}

export interface Prescription {
  medicine_name: string
  price_per_unit?: number // Optional
  mg?: number
  dosage: string
  frequency: string
  duration: string
  notes?: string
  followUpMessage?: string // Optional follow-up message
}

export interface IMedicine {
  medicine_name: string
  price_per_unit?: number // Optional
  mg?: number // Optional
}
