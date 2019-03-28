const express = require('express')
const app = express()
const port = 8080
const bodyParser = require('body-parser')
const model = require('./models')
const session = require('express-session')
const auth = require('./middlewares/auth')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'gozali',
}))

app.set('view engine','ejs')

app.get('/', function (req,res){
    model.User.findAll({
        include: [{model: model.User, as: "user"}]
    })
    .then(data=>{
        res.send(req.session)
    })
})

app.use('/login', require('./routes/loginRoute') )

app.use('/user', auth,require('./routes/userRoute'))
app.use('/register',require('./routes/registerRoute'))


app.listen(8080, ()=>{
    console.log('server is running')
})