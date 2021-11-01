import { makeStyles } from '@material-ui/styles'
import LinkTabs from '../lib/tabs'
import { PageTitle } from '../theme/components/content'
import { generatePath, Route } from  'react-router'
import config from '../config'
import { inject, observer } from 'mobx-react'
import CompanyAccount from "./company_account"
import CompanyInfo from '../base/company_info'
import { Resource } from 'ra-core'
import { MemberInvite, MemberList,
    //MemberListMedium, MemberListSmall,
    MemberShow } from '../members'
import { Box } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import { useState } from 'react'
import MemberInviteDialog from '../members/invite'
import { Button } from '../theme/components'


const useStyles = makeStyles(theme => ({
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start"
    },
    dropdownButton: {
        width: "42px",
        height: "42px",
        border: "1px solid " + theme.palette.grey[200],
        marginLeft: "13px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "4px",
        cursor: "pointer"
    }
}))


const CompanyPage = inject('auth')( observer( ({ auth }) => {
    const currentCompanyId = auth.currentCompanyId

    const basePath = currentCompanyId ? generatePath( config.urls.company, { company: currentCompanyId }) : config.urls.company
    const classes = useStyles()
    const [tabs] = useState([
        {
          label: "Company Info",
          value: "/",
          exact: true,
          component: CompanyInfo,
          fullHeight: true
        },
        {
          label: "Members",
          value: "/members",
          noContentPadding: true,
          component: ({ path }) => <Resource match={{ path }} name='members' intent='route'
                list={MemberList}
                create={MemberInvite}
                show={MemberShow}
            />
        },
        /*
        {
          label: "MembersMedium",
          value: "/membersMedium",
          noContentPadding: true,
          component: ({ path }) => <Resource match={{ path }} name='members' intent='route'
                list={MemberListMedium}
            />
        },
        {
          label: "MembersSmall",
          value: "/membersSmall",
          noContentPadding: true,
          component: ({ path }) => <Resource match={{ path }} name='members' intent='route'
                list={MemberListSmall}
            />
        },
        */
        {
            label: "Company Account",
            value: "/account",
            exact: true,
            component: CompanyAccount,
            fullHeight: true,
            visible: () => auth.isOwner
        }
    ])

    return (
        <>
            <div className={classes.header}>
                <PageTitle>
                    Company Settings
                </PageTitle>

                <Route path={basePath + "/members"}>
                    <Box display="flex" alignItems="center">
                        <InviteButton />
                        <div className={classes.dropdownButton}>
                            <KeyboardArrowDownIcon />
                        </div>
                    </Box>
                </Route>
            </div>
            <LinkTabs tabs={tabs} basepath={basePath} />
        </>
    )
}))


const InviteButton = () => {
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    return (
        <>
            <Button size="large" variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpen}>
                Invite New Member
            </Button>
            <MemberInviteDialog open={open} handleClose={handleClose} />
        </>
    )
}


export default CompanyPage
