import jwt from "jsonwebtoken";

const createToken = (id) =>
  jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "1h" });

export default createToken;
