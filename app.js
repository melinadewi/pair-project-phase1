const express = require('express')
const app = express()
const port = process.env.PORT|| 3000
const accountRouter = require('./routers/accountRouter')
const movieRouter = require('./routers/movieRouter')
const convertDate = require('./helpers/dateFormatter')
const session = require('express-session')

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(express.static('public'))
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.locals.convertDate = convertDate
    res.locals.error = null
    next()
})

// MVP 
// Deploy 

// account
app.use('/account', accountRouter)
app.use((req, res, next) => {
    if(req.session.user) {
        next()
    } else {
        res.locals.error = 'Harus Login dulu'
        res.redirect("/account/login")
    }
})

// movie
app.use('/movies', movieRouter)

app.get('/*', (req,res) => {
    res.send("Halaman yang dicari tidak ada.")
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))