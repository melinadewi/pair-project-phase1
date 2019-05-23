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
// // halaman list movies
// app.get('/movies')
// // halaman kalau mau lihat review movies, id nya id movies
// app.get('/movies/:id')  // di sini ada komentar2 orang dan penilaiannya, juga tombol untuk ke halaman give-ratingnya
// // halaman kalau mau reviews movies, id nya id movies | isinya cuma judul / gambar movie yang mau diniilai sama form judul movie yang mau dinilai
// app.get('/movies/:id/give-rating')
// app.post()


// Beri navigation bar => partial
// di sebelah kanan atas ada nama user, lalu ada dropdown untuk ke halaman profile
// halaman ini untuk edit profile langsung
// bentuknya form, harus ada tombol untuk update
app.get('/profile')


app.listen(port, () => console.log(`Example app listening on port ${port}!`))