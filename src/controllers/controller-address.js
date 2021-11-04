const config = require('../configs/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    // Ambil data semua address
    getDataAddress(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `SELECT * FROM alamat_indonesia limit 10;`
            , function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    data: results 
                });
            });
            connection.release();
        })
    },
    // Ambil data address berdasarkan ID
    getDataAddressByID(req,res){
        let id = req.params.id;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM alamat_indonesia WHERE id = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    data: results
                });
            });
            connection.release();
        })
    },
    // Simpan data address
    addDataAddress(req,res){
        let data = {
            provinsi : req.body.provinsi,
            kota_kab : req.body.kota_kab,
            kecamatan : req.body.kecamatan,
            kelurahan : req.body.kelurahan,
            kodepos : req.body.kodepos,
            prioritas : req.body.prioritas,
        }
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                INSERT INTO alamat_indonesia SET ?;
                `
            , [data],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil tambah data!',
                });
            });
            connection.release();
        })
    },
    // Update data address
    editDataAddress(req,res){
        let dataEdit = {
            provinsi : req.body.provinsi,
            kota_kab : req.body.kota_kab,
            kecamatan : req.body.kecamatan,
            kelurahan : req.body.kelurahan,
            kodepos : req.body.kodepos,
            prioritas : req.body.prioritas
        }
        let id = req.body.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE alamat_indonesia SET ? WHERE id = ?;
                `
            , [dataEdit, id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil edit data!',
                });
            });
            connection.release();
        })
    },
    // Delete data address
    deleteDataAddress(req,res){
        let id = req.body.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                DELETE FROM alamat_indonesia WHERE id = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil hapus data!'
                });
            });
            connection.release();
        })
    }
}