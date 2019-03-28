const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const model = require('./models')
const session = require('express-session')
const auth = require('./middlewares/auth')
const multer = require('multer')
const path = require('path')

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'gozali',
}))
app.use(express.static('public'))


app.get('/', function (req,res){
    res.render('home')
})
app.use(express.static('views'))
app.use('/login', require('./routes/loginRoute') )
app.use('/user', auth, require('./routes/userRoute'))
app.use('/register',require('./routes/registerRoute'))


app.listen(8080, ()=>{
    console.log('server is running at port 8080')
})