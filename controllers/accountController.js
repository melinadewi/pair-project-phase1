const Models = require('../models/index')
const User = Models.User
const bcrypt = require('bcryptjs');

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
                console.log("New User created")
                res.send("User Createed")
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
                username: req.body.username
            }
        })
            .then((user) => {
                if(user){
                    let valid = bcrypt.compareSync(req.body.password, user.password)
                    if(valid) {
                        req.session.user= {
                            id: user.id,
                            name: user.name
                        }
                    } else {
                        throw new Error ("Invalid password")
                    }
                    res.redirect("/movies")
                } else {
                    throw new Error ("Username not found")
                }
            })
            .catch(err => {
                res.render("./pages/register.ejs",{
                    error: err
                })
            })
    }

    

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
                let salt = bcrypt.genSaltSync(10);
                user.password = bcrypt.hashSync(req.body.password, salt)
                user.updatedAt = new Date()
                return user.save()
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