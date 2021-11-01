import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { useTheme } from '@material-ui/core/styles';
import { Button, Collapse, Dialog, DialogContent, Grid, IconButton, Link, Slide, TextField, Typography } from '@material-ui/core';

// third-party
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// project imports
import { gridSpacing } from '../../../store/constant';

// assets
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import AttachmentTwoToneIcon from '@material-ui/icons/AttachmentTwoTone';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';
import UploadFileIcon from '@material-ui/icons/UploadFile';

import { IconArrowsDiagonal2 } from '@tabler/icons';

// animation
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

//-----------------------|| MAIL COMPOSE DIALOG ||-----------------------//

const ComposeDialog = () => {
    const theme = useTheme();

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleCloseDialog = () => {
        setOpen(false);
    };

    const [ccBccValue, setCcBccValue] = React.useState(false);
    const handleCcBccChange = (event, newValue) => {
        setCcBccValue((prev) => !prev);
    };

    let composePosition = {};

    const [position, setPosition] = React.useState(true);
    if (!position) {
        composePosition = {
            '& .MuiDialog-container': {
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                '& .MuiPaper-root': { mb: 0, borderRadius: '12px 12px 0px 0px', maxWidth: '595px' }
            }
        };
    }

    return (
        <React.Fragment>
            <Button
                variant="contained"
                onClick={handleClickOpen}
                sx={{ width: '100%' }}
                size="large"
                color="primary"
                startIcon={<AddCircleOutlineTwoToneIcon />}
            >
                Compose
            </Button>
            <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleCloseDialog} sx={composePosition}>
                <DialogContent>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" spacing={0}>
                                <Grid item sm zeroMinWidth>
                                    <Typography component="div" align="left" variant="h4">
                                        New Message
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <IconButton onClick={() => setPosition(!position)}>
                                        <IconArrowsDiagonal2 />
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <IconButton onClick={handleCloseDialog}>
                                        <HighlightOffTwoToneIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent="flex-end" spacing={0}>
                                <Grid item>
                                    <Link
                                        component={RouterLink}
                                        to="#"
                                        color={theme.palette.mode === 'dark' ? 'primary' : 'secondary'}
                                        onClick={handleCcBccChange}
                                    >
                                        CC & BCC
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="To" variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Subject" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sx={{ display: ccBccValue ? 'block' : 'none' }}>
                            <Collapse in={ccBccValue}>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs={12}>
                                        <TextField fullWidth label="CC" variant="outlined" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField fullWidth label="BCC" variant="outlined" />
                                    </Grid>
                                </Grid>
                            </Collapse>
                        </Grid>

                        {/* quill editor */}
                        <Grid
                            item
                            xs={12}
                            sx={{
                                '& .quill': {
                                    bgcolor: theme.palette.mode === 'dark' ? 'dark.main' : 'grey.50',
                                    borderRadius: '12px',
                                    '& .ql-toolbar': {
                                        bgcolor: theme.palette.mode === 'dark' ? 'dark.light' : 'grey.100',
                                        borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 20 : 'grey.400',
                                        borderTopLeftRadius: '12px',
                                        borderTopRightRadius: '12px'
                                    },
                                    '& .ql-container': {
                                        borderColor:
                                            theme.palette.mode === 'dark'
                                                ? theme.palette.dark.light + 20 + ' !important'
                                                : theme.palette.grey[400] + ' !important',
                                        borderBottomLeftRadius: '12px',
                                        borderBottomRightRadius: '12px',
                                        '& .ql-editor': {
                                            minHeight: '125px'
                                        }
                                    }
                                }
                            }}
                        >
                            <ReactQuill theme="snow" />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1} alignItems="center">
                                <Grid item>
                                    <IconButton>
                                        <UploadFileIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <IconButton>
                                        <AttachmentTwoToneIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item sx={{ flexGrow: 1 }} />
                                <Grid item>
                                    <Button variant="contained" color="primary">
                                        Reply
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};

export default ComposeDialog;
