import React from 'react';

// material-ui
import { Divider, Grid, Typography } from '@material-ui/core';

// project imports
import SubCard from './../../../ui-component/cards/SubCard';
import Accordion from './../../../ui-component/extended/Accordion';
import MainCard from './../../../ui-component/cards/MainCard';
import SecondaryAction from './../../../ui-component/cards/CardSecondaryAction';
import { gridSpacing } from './../../../store/constant';

// assets
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import FaceTwoToneIcon from '@material-ui/icons/FaceTwoTone';
import DomainTwoToneIcon from '@material-ui/icons/DomainTwoTone';
import MonetizationOnTwoToneIcon from '@material-ui/icons/MonetizationOnTwoTone';

// accordion data
const basicData = [
    {
        id: 'basic1',
        title: 'Accordion #1',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.'
    },
    {
        id: 'basic2',
        title: 'Accordion #2',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.'
    },
    {
        id: 'basic3',
        title: 'Accordion #3',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.'
    }
];

const disabledData = [
    {
        id: 'basic1',
        title: 'Accordion #1',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.'
    },
    {
        id: 'basic2',
        title: 'Accordion #2',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.'
    },
    {
        id: 'basic3',
        disabled: true,
        title: 'Accordion #3',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.'
    }
];

const defaultExpandData = [
    {
        id: 'basic1',
        defaultExpand: true,
        title: 'Accordion #1',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.'
    },
    {
        id: 'basic2',
        title: 'Accordion #2',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.'
    },
    {
        id: 'basic3',
        title: 'Accordion #3',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.'
    }
];

const fixedExpandData = [
    {
        id: 'basic1',
        title: 'Accordion #1',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.'
    },
    {
        id: 'basic2',
        expanded: true,
        title: 'Accordion #2',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.'
    },
    {
        id: 'basic3',
        title: 'Accordion #3',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.'
    }
];

const multipleExpandData = [
    {
        id: 'basic1',
        defaultExpand: true,
        title: 'Accordion #1',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.'
    },
    {
        id: 'basic2',
        title: 'Accordion #2',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.'
    },
    {
        id: 'basic3',
        defaultExpand: true,
        title: 'Accordion #3',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.'
    }
];

const customContentData = [
    {
        id: 'basic1',
        defaultExpand: true,
        title: (
            <React.Fragment>
                <FaceTwoToneIcon fontSize="small" color="primary" style={{ marginRight: '4px' }} />
                <Typography variant="subtitle1" color="primary">
                    Profile
                </Typography>
            </React.Fragment>
        ),
        content: (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="subtitle1">Joseph William</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item>
                    <Typography variant="span">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo
                        lobortis eget.
                    </Typography>
                </Grid>
            </Grid>
        )
    },
    {
        id: 'basic2',
        title: (
            <React.Fragment>
                <DomainTwoToneIcon fontSize="small" color="error" style={{ marginRight: '4px' }} />
                <Typography variant="subtitle1" color="error">
                    Address
                </Typography>
            </React.Fragment>
        ),
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.'
    },
    {
        id: 'basic3',
        title: (
            <React.Fragment>
                <MonetizationOnTwoToneIcon fontSize="small" color="secondary" style={{ marginRight: '4px' }} />
                <Typography variant="subtitle1" color="secondary">
                    Account Info
                </Typography>
            </React.Fragment>
        ),
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.'
    }
];

//=============================|| UI ACCORDION ||=============================//

const UIAccordion = () => {
    return (
        <MainCard title="Accordion" secondary={<SecondaryAction link="https://next.material-ui.com/components/accordion/" />}>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={6}>
                    <SubCard title="Basic Accordion">
                        <Accordion data={basicData} />
                    </SubCard>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <SubCard title="Disabled Accordion">
                        <Accordion data={disabledData} />
                    </SubCard>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <SubCard title="Default Expand Accordion">
                        <Accordion data={defaultExpandData} />
                    </SubCard>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <SubCard title="Fixed Expand Accordion">
                        <Accordion data={fixedExpandData} />
                    </SubCard>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <SubCard title="Controlled/Toggle Accordion">
                        <Accordion data={defaultExpandData} toggle defaultExpandedId="basic1" />
                    </SubCard>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <SubCard title="Square Accordion">
                        <Accordion data={defaultExpandData} square toggle defaultExpandedId="basic1" />
                    </SubCard>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <SubCard title="Multiple Expanded Accordion">
                        <Accordion data={multipleExpandData} />
                    </SubCard>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <SubCard title="Customize Accordion">
                        <Accordion expandIcon={<ArrowDropDownIcon />} data={customContentData} />
                    </SubCard>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default UIAccordion;
