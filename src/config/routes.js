module.exports = app => {
    
    app.post('/signup',app.src.api.user.save)
    app.post('/signin',app.src.api.auth.signin)
    app.post('/validatetoken',app.src.api.auth.validateToken)

    app.route('/')
        .get(function (req, res) {
        res.send('Welcome to API Medclin');
    });

    app.route('/users')
        .all(app.src.config.passport.authenticate())
        .post(app.src.api.user.save)
        .get(app.src.api.user.get)

    app.route('/users/:id')
        .all(app.src.config.passport.authenticate())
        .put(app.src.api.user.save)
}