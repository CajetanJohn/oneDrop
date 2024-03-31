// middleware/checkSession.js
const checkSession = (req, res, next) => {
  if (req.session && req.session.user) {
    // Session exists, proceed with the next middleware or route handler
    res.locals.user = req.session.user; // Make user details available to subsequent middleware or route handlers
    next();
  } else {
    return res.status(401).send('Unauthorized bitch');
  }
};

module.exports = checkSession;
