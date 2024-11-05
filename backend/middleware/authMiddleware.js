module.exports = function (req, res, next) {
  //console.log("from middleware");
  // Check if the session exists and if the user is authenticated
  if (req.session && req.session.user) {
    // If the user is authenticated, attach user info to the request object
    req.user = req.session.user;
    return next();
  }
  
  // If the session does not exist or the user is not authenticated
  return res.status(401).json({ msg: 'Unauthorized: No active session' });
};
