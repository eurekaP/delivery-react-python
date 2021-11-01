//import DeleteIcon from '@mui/icons-material/Delete'
import classnames from 'classnames'
import {
    useDeleteWithConfirmController,
    useResourceContext,
} from 'ra-core'

import Confirm from '../layout/Confirm'
import Button from './Button'

const DeleteWithConfirmButton = props => {
    const {
        basePath,
        className,
        //icon = defaultIcon,
        mutationMode,
        onClick,
        record,
        redirect = 'list',
        onSuccess,
        onFailure,
        confirmTitle = 'ra.message.delete_title',
        confirmContent = 'ra.message.delete_content',
        ...rest
    } = props

    const resource = useResourceContext(props)
    const {
        open,
        loading,
        handleDialogOpen,
        handleDialogClose,
        handleDelete,
    } = useDeleteWithConfirmController({
        record,
        redirect,
        basePath,
        mutationMode,
        onClick,
        onSuccess,
        onFailure,
        resource,
    })

    return (
        <>
            <Button
                onClick={handleDialogOpen}
                className={classnames(
                    'ra-delete-button',
                    className
                )}
                {...rest}
            />
            <Confirm
                isOpen={open}
                loading={loading}
                title={confirmTitle}
                content={confirmContent}
                onConfirm={handleDelete}
                onClose={handleDialogClose}
            />
        </>
    )
}

//const defaultIcon = <DeleteIcon />

export default DeleteWithConfirmButton
