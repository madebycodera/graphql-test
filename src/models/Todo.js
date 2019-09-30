import mongoose from 'mongoose';

export const Todo = mongoose.model('Todo', {
  description: String,
  completed: { type: Boolean, default: false },
  createdAt: { type: String, default: Date.now },
  priority: { type: Number, default: 1 }
});
