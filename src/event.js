const express = require('express');

function createRouter(db) {
    const router = express.Router();
    const owner = '';
    /******************************** EQUIPE ***************************/
    // the routes are defined here
    router.post('/register', (req, res, next) => {
      db.query(
        'INSERT INTO users (name, email, password,role) VALUES (?,?,?,?)',
        [req.body.name, req.body.email, req.body.password, req.body.role],
        (error) => {
          if (error) {
            console.error(error);
            res.status(500).json({status: 'error'});
          } else {
            res.status(200).json({status: 'ok'});
          }
        }
      );
    });
  
    router.get('/users', function (req, res, next) {
      db.query(
        'SELECT * FROM users',
        (error, results) => {
          if (error) {
            console.log(error);
            res.status(500).json({status: 'error'});
          } else {
            res.status(200).json(results);
          }
        }
      );
    });

    router.post('/login', function (req, res, next) {
      db.query(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [req.body.email, req.body.password],
        (error, results) => {
          if (error) {
            console.log(error);
            res.status(500).json({status: 'error'});
          } else {
            res.status(200).json(results);
          }
        }
      );
    });
  
  
    router.post('/park', (req, res, next) => {
      db.query(
        'INSERT INTO ligue (nom) VALUES (?)',
        [owner, req.body.nom],
        (error) => {
          if (error) {
            console.error(error);
            res.status(500).json({status: 'error'});
          } else {
            res.status(200).json({status: 'ok'});
          }
        }
      );
    });
  
    router.get('/parkings', function (req, res, next) {
      db.query(
        'SELECT * FROM parking',
        [owner, ],
        (error, results) => {
          if (error) {
            console.log(error);
            res.status(500).json({status: 'error'});
          } else {
            res.status(200).json(results);
          }
        }
      );
    });

    router.get('/alls', function (req, res, next) {
      db.query(
        'SELECT * FROM users INNER JOIN parking  ON users.id = parking.id_user',
        [owner, ],
        (error, results) => {
          if (error) {
            console.log(error);
            res.status(500).json({status: 'error'});
          } else {
            res.status(200).json(results);
          }
        }
      );
    });
  
    return router;
  }
  
  
module.exports = createRouter;