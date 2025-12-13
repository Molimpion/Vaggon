import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    IconButton,
    MenuItem,
    Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './ActivityModal.module.css';

function ActivityModal({ 
    open, 
    onClose, 
    activity, 
    setActivity, 
    onSave, 
    onDelete, 
    loading 
}) {
    
    const handleChange = (field, value) => {
        setActivity(prev => ({ ...prev, [field]: value }));
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                {activity.id ? 'Editar Atividade' : 'Nova Atividade'}
            </DialogTitle>
            
            <DialogContent>
                <Box className={styles.form}>
                    <TextField
                        label="Nome da Atividade"
                        fullWidth
                        value={activity.nome}
                        onChange={e => handleChange('nome', e.target.value)}
                    />
                    
                    <TextField
                        label="Descrição"
                        fullWidth
                        multiline
                        rows={3}
                        value={activity.descricao}
                        onChange={e => handleChange('descricao', e.target.value)}
                    />

                    <TextField
                        label="Início"
                        type="datetime-local"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={activity.data_inicio}
                        onChange={e => handleChange('data_inicio', e.target.value)}
                    />

                    <TextField
                        label="Término"
                        type="datetime-local"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={activity.data_termino}
                        onChange={e => handleChange('data_termino', e.target.value)}
                    />

                    <TextField
                        select
                        label="Status"
                        fullWidth
                        value={activity.status}
                        onChange={e => handleChange('status', e.target.value)}
                    >
                        <MenuItem value="pendente">Pendente</MenuItem>
                        <MenuItem value="concluida">Concluída</MenuItem>
                        <MenuItem value="cancelada">Cancelada</MenuItem>
                    </TextField>
                </Box>
            </DialogContent>

            <DialogActions className={styles.actions}>
                {activity.id ? (
                    <IconButton onClick={onDelete} color="error">
                        <DeleteIcon />
                    </IconButton>
                ) : (
                    <div /> 
                )}
                
                <div>
                    <Button onClick={onClose} style={{ marginRight: 8 }}>
                        Cancelar
                    </Button>
                    <Button onClick={onSave} variant="contained" disabled={loading}>
                        Salvar
                    </Button>
                </div>
            </DialogActions>
        </Dialog>
    );
}

export default ActivityModal;