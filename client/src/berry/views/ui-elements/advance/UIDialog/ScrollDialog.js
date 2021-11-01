import React from 'react';

// material-ui
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@material-ui/core';

//===============================|| UI DIALOG - SCROLLABLE ||===============================//

export default function ScrollDialog() {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <div>
            <Button onClick={handleClickOpen('paper')}>Content Scroll</Button>
            <Button onClick={handleClickOpen('body')}>Body Scroll</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle disableTypography id="scroll-dialog-title">
                    <Typography variant="h4">Subscribe</Typography>
                </DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <Grid container spacing={3}>
                        <Grid item>
                            <Typography variant="body2">
                                {' '}
                                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
                                quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel
                                scelerisque nisl consectetur et.
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">
                                {' '}
                                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
                                quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel
                                scelerisque nisl consectetur et.
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">
                                {' '}
                                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
                                quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel
                                scelerisque nisl consectetur et.
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">
                                {' '}
                                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
                                quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel
                                scelerisque nisl consectetur et.
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">
                                {' '}
                                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
                                quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel
                                scelerisque nisl consectetur et.
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">
                                {' '}
                                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
                                quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel
                                scelerisque nisl consectetur et.
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">
                                {' '}
                                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
                                quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel
                                scelerisque nisl consectetur et.
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">
                                {' '}
                                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
                                quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel
                                scelerisque nisl consectetur et.
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">
                                {' '}
                                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
                                quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel
                                scelerisque nisl consectetur et.
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">
                                {' '}
                                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
                                quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel
                                scelerisque nisl consectetur et.
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">
                                {' '}
                                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
                                quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel
                                scelerisque nisl consectetur et.
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">
                                {' '}
                                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
                                quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel
                                scelerisque nisl consectetur et.
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">
                                {' '}
                                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
                                quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel
                                scelerisque nisl consectetur et.
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">
                                {' '}
                                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
                                quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel
                                scelerisque nisl consectetur et.
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">
                                {' '}
                                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
                                quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel
                                scelerisque nisl consectetur et.
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">
                                {' '}
                                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
                                quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel
                                scelerisque nisl consectetur et.
                            </Typography>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ pr: 2.5, pt: 2.5 }}>
                    <Button onClick={handleClose} color="error">
                        Cancel
                    </Button>
                    <Button variant="contained" size="small" onClick={handleClose} color="primary">
                        Subscribe
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
