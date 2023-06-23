const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const faker = require('@faker-js/faker').faker;
const nodemailer = require("nodemailer");
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/moscowriver');

const Route = new mongoose.model('route', mongoose.Schema({
  routeNumber: Number,
  shipName: String,
  delay: Number,
  shedule: [Date],
}));

const New = new mongoose.model('new', mongoose.Schema({
  header: String,
  content: String,
  date: String,
}));

const Ship = new mongoose.model('ship', mongoose.Schema({
  name: String,
  image: String,
}));

const Ticket = new mongoose.model('ticket', mongoose.Schema({
  username: String,
  email: String,
  type: String,
  price: Number,
}));

const transporter = nodemailer.createTransport({
  host: "smtp.mail.ru",
  port: 465,
  secure: true,
  auth: {
    user: 'redisk.sherstnev@mail.ru',
    pass: '5NS8drTLazurctHmkBvS'
  }
});

async function generateRoutesData() {
  const ships = await Ship.find();

  for (let i = 0; i < ships.length; i++) {
    const routeNumber = faker.string.numeric(4);
    const shipName = ships[i].name;
    const delay = faker.string.numeric(1);
    const shedule = [];
    for (let j = 0; j < 5; j++) {
      shedule.push(faker.date.between({from: Date.now(), to: Date.now() + 86400000}));
    }
    const route = {
      routeNumber: routeNumber,
      shipName: shipName,
      delay: delay,
      shedule: shedule,
    };
    console.log(route);
    await Route.create(route);
  }
};

// проверяет, есть ли маршруты с БД, если нет - генерирует с помощью faker

async function checkRoutesEmpty() {
  const routes = await Route.find();
  if (routes.length === 0) {
    generateRoutesData();
  }
};

checkRoutesEmpty();


app.get('/', (req, res) => {
  res.send('Moscow River Transport API');
});

app.get('/api/ships', async (req, res) => {
  const ships = await Ship.find();
  res.send(ships);
});

app.get('/api/news', async (req, res) => {
  const news = await New.find();
  res.send(news);
});

app.get('/api/shedule', async (req, res) => {
  if (req.query.shipName) {
    const route = await Route.findOne({shipName: req.query.shipName});
    res.send(route);
  } else {
    const routes = await Route.find();
    res.send(routes);
  };
});

app.post('/api/buyTicket', async (req, res) => {
  if (req.body) {
    const ticket = await Ticket.create(req.body);
    const info = await transporter.sendMail({
      from: '"MoscowRiverTransport" <redisk.sherstnev@mail.ru>',
      to: req.body.email,
      subject: "Ваш билет на речной транспорт.",
      text: `Здравствуйте, ${ticket.username}, вы купили билет на речной транпорт. Чтобы использовать его, введите этот код: ${ticket._id}.
      \n С уважением, команда фейкового сайта Москвоского Речного Транспорта.`,
    });

    console.log("Message sent: %s", info.messageId);
    res.send('ok');
  } else {
    res.send('error');
  };
});

app.listen(5000, () => {
  console.log('Server started at http://localhost:5000');
});