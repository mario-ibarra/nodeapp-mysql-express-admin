import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import exphbs from 'express-handlebars'
import session from 'express-session';
import flash from 'connect-flash';
import multer from 'multer'
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config()
import pool from './config/db.js';


// import expressValidator from 'express-validator';

//routes import
import customersRoutes from './routes/customers.js'
import staffRoutes from './routes/staff.js'
import postRoutes  from  './routes/posts.js'
import userRoutes  from  './routes/users.js'
import authRoutes from  './routes/auth.js'

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${5000}`))

// Parsing middleware do not need bodyparser
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


//Routes to front-site

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/public/index.html')
});
// console.log(__dirname);

// Set storage
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img/avatars')
    },
    filename: (req, file, cb)=> {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
let upload = multer({ storage: storage })


app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file)
})
//Uploading multiple files
app.post('/uploadmultiple', upload.array('myFiles', 12), (req, res, next) => {
    const files = req.files
    if (!files) {
      const error = new Error('Please choose files')
      error.httpStatusCode = 400
      return next(error)
    }
   
      res.send(files)
  })

//Uploadphoto
app.post('/uploadphoto', upload.single('avatar'), (req, res ) => {
    let img = fs.readFileSync(req.file.path);
    let encode_image = img.toString('base64');

})

// app.post('/uploadphoto', upload.single('myImage'), (req, res, next) => {
//     const img = req.file
//     if (!file) {
//         const error = new Error('Please upload a file')
//         error.httpStatusCode = 400
//         return next(error)
//     }
//     res.send(file)
// })

// Set handlebaras Templating Engine
app.engine('hbs', exphbs({
    extname: '.hbs', 
    defaultLayout: 'main',
    layoutsDir: './views/layouts',
    partialsDir: './views/includes'
}));
app.set('view engine', 'hbs');

// Static Files
app.use(express.static( 'public'));

// Sessions
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000},
    resave: true,
    saveUninitialized: true
}))

//Flash
app.use(flash());


//Routes 
app.use('/', authRoutes);
app.use('/customers', customersRoutes);
app.use('/staff', staffRoutes);
//front routes
app.use('/posts', postRoutes);
app.use('/user', userRoutes);



