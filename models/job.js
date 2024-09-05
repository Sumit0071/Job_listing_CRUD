import mongoose from "mongoose";
const jobSchema = new mongoose.Schema( {
    date: { type: Date, deefault: Date.now },
    Link: { type: String, required: true },
    title: { type: String, required: true },
    usersApplied: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
} )
const Job = mongoose.model( 'Job', jobSchema );
export default Job