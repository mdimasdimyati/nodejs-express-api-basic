const router = require('express').Router();
const { address } = require('../controllers');

// GET localhost:8800/address => Ambil data semua address
router.get('/address', address.getDataAddress);

// GET localhost:8800/address/2 => Ambil data semua address berdasarkan id = 2
router.get('/address/:id', address.getDataAddressByID);

// POST localhost:8800/address/add => Tambah data address ke database
router.post('/address/add', address.addDataAddress);

// POST localhost:8800/address/2 => Edit data address
router.post('/address/edit', address.editDataAddress);

// POST localhost:8800/address/delete => Delete data address
router.post('/address/delete/', address.deleteDataAddress);

module.exports = router;