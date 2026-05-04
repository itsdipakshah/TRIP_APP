import jwt from "jsonwebtoken";

export const authorization = (req, res, next) => {
  const authHeader = req.headers.authorization;

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Token not provided.",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token or token not provided.",
    });
  }
};
