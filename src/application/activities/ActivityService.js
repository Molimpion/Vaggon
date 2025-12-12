const Activity = require('../../infrastructure/orm/Activity');
const AppError = require('../../infrastructure/exceptions/AppError');

class ActivityService {
    async create(userId, data) {
        if (new Date(data.start_date) > new Date(data.end_date)) {
            throw new AppError('Data de término deve ser posterior ao início');
        }
        
        const activity = await Activity.create({ ...data, user_id: userId });
        return activity;
    }

    async listByUser(userId) {
        return await Activity.findAll({ where: { user_id: userId } });
    }

    async update(userId, activityId, data) {
        const activity = await Activity.findOne({ where: { id: activityId, user_id: userId } });
        if (!activity) throw new AppError('Atividade não encontrada', 404);

        await activity.update(data);
        return activity;
    }

    async delete(userId, activityId) {
        const activity = await Activity.findOne({ where: { id: activityId, user_id: userId } });
        if (!activity) throw new AppError('Atividade não encontrada', 404);

        await activity.destroy();
        return { message: 'Atividade excluída' };
    }
}

module.exports = new ActivityService();