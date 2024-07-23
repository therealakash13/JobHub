import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "User Not Authorized", success: false });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid Token", success: false });
    }
    req.id = decoded.id;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};

export default isAuthenticated;
