const route = require('express').Router()
const model = require('../models')
const Op = model.Sequelize.Op
const multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      cb(null,  Date.now() + '.jpg')
    }
  })
   
var upload = multer({ storage: storage })
route.get('/editProfile',(req,res)=>{
    res.render('editProfile')
})
route.post('/editProfile',upload.single('avatar'),(req,res)=>{
    // res.send(req.file)
    let pathFoto =  req.file.path
    let idUser = req.session.user.id
    // res.send(pathFoto)
    model.User.update(
        {imageProfile:pathFoto},{
         where : {
             id : idUser
         }   
        }
    )
    .then(()=>{
        res.redirect('/user/profile')
    })
})

route.get('/', function(req,res){
    let dataUser = null
    let photos = null
    model.User.findAll({
        include: [{model: model.User, as: 'Teman'},{model: model.Photo}],
        where:{id: req.session.user.id}
    })
    .then(data=>{
        // res.send(data)
        dataUser = data[0]
        return model.Photo.findAll({
            include: [{model: model.User}],
            order: [['id', 'DESC']]
        })
    })
    .then(data=>{
        photos = data
        return model.User.findAll({
            include:[{model: model.User, as: "Teman"}],
            where:{id: {[Op.ne]: req.session.user.id}}
        })
    })
    .then(data=>{
        res.render('userTimeline', {user: dataUser, photos: photos, notFriends: data})
        // res.send(data)
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