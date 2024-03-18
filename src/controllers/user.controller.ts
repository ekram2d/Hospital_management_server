/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { userServices } from '../services/user.service'
import UserModel from '../models/user.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body

    // Check if the email already exists
    const existingUser = await UserModel.findOne({ email: userData.email })
    if (existingUser) {
      return res.status(400).json({
        status: 'fail',
        message: 'Email already exists',
      })
    }

    // Create the user if the email doesn't exist
    const result = await userServices.createUser(userData)
    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      data: result,
    })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    })
  }
}

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    // console.log(email)
    // Check if the user exists
    const user = await UserModel.findOne({ email })
    // console.log({ ji: 'kk' }, { user })
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'your_secret_key_here', {
      expiresIn: '1h',
    })

    // Send the JWT token along with user details in the response
    res.status(200).json({
      token,
      user: {
        name: user.name,
        role: user.role,
        email: user.email,
        id: user._id,
      },
    })
  } catch (error: any) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsers()
    res.status(200).json({
      status: 'success',
      message: 'User fetched successfully',
      data: result,
    })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    })
  }
}
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await userServices.getSingleUser(id)
    res.status(200).json({
      status: 'success',
      message: 'Single User fetched successfully',
      data: result,
    })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    })
  }
}
const updateUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body
    const id = req.params.id
    const result = await userServices.updateUser(id, userData)
    res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
      data: result,
    })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    })
  }
}
const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    await userServices.deleteUser(id)
    res.status(200).json({
      status: 'success',
      message: 'User deleted successfully',
    })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    })
  }
}

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  login,
}
