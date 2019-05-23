const express = require('express')
const router = express.Router()
const AccountController = require('../controllers/accountController.js')

router.get('/login', AccountController.getRegister)
router.post('/register', AccountController.postRegister)
router.post('/login', AccountController.postLogin)
router.get('/edit-profile/', AccountController.getEdit)
router.post('/edit-profile/', AccountController.postEdit)
router.get('/delete/', AccountController.deleteAccount)
router.get('/logout', AccountController.getLogout)

module.exports = router