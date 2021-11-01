import classnames from 'classnames'
import { useCallback, useMemo, useState, memo } from 'react'
import { Typography, ButtonBase, Popover, MenuList } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { makeStyles } from '@mui/styles'
import { MenuItemWithSelectStatuses } from '../../theme/components'
import { useListPaginationContext } from 'ra-core'
import { PaginationCircle, PaginationArrow, CenterNumberInput } from './PaginationComponents'

const useStyles = makeStyles((theme) => ({
    topOuter: {
        display: 'inline-flex',
        alignItems: 'center',
        height: '100%',
    },
    topText: {
        '&.MuiTypography-root': {
            color: theme.palette.text.secondary,
            marginRight: '8px',
        }
    },
    topResultsPerPage: {
        marginRight: '4px',
        marginLeft: '16px',
    },
    topNumbers: {
        '&.MuiTypography-root': {
            fontWeight: 500,
            marginRight: '8px',
        }
    },
    topMarginR4: {
        '&.MuiTypography-root': {
            marginRight: '4px',
        }
    },
    topNoMarginR: {
        '&.MuiTypography-root': {
            marginRight: 0,
        }
    },
    topPerPage:{
        zwidth: '50px'
    },
    topOpenPerPageArea: {
        display: 'inline-flex',
        borderRadius: theme.shape.borderRadius,
        marginRight: '16px'
    },

    botOuter: {
        display: 'inline-flex',
        alignItems: 'center',
        marginTop: '24px',
        marginBottom: '24px',
        '& > *': {
            padding: '8px',
            marginRight: '4px',
        }
    },
}))


const calcTotalPages = (total, perPage) => Math.ceil(total / perPage) || 1

const PaginationTopC = (props) => {
    const { rowsPerPageOptions, className } = props
    const classes = useStyles()

    const {
        page,
        perPage,
        total,
        setPage,
        setPerPage,
    } = useListPaginationContext( props)

    const totalPages = useMemo(() => {
        return calcTotalPages( total, perPage)
    }, [perPage, total]);

    /* eslint-disable */
    const handlePageChange = useCallback(
        (event, page) => {
            event && event.stopPropagation();
            if (page < 0 || page > totalPages - 1) {
                throw new Error( 'Problem '+ page+1 )
            }
            setPage( page + 1);
        },
        [totalPages, setPage]
    )

    const goNext = () => { setPage( page + 1) }
    const goPrev = () => { setPage( page - 1) }

    /*
    const handlePerPageChange = useCallback(
        event => {
            setPerPage(event.target.value);
        },
        [setPerPage]
    )
    */

    var current_page_max  = perPage * page
    if (current_page_max > total)
        current_page_max = total
    const current_page_first = ((page - 1) * perPage) + 1


    const [perPagePopoverAnchorEl, setPerPagePopoverAnchorEl] = useState( null)
    const perPagePopoverParentClick = ( event) => {
        setPerPagePopoverAnchorEl( event.currentTarget)
    }
    const perPagePopoverClose = () => {
        setPerPagePopoverAnchorEl( null)
    }
    const open = Boolean( perPagePopoverAnchorEl)
    const id = open ? 'simple-perPagePopover' : undefined

    const perPageMenuItemOnClick = ( v) => {
        setPerPage( v)
        perPagePopoverClose()
        }
    const perPageOptions = rowsPerPageOptions.map( v => (
        <MenuItemWithSelectStatuses
            size='small'
            multiple={false}
            selected={v === perPage}
            onClick={() => perPageMenuItemOnClick( v)}
        >
            {v}
        </MenuItemWithSelectStatuses>
    ))
    const perPageMenu = <MenuList>{perPageOptions}</MenuList>

    return (
        <div className={classnames( className, classes.topOuter)}>
            <Typography variant='body1' className={classes.topText}>
                Showing
            </Typography>
            <Typography variant='body1' className={classes.topNumbers}>
                {current_page_first +'-'+ current_page_max}
            </Typography>
            <Typography variant='body1' className={classes.topText}>
                of
            </Typography>
            <Typography variant='body1' className={classes.topNumbers}>
                {total +' Results'}
            </Typography>
            <PaginationArrow onClick={goPrev} disabled={page === 1 } isPrev  className={classes.topNoMarginR} />
            <PaginationArrow onClick={goNext} disabled={page === totalPages} className={classes.topNoMarginR} />
            <Typography variant='body1' className={classnames( classes.topText, classes.topResultsPerPage)}>
                Results Per Page:
            </Typography>
            <ButtonBase
                onClick={perPagePopoverParentClick}
                className={classes.topOpenPerPageArea}
            >
                <Typography variant='body1' className={classnames( classes.topNumbers, classes.topMarginR4)}>
                    {perPage}
                </Typography>
                <ArrowDropDownIcon />
            </ButtonBase>
            <Popover
                id={id}
                open={open}
                anchorEl={perPagePopoverAnchorEl}
                onClose={perPagePopoverClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                {perPageMenu}
            </Popover>
        </div>
    )
}

PaginationTopC.defaultProps = {
    rowsPerPageOptions: [1, 2, 5, 10, 25],
}

export const PaginationTop = memo( PaginationTopC)


const PaginationBottomC = (props) => {
    const { rowsPerPageOptions, actions, limit } = props;
    const classes = useStyles()

    const {
        page,
        perPage,
        total,
        setPage,
    } = useListPaginationContext(props)

    const totalPages = calcTotalPages( total, perPage)

    const handlePageChange = useCallback(
        (event, page) => {
            event && event.stopPropagation()
            if (page < 0 || page > totalPages - 1) {
                throw new Error( 'Problem '+ page +1 )
            }
            setPage( page + 1)
        },
        [totalPages, setPage]
    )

    const goNext = () => { setPage( page + 1) }
    const goPrev = () => { setPage( page - 1) }
    const goPage = (nextPage) => { setPage( nextPage) }

    const makePaginationCircleEl = ( elPage) => (
        <>
        <PaginationCircle
            onClick={ () => goPage( elPage) }
            isCurrent={elPage === page}
            value={elPage}
        />
        </>
    )

    const elements = []
    if ( totalPages <= 9) {
        for ( let i = 1; i <= totalPages; i++) {
            elements.push( makePaginationCircleEl( i))
        }
    }
    else {
        const addNumberElements = ( startPage) => {
            for ( let i = startPage; i < startPage + 4; i++) {
                elements.push( makePaginationCircleEl( i))
            }
        }

        var firstPage  = page - 4 > 0 ? page - 4 : 1
        if ( firstPage + 8 > totalPages)
            firstPage = totalPages - 8
        addNumberElements( firstPage)

        const centerPage = firstPage + 4
        elements.push(
            <CenterNumberInput
                goPage={goPage}
                style={{color: 'red'}}
                value={centerPage}
                page={page}
                max={totalPages}
            />
        )

        addNumberElements( centerPage + 1)
    }

    return (
        <div className={classes.botOuter}>
            <PaginationArrow onClick={goPrev} disabled={page === 1 } isPrev/>
            {elements}
            <PaginationArrow onClick={goNext} disabled={page === totalPages}/>
        </div>
        )
}

export const PaginationBottom = memo( PaginationBottomC)

// vim:ts=4:sw=4:expandtab
