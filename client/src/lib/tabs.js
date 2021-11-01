import { useMemo } from "react"
import { Box } from '@mui/material'
import { useLocation, Switch, Route, Link, Redirect, matchPath } from "react-router-dom"
import { PageContent } from "../theme/components/content"
import { makeStyles } from '@mui/styles'
import { Tab, Tabs } from '../theme/components'

const removeTrailingSlash = (path) => {
  return path.charAt(path.length-1) === '/'
    ? path.slice(0, -1)
    : path
}

const useStyles = makeStyles(theme => ({
  content: {
    padding: "30px 24px",
  }
}))

// tab demo
// {
//   label: "Personal Account",
//   value: "/account",
//   component: () => <ProfilePersonalAccount />,
//   icon: <IconElement />,
//
//   exact: false,
//   fullHeight: false,
//   noContentPadding: false,
//
//   visible: () => true  // filter
// }


const LinkTabs = ({ basepath = "", tabs = [], fullHeight = false }) => {
    const {pathname} = useLocation()
    const classes = useStyles()

    const linkTabs = useMemo(
        () => tabs
            .filter( tab => tab.visible ? tab.visible() : true)
            .map( tab => ({ ...tab, value: basepath + removeTrailingSlash(tab.value) })),
        [tabs, basepath]
    )
    const path = useMemo(() => removeTrailingSlash(pathname), [pathname])
    /* eslint-disable */
    const active = useMemo(() => linkTabs.find(tab => matchPath(path, {
        path: tab.value,
        exact: tab.exact
    })), [pathname])

    if (!linkTabs.length) return null

    // if(!active) return <Redirect to={linkTabs[0].value} />

    return (
    <PageContent fullHeight={fullHeight || active.fullHeight} >
        <Tabs value={active.value} indicatorColor="primary" >
            {
              linkTabs.map(tab => <Tab icon={tab.icon} key={tab.value} label={tab.label} value={tab.value} component={Link} to={tab.value} />)
            }
        </Tabs>
        <Box className={active.noContentPadding ? "" : classes.content}>
            <Switch>
                { linkTabs.map( (tab) => {
                    const Component = tab.component
                    return (
                        <Route path={tab.value} key={tab.value} exact={tab.exact} >
                            <Component path={tab.value} />
                        </Route>
                    )
                })}
                <Redirect to={linkTabs[0].value} />
            </Switch>
        </Box>
    </PageContent>
    )
}

export default LinkTabs
