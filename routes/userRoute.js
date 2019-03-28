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
    let input = req.session.user.id
    model.User.findByPk(input)
    .then ((profileData)=>{
        // res.send(data)
        model.User.findAll({
            include: [{model: model.User, as: "Teman"}]
        })
        .then(friendList=>{
            // res.send({profileData,friendList})
            res.render('profile',{profileData,friendList})
        })
    })

})
route.get('/profile/acc/:id/:idFriend',(req,res)=>{
    let id = req.params.id
    let idFriend = req.params.idFriend
    let user, friend
    model.User.findByPk(id)
        .then(data => {
            user = data 
            return model.User.findByPk(idFriend)
        })
        .then(data => {
            friend = data
            return user.addTeman(friend, {through: {status: 1}})
        })
        .then(() => {
            return friend.addTeman(user, {through: {status: 1}})
        })
        .then(() => {
            res.send('ok')
        })
})
route.get('/profile/reject/:id/:idFriend',(req,res)=>{
    let id = req.params.id
    let idFriend = req.params.idFriend
    let user, friend
    model.User.findByPk(id)
            .then(data => {
                user = data 
                return model.User.findByPk(idFriend)
            })
            .then(data => {
                friend = data
                return user.removeTeman(friend)
            })
            .then(()=>{
                return friend.removeTeman(user)
            })
            .then(()=>{
                res.send('okelah')
            })
})

module.exports = route