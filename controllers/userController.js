import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Helper function to generate a JWT token
const generateToken = ( id ) => {
  return jwt.sign( { id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token expiry time
  } );
};

// Get list of all users
export const getUsers = async ( req, res ) => {
  try {
    const users = await User.find().select( 'name id githubLink points designation' ).sort( { points: 1 } );
    res.json( users );
  } catch ( error ) {
    res.status( 500 ).json( { message: error.message } );
  }
};

// Increase the user points
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

// Create a new user and return a JWT
export const createUser = async ( req, res ) => {
  const { name, githubLink, password, designation } = req.body;

  if ( !name || !githubLink || !password ) {
    return res.status( 400 ).json( { message: 'Name, password, and GitHub link are required' } );
  }

  try {
    //check if admin already exists
    if ( designation === 'admin' ) {
      const existingAdmin = await User.findOne( { designation: 'admin' } );
      if ( existingAdmin ) {
        return res.status( 403 ).json( { message: "Admin already exists. Cannot create another admin." } );
      }
    }
    // Check if a user with the same name already exists
    const existingUser = await User.findOne( { githubLink } );

    if ( existingUser ) {
      return res.status( 409 ).json( { message: 'User already exists' } );
    }

    const salt = await bcrypt.genSalt( Number( process.env.SALT ) );
    const hashedPassword = await bcrypt.hash( password, salt );

    const user = new User( {
      name,
      githubLink,
      password: hashedPassword,
      designation: designation || 'normal user',  // Use passed designation or fallback to default
    } );

    const createdUser = await user.save();

    // Generate token and return it along with user info
    res.status( 201 ).json( {
      message: 'User created successfully',
      user: {
        id: createdUser.id,
        name: createdUser.name,
        githubLink: createdUser.githubLink,
        points: createdUser.points,
        designation: createdUser.designation
      },
      token: generateToken( createdUser._id ),
    } );
  } catch ( error ) {
    res.status( 500 ).json( { message: error.message } );
  }
};

// Sign-in user
export const loginUser = async ( req, res ) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne( { name } );

    if ( user && ( await bcrypt.compare( password, user.password ) ) ) {
      // Generate token and return user info
      res.json( {
        message: 'Login successful',
        user: {
          id: user.id,
          name: user.name,
          githubLink: user.githubLink,
          points: user.points,
          designation: user.designation
        },
        token: generateToken( user.id ),
      } );
    } else {
      res.status( 401 ).json( { message: 'Invalid credentials' } );
    }
  } catch ( error ) {
    res.status( 500 ).json( { message: error.message } );
  }
};
