import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { TextField, Button, Link, Alert, CircularProgress } from '@mui/material';
import api from '../../services/api';
import AuthLayout from '../../components/authLayout/AuthLayout';

function Register() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleRegister(event) {
        event.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError("As senhas não conferem.");
            return;
        }
        if (password.length < 6) {
            setError("A senha deve ter no mínimo 6 caracteres.");
            return;
        }

        setLoading(true);
        try {
            await api.post('/auth/register', { login, password });
            alert('Conta criada com sucesso! Faça login para continuar.');
            navigate('/'); 
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao criar conta.');
        } finally {
            setLoading(false);
        }
    }

    const footerLink = (
        <Link component={RouterLink} to="/" variant="body2">
            Já possui conta? Faça Login
        </Link>
    );

    return (
        <AuthLayout 
            title="Criar Nova Conta" 
            onSubmit={handleRegister} 
            footer={footerLink}
        >
            {error && <Alert severity="error">{error}</Alert>}

            <TextField
                required
                fullWidth
                label="Escolha um Login"
                autoFocus
                value={login}
                onChange={(e) => setLogin(e.target.value)}
            />

            <TextField
                required
                fullWidth
                label="Senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <TextField
                required
                fullWidth
                label="Confirmar Senha"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            
            <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ mt: 1, height: '48px' }}
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Cadastrar'}
            </Button>
        </AuthLayout>
    );
}

export default Register;