const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const config = require('./config/db') //путь к инфе о ссылке к БД
const account = require('./routes/account')

const app = express();

const port = 3000;

app.use(passport.initialize())

app.use(passport.session())

require('./config/passport')(passport);

app.use(cors());

app.use(bodyParser.json());

app.use('/account', account)

mongoose.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true}) //подключаемся к БД

mongoose.connection.on('connected', () => {
    console.log('Успешный коннект к БД')
})

mongoose.connection.on('error', er => {
    console.log('Ошибка подключения к бд', er)
})

app.get('/', (req, res) => {
    res.send("Главная страница ")
});


app.listen(port, () => {
    console.log("Сервер работает на порту: " + port)
});
