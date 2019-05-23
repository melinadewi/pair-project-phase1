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
                    data: data
                })
            })
            .catch(err => {
                res.render(err)
            })
    }

    static postRating(req, res){
        Models.UserMovie.create({
            UserId: req.session.user.id,
            MovieId: req.params.id,
            comment: req.body.comment,
            rating: req.body.rating,
            commentId: req.params.commentId,
            createdAt: new Date(),
            updatedAt: new Date()
        })
            .then(() => {
                res.redirect("/movies/" + req.params.id)
            })
            .catch(err => {
                res.send(err)
            })
    }

}

module.exports = MovieController