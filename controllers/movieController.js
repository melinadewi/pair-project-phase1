const Models = require('../models/index')
const Movie = Models.Movie

class MovieController{
    static getList(req, res){
        Movie.findAll({raw:true})
            .then((data) => {
                res.render("movie.ejs", {
                    movies: data
                })
            })
            .catch(err => {
                res.render(err)
            })
    }

    static getMovieDetail(req, res){
        Movie.findByPk(req.params.id)
            .then((data) => {
                res.render("detail.ejs", {
                    data: data
                })
            })
            .catch(err => {
                res.render(err)
            })
    }

    static getRating(req, res){
        Movie.findByPk(req.params.id)
            .then((data) => {
                res.render("rating.ejs", {
                    data: data  // ini passing data movie nya, perlu pass data usernya juga
                })
            })
            .catch(err => {
                res.render(err)
            })
    }

    static postRating(req, res){
        Models.UserMovie.create({
            UserId: req.body.name,  // ambil UserId
            MovieId: req.params.id, // ambil MovieId
            comment: req.body.comment,
            rating: req.body.rating,
            createdAt: new Date(),
            updatedAt: new Date()
        })
            .then(() => {
                res.redirect("/movies", {
                    message: "Your review has been submitted"
                })
            })
            .catch(err => {
                res.send(err)
            })
    }

}

module.exports = MovieController