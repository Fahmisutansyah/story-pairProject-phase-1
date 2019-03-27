const route = require('express').Router()
const model = require('../models')
const bcrypt = require('bcryptjs')


route.get('/', function(req,res){
    res.render('login')
})

route.post('/', function(req,res){
    let list = req.body
    model.User.findOne({where:{username: list.username}})
    .then(data=>{
       let check = bcrypt.compareSync(list.password, data.password)
       if (check){
           req.session.user = {
               id: data.id,
               username: data.username
           }
           res.send(req.session)
       }else{
           res.send(`salah pasword`)
       }
    })
    .catch(data=>{
        res.redirect('/login')
    })
})


module.exports = route