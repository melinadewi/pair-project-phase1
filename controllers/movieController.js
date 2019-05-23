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
        let oriComment = []
        let replyComment = []                
        Models.UserMovie.findAll({
            where: {
                MovieId: req.params.id
            },
            include: {
                model: Models.User
            }
        })
            .then((comment)=>{
                for(let i = 0; i < comment.length; i++){
                    if(comment[i].id === comment[i].commentId){
                        oriComment.push(comment[i])
                    } else {
                        replyComment.push(comment[i])
                    }
                }
                return Movie.findByPk(req.params.id)                
            })
            .then((data) => {
                res.render("detail.ejs", {
                    data: data,
                    oriComment: oriComment,
                    replyComment: replyComment
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
                    movie: data
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

    static getReply(req, res){
        Models.UserMovie.findByPk(req.params.commentId)
            .then((data) => {
                res.render("reply.ejs", {
                    comment: data
                })
            })
            .catch(err => {
                res.render(err)
            })
    }

    static postReply(req, res){
        let comment
        Models.UserMovie.findByPk(req.params.commentId)
            .then((data) => {
                comment = data
                return Models.UserMovie.create({
                    UserId: req.session.user.id,
                    MovieId: data.MovieId,
                    comment: req.body.comment,
                    rating: null,
                    commentId: req.params.commentId,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
            })        
            .then(() => {
                res.redirect("/movies/" + comment.MovieId)
            })
            .catch(err => {
                res.send(err)
            })
    }


}

module.exports = MovieController