const route = require('express').Router()
const model = require('../models')

route.get('/', function(req,res){
    model.User.findAll({
        where:{id: req.session.user.id},
        include: [{model: model.User, as: 'user'}]
    })
    .then(data=>{
        // res.send(data)
        res.render('userTimeline', {user: data})
    })
})

route.get('/profile',function(req,res){
    res.send('masuk')
})
module.exports = route