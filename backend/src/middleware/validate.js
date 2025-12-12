const AppError = require('../utils/AppError');

const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
        console.error('Erro de Validação Zod:', JSON.stringify(result.error, null, 2));

        const issues = result.error.issues || result.error.errors || [];
        
        const messages = issues.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');

        throw new AppError(`Erro de validação: ${messages || 'Dados inválidos'}`);
    }

    req.body = result.data;
    next();
};

module.exports = validate;