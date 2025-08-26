import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

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

export const authorizeRoles = (roles) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.id);

      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({ error: "Access denied. Admins only." });
      }

      next();
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error." });
    }
  };
};

export default authMiddleware;

export const formatDate = () => dayjs().format("YYYY-MM-DDTHH:mm:ssZ");
