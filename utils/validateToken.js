import jwt from "jsonwebtoken";

const validateJwt = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const validate = jwt.verify(token, process.env.JWT_KEY);

    if (Date.now() > validate.expiresIn) {
      return res.status(401).json({ mensaje: "El token de accesso expiro" });
    }
    next();
  } catch (error) {
    res.status(401).json({ mensaje: '"Error token de acceso"' });
  }
};

export default validateJwt;
