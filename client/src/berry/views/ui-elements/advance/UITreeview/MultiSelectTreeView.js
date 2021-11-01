import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { TreeItem, TreeView } from '@material-ui/lab';

// assets
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

// style constant
const useStyles = makeStyles({
    root: {
        height: 'auto',
        flexGrow: 1
    }
});

//==============================|| UI TREEVIEW - MULTI-SELECT ||==============================//

export default function MultiSelectTreeView() {
    const classes = useStyles();

    return (
        <TreeView className={classes.root} defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />} multiSelect>
            <TreeItem nodeId="1" label="Applications">
                <TreeItem nodeId="2" label="Calendar" />
                <TreeItem nodeId="3" label="Chrome" />
                <TreeItem nodeId="4" label="Webstorm" />
            </TreeItem>
            <TreeItem nodeId="5" label="Documents">
                <TreeItem nodeId="6" label="Material-UI">
                    <TreeItem nodeId="7" label="src">
                        <TreeItem nodeId="8" label="index.js" />
                        <TreeItem nodeId="9" label="tree-view.js" />
                    </TreeItem>
                </TreeItem>
            </TreeItem>
        </TreeView>
    );
}
