exports.middlewareGlobal = (req, res,  next) => {
    res.locals.errors = req.flash("errors")
    res.locals.success = req.flash("success")
    next()
}

exports.middlewareError = (err, req, res, next) => {
    if (err) {
        console.log(err)
        return res.render("404.ejs")
    }
}

exports.middlewareCsrf = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken()
    next()
}