import {
    getMutationMode,
} from 'ra-core';

import DeleteWithUndoButton from './DeleteWithUndoButton';
import DeleteWithConfirmButton from './DeleteWithConfirmButton';


const DeleteButton = ({
    undoable,
    mutationMode,
    record,
    ...props
}) => {
    const mode = getMutationMode(mutationMode, undoable);
    if (!record || record.id == null) {
        return null;
    }
    console.log(mode)
    return mode === 'undoable' ? (
        <DeleteWithUndoButton record={record} {...props} />
    ) : (
        <DeleteWithConfirmButton
            mutationMode={mode}
            record={record}
            {...props}
        />
    );
};

DeleteButton.defaultProps = {
    color: "error",
    children: "Delete"
}

export default DeleteButton;
