
export const protectRoute = (req, res, next) => {
    // Check if session exists and if user is logged in
    if (!req.session.user) {
      return res.status(401).json({ error: "Unauthorized access. Please log in." });
    }

    req.userId = req.session.user.id;
    
    // If user is authenticated, proceed to the next middleware/route
    next();
  };
  