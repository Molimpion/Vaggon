import { Box, Typography, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import styles from './Header.module.css';

function Header({ onLogout }) {
    return (
        <Box className={styles.header}>
            <Typography variant="h4" component="h1" className={styles.title}>
                Minha Agenda
            </Typography>
            <Button 
                variant="outlined" 
                color="error" 
                startIcon={<LogoutIcon />} 
                onClick={onLogout}
            >
                Sair
            </Button>
        </Box>
    );
}

export default Header;