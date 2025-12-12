const { z } = require('zod');

const activitySchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    description: z.string().optional(),
    start_date: z.coerce.date(),
    end_date: z.coerce.date(),
    status: z.enum(['pendente', 'concluída', 'cancelada']).optional(),
});

module.exports = { activitySchema };