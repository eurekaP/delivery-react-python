import {
    useDeleteWithUndoController,
    useResourceContext,
} from 'ra-core';
import ActionDelete from '@material-ui/icons/Delete';
import Button from './Button';

const DeleteWithUndoButton = props => {
    const {
        icon = defaultIcon,
        onClick,
        record,
        basePath,
        redirect = 'list',
        onSuccess,
        onFailure,
        ...rest
    } = props

    const resource = useResourceContext(props);
    const { loading, handleDelete } = useDeleteWithUndoController({
        record,
        resource,
        basePath,
        redirect,
        onClick,
        onSuccess,
        onFailure,
    })

    return (
        <Button
            onClick={handleDelete}
            disabled={loading}
            startIcon={icon}
            {...rest}
        />
    )
}

const defaultIcon = <ActionDelete />;

export default DeleteWithUndoButton;
