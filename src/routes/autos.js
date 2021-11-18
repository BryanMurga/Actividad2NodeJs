const express = require('express');
const router = express.Router();
const pool = require('../database.js');

router.get('/', async(req, res) =>{
    let listAutos = await pool.query('SELECT * FROM autos');
    res.json({
        status: 200,
        message: "Se ha listado correctamente",
        listAutos: listAutos
    });
});

router.get('/:id', async(req, res) => {
    const { id } = req.params;      
    let autos = await pool.query('SELECT * FROM autos WHERE id = ?',[id]);
    res.json({
        status: 200,
        message: "Se ha obtenido correctamente",
        autos: autos
    });
});

router.post('/create', async(req, res) => {
    var creacion = new Date().toISOString();
    const { nombre, matricula, yearCheck, marca } = req.body;
    const autos = {
        nombre, matricula, yearCheck, dateRegister: creacion, status: 1, marca
    };
        await pool.query('INSERT INTO autos set ?', [autos]);
        res.json({
            status: 200,
            message: "Se ha creado correctamente",
            autos:autos
        });
    
}); 

router.post('/update/:id', async (req, res)=>{
    const { id } = req.params;
    var dateUpdate = new Date().toISOString();
    const { nombre, matricula, yearCheck, dateUpdate , marca } = req.body;

    const autos = { nombre, matricula, yearCheck, dateUpdate: dateUpdate, marca };

     await pool.query('UPDATE autos SET ? WHERE id = ?', [autos, id]);
        res.json({
            status: 200,
            message: "Se ha actualizado correctamente",
            autos: autos
        });
});

router.post ('/delete/:id', async (req, res) =>{
    const { id } = req.params;

    await pool.query('DELETE autos WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha eliminado correctamente"
    });
});


module.exports = router;