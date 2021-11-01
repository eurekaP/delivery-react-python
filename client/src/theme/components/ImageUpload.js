import { makeStyles, Box, Typography, LinearProgress, /*Avatar*/  } from "@material-ui/core"
import { alpha } from '@mui/material/styles'
import { useDropzone } from 'react-dropzone'
import { useState, useMemo } from "react"
import { ReactComponent as CameraIcon } from "../../assets/images/camera.svg"
import { ReactComponent as UploadIcon } from "../../assets/images/upload.svg"
//import { ReactComponent as DeleteIcon } from "../assets/images/delete.svg"
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { Avatar } from "."

const useStyles = makeStyles(theme => ({
    root: {
        borderRadius: "6px",
        padding: "8px",
        display: "flex",
        alignItems: "center",
        borderWidth: "1px",
        borderStyle: "dashed",
        borderColor: "transparent",
        cursor: "pointer",
        "&:hover, &:active, &.isDragAccept, &:focus": {
            borderColor: theme.palette.blue[200],
            "& $imageContainer": {
                boxShadow: '0 0 0 3px '+ alpha( theme.palette.primary.main, 0.5)
            },
            "& $imageContainer .MuiAvatar-root:hover, &.disabled $imageContainer": {
                boxShadow: 'none',
            },
        },
        "&:active, &.isDragAccept, &:focus": {
            backgroundColor: theme.palette.blue[50],
        },
        "&:focus": {
            outline: 'none'
        },
        '&.disabled': {
            borderColor: theme.palette.action.disabled,
        },
        '&.disabled .MuiTypography-root': {
            color: theme.palette.action.disabled,
        },
    },
    imageContainer: {
        backgroundColor: theme.palette.grey[50],
        borderRadius: "50%",
        marginRight: theme.spacing(4),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexShrink: 0
    },
    removeText: {
        color: theme.palette.grey[300],
        marginLeft: theme.spacing(5)
    },
    title: {
        color: theme.palette.grey[900],
        fontSize: "16px",
        lineHeight: "1.5",
        letterSpacing: "0.15px"
    },
    progress: {
        width: "210px",
        maxWidth: "100%",
        height: "8px",
        borderRadius: "20px",
        backgroundColor: theme.palette.grey[50],
        "& .MuiLinearProgress-bar": {
            borderRadius: "20px"
        }
    },
    deletingProgress: {
        backgroundColor: theme.palette.red[50],
        '& .MuiLinearProgress-barColorPrimary': {
            backgroundColor: theme.palette.error.main
        }
    },
    uploadedTypography: {
        size: '13px',
        fontWeight: '500',
        letterSpacing: '0.46px',
    },
}))

const ImageUpload = ({ title, titleOnUpload, titleOnDelete,
    accept = 'image/jpeg, image/png, image/gif', maxFiles = 1,
    image, onDropAccepted, onDropRejected, onImageRemove, readOnly
    }) => {

    const [progress,  setProgress ] = useState(0)
    const [uploading, setUploading] = useState(false)
    /* eslint-disable */
    const [deleting,  setDeleting ] = useState(false)

    const classes = useStyles()
    const {
        isDragAccept,
        //isDragReject,
        getRootProps,
        getInputProps
    } = useDropzone({
        disabled: readOnly,
        accept,
        maxFiles,
        onDropRejected,
        onDropAccepted: (files) => {
            setUploading(true)
            onDropAccepted?.(files, {
                onUploadProgress: ({loaded, total}) => {
                    if (total === loaded) {
                        setUploading(false)
                        setProgress(0)
                    } else {
                        setProgress(100 - ((total - loaded) / total * 100))
                    }
                }
            })
        },
    })

    const imageRemove = async (event) => {
        event.stopPropagation()
        onImageRemove?.()
    }

    const imageComponent = useMemo(() => {
        const size = { size: 'extraLarge' }
        if (uploading) {
            return <Avatar src={image} alt='avatar' {...size} type="icon" children={ <UploadIcon /> } />
        }
        if (deleting) {
            return <Avatar src={image} alt='avatar' {...size} type="deletingIcon" children={ <DeleteOutlinedIcon /> } />
        }
        if (image) {
            return <Avatar src={image} alt='avatar' {...size} />
        }
        return <Avatar src={image} alt='avatar' {...size} type="icon" children={ <CameraIcon /> } />
    }, [uploading, image, deleting])

    const contentComponent = useMemo(() => {
        if (uploading) {
            return <LinearProgress variant="determinate" value={progress} className={classes.progress} />
        }
        if (deleting) {
            return <LinearProgress variant="determinate" value={progress} className={classes.progress +' '+ classes.deletingProgress } />
        }
        if (image) {
            return (
                <div>
                    <Typography variant="body2" component="span" color="primary"
                        className={classes.uploadedTypography}
                    >UPLOAD NEW</Typography>
                    <Typography variant="body2" component="span" onClick={imageRemove}
                        className={classes.removeText +' '+ classes.uploadedTypography}
                    >REMOVE</Typography>
                </div>
            )
        }
        return <Typography variant="body2" color="primary" className={classes.uploadText} >Upload or Drag and Drop an Image</Typography>
    }, [uploading, image, progress, deleting])

    var title_text = title
    if (uploading)
        title_text = titleOnUpload
    else if (deleting)
        title_text = titleOnDelete

    return (
        <Box className={`${classes.root} ${isDragAccept ? "isDragAccept" : ""} ${readOnly ? "disabled" : ""}`}
            {...(readOnly ? {} : getRootProps())}
        >
            { !readOnly && (<input {...getInputProps()} />) }
            <div className={classes.imageContainer}>
                { imageComponent }
            </div>
            <div>
                <Typography variant="body1">{ title_text }</Typography>
                { contentComponent }
            </div>
        </Box>
    )
}

export default ImageUpload
