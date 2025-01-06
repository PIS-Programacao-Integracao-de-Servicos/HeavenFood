const express = require('express');
const router = express.Router();
const { getAboutUs } = require('../modules/aboutModule');

router.get('/aboutus', getAboutUs);

module.exports = router;
