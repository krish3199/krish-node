const jwt = require("jsonwebtoken");

/**
 * Generate JWT token and optionally set cookie
 * @param {String} userId - MongoDB user _id
 * @param {Object} res - Express response object
 */
const generateToken = (userId, res) => {
  const token = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d"
    }
  );

  // 👉 Cookie set (for browser / Postman cookie support)
  if (res) {
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,        // production me true (https)
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
  }

  return token;
};

module.exports = generateToken;
