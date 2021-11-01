import { Box, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import { Stack } from "../../lib/others"
import { ReactComponent as WarningIcon } from '../../assets/images/warning.svg'

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap"
    },
    aside: {
        width: "184px",
        paddingRight: "24px"
    },
    content: {
        flex: 1
    },
    title: ({ titleVariant }) => {
        let lineHeight
        switch(titleVariant) {
            case 'subtitle1': lineHeight = '1.75'; break;
            default: lineHeight = '1.6'; break;
        }
        return  {
            color: theme.palette.grey[500],
            lineHeight
        }
    },
    pageTitle: {
        fontSize: "34px",
        lineHeight: "1.24",
        letterSpacing: "0.25px",
        fontWeight: "normal",
        color: theme.palette.grey[900],
        marginBottom: "26px",
        marginLeft: "-1px"
    },
    warningContainer: {
        width: "68px",
        height: "68px",
        backgroundColor: theme.palette.orange[50],
        borderRadius: "4px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    warningIcon: {
        color: theme.palette.orange[500]
    },
    pageContent: {
        backgroundColor: theme.palette.white
    }
}))

export const SectionWithTitle = ({ title, children, titleVariant }) => {
    const classes = useStyles({titleVariant})

    return (
        <Box className={classes.root}>
            <div className={classes.aside}>
                <Typography variant={titleVariant} className={classes.title}>
                    { title }
                </Typography>
            </div>
            <div className={classes.content}>
                { children }
            </div>
        </Box>
    )
}

SectionWithTitle.defaultProps = {
    titleVariant: 'h6'
}

export const PageTitle = ({ children }) => {
    const classes = useStyles()

    return (
        <Typography variant="h4" className={classes.pageTitle}>
            { children }
        </Typography>
    )
}

export const WarningMessage = ({ text, children, textWidth = "100%" }) => {
    const classes = useStyles()

    return (
        <Stack direction='row' marginBottom="50px">
            <div className={classes.warningContainer}>
                <WarningIcon className={classes.warningIcon} />
            </div>
            <Box marginLeft={6}>
                <Box width={textWidth}>
                    <Typography variant="body1">
                        { text }
                    </Typography>
                </Box>

                { children }
            </Box>
        </Stack>
    )
}

export const PageContent = ({ children, fullHeight }) => {
    const classes = useStyles()

    return (
        <Box className={classes.pageContent} height={fullHeight ? "100%" : "auto"}>
            { children }
        </Box>
    )
}