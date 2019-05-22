const express = require('express')
const router = express.Router()
const AccountController = require('../controllers/accountController.js')

router.get('/register', AccountController.getRegister)
router.post('/register', AccountController.postRegister)
router.get('/login', AccountController.getLogin)
router.post('/login', AccountController.postLogin)
// router.get('/edit-profile', AccountController.getEdit)
// router.post('/edit-profile', AccountController.postEdit)
router.get('/delete/:id', AccountController.deleteAccount)

module.exports = router