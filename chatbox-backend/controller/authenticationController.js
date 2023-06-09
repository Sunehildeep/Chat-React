const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const query = require("../config/db");

const generateToken = (userId) => {
    // Create a payload containing the user ID
    const payload = { userId };
  
    // Generate the JWT with the payload and a secret key
    const token = jwt.sign(payload, 'your-secret-key', { expiresIn: '1h' });
  
    return token;
  };

exports.register = async (req, res, next) => {
  try {
    // Retrieve the user's name, avatar, email, and password from the request body
    const { name, email, password } = req.body;

    // Check if the user already exists in the database by email
    const existingUser = await query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (existingUser.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user record into the users table
    const insertQuery =
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    await query(insertQuery, [name, email, hashedPassword]);

    // Generate a JWT token for the newly registered user
    const token = generateToken(email); // Replace with your logic for generating a token

    const user = await query("SELECT * FROM users WHERE email = ?", [email]);

    // transform the user object
    const transformedUser = {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
        token,
    };

    // Return with name, email, and token to the client
    res.status(200).json(transformedUser);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

exports.login = async (req, res, next) => {
  try {
    // Retrieve the user's email and password from the request body
    const { email, password } = req.body;

    // Check if the user exists in the database
    const user = await query("SELECT * FROM users WHERE email = ?", [email]);
    if (user.length === 0) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user[0].password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign(
      { userId: user[0].id, email: user[0].email },
      "your-secret-key", // Replace with your own secret key for signing the token
      { expiresIn: "1h" } // Set the token expiration time as per your requirement
    );

    // Return with name, email, and token to the client
    res.status(200).json({
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
        token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
