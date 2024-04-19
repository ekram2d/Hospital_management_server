import { Request, Response } from 'express'
import { Medicine, Patient } from '../models/patient.model'
import { IMedicine, Prescription } from '../interfaces/patient.interface'

// Controller method to create a new patient
const createPatient = async (req: Request, res: Response) => {
  console.log('yes')
  try {
    const patientData = req.body
    const doctorId = patientData.doctorId

    const pastPatient = await Patient.findOne({
      email: patientData.email,
      doctorId: doctorId,
      active: true,
    })

    if (
      pastPatient &&
      pastPatient.doctorId === req.body.doctorId &&
      pastPatient.email === req.body.email
    ) {
      return res
        .status(400)
        .json({ message: 'Patient already exists and is active' })
    } else {
      const newPatient = await Patient.create(patientData)

      return res.status(201).json({
        message: 'Patient created successfully',
        patientReport: newPatient,
      })
    }
  } catch (error) {
    console.error('Error creating patient:', error)
    return res.status(500).json({ error: 'Failed to create patient' })
  }
}

// Controller method to get all patients
const getPatientsByDoctor = async (req: Request, res: Response) => {
  const { doctorId } = req.params
  try {
    const patients = await Patient.find({
      doctorId: doctorId,
      active: true,
    })
    if (!patients || patients.length === 0) {
      return res
        .status(404)
        .json({ message: 'No patients found for this doctor' })
    }
    res.json(patients)
  } catch (error) {
    console.error('Error fetching patients:', error)
    res.status(500).json({ error: 'Failed to fetch patients' })
  }
}

// Controller method to get a single patient by ID
const getSinglePatient = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const patient = await Patient.findOne({
      _id: id,
      active: true,
    })
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' })
    }
    res.json(patient)
  } catch (error) {
    console.error('Error fetching patient:', error)
    res.status(500).json({ error: 'Failed to fetch patient' })
  }
}

// Prescription model assuming Mongoose

// Controller function
const filterAndGroupPrescriptions = async (req: Request, res: Response) => {
  const { email, doctorId } = req.query

  // Check if email is provided
  console.log(email, doctorId)

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }
  if (doctorId == undefined) {
    try {
      // Find all prescriptions for the given email and populate doctor details
      const prescriptions = await Patient.find({
        email: email,
      }).populate('doctorId')

      // Sort prescriptions by appointment_date
      prescriptions.sort((a, b) => {
        const dateA = new Date(a.appointment_date)
        const dateB = new Date(b.appointment_date)
        return dateA.getTime() - dateB.getTime()
      })

      res.json(prescriptions)
    } catch (error) {
      console.error('Error filtering and grouping prescriptions:', error)
      res
        .status(500)
        .json({ error: 'Failed to filter and group prescriptions' })
    }
  } else {
    try {
      // Find all prescriptions for the given email and populate doctor details
      const prescriptions = await Patient.find({
        email: email,
        doctorId: doctorId,
      }).populate('doctorId')

      // Sort prescriptions by appointment_date
      prescriptions.sort((a, b) => {
        const dateA = new Date(a.appointment_date)
        const dateB = new Date(b.appointment_date)
        return dateA.getTime() - dateB.getTime()
      })

      res.json(prescriptions)
    } catch (error) {
      console.error('Error filtering and grouping prescriptions:', error)
      res
        .status(500)
        .json({ error: 'Failed to filter and group prescriptions' })
    }
  }
}

// Sort prescriptions by appointment_date for each doctorId

const addPrescriptionsToPatient = async (req: Request, res: Response) => {
  try {
    // Validate input data
    const { email, doctorId, prescriptions } = req.body
    if (!email || !doctorId || !prescriptions) {
      return res.status(400).json({ message: 'Invalid request body' })
    }

    // Process prescriptions data
    const medicines = prescriptions.map((data: Prescription) => ({
      medicine_name: data?.medicine_name,
      price_per_unit: data?.price_per_unit,
      mg: data?.mg,
    }))
    //console.log(medicines)
    // Update or create medicines
    // console.log(medicines)
    await Promise.all(
      medicines.map(async (medicineData: IMedicine) => {
        let existingMedicine = await Medicine.findOne({
          medicine_name: medicineData.medicine_name,
          mg: medicineData.mg,
        })
        console.log(existingMedicine)
        if (!existingMedicine) {
          existingMedicine = new Medicine(medicineData)
        }
        await existingMedicine.save() // Await the save operation
      }),
    )

    // Check if the patient exists and the doctor ID matches
    const patient = await Patient.findOne({ email, doctorId, active: true })
    if (!patient) {
      return res.status(404).json({
        status: 'fail',
        message: 'Patient not found or doctor ID does not match',
      })
    }
    // Find existing prescriptions based on medicine_name and mg
    const existingPrescriptions = await Patient.findOne({
      email,
      doctorId,
      active: true,
    })
    if (existingPrescriptions?.prescriptions && prescriptions) {
      const existingPrescriptions_data = existingPrescriptions?.prescriptions
      const incomingPrescriptions = prescriptions
      for (let i = incomingPrescriptions.length - 1; i >= 0; i--) {
        let flag = 0
        for (let j = 0; j < existingPrescriptions_data!.length; j++) {
          if (
            (existingPrescriptions_data[j]?.medicine_name ==
              incomingPrescriptions[i]?.medicine_name &&
              existingPrescriptions_data[j]?.mg ==
                incomingPrescriptions[i]?.mg) ||
            (existingPrescriptions_data[j]?.mg == null &&
              incomingPrescriptions[i]?.mg == null)
          ) {
            flag = 1
            break
          }
        }
        if (flag == 1) {
          incomingPrescriptions.splice(i, 1)
        }
      }
      //console.log(incomingPrescriptions)

      //   // Add only unique prescriptions to the patient
      const result = await Patient.findOneAndUpdate(
        { email, doctorId, active: true },
        { $addToSet: { prescriptions: { $each: incomingPrescriptions } } },
        { new: true },
      )

      //const updatedPatient = await patient.save()

      // Send a success response
      return res.status(200).json({
        status: 'success',
        message: 'Prescriptions added to patient successfully',
        data: result,
      })
    }
  } catch (error) {
    console.error('Error adding prescriptions to patient:', error)
    return res.status(500).json({
      status: 'fail',
      message: 'Something went wrong',
    })
  }
}

// Controller method to update a patient by ID
const updatePatient = async (req: Request, res: Response) => {
  const { id } = req.params
  const { doctorId, active } = req.body // doctorId received from req.body

  try {
    const updatedPatient = await Patient.findOneAndUpdate(
      { _id: id, doctorId, active: true }, // Ensure patient is already active
      { active },
      { new: true },
    )

    if (!updatedPatient) {
      return res.status(404).json({
        message:
          'Patient not found for the provided ID, doctor ID, and active: true',
      })
    }

    res.json(updatedPatient)
  } catch (error) {
    console.error('Error updating patient role:', error)
    res.status(500).json({ error: 'Failed to update patient role' })
  }
}

// Controller method to delete a patient by ID
const deletePatient = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const deletedPatient = await Patient.findByIdAndDelete(id)
    if (!deletedPatient) {
      return res.status(404).json({ message: 'Patient not found' })
    }
    res.json({ message: 'Patient deleted successfully' })
  } catch (error) {
    console.error('Error deleting patient:', error)
    res.status(500).json({ error: 'Failed to delete patient' })
  }
}

export const patientController = {
  createPatient,
  getPatientsByDoctor,
  getSinglePatient,
  updatePatient,
  deletePatient,
  addPrescriptionsToPatient,
  filterAndGroupPrescriptions,
}
