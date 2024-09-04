
// set up server
const express = require('express');
const app = express();
const PORT = 3000;


// for the model data
const contactData = require('./models/contactData');
const servicesData = require('./models/servicesData');
const aboutData = require('./models/aboutData');
const homeData = require('./models/homeData');
const filteredservicesData = require('./models/filteredservicesData');

// middleware
app.use((req, res, next) => {
  console.log("middleware #1")
  next()
});

app.use((req, res, next) => {
  console.log("I'm middleware too")
  next()
});

// middleware to handle the request body
app.use(express.urlencoded({ extended: true }));

// view engine
const ejs = require("ejs");

// Telling our Express server the view engine that it'll be using and the type of files to associate
app.set('view engine', 'ejs')
// where to find the views
app.set('views', './views')
// where to find the static files
app.use(express.static("./styles"));



// route for base folder
app.get('/', (req, res) => {
  res.send("this is the base folder")
});

// creating routes for the other paths
app.get('/home', (req, res) => {
  res.render('home', { homeData });  // // rendering the data for this view
});
app.get('/contact', (req, res) => {
  res.render('contact', { contactData });  // rendering the data for this view
});

app.get('/about', (req, res) => {
  res.render('about', { aboutData });  // rendering the data for this view
});

app.get('/services', (req, res) => {
  res.render('services', { servicesData });  // rendering the data for this view
});

// adding a query option for the services
app.get('/filteredservicesdata', (req, res) => {
  const query = req.query;
  let filteredServices = filteredservicesData.serviceOptions;

  if (query.name) {
    filteredServices = filteredServices.filter((service) => service.name.toLowerCase().includes(query.name.toLowerCase()));
  }

  if (query.description) {
    filteredServices = filteredServices.filter((service) => service.description.toLowerCase().includes(query.description.toLowerCase()));
  }

  res.render('filteredservicesdata', { filteredservicesData, filteredServices });
});

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  // Save the data to your contactData model
  const contactFormData = require('./models/contactFormData');
  contactFormData.push({ name, email, message });
  res.send(`Thank you, ${name}! Your message has been sent. <a href="/contact">Click here</a> to return to the site.`);
});

// 404 Middleware
app.use((req, res) => {
  res.status(404).send("Resource Not Found");  // really basic error handling
});

// tell the server to listen for data requests
app.listen('3000', () => {
  console.log(`Server is now running on port ${PORT}`);
});