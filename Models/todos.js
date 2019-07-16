import mongoose, { Schema } from "mongoose";

const schema = new Schema({
  id: String,
  createdAt: Date,
  description: String,
  completed: Boolean,
  priority: Number
});

export default mongoose.model("todos", schema);
