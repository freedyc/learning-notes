const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
    console.log(`Time ${Date.now()}`);
    next();
})
router.get('/add', (req, res) => {
    res.send('food add ');
})

router.get('/del', (req, res) => {
    res.send('food del');
})

module.exports = router;