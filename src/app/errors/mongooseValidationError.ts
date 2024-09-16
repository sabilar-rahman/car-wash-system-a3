import mongoose from 'mongoose'
// import { TErrorMessages } from '../interface/error.interface'
import { TErrorSources } from '../interface/error'

const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const statusCode = 400
  const message = 'Validation Error'
  const errorSources: TErrorSources = Object.values(err?.errors).map(val => {
    return {
      path: val?.path,
      message: val?.message,
    }
  })
  return {
    statusCode,
    message,
    errorSources,
  }
}

export default handleValidationError