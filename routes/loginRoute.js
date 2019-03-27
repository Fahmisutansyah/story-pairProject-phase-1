const route = require('express').Router()
const model = require('../models')

route.get('/', function(req,res){
    res.render('login')
})

route.post('/', function(req,res){
    let list = req.body
    model.User.findOne({where:{username: list.username}})
    .then(data=>{
        if(data.password === list.password){
            res.send(`berhasil login`)
        }else{
            res.redirect('/login')
        }
    })
    .catch(data=>{
        res.redirect('/login')
    })
})


module.exports = route