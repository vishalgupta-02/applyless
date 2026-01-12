import jwt from "jsonwebtoken";

const generateToken = async (id) => {
  try {
    const token = jwt.sign({ id }, process.env.JWT_SECRET);

    return token;
  } catch (error) {
    console.log("Error while generating token");
    return error || "Token Generation Failed";
  }
};

export { generateToken };
