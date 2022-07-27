require('dotenv/config');
const express = require("express");
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: false }));

require('./config/db.config');
require('./config/hbs.config');

const { session, loadUser } = require('./config/session.config');
app.use(session);
app.use(loadUser);

app.use((req, res, next) => {
    res.locals.googleApiKey = process.env.GOOGLE_API_KEY;
    next();
})

const routes = require("./config/routes.config");
app.use("/", routes);

app.use((req, res, next) => {
    next(createError(404, 'Page not found'))
})

app.use((error, req, res, next) => {
    console.error(error);
    res.locals.hideHeader = true;
    const message = error.message;
    const metadata = app.get('env') === 'development' ? error : {};
    const status = error.status || 500;
    res.status(status).render('errors/error', { message, metadata })
})

const port = 3000;
app.listen(port, () => console.log(`Application listening at port ${port}`));