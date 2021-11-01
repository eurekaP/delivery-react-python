import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// third party
import { FixedSizeList } from 'react-window';

// style constant
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: 270,
        backgroundColor: theme.palette.background.paper
    }
}));

// list render
function renderRow(props) {
    const { index, style } = props;

    return (
        <ListItem button style={style} key={index}>
            <ListItemText primary={`Item ${index + 1}`} />
        </ListItem>
    );
}

renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired
};

//================================|| UI LIST - SCROLLABLE ||================================//

export default function VirtualizedList() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <FixedSizeList height={280} width="auto" itemSize={46} itemCount={200}>
                {renderRow}
            </FixedSizeList>
        </div>
    );
}
