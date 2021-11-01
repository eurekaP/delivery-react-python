import { Children, cloneElement, useCallback, isValidElement, useContext } from 'react'
import { Datagrid as RaDatagrid, DatagridBody as RaDatagridBody, /*DatagridHeaderCell*/ } from 'react-admin'
import { SearchValueContext } from './common'
import DatagridHeaderCell from './DatagridHeaderCell'
import { Checkbox, TextFieldTable } from '../../theme/components'
import { capitalize } from '../../lib/common'
import {
    TableCell,
    TableRow,
    TableHead as MuiTableHead
} from '@mui/material'
import {
    useListContext,
    useResourceContext,
} from 'ra-core'

const classnames = (...args) => args.join(' ')
const selectColCheckboxClassName = (size) => 'selectRowCheckbox size'+ capitalize( size)

export const DatagridRow = ({ record, resource, id, onToggleItem, children, selected, selectable, basePath, hasBulkActions, size }) => {
    const { searchedText } = useContext( SearchValueContext)
    const className = selected ? 'selected' : ''
    return (
        <TableRow key={id} className={className}>
            {
                hasBulkActions && (
                    <TableCell>
                        <TextFieldTable size={size} getValue={()=>{}} disablePadding>
                            <Checkbox
                                disablePadding
                                color="default"
                                disabled={!selectable}
                                controllerProps={{ disableMargins: true, fullWidth: true, centerContent: true }}
                                checked={selected}
                                onClick={event => onToggleItem(id, event)}
                            />
                        </TextFieldTable>
                    </TableCell>
                )
            }

            {Children.map(children, field => (
                <TableCell key={`${id}-${field.props.source}`}>
                    {cloneElement(field, {
                        record,
                        basePath,
                        resource,
                        searchedText,
                    })}
                </TableCell>
            ))}
        </TableRow>
    )
}

export const TableHead = (props) => {

    const {
        children,
        classes,
        className,
        hasExpand = false,
        hasBulkActions = false,
        isRowSelectable,
    } = props
    const resource = useResourceContext(props)

    const {
        currentSort,
        data,
        ids,
        onSelect,
        selectedIds,
        setSort,
    } = useListContext(props)

    const updateSortCallback = useCallback(
        event => {
            event.stopPropagation()
            const newField = event.currentTarget.dataset.field
            const newOrder =
                currentSort.field === newField
                    ? currentSort.order === 'ASC'
                        ? 'DESC'
                        : 'ASC'
                    : event.currentTarget.dataset.order

            setSort(newField, newOrder)
        },
        [currentSort.field, currentSort.order, setSort]
    )

    const updateSort = setSort ? updateSortCallback : null

    const handleSelectAll = useCallback(
        event => {
            if (event.target.checked) {
                const all = ids.concat(
                    selectedIds.filter(id => !ids.includes(id))
                )
                onSelect(
                    isRowSelectable
                        ? all.filter(id => isRowSelectable(data[id]))
                        : all
                )
            } else {
                onSelect([])
            }
        },
        [data, ids, onSelect, isRowSelectable, selectedIds]
    )

    const selectableIds = isRowSelectable
        ? ids.filter(id => isRowSelectable(data[id]))
        : ids

    return (
        <MuiTableHead className={classnames(className, classes.thead)}>
            <TableRow className={classnames(classes.row, classes.headerRow)}>
                {hasExpand && (
                    <TableCell
                        disablePadding
                        className={classnames(
                            classes.headerCell,
                            classes.expandHeader
                        )}
                    />
                )}
                {hasBulkActions && selectedIds && (
                    <TableCell
                        disablePadding
                        padding="checkbox"
                        className={ classnames( classes.headerCell, selectColCheckboxClassName( props.size)) }
                    >
                        <TextFieldTable size={props.size} getValue={()=>{}} disablePadding>
                            <Checkbox
                                disablePadding
                                color="default"
                                controllerProps={{ disableMargins: true, fullWidth: true, centerContent: true }}
                                className="select-all"
                                checked={
                                    selectedIds.length > 0 &&
                                    selectableIds.length > 0 &&
                                    selectableIds.every(id =>
                                        selectedIds.includes(id)
                                    )
                                }
                                onChange={handleSelectAll}
                            />
                        </TextFieldTable>
                    </TableCell>
                )}
                {Children.map(children, (field, index) =>
                    isValidElement(field) ? (
                        <DatagridHeaderCell
                            className={
                                /* tableHeadClassName works because Checkbox above has set the min-height/width */
                                classnames( classes.headerCell)//, tableHeadClassName( props.size))
                                }
                            size={props.size}
                            currentSort={currentSort}
                            field={field}
                            isSorting={
                                currentSort.field ===
                                (field.props?.sortBy ||
                                    field.prop?.source)
                            }
                            key={field.props.source || index}
                            resource={resource}
                            updateSort={updateSort}
                        />
                    ) : null
                )}
            </TableRow>
        </MuiTableHead>
    )
}

//TODO useContext 4 props.size
export const DatagridBody = props => (
    <RaDatagridBody {...props}
        row={ <DatagridRow size={props.size} />}
    />
)
const Datagrid = props => (
    <RaDatagrid {...props}
        body={ <DatagridBody size={props.size} />}
        header={ <TableHead  size={props.size} /> }
    />
)
export default Datagrid
