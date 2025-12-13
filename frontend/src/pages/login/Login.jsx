import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { TextField, Button, Link, Alert, CircularProgress } from '@mui/material';
import api from '../../services/Api';
import AuthLayout from '../../components/authLayout/AuthLayout';

function Login() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    async function handleLogin(event) {
        event.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/auth/login', { login, password });

            if (response.data.token) {
                localStorage.setItem('vaggon_token', response.data.token);
                localStorage.setItem('vaggon_user', JSON.stringify(response.data.user));
                navigate('/dashboard');
            } else {
                setError("Erro inesperado: O servidor não retornou um token.");
            }

        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Falha ao fazer login.');
        } finally {
            setLoading(false);
        }
    }

    const footerLink = (
        <Link component={RouterLink} to="/register" variant="body2">
            "Não tem uma conta? Cadastre-se"
        </Link>
    );

    return (
        <AuthLayout 
            title="Vaggon Agenda - Login" 
            onSubmit={handleLogin}
            footer={footerLink}
        >
            {error && <Alert severity="error">{error}</Alert>}

            <TextField
                required
                fullWidth
                label="Login"
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
            
            <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ mt: 1, height: '48px' }}
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Entrar'}
            </Button>
        </AuthLayout>
    );
}

export default Login;