import jwt from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'

const client = jwksClient({
    jwksUri: `${process.env.CLERK_ISSUER}/.well-known/jwks.json`,
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
});

function getKey(header, callback) {
    client.getSigningKey(header.kid, (err, key) => {
        if(err) {
            return callback(err);
        }
        const signingKey = key.getPublicKey();
        callback(null, signingKey);
    });
}

// Middleware Funtion to verify | decode JWT Token to get ClerkId
const authUser = async (req, res, next) => {

    try {

        const  token  = req.headers.token || req.headers.authorization || req.headers.Authorization || null;

        if(typeof token === "string" && token.startsWith("Bearer ")) {
            token = token.slice(7).trim();
        }

        console.log("📥 Incoming token: ", token ? token.substring(0, 25) + "..." : "❌ missing" )

        if(!token) {
            return res.status(401).json({success: false, message: 'Not Authorised, Token Missing, Login Again'})
        }

        // const token_decode = jwt.decode(token)
        const token_decode = jwt.decode(token)
        console.log("🔎 Decoded (unsafe):", token_decode)

        jwt.verify(token, getKey, {algorithms: ["RS256"]}, (err, safe_decode) => {
            if(err) {
                console.error("❌ Verification failed:", err.message)
                req.body.clerkId = token_decode?.clerkId || token_decode?.sub;
                console.log("➡️ Using fallback clerkId:", req.body.clerkId);
                return next();
            }

            console.log("✅ Verified token:", safe_decode);
            req.body.clerkId = safe_decode.sub || safe_decode.clerkId;
            next();
        });

    } catch (error) {
        console.log("❌ authUser error:",error.message)
        res.status(500).json({success: false, message: error.message})
    }

}

export default authUser;