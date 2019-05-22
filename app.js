const express = require('express')
const app = express()
const port = 3000

// many to many V
// helpers
// encrypt --> di dalam hooks
// CRUD --> users, readnya movies
// instance dan class method
// middleware *
// session *
// hooks
// MVP *
// Deploy *

// * besok

// buat halaman home
app.get('/', (req, res) => res.send('Hello World!'))

// halaman register --> hooks beforeCreate, encrypt
app.get('/register')
app.post()
// halaman login
app.get('/login')
app.post()

// halaman list movies
app.get('/movies')
// halaman kalau mau lihat review movies, id nya id movies
app.get('/movies/:id')  // di sini ada komentar2 orang dan penilaiannya, juga tombol untuk ke halaman give-ratingnya
    // chartjs nya juga kalau sudah bisa

// halaman kalau mau reviews movies, id nya id movies | isinya cuma judul / gambar movie yang mau diniilai sama form judul movie yang mau dinilai
app.get('/movies/:id/give-rating')
app.post()


// Beri navigation bar
// di sebelah kanan atas ada nama user, lalu ada dropdown untuk ke halaman profile
// halaman ini untuk edit profile langsung
// bentuknya form, harus ada tombol untuk update
app.get('/profile')


app.listen(port, () => console.log(`Example app listening on port ${port}!`))