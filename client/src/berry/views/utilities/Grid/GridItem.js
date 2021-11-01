// material-ui
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

//===============================|| GRID - ITEMS ||===============================//

const GridItem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.secondary.dark,
    background: theme.palette.secondary.light
}));

export default GridItem;
