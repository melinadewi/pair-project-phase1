const Models = require('../models/index')
const Movie = Models.Movie

class MovieController{
    static getList(req, res){
        Movie.findAll({raw:true})
            .then((data) => {
                res.render("./pages/movie-list.ejs", {
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
            }
        })
            .then((comment)=>{ 
                for(let i = 0; i < comment.length; i++){
                    if(0 === comment[i].commentId){
                        oriComment.push(comment[i].dataValues)
                    } else {
                        replyComment.push(comment[i].dataValues)
                    }
                }
                return Movie.findByPk(req.params.id)                
            })
            .then((data) => {
                res.render("./pages/movie-detail.ejs", {
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
                res.render("./pages/rating-page.ejs", {
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
            commentId: 0,
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
                res.render("./pages/reply.ejs", {
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