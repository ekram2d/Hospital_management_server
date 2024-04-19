import { Schema, model } from 'mongoose'

const doctorFeatureSchema = new Schema({
  doctor_id: { type: String, required: true },
  name: { type: String, required: true },
  fee: { type: Number, required: true },
  duration: { type: Number, required: true },
  day: { type: String, required: true },
  durationTime: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  qualification: { type: String, required: true },
  recognition: { type: String, required: true },
  imgUrl: { type: String, required: true },
  active: { type: Boolean, default: true },
  patientsActive: [{ type: Schema.Types.ObjectId, ref: 'Patient' }],
  patientsInactive: [{ type: Schema.Types.ObjectId, ref: 'Patient' }],
})

const DoctorFeature = model('DoctorFeature', doctorFeatureSchema)

export { DoctorFeature }
