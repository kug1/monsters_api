const { Router } = require('express');
const monsters = require('./monsters');
const habitats = require('./habitats');
const lives = require('./lives');

const router = Router();

// "/monsters" is what is called an URI, stands for "Uniform Resource Identifier".

router.use('/monsters', monsters);
router.use('/habitats', habitats);
router.use('/lives', lives);

module.exports = router;
