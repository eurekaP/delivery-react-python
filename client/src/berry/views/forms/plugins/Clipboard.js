import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// material-ui
import { Button, CardContent, Grid, IconButton, InputAdornment, TextField, Tooltip } from '@material-ui/core';

// third-party
import { CopyToClipboard } from 'react-copy-to-clipboard';

// project imports
import MainCard from '../../../ui-component/cards/MainCard';
import SecondaryAction from '../../../ui-component/cards/CardSecondaryAction';
import SubCard from './../../../ui-component/cards/SubCard';
import { SNACKBAR_OPEN } from './../../../store/actions';
import { gridSpacing } from './../../../store/constant';

// assets
import ContentCopyTwoToneIcon from '@material-ui/icons/ContentCopyTwoTone';
import ContentCutTwoToneIcon from '@material-ui/icons/ContentCutTwoTone';
import LinkIcon from '@material-ui/icons/Link';

//-----------------------|| PLUGIN - COPY TO CLIPBOARD ||-----------------------//

const ClipboardPage = () => {
    const dispatch = useDispatch();

    const [text1, setText1] = useState('https://berrydashboard.io/');
    const [text2, setText2] = useState(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    );
    const [text3] = useState(
        'Lorem ipsum cacilds, vidis litro abertis. Consetis adipiscings elitis. Pra lá , depois divoltis porris, paradis. Paisis, filhis, espiritis santis. Mé faiz elementum girarzis, nisi eros vermeio, in elementis mé pra quem é amistosis quis leo. Manduma pindureta quium dia nois paga.'
    );

    return (
        <MainCard
            title="Clipboard"
            secondary={
                <SecondaryAction icon={<LinkIcon fontSize="small" />} link="https://www.npmjs.com/package/react-copy-to-clipboard" />
            }
        >
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <SubCard title="Copy from TextField">
                        <TextField
                            fullWidth
                            label="Website"
                            type="text"
                            value={text1}
                            onChange={(e) => {
                                setText1(e.target.value);
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <CopyToClipboard
                                            text={text1}
                                            onCopy={() =>
                                                dispatch({
                                                    type: SNACKBAR_OPEN,
                                                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                                                    transition: 'SlideLeft',
                                                    open: true,
                                                    message: 'Text Copied',
                                                    variant: 'alert',
                                                    alertSeverity: 'success',
                                                    close: false
                                                })
                                            }
                                        >
                                            <Tooltip title="Copy">
                                                <IconButton aria-label="Copy from another element" edge="end">
                                                    <ContentCopyTwoToneIcon sx={{ fontSize: '1.1rem' }} />
                                                </IconButton>
                                            </Tooltip>
                                        </CopyToClipboard>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </SubCard>
                </Grid>
                <Grid item xs={12} md={6}>
                    <SubCard title="Copy from TextArea">
                        <TextField
                            multiline
                            rows={4}
                            fullWidth
                            label="Copy text"
                            onChange={(e) => setText2(e.target.value)}
                            value={text2}
                            sx={{ mb: gridSpacing }}
                        />
                        <CopyToClipboard
                            text={text2}
                            onCopy={() =>
                                dispatch({
                                    type: SNACKBAR_OPEN,
                                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                                    transition: 'SlideLeft',
                                    open: true,
                                    message: 'Text Copied',
                                    variant: 'alert',
                                    alertSeverity: 'success',
                                    close: false
                                })
                            }
                        >
                            <Button variant="contained" size="small" sx={{ mr: 1.5 }}>
                                <ContentCopyTwoToneIcon sx={{ fontSize: '1rem', mr: 1 }} /> Copy
                            </Button>
                        </CopyToClipboard>
                        <CopyToClipboard
                            text={text2}
                            onCopy={() => {
                                setText2('');
                                dispatch({
                                    type: SNACKBAR_OPEN,
                                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                                    transition: 'SlideLeft',
                                    open: true,
                                    message: 'Text Cut',
                                    variant: 'alert',
                                    alertSeverity: 'success',
                                    close: false
                                });
                            }}
                        >
                            <Button variant="contained" size="small" color="secondary">
                                <ContentCutTwoToneIcon sx={{ fontSize: '1rem', mr: 1 }} /> Cut
                            </Button>
                        </CopyToClipboard>
                    </SubCard>
                </Grid>
                <Grid item xs={12} md={6}>
                    <SubCard
                        title="Copy from Container"
                        secondary={
                            <CopyToClipboard
                                text={text3}
                                onCopy={() =>
                                    dispatch({
                                        type: SNACKBAR_OPEN,
                                        anchorOrigin: { vertical: 'top', horizontal: 'right' },
                                        transition: 'SlideLeft',
                                        open: true,
                                        message: 'Text Copied',
                                        variant: 'alert',
                                        alertSeverity: 'success',
                                        close: false
                                    })
                                }
                            >
                                <Tooltip title="Copy">
                                    <Button variant="contained" sx={{ mr: 1.5, px: 1, minWidth: 'auto' }}>
                                        <ContentCopyTwoToneIcon sx={{ fontSize: '1rem' }} />
                                    </Button>
                                </Tooltip>
                            </CopyToClipboard>
                        }
                    >
                        <CardContent sx={{ p: '0px', pb: '20px' }}>{text3}</CardContent>
                    </SubCard>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default ClipboardPage;
