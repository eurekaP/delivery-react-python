import { addDecorator } from '@storybook/react';
import { ThemeProvider as TP } from "@mui/material/styles"  // need for default props
import muiTheme from "../src/theme"
import { ThemeProvider } from '@storybook/theming'  // need for storybook/motion

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
const theme = muiTheme()

addDecorator((story) => (
  <TP theme={theme}>
    <ThemeProvider theme={theme}>
      { story() }
    </ThemeProvider>
  </TP>
));