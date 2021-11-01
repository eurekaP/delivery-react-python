// material-ui
import { experimentalStyled as styled } from '@material-ui/core/styles';

//-----------------------|| AUTHENTICATION 1 WRAPPER ||-----------------------//

const AuthWrapper2 = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.background,
    minHeight: '100vh',
    [theme.breakpoints.down('md')]: {
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light
    }
}));

export default AuthWrapper2;
