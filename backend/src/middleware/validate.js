const { z } = require('zod');
const AppError = require('../utils/AppError');

const validate = (schema) => (req, res, next) => {
    try {
    
        schema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            const messages = error.errors.map(err => err.message).join(', ');
            throw new AppError(`Erro de validação: ${messages}`);
        }
        throw error;
    }
};

module.exports = validate;