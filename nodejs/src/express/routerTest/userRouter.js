const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
    console.log(`Time ${Date.now()}`);
    next();
})
router.get('/add', (req, res) => {
    res.send('user add ');
})

router.get('/del', (req, res) => {
    res.send('user del');
})

module.exports = router;