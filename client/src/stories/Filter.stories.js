import { Filter } from '../theme/components';
import AddIcon from '@mui/icons-material/Add';
import { config2template_args, select } from './common'
import { useState } from 'react';

const config = {
    title: 'Filter',
    component: Filter,
    argTypes: {
        leadingIcon: select([false, true]),
        trailingIcon: select([false, true]),
    }
}

let options = [
    {label: 'test1 test1 test1 test1 test1 test1 test1 test1 test1', value: 1},
    {label: 'test 2 test 2 test 2 test 2 test 2 test 2 test 2 test 2 test 2', leadingIcon: AddIcon, value: 2},
    {label: 'test3', value: 3, disabled: true},
    {label: 'test 4', value: 4},
    {label: 'test5', value: 5},
    {label: 'test 6', value: 6},
    {label: 'test 7', value: 7},
    {label: 'test 8', value: 8},
    {label: 'test 9', value: 9},
    {label: 'test 99', value: 99},
    {label: 'test 999', value: 999},

]

// options = options.map((option) => ({
//     ...option,
//     content: () => (
//         <>
//             <Checkbox label={option.label} />
//         </>
//     )
// }))

// options = options.map(option => ({
//     ...option,
//     leadingIcon: AddIcon
// }))

export default config

export const Template = ({showHelperText, helperText, leadingIcon, trailingIcon, value, showTextFields, open, ...args}) => {

    const [val, setVal] = useState()

    const icons = {
        ...(leadingIcon && { leadingIcon: <AddIcon /> }),
        ...(trailingIcon && { trailingIcon: <AddIcon /> }),
    }

    const props = {
      ...args,
      ...icons,
     // open: true
      value: val,
    //   defaultValue: val,
       onChange: (name, value) => {
        setVal(value)
       },
    }

    return (
        <>
            <br/><br/>
            <Filter {...props} options={options} />
            <br/><br/>
            
        </>
    )
}
Template.args = {
  ...config2template_args(config),
  value: "",
};
