const routes = require('express').Router()
const model = require('../models')
const bcrypt = require('bcryptjs')
routes.get('/',(req,res)=>{
    res.render('register/index')
})

routes.post('/',(req,res)=>{
    let input = req.body
    model.User.create(  )
})

module.exports = routes