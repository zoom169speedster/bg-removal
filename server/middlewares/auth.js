import jwt from 'jsonwebtoken'

// Middleware Funtion to decode JWT Token to get ClerkId
const authUser = async (req, res, next) => {

    try {

        const { token } = req.headers

        if(!token) {
            return res.json({success: false, message: 'Not Authorised Login Again'})
        }

        const token_decode = jwt.decode(token)
        req.body.clerkId = token_decode.clerkId
        next()

    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message})
    }

}

export default authUser;