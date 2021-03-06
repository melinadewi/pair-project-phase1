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
            gender: req.body.gender,
            createdAt: new Date(),
            updatedAt: new Date()
        })
            .then(() => {
                res.redirect("/account/login")
            })
            .catch(err => {
                res.send(err)
            })
    }

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

    static getLogout(req, res){
        req.session.destroy();
        res.redirect("/account/login")
    }

    static getEdit(req, res){
        User.findOne({
            raw:true,
            where:{
                id: req.session.user.id
            }
        })
            .then(data => {
                res.render("./pages/profile.ejs", {
                    data: data
                })
            })
    }

    static postEdit(req, res){
        console.log("MASUK POST EDIT")
        User.findByPk(req.session.user.id)
            .then((user) => {
                console.log(req.body)
                user.username = req.body.username
                user.email = req.body.email
                if(req.body.password !== ""){
                    let salt = bcrypt.genSaltSync(10);
                    user.password = bcrypt.hashSync(req.body.password, salt)
                }
                console.log("MAU KE UPDATE");
                
                user.updatedAt = new Date()
                return user.save()
            })
            .then(() => {
                console.log("Masuk KE REDIRECT")
                res.redirect("/movies")
            })
            .catch(err => {
                res.send(err)
            })
    }

    static deleteAccount(req, res){
        User.destroy({
            where: {
                id: req.session.user.id
            }
        })
            .then(()=>{
                User.postLogout(req, res)
            })
            .catch(err => {
                res.send(err)
            })
    }

}

module.exports = AccountController