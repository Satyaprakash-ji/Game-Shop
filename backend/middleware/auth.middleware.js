import dayjs from "dayjs";
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if(!token){
    return res.status(401).json({error: "User not authorized."})
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET)
    if(!decode){
      return res.status(401).json({error: "Invalid token."})
    }

    req.id = decode.userId;

    next();

  } catch (error) {
    return res.status(500).json({ errors: ["Internal Server Error.", error] })
  }  
};

export default authMiddleware;

export const formatDate = () => dayjs().format("YYYY-MM-DDTHH:mm:ssZ");
