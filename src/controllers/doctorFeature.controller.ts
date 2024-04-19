/* eslint-disable @typescript-eslint/no-explicit-any */
// doctorFeature.controller.ts

import { Request, Response } from 'express'
import { DoctorFeature } from '../models/doctorFeature.model'

// Import the DoctorFeature model

// Controller method to create a new doctor feature
const createDoctorFeature = async (req: Request, res: Response) => {
  try {
    const doctorFeatureData = req.body
    console.log(doctorFeatureData)
    // Check if a doctor feature with the same name already exists
    const existingFeature = await DoctorFeature.findOne({
      doctor_id: doctorFeatureData.doctor_id,
    })

    if (existingFeature) {
      return res.status(400).json({
        status: 'fail',
        message: 'Doctor feature with the same doctor already exists',
      })
    }

    // If no existing feature found, create the new one
    const result = await DoctorFeature.create(doctorFeatureData)

    res.status(201).json({
      status: 'success',
      message: 'Doctor feature created successfully',
      data: result,
    })
  } catch (error: any) {
    console.error('Error creating doctor feature:', error)
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    })
  }
}

// Controller method to get all doctor features
const getAllDoctorFeatures = async (req: Request, res: Response) => {
  try {
    const doctor = await DoctorFeature.find({}).select(
      '-patientsActive -patientsInactive',
    )

    res.status(200).json({
      status: 'success',
      message: 'Doctor features fetched successfully',
      data: doctor,
    })
  } catch (error: any) {
    console.error('Error fetching doctor features:', error)
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    })
  }
}

// Controller method to get a single doctor feature by ID
const getSingleDoctorFeature = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const doctorFeature = await DoctorFeature.findOne({
      doctor_id: id,
    }).populate('patientsActive')
    if (!doctorFeature) {
      return res.status(404).json({
        status: 'fail',
        message: 'Doctor feature not found',
      })
    }
    res.status(200).json({
      status: 'success',
      message: 'Doctor feature fetched successfully',
      data: doctorFeature,
    })
  } catch (error: any) {
    console.error('Error fetching doctor feature:', error)
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    })
  }
}

// Controller method to update a doctor feature by ID
const updateDoctorFeature = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const doctorFeatureData = req.body
    const updatedDoctorFeature = await DoctorFeature.findByIdAndUpdate(
      id,
      doctorFeatureData,
      {
        new: true,
        runValidators: true,
      },
    )
    if (!updatedDoctorFeature) {
      return res.status(404).json({
        status: 'fail',
        message: 'Doctor feature not found',
      })
    }
    res.status(200).json({
      status: 'success',
      message: 'Doctor feature updated successfully',
      data: updatedDoctorFeature,
    })
  } catch (error: any) {
    console.error('Error updating doctor feature:', error)
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    })
  }
}

// Controller method to delete a doctor feature by ID
const deleteDoctorFeature = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const deletedDoctorFeature = await DoctorFeature.findByIdAndDelete(id)
    if (!deletedDoctorFeature) {
      return res.status(404).json({
        status: 'fail',
        message: 'Doctor feature not found',
      })
    }
    res.status(200).json({
      status: 'success',
      message: 'Doctor feature deleted successfully',
    })
  } catch (error: any) {
    console.error('Error deleting doctor feature:', error)
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    })
  }
}

export const doctorFeatureController = {
  createDoctorFeature,
  getAllDoctorFeatures,
  getSingleDoctorFeature,
  updateDoctorFeature,
  deleteDoctorFeature,
}
