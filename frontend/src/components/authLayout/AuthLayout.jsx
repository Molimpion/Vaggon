import { Box, Paper, Typography } from '@mui/material';
import styles from './AuthLayout.module.css';

function AuthLayout({ title, onSubmit, children, footer }) {
    return (
        <Box className={styles.wrapper}>
            <Paper elevation={3} className={styles.paper}>
                
                <Typography component="h1" variant="h5" className={styles.title}>
                    {title}
                </Typography>

                <Box component="form" onSubmit={onSubmit} className={styles.form}>
                    {children}
                </Box>

                <Box className={styles.footer}>
                    {footer}
                </Box>

            </Paper>
        </Box>
    );
}

export default AuthLayout;