import * as React from 'react';
import { memo } from 'react';
import { TableCell, TableSortLabel } from '@mui/material';
import { TextFieldTable } from '../../theme/components'
import { capitalize } from '../../lib/common'

export const DatagridHeaderCell = (props) => {
    const {
        className,
        field,
        currentSort,
        updateSort,
        isSorting,
        size,
        ...rest
    } = props;
    const is_active = currentSort.field === (field.props.sortBy || field.props.source)
    const getValue = () => {
        if (field && field.props)
            return field.props.label || capitalize( field.props.source)
        }
    return (
        <TableCell
            className={className}
            align={field.props.textAlign}
            variant="head"
            {...rest}
        >
            <TextFieldTable size={size}
                getValue={getValue}
                endAdornmentIsElement
                endAdornment = {
                    updateSort &&
                    field.props.sortable !== false &&
                    (field.props.sortBy || field.props.source) ? (
                        <TableSortLabel
                            active={is_active}
                            direction ={(is_active && currentSort.order) === 'ASC' ? 'asc' : 'desc'}
                            data-sort ={field.props.sortBy || field.props.source} // @deprecated. Use data-field instead.
                            data-field={field.props.sortBy || field.props.source}
                            data-order={field.props.sortByOrder || 'ASC'}
                            onClick={updateSort}
                        />
                    ) : (
                        <div></div>
                    )
                }
            />
        </TableCell>
    )
}

export default memo(
    DatagridHeaderCell,
    (props, nextProps) =>
        props.updateSort === nextProps.updateSort &&
        props.currentSort.field === nextProps.currentSort.field &&
        props.currentSort.order === nextProps.currentSort.order &&
        props.isSorting === nextProps.isSorting &&
        props.resource === nextProps.resource
)
