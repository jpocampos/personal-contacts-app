exports.home = (req, res) => {
    if(!req.session.user) return res.render("guestHomeView.ejs")
    res.render("homeView.ejs")
}