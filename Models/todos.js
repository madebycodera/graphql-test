import mongoose, { Schema } from 'mongoose'

const todoSchema = new Schema({
  description: { type: String, required: true },
  completed: Boolean,
  priority: Number
}, {
  timestamps: true
})

export default mongoose.model('Todos', todoSchema)
