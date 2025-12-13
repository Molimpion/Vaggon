import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/dashboard/Dashboard';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0D47A1', // Azul Vaggon
    },
    background: {
      default: '#f4f6f8',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  }
});

function PrivateRoute({ children }) {
    const token = localStorage.getItem('vaggon_token');
    return token ? children : <Navigate to="/" />;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/dashboard" 
            element={
                <PrivateRoute>
                    <Dashboard />
                </PrivateRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;