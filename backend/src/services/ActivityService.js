const { Activity } = require('../models');
const AppError = require('../utils/AppError');

class ActivityService {
    async listActivities(userId) {
        const activities = await Activity.findAll({
            where: { user_id: userId },
            order: [['data_inicio', 'ASC']]
        });
        return activities;
    }

    async createActivity({ nome, descricao, data_inicio, data_termino, user_id }) {
        const activity = await Activity.create({
            nome,
            descricao,
            data_inicio,
            data_termino,
            user_id
        });
        return activity;
    }

    async updateActivity({ id, user_id, data }) {
        const activity = await Activity.findOne({
            where: { id, user_id }
        });

        if (!activity) {
            throw new AppError('Atividade não encontrada', 404);
        }

        await activity.update(data);
        return activity;
    }

    async deleteActivity({ id, user_id }) {
        const rowsDeleted = await Activity.destroy({
            where: { id, user_id }
        });

        if (rowsDeleted === 0) {
            throw new AppError('Atividade não encontrada', 404);
        }
        
        return true;
    }
}

module.exports = new ActivityService();