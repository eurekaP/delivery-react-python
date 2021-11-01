import { makeStyles } from "@material-ui/core"
import Modal from '@material-ui/core/Modal'

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: "red",
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
}))

export const ModalWidget = ({ open, handleClose, children }) => {
    const classes = useStyles()

    return (
        <Modal
            open={open}
            onClose={handleClose}
            className={classes.root}
        >
            <div className={classes.paper}>
                { children }
            </div>
        </Modal>
    )
}
