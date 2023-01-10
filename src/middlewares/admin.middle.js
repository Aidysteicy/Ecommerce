const isAdmin = (req, res, next) => {
    if (req.user.isAdmin === true) {
      return next();
    } else {
      res.redirect("/");
    }
  };

export default isAdmin