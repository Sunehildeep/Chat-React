exports.protectedRoute = (req, res, next) => {
    try {
      // Get the JWT token from the request headers
      const token = req.headers.authorization.split(' ')[1];
  
      // Verify the token
      const decodedToken = jwt.verify(token, JWT_SECRET_KEY);
  
      // Add the decoded token to the request object for further use
      req.userData = decodedToken;
  
      // Proceed to the next middleware or route handler
      next();
    } catch (err) {
      console.log(err);
      res.status(401).json({ error: 'Unauthorized' });
    }
  };
  