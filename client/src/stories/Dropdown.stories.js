import { Dropdown, TextField } from '../theme/components';
import AddIcon from '@mui/icons-material/Add';
import { config2template_args, select } from './common'
import { useState } from 'react';

const config = {
    title: 'Dropdown',
    component: Dropdown,
    argTypes: {
        allowFilter: select([false, true]),
        multiple: select([false, true]),
        size: select(["medium", "small"]),
        disabled: select([false, true]),
        error: select([false, true]),
        optionsSize: select(['medium', 'small']),
        shrinkable: select([false, true]),
        required: select([false, true]),
        readOnly: select([false, true]),
        showHelperText: select([false, true]),
        leadingIcon: select([false, true]),
        trailingIcon: select([false, true]),
        variant: select(['standard', 'outlined', 'filled']),
        disableClearable: select([true, false]),
        fullWidth: select([false, true]),
        helperTextFree: select([false, true]),
        helperTextOverflow: select([false, true]),
        showTextFields: select([false, true])
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

    // useEffect(() => {
    //     setTimeout(() => {
    //         console.log('timeout')
    //         setOptions(oldOptions => {
    //             const a = [...oldOptions]
    //             a.pop()
    //             return a
    //         })
    //     }, 5000)
    // }, [])

    const props = {
      ...args,
      ...icons,
      ...(showHelperText && { helperText }),
      open: true,
      value: val,
    //   defaultValue: val,
       onChange: (name, value) => {
          // console.log(value)
        setVal(value)
       },
    }
    //console.log('props: ', props)
    return (
        <>

            {
                showTextFields && (
                    <TextField {...icons} size={args.size} variant={args.variant} error={args.error} disabled={args.disabled} label={args.label} />
                )
            }
            
                <br/><br/>
                <Dropdown {...props} options={options} />
                <br/><br/>

            {
                showTextFields && (
                    <TextField {...icons} size={args.size} variant={args.variant} error={args.error} disabled={args.disabled} label={args.label} />
                )
            }

         
            
        </>
    )
}
Template.args = {
  ...config2template_args(config),
  value: "",
  helperText: 'Helper Text',
  label: 'Label'
};
