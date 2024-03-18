import { Document, Model, Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import { IUser } from '../interfaces/user.interface'

interface IUserModel extends IUser, Document {}

const userSchema = new Schema<IUserModel>({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please tell us your email'],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'doctor', 'pharmacist'],
    default: 'user',
  },
  message: {
    type: String,
  },
  userStatus: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
})

// Middleware to hash the password before saving
userSchema.pre<IUserModel>('save', async function (next) {
  if (!this.isModified('password')) return next()

  try {
    const hashedPassword = await bcrypt.hash(this.password, 10)
    this.password = hashedPassword
    next()
  } catch (error) {
    next(error as undefined)
  }
})

const UserModel: Model<IUserModel> = model<IUserModel>('User', userSchema)

export default UserModel
