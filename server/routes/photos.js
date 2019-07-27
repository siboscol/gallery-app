const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const getPhotosAPIUrl = (page = 0, limit = 100) => { return `https://picsum.photos/v2/list?page=${page}&limit=${limit}`; }
const getPhotoByIdAPIrl = (id, width = 367, height = 267) => { return `https://picsum.photos/id/${id}/${width}/${height}`; }

// /api/photos
router.get('/', async (req, res) => {
    const { page, limit } = req.query
    try {
        const response = await fetch(getPhotosAPIUrl(page, limit))
        const json = await response.json()
        return res.json(json)
    } catch (err) {
        return res.status(500).json(err)
    }
})

// /api/photos/{id}?width=34&height=76
router.get('/:id', async (req, res) => {
    const { width, height } = req.query
    try {
        const response = await fetch(getPhotoByIdAPIrl(req.params.id, width, height))
        response.body.pipe(res)
    } catch (err) {
        return res.status(500).json(err)
    }
});

module.exports = router;