const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const port = 3000;


// gunakan ejs


app.set('view engine', 'ejs');

// third party moddleware
app.use(expressLayouts);
app.use(morgan('dev'));

// built-in middleware
app.use(express.static('public'));

// application level middleware
app.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
})

app.use((req, res, next) => {
    console.log('ini midleware kedua');
    next();
})

app.get('/', (req, res) => {
   
    // res.sendFile('./index.html', { root: __dirname });
    const mahasiswa = [
        {
            nama: 'jawoto',
            email: 'tri@gmail.com'

        },
        {
            nama: 'tri',
            email: 'jawoto@gmail.com'

        },

    ];
    res.render('index', 
    {nama: 'Jaawot',
    layout: 'layouts/main-layout', 
    title: 'halaman jawoto',
    mahasiswa,
    });
});
app.get('/about', (req, res) => {
    
    // res.sendFile('./about.html', { root: __dirname });
    res.render('about', {
        layout: 'layouts/main-layout',
        title: 'Halaman About',
    });
    
});
app.get('/contact', (req, res) => {
   
    // res.sendFile('./contact.html', { root: __dirname });
    res.render('contact', {
        layout: 'layouts/main-layout',
        title: 'Halaman Contact',
    });
});

app.get('/product/:id', (req, res) => {
    res.send(`Product ID :   ${req.params.id} <br> Category ID : ${req.query.category}`);
})

app.use((req, res) => {
    res.status(404);
    res.send('<h1>404</h1>');
});

app.listen(port, () => {
    console.log(`Example app lsitening at http://localhost:${port}`);
});







