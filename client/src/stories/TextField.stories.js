import { TextField } from '../theme/components';
import AddIcon from '@mui/icons-material/Add';
import { config2template_args, select } from './common'

const config = {
    title: 'TextField',
    component: TextField,
    argTypes: {
      size: select(["medium", "small"]),
      required: select([false, true]),
      disabled: select([false, true]),
      error: select([false, true]),
      showHelperText: select([false, true]),
      leadingIcon: select([false, true]),
      trailingIcon: select([false, true]),
      variant: select(['standard', 'outlined', 'filled']),
      fullWidth: select([false, true]),
      helperTextFree: select([false, true]),
      helperTextOverflow: select([false, true])
    }
  }

export default config

export const Template = ({showHelperText, helperText, leadingIcon, trailingIcon, value, ...args}) => {

    const props = {
      ...args,
      ...(leadingIcon && { leadingIcon: <AddIcon /> }),
      ...(trailingIcon && { trailingIcon: <AddIcon /> }),
      ...(showHelperText && { helperText }),
      // value: val || value,
      // onChange: (_, e) => setVal(e.target.value),
    }

    return (
        <>
          <TextField {...props} />
          <br/>
          <br/>
          <TextField {...props}  variant="filled" />
          <br/>
          <br/>
          <TextField {...props}  variant="outlined" />
          <br/>
          <br/>
          <TextField {...props}  variant="standard" />
        </>
    )
}
Template.args = {
  ...config2template_args(config),
  value: "",
  helperText: 'Helper Text',
  label: 'Label',
  InputProps: {},
};
