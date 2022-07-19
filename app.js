require('dotenv/config');
const express = require("express");
const hbs = require('hbs');
const path = require('path');

const app = express();


app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: false }));

require('./config/db.config');

const { session, loadUser } = require('./config/session.config');
app.use(session);
app.use(loadUser);

const routes = require("./config/routes.config");
app.use("/", routes);

app.use((req, res, next) => {
    next(createError(404, 'Page not found'))
})

app.use((error, req, res, next) => {
    console.error(error);
    const message = error.message;
    const metadata = app.get('env') === 'development' ? error : {};
    const status = error.status || 500;
    res.status(status).render('errors/error', { message, metadata })
})

const port = 3000;
app.listen(port, () => console.log(`Application listening at port ${port}`));