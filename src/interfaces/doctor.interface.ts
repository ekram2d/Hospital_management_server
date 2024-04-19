interface IDoctorFeature {
  doctor_id: string
  name: string
  fee: number
  duration: number
  day: string
  durationTime: string
  category: string
  description: string
  qualification: string
  recognition: string
  imgUrl: string
  active?: boolean
  patientsActive?: string[] // Array of active patient IDs
  patientsInactive?: string[] // Array of inactive patient IDs
}

export { IDoctorFeature }
