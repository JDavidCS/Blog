const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { render } = require('ejs');

// express function
const app = express();

// connect to mongoDB
const dbURI = ``;
mongoose.connect(dbURI)
    .then(res => app.listen(3000))
    .catch(err => console.log(err));


// register view engine
app.set('view engine', 'ejs');

// listen for requests
console.log('http://localhost:3000');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About Us'});
});

// blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then( result => {
            res.render('index', { title: 'All Blogs', blogs: result })
        })
        .catch( err => console.log(err))
});

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then( result => {
            res.redirect('/blogs');
        })
        .catch( err => {
            console.log(err);
        })
});

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'New Blog'});
});

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then( result => {
            res.render('details', { blog: result, title: 'Blog Details'})
        })
        .catch( err => console.log(err))
});

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then( result => {
            res.json({ redirect: '/blogs'})
        })
        .catch( err => console.log(err))
});

// redirects
app.get('/about-us', (req, res) => {
    res.redirect('about');
});

// 404 page
app.use((req, res) =>{
    res.status(404).render('404', {title: "404 error"});
});