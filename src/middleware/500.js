'use strict';

module.exports = (err, req, res, next) => {
  let errorMessage = err.message ? err.message : 'Internal Server Error!'
  res.status(500).json({
    status: 500,
    message: errorMessage,
  });
};
