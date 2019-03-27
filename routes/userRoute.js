const route = require('express').Router()
const model = require('../models')

route.get('/profile',function(req,res){
    res.send('masuk')
})
module.exports = route