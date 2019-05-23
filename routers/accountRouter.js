const express = require('express')
const router = express.Router()
const AccountController = require('../controllers/accountController.js')

router.get('/login', AccountController.getRegister)
router.post('/register', AccountController.postRegister)
router.post('/login', AccountController.postLogin)
router.get('/edit-profile/:id', AccountController.getEdit)
router.post('/edit-profile/:id', AccountController.postEdit)
router.get('/delete/:id', AccountController.deleteAccount)

module.exports = router