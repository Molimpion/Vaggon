const { z } = require('zod');

const activitySchema = z.object({
    nome: z.string().min(3, "O nome da atividade é obrigatório"),
    descricao: z.string().optional(), 
    data_inicio: z.string().datetime("Data de início inválida (use formato ISO)"), 
    data_termino: z.string().datetime("Data de término inválida (use formato ISO)"),
    status: z.enum(['pendente', 'concluida', 'cancelada']).optional() 
});

module.exports = { activitySchema };