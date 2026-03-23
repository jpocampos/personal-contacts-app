exports.home = (req, res) => {
    // CHECK LOGIN
    if(!req.session.user) return res.render("guestHomeView.ejs")
    res.render("homeView.ejs")
}