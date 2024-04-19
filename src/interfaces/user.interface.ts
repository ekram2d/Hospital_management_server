interface IUser {
  name: string
  email: string
  password: string
  role?: 'patient' | 'admin' | 'user' | 'param' | 'pharmacist'
  message?: string
  userStatus: 'active' | 'inactive'
}

export { IUser }
