const { Router } = require('express');
const router = Router();

router.post('/tiposIdentificacion', (req, res) => {
    const statement = require('../database/statementMariaDB.js');
    let statementInsert = new statement('Carlos Mario Jaramillo');
    
    statementInsert.query('SELECT * FROM performance_schema.session_connect_attrs',(ok, data, error) => {
        res.json(data);
    });
    
   /*
    statementInsert.queryBatch('INSERT INTO tiposIdentificacion(tipoIdentificacion) VALUES (?)', [['Cedula'], ['Tarjeta de Identidad']], (consultaOK, data, error) => {
        if (consultaOK) {
            statementInsert.queryBatch('UPDATE tiposIdentificacion SET tipoIdentificacion = ? WHERE tipoIdentificacion = ?', [['Cedula de Ciudadania', 'Cedula']], (consultaOK, data, error) => {
                if (consultaOK) {
                    statementInsert.query('DELETE FROM tiposIdentificacion', (consultaOK, data, error) => {
                        if (consultaOK) {
                            res.json('{ok:true}');
                        }else{
                            res.json('{ok:false,mensaje:' + error + '}');
                        }
                    });
                }else{
                    res.json('{ok:false,mensaje:' + error + '}');
                }
            });
        }else{
            res.json('{ok:false,mensaje:' + error + '}');
        }
    });
    */
});

router.post('/json', (req, res) => {
    //var func = require('../modelos/dataReturn.ts');
    //console.log(func);
    res.json('');
});

module.exports = router;