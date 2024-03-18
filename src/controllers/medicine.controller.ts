import { Request, Response } from 'express'
import { Medicine } from '../models/patient.model'
// Import your Medicine model interface

export const medicineController = {
  async createMedicine(req: Request, res: Response) {
    try {
      const { medicine_name, price_per_unit, mg } = req.body

      // Check if a medicine with the same name and mg already exists
      const existingMedicine = await Medicine.findOne({ medicine_name, mg })

      if (existingMedicine) {
        return res.status(400).json({ message: 'Medicine already exists' })
      }

      // Create a new medicine instance
      const newMedicine = new Medicine({
        medicine_name,
        price_per_unit,
        mg,
      })

      // Save the new medicine to the database
      const savedMedicine = await newMedicine.save()

      res.status(201).json(savedMedicine) // Send the saved medicine as response
    } catch (error) {
      console.error('Error creating medicine:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  },
  async getAllMedicines(req: Request, res: Response) {
    try {
      const { name } = req.query // Assuming you pass the medicine name as a query parameter

      const regex = new RegExp(name as string, 'i')
      const medicines = await Medicine.find({ medicine_name: regex })
      // const medicines = await Medicine.find() // Find all medicines in the database
      //const medicines = 'e'
      if (!medicines.length) {
        return res.status(404).json({ message: 'No medicines found' })
      }

      res
        .status(200)
        .json({ message: 'Succesfully get the medicines', data: medicines }) // Send the list of medicines as response
    } catch (error) {
      console.error('Error fetching medicines:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  },

  async getMedicineById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const medicine = await Medicine.findById(id) // Find medicine by ID

      if (!medicine) {
        return res.status(404).json({ message: 'Medicine not found' })
      }

      res.status(200).json(medicine) // Send the medicine as response
    } catch (error) {
      console.error('Error fetching medicine by ID:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  },

  async updateMedicine(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { medicine_name, price_per_unit, mg } = req.body

      const updatedMedicine = await Medicine.findByIdAndUpdate(
        id,
        {
          medicine_name,
          price_per_unit,
          mg,
        },
        { new: true },
      ) // Update medicine by ID

      if (!updatedMedicine) {
        return res.status(404).json({ message: 'Medicine not found' })
      }

      res
        .status(200)
        .json({ message: 'successfully updated ', update: updatedMedicine }) // Send the updated medicine as response
    } catch (error) {
      console.error('Error updating medicine:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  },

  async deleteMedicine(req: Request, res: Response) {
    try {
      const { id } = req.params

      const deletedMedicine = await Medicine.findByIdAndDelete(id) // Delete medicine by ID

      if (!deletedMedicine) {
        return res.status(404).json({ message: 'Medicine not found' })
      }

      res.status(200).json({ message: 'Medicine deleted successfully' })
    } catch (error) {
      console.error('Error deleting medicine:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  },
}
