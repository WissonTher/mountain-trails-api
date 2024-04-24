const express = require('express');
const router = express.Router();
const mountainTrailsService = require('../service/mountainTrailsService');

router.get('/', async function (req, res, next) {
    try {
        res.json(await mountainTrailsService.getAll());
    } catch (error) {
        console.error(`Erorr while fetching map data.`, error.mesage)
        next(error);
    }
});

router.post('/', async function(req, res, next) {
    try {
        res.json(await mountainTrailsService.save(req.body));
    } catch (err) {
        console.error(`Trail data saving error.`, err.message);
        newt(err);
    }
});

router.put(':/id', async function(req, res, next) {
    try {
        res.json(await mountainTrailsService.update(req.params.id, req.body));
    } catch(err) {
        console.error(`Error while deleting map data.`, err.message);
        next(err);
    }
});

router.delete(':/id', async function(req, res, next) {
    try {
        res.json(await mountainTrailsService.remove(req.params.id));
    } catch(err) {
        console.error(`Error while deleting map data.`, err.message);
        next(err);
    }
});

module.exports = router;