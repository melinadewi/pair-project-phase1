const express = require('express')
const app = express()
const port = 3000

const accountRouter = require('./routers/accountRouter')
const movieRouter = require('./routers/movieRouter')

// many to many V
// helpers
// encrypt --> di dalam hooks
// CRUD --> users, readnya movies
// instance dan class method
// middleware 
// session 
// hooks
// MVP 
// Deploy 

const session = require('express-session')

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))



app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    if(req.session.user) {
        next()
    } else {
        res.render("./pages/register.ejs", {
            error:'you must login first'
        })
    }
})
app.use(express.static('public'))
// buat halaman home
app.get('/', (req, res) => res.render('./pages/home.ejs'))


// account
app.use('/account', accountRouter)
// // halaman register --> hooks beforeCreate, encrypt
// app.get('/register')
// app.post()
// // halaman login
// app.get('/login')
// app.post()


// movie
app.use('/movies', movieRouter)
// // halaman list movies
// app.get('/movies')
// // halaman kalau mau lihat review movies, id nya id movies
// app.get('/movies/:id')  // di sini ada komentar2 orang dan penilaiannya, juga tombol untuk ke halaman give-ratingnya
//     // chartjs nya juga kalau sudah bisa

// // halaman kalau mau reviews movies, id nya id movies | isinya cuma judul / gambar movie yang mau diniilai sama form judul movie yang mau dinilai
// app.get('/movies/:id/give-rating')
// app.post()


// Beri navigation bar => partial
// di sebelah kanan atas ada nama user, lalu ada dropdown untuk ke halaman profile
// halaman ini untuk edit profile langsung
// bentuknya form, harus ada tombol untuk update
app.get('/profile')


app.listen(port, () => console.log(`Example app listening on port ${port}!`))