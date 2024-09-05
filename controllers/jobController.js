import Job from '../models/job.js';
import User from '../models/user.js';

export const getJobs = async ( req, res ) => {
  try {
    const jobs = await Job.find().populate( 'usersApplied', 'name' );
    res.json( jobs );
  } catch ( error ) {
    res.status( 500 ).json( { message: error.message } );
  }
};

export const applyForJob = async ( req, res ) => {
  try {
    const job = await Job.findById( req.params.id );
    const user = await User.findById( req.body.userId );

    if ( job && user ) {
      job.usersApplied.push( user._id );
      await job.save();
      res.json( { message: 'User applied for the job', job } );
    } else {
      res.status( 404 ).json( { message: 'Job or User not found' } );
    }
  } catch ( error ) {
    res.status( 500 ).json( { message: error.message } );
  }
};

// Create a new job
export const createJob = async ( req, res ) => {
  const { link, title } = req.body;

  if ( !link || !title ) {
    return res.status( 400 ).json( { message: 'Job link and title are required' } );
  }

  try {
    const job = new Job( { link, title } );
    const createdJob = await job.save();
    res.status( 201 ).json( { message: 'Job created successfully', job: createdJob } );
  } catch ( error ) {
    res.status( 500 ).json( { message: error.message } );
  }
};