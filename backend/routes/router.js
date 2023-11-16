const router = require('express').Router();

const ServicesRouter = require('./service');

router.use('/', ServicesRouter);

module.exports = router;
