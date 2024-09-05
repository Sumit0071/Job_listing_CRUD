import User from '../models/user.js';
import bcrypt from "bcryptjs"
import dotenv from 'dotenv';

dotenv.config();
//get list of all users
export const getUsers = async ( req, res ) => {
  try {
    const users = await User.find().select( 'name id githubLink points' ).sort( { points: 1 } );
    res.json( users );
  } catch ( error ) {
    res.status( 500 ).json( { message: error.message } );
  }
};

//Increase the user points
export const likeUser = async ( req, res ) => {
  try {

    const user = await User.findOne( { id: req.params.id } );

    if ( user ) {
      user.points += 1;
      await user.save();
      res.json( { message: 'User liked', user } );
    } else {
      res.status( 404 ).json( { message: 'User not found' } );
    }
  } catch ( error ) {
    res.status( 500 ).json( { message: error.message } );
  }
};

// Create a new user
export const createUser = async ( req, res ) => {
  const { name, githubLink, password } = req.body;

  if ( !name || !githubLink || !password ) {
    return res.status( 400 ).json( { message: 'Name,password and GitHub link are required' } );
  }

  try {
    const salt = await bcrypt.genSalt( Number( process.env.SALT ) );
    const hashedPassword = await bcrypt.hash( password, salt );
    const user = new User( { name, githubLink, password: hashedPassword } );
    const createdUser = await user.save();
    res.status( 201 ).json( { message: 'User created successfully', user: createdUser } );
  } catch ( error ) {
    res.status( 500 ).json( { message: error.message } );
  }
};