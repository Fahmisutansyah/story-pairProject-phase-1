const routes = require('express').Router()
const model = require('../models')

routes.get('/',(req,res)=>{
    res.render('register/index')
})

routes.post('/',(req,res)=>{
    let input = req.body
    model.User.create(input)
    .then((user)=>{
        // res.send(user)
        res.redirect('/login')
    })
    .catch((err)=>{

        res.send(err.message)
    })
})

module.exports = routes