import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { ButtonBase, Card, CardContent, CardMedia, Grid, Menu, MenuItem, Typography } from '@material-ui/core';

// project imports
import Avatar from './../../ui-component/extended/Avatar';
import { gridSpacing } from './../../store/constant';

// assets
import MoreVertTwoToneIcon from '@material-ui/icons/MoreVertTwoTone';
import EventTwoToneIcon from '@material-ui/icons/EventTwoTone';

const backImage = require.context('./../../assets/images/profile', true);

// style constant
const useStyles = makeStyles((theme) => ({
    followerBlock: {
        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
        border: theme.palette.mode === 'dark' ? 'none' : '1px solid',
        borderColor: theme.palette.grey[100]
    },
    avatarRight: {
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
        color: theme.palette.mode === 'dark' ? theme.palette.dark.light : theme.palette.secondary.dark,
        zIndex: 1,
        transition: 'all .2s ease-in-out',
        '&[aria-controls="menu-list-grow"],&:hover': {
            background: theme.palette.secondary.main,
            color: theme.palette.secondary.light
        }
    },
    galleryTitle: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        marginBottom: '5px'
    }
}));

//-----------------------|| SOCIAL PROFILE - GALLERY CARD ||-----------------------//

const GalleryCard = ({ dateTime, image, title }) => {
    const classes = useStyles();
    let backProfile = image && backImage(`./${image}`).default;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card className={classes.followerBlock}>
            <CardMedia component="img" image={backProfile} title="Slider5 image" />
            <CardContent sx={{ p: 2, pb: '16px !important' }}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs zeroMinWidth>
                        <Typography variant="h5" className={classes.galleryTitle}>
                            {title}
                        </Typography>
                        <Typography variant="caption" sx={{ mt: 1, fontSize: '12px' }}>
                            <EventTwoToneIcon sx={{ mr: 0.5, fontSize: '0.875rem', verticalAlign: 'text-top' }} />
                            {dateTime}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <ButtonBase sx={{ borderRadius: '12px' }} onClick={handleClick}>
                            <Avatar variant="rounded" className={classes.avatarRight} aria-controls="menu-post" aria-haspopup="true">
                                <MoreVertTwoToneIcon fontSize="inherit" />
                            </Avatar>
                        </ButtonBase>

                        <Menu
                            id="menu-gallery-card"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            variant="selectedMenu"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right'
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                        >
                            <MenuItem onClick={handleClose}> Remove Tag</MenuItem>
                            <MenuItem onClick={handleClose}> Download</MenuItem>
                            <MenuItem onClick={handleClose}> Make Profile Picture </MenuItem>
                            <MenuItem onClick={handleClose}> Make Cover Photo </MenuItem>
                            <MenuItem onClick={handleClose}> Find Support or Report Photo </MenuItem>
                        </Menu>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

GalleryCard.propTypes = {
    dateTime: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string
};

export default GalleryCard;
