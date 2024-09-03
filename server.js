
// set up server
const express = require('express');
const app = express();
const PORT = 3000;


// for the model data
const contactData = require('./models/contact');
const servicesData = require('./models/services');
const aboutData = require('./models/about');
const homeData = require('./models/home');
const ejs = require("ejs");
app.use(express.static("./styles"));

// Telling our Express server the view engine that it'll be using
app.set('view engine', 'ejs')

  app.set('views', './views')

  // middleware
  app.use((req,res,next)=>{
    console.log("middleware #1")
    next()
  })

  app.use((req,res,next)=>{
    console.log("middleware #2")
    next()
  })

// route for base folder
app.get('/', (req, res) => {
    res.send("this is the base folder")
});

// creating routes for the other paths
app.get('/home', (req, res) => {
    res.render('home')
});
app.get('/contact', (req, res) => {
    res.render('contact')
});

app.get('/about', (req, res) => {
    res.render('about')
});

app.get('/services', (req, res) => {
    res.render('services')
});

// 404 Middleware
app.use((req, res, next) => {
    next(error(404, "Resource Not Found"));
  });

// tell the server to listen for data requests
app.listen ('3000', () => {
    console.log(`Server is now running on port ${PORT}`);
});