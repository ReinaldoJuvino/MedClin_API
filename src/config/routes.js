module.exports = app => {
    app.route('/')
        .get(function (req, res) {
        res.send('Welcome to API Medclin');
      });

    app.route('/users')
        .post(app.src.api.user.save)
        .get(app.src.api.user.get)

    app.route('/users/:id')
        .put(app.src.api.user.save)
}