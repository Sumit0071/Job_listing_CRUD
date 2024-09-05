import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const protect = async ( req, res, next ) => {
    let token;
    if ( req.headers.authorization && req.headers.authorization.startsWith( 'Bearer' ) ) {
        try {
            token = req.headers.authorization.split( ' ' )[1];
            const decoded = jwt.verify( token, process.env.JWT_SECRET );

            // Find user by custom 'id' field
            req.user = await User.findOne( { id: decoded.id } ).select( '-password' );
            console.log( req.user )
            // Ensure the user was found
            if ( !req.user ) {
                return res.status( 404 ).json( { message: 'User not found' } );
            }

            next();
        } catch ( error ) {
            res.status( 401 ).json( { message: 'Not authorized, token failed' } );
        }
    } else {
        res.status( 401 ).json( { message: 'Not authorized, no token' } );
    }
};
