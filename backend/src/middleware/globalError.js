const AppError = require('../utils/AppError');

module.exports = (err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    console.error(' Erro Interno:', err);

    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
    });
};