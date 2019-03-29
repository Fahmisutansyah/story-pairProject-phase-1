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
    let pathFoto =  req.file.path.slice(6)
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
route.get('/uploadFoto',(req,res)=>{
    res.render('uploadFoto')
})
route.post('/uploadFoto',upload.single('contain'),(req,res)=>{
    let pathFoto = req.file.path.slice(6)
    let idUser = req.session.user.id
    // res.send({path,idUser})
    model.Photo.create({
        userId : idUser,
        path : pathFoto
    })
    .then(()=>{
        res.redirect('/')
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
route.get('/add/:friendId/:userId', function(req,res){
    model.Friend.create({
        userId: req.params.userId,
        friendId: req.params.friendId
    })
    .then(data =>{
        model.Friend.create({
            userId: req.params.friendId,
            friendId: req.params.userId
        })
    })
    .then(data =>{
        res.redirect('/user')
    })
    .catch((err)=>{
        res.send(err)
    })
})

route.get('/logout', function(req,res){
    req.session = null
    res.redirect('/')
})

route.get('/profile',function(req,res){
    let input = req.session.user.id
    let friendList 
    model.User.findByPk(input)
    .then ((profileData)=>{
        // res.send(data)
        model.User.findAll({
            include: [{model: model.User, as: "Teman"}]
        })
        .then(listDataFriend=>{
            // res.send({profileData,friendList})
            friendList = listDataFriend
            return model.Photo.findAll({
                where: {
                    userId : input 
                }
            })

        })
        .then(images=>{
            // res.send(images)
            res.render('profile',{images,user: profileData,profileData,friendList})
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