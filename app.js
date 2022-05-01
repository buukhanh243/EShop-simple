const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const categoriesRoutes = require('./routes/categoriesRoutes');
const productsRoutes = require('./routes/productsRoutes');
const userRouter = require('./routes/usersRoutes');
const orderRouter = require('./routes/ordersRoutes');

const app = express();
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');
app.use(cors());
app.options('*', cors());

app.use(morgan('dev'));

app.use(express.json());
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

// app.use((err, req, res, next) => {
//   if (err) {
//     res.status(500).json({ message: err });
//   }
//});
app.use(errorHandler);
const api = process.env.API_URL;
// 3) ROUTES
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, userRouter);
app.use(`${api}/orders`, orderRouter);
// app.use('/api/v1/users', userRouter);

module.exports = app;
