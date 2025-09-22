import connectionRateLimite from "../config/upstash.js";

const rateLimiterFunction = async (req, res, next) => {
    try {
        
        const {success} = await connectionRateLimite.limit("my-ip");

        if (!success) {
            return res.status(429).json({message: "Too many requests, please try again later."});
        }

        next();

    } catch (error) {
        console.log("Rate Limiter Error: ", error);
        next(error);
    }
}

export default rateLimiterFunction;