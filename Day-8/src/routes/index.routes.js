const express = require('express');

const router = express.Router();

router.use((req,res,next) => {
    console.log('This middleware is between router and api');
    next();
})

router.get('/', (req, res) => {
    res.json({
        message: 'Welcome'
    })
})


module.exports = router;