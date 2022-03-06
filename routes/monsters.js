const { Router } = require('express');
const res = require('express/lib/response');
const pool = require('../db');

const router = Router();

/*
  If we were to re-declare the endpoint "/monsters" again, it would be a duplicate.
  This happened because we already declared the endpoint in "app.js".
*/

router.get('/', (request, response, next) => {
  pool.query('SELECT * FROM monsters ORDER BY id DESC', (err, res) => {
    if (err) return next(err);

    response.json(res.rows);
  });
});

router.get('/:id', (request, response, next) => {
  const { id } = request.params;

  pool.query('SELECT * FROM monsters WHERE id = $1', [id], (err, res) => {
    if (err) return next(err);

    response.json(res.rows);
  });
});

// These request methods are also called VERBs.

router.post('/', (request, response, next) => {
  const { name, personality } = request.body;

  pool.query(
    'INSERT INTO monsters(name, personality) VALUES($1, $2)',
    [name, personality],
    (err, res) => {
      if (err) return next(err);

      /*
        If we wanted to see the data we POSTED we would have to perform a get method seperately.
        This feature is contained in our response object.
        One thing to note is that we hardcoded our WHOLE path.
      */

      response.redirect('/monsters');
    }
  );
});

// The callback functions run when the route is requested.

router.put('/:id', (request, response, next) => {
  const { id } = request.params;

  const keys = ['name', 'personality'];

  const fields = [];

  keys.forEach((key) => {
    if (request.body[key]) fields.push(key);
  });

  fields.forEach((field, index) => {
    pool.query(
      `UPDATE monsters SET ${field}=($1) WHERE id=($2)`,
      [request.body[field], id],
      (err, res) => {
        if (err) return next(err);

        if (index === fields.length - 1) response.redirect('/monsters');
      }
    );
  });
});

router.delete('/:id', (request, response, next) => {
  const { id } = request.params;

  pool.query('DELETE FROM monsters WHERE id=($1)', [id], (err, res) => {
    if (err) return next(err);

    response.redirect('/monsters');
  });
});

module.exports = router;
