const route = require('express').Router()
const model = require('../models')

route.get('/', function(req,res){
    res.render('userTimeline')
})

route.get('/profile',function(req,res){
    res.send('masuk')
})
module.exports = route