const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');


// express function
const app = express();

// connect to mongoDB

const dbURI = 'mongodb+srv://Admin:DB2022@nodeproyect.mbfcxhb.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then(res => app.listen(3000))
    .catch(err => console.log(err));


// register view engine
app.set('view engine', 'ejs');

// listen for requests 


console.log('http://localhost:3000');

app.use(morgan('dev'));

app.use(express.static('public'))

app.get('/', (req, res) => {
    const blogs = [
        {title: 'Hello World this is a larger title than usually bla bla bla blav  ldfjvoakfvzx k añlksfjalkñ', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Second post', snippet: 'Lorem ipsum dolor sit amet consectetur, hues tesren eker adj rtskfvnñ dfjn ñen ñjfnv ñffn ñvn kjf sñfñasdfh jñaskjsf k'},
        {title: 'Title', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Does anyone read this?', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Does anyone read this?', snippet: 'Lorem ipsum dolor sit amet consectetur'}
    ]
    res.render('index', {title: 'Home', blogs});
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About Us'});
});

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'New Blog'});
});

// redirects

app.get('/about-us', (req, res) => {
    res.redirect('about');
});

// 404 page

app.use((req, res) =>{
    res.status(404).render('404', {title: "404 error"});
});