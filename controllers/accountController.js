const Models = require('../models/index')
const User = Models.User

class AccountController{
    static getRegister(req, res){
        res.render("./pages/register.ejs")
    }

    static postRegister(req, res){
        User.create({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            createdAt: new Date(),
            updatedAt: new Date()
        })
            .then(() => {
                res.redirect("/welcome-page")
            })
            .catch(err => {
                res.send(err)
            })
    }

    // static getLogin(req, res){
    //     res.render("login.ejs")
    // }

    static postLogin(req, res){
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then((user) => { // ini perlu cek email & pass
                res.redirect("/movies")
            })
            .catch(err => {
                res.send(err)
            })
    }

    /*
    outer.post('/login', (req, res) => {
  // disini ada proses pencarian di database apakah login valid atau tidak
	let valid = compare password sama passwordnya yg udah di hash db
  // jika login valid maka kita bisa membuat session user yang sedang login 
  // seperti dibawah
  if(valid) {
    req.session.user = {
      id : 1,
      name: 'hary'
    }
    res.redirect('/userpage/' + username)
  } else {
    // menampilkan pesan login gagal
    res.redirect('/home')
  }
})


router.post('/comment', (req, res) => {
	//disini kalian bisa masukin id user dari req.session
	Comment.create({
		content: req.body.content,
		UserId: req.session.user.id
	})
})

*/

    static getEdit(req, res){
        res.render("edit.ejs", {
            id: req.params.id
        })
    }

    static postEdit(req, res){
        User.findByPk(req.params.id)
            .then((user) => {
                // mau ganti password aja?
                // user.name = req.body.name
                // user.username = req.body.username
                // user.email = req.body.email
                user.password = req.body.password
                user.updatedAt = new Date()
                return user.save() // ini instance method
            })
            .then(() => {
                res.redirect("/movies")
            })
            .catch(err => {
                res.send(err)
            })
    }

    static deleteAccount(req, res){
        User.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(()=>{
                res.redirect('/home')
            })
            .catch(err => {
                res.send(err)
            })
    }

}

module.exports = AccountController