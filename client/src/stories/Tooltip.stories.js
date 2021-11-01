import { BootstrapTooltip, Tooltip } from '../theme/components';
// import AddIcon from '@mui/icons-material/Add';
// import { select, config2template_args } from "./common"

export default {
  title: 'Tooltip',
  component: BootstrapTooltip,
  argTypes: {

  }
};

export const Template = (args) => (
    <>
        <BootstrapTooltip {...args}>
            <button>
                Btn
            </button>
        </BootstrapTooltip>
        <Tooltip {...args}>
            <button>
                Default
            </button>
        </Tooltip>
    </>
);
Template.args = {
  title: "test",
};
