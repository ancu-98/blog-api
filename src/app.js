const express = require('express');

const app = express();

//? Importamos base de datos
const db = require('./utils/database');

//? Importamos variable de entorno
const port = require('../config').api.port;

//? Importamos relaciones entre modelos
const initModels = require('./models/initModels');

//? Importamos rutas
const userRouter = require('./users/users.router');
const authRouter = require('./auth/auth.router');
const postRouter = require('./posts/posts.router')

//? Autenticamos conexión con base de datos
db.authenticate()
    .then(() => console.log('Database Autheticated Succesfully!'))
    .catch(err => console.log(err.message));

//? Sincronizamos nuestros modelos
db.sync()
    .then(() => console.log('Database Synced Succesfully!'))
    .catch(err => console.log(err.message));
initModels()

//? Habilitamos formato JSON
app.use(express.json())

//? probamos que nuestra raíz funcione
app.get('/', (req, res) => {
    res.status(200).json({message: 'OK!'})
});

//? Versionamos nuestra api / definimos la raíz
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/posts', postRouter);

app.listen(port, () => {
    console.log(`Server started at port ${port}`)
});

