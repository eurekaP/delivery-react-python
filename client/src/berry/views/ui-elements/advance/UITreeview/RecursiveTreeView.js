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

// tree data
const data = {
    id: 'root',
    name: 'Parent',
    children: [
        {
            id: '1',
            name: 'Child - 1'
        },
        {
            id: '3',
            name: 'Child - 3',
            children: [
                {
                    id: '4',
                    name: 'Child - 4'
                }
            ]
        }
    ]
};

//==============================|| UI TREEVIEW ||==============================//

export default function RecursiveTreeView() {
    const classes = useStyles();

    const renderTree = (nodes) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem>
    );

    return (
        <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={['root']}
            defaultExpandIcon={<ChevronRightIcon />}
        >
            {renderTree(data)}
        </TreeView>
    );
}
