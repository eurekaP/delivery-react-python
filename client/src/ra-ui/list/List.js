import * as React from 'react';
import { cloneElement, useState, useContext } from 'react'
import {
    ListBase,
    ListToolbar,
    Title,
    useListContext,
    FilterContext,
    FilterForm,
} from 'react-admin';
import { Divider } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { SearchValueContext } from './common'
import { PaginationTop, PaginationBottom } from "./Pagination"
import { SearchBar } from './../../theme/components'

import { useInput } from 'react-admin'

const useStyles = makeStyles((theme) => ({
    searchPaginationTopRow: {
        paddingTop: '16px',
        paddingBottom: '16px',
        height: '72px',
        display: 'flex',
    },
    paginationTop: {
        marginLeft: 'auto',
    },
    paginationBottomRow: {
        paddingTop: '14px',
    },
}))


const SearchBar4List = (props) => {
    const { setSearchedText4Context } = useContext( SearchValueContext)
    const { setFilters, displayedFilters, filterValues } = useListContext( props)

    const classes = useStyles()

    const allowEmpty = true
    var input = useInput({
        ...props,
        ...(allowEmpty ? { parse: value => value, } : {})
    })
    /* eslint-disable */
    const {
        input: { name, onChange, value, ...rest },
        meta: { touched, error, submitError },
        isRequired,
    } = input

    const onChange4Search = (e) => {
        onChange( e)
        setSearchedText4Context( e.target.value)
    }
    const onClear = (...args) => {
        setFilters( {...filterValues, text: ''}, displayedFilters)
    }
    return <SearchBar {...props} onChange={onChange4Search}
        value={value}
        onClear={onClear}
        tclassName={classes.searchFilter} trailingIcon size="small" variant="outlined"
        />
}
// may work like in ReactAdmin if use EnhancedFilterForm
const SearchBarFilter = (props) => {
    return (
        <FilterContext.Provider value={[ <SearchBar4List source='text' alwaysOn /> ]}>
            <FilterForm />
        </FilterContext.Provider>
        )
}

const List = ({ children, actions, bulkActionButtons, filters, title, paginationProps, ...props}) => {
    const [ searchedText, setSearchedText4Context ] = useState('')
    const classes = useStyles()

    return (
        <SearchValueContext.Provider value={{ setSearchedText4Context, searchedText }}>
        <ListBase {...props}>
            <Title title={'Yooo'/*title*/}/>
            <ListToolbar
                filters={filters}
                actions={actions}
            />
                {/*
                <BulkActionsToolbar>
                    {bulkActionButtons}
                </BulkActionsToolbar>
                */}
                <Divider/>
                <div className={classes.searchPaginationTopRow}>
                    <SearchBarFilter {...props} filters={filters} />
                    <PaginationTop {...paginationProps} className={classes.paginationTop}/>
                </div>
                {/* not necessary to clone them, but need to give them "searchedText"*/
                 /* Nope Checkbox column disappears when not cloned */
                cloneElement( children, {
                    hasBulkActions: bulkActionButtons !== false,
                })}
                <div className={classes.paginationBottomRow}>
                    <PaginationBottom {...paginationProps}/>
                </div>
        </ListBase>
        </SearchValueContext.Provider>
    )
}
export default List
