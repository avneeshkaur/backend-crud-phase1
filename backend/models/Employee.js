import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  department: { type: String }
}, { timestamps: true });

export default mongoose.model("Employee", employeeSchema);