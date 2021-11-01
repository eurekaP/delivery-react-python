import SettingsIcon from '@material-ui/icons/Settings'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
//import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import BusinessIcon from '@material-ui/icons/Business'
import { makeStyles } from '@material-ui/styles'
import { generatePath } from  'react-router'

import config from '../config'
import auth from '../auth/stores'
import { ReactComponent as TruckIcon } from '../assets/images/truck.svg'
import { ReactComponent as IssueIcon } from '../assets/images/issue.svg'
import { ReactComponent as CustomerIcon } from '../assets/images/group.svg'
import { ReactComponent as DescriptionIcon } from '../assets/images/description.svg'
import { ReactComponent as SummarizeIcon } from '../assets/images/summarize.svg'
import { ReactComponent as LogoutIcon } from '../assets/images/logout.svg'
import { ReactComponent as MyProfileIcon } from '../assets/images/my-profile.svg'


const icons = {
    trucks: TruckIcon,
    issues: IssueIcon,
    customers: CustomerIcon,
    work_orders: DescriptionIcon,
    reports: SummarizeIcon,
    settings: SettingsIcon,
    invitations: PersonAddIcon,
    company: BusinessIcon,
    profile: MyProfileIcon,
    logout: LogoutIcon,
}


export const issuesItems = () => ({
    id: 'groupIssues',
    type: 'group',
    children: [
        {
            id: 'issues',
            title: 'Issues',
            type: 'item',
            url: config.urls.blank,
            icon: icons.issues,
            breadcrumbs: false,
            chip: {
                label: '02',
            }
        }
    ]
})

export const workOrdersItems = () => ({
    id: 'groupWorkOrders',
    type: 'group',
    children: [
        {
            id: 'work_orders',
            title: 'Work Orders',
            type: 'item',
            url: config.urls.blank,
            icon: icons.work_orders,
            breadcrumbs: false
        }
    ]
})

/*
export const customersItems = () => ({
    id: 'groupCustomers',
    type: 'group',
    children: [
        {
            id: 'customers',
            title: 'Customers',
            type: 'item',
            url: config.urls.blank,
            icon: icons.customers,
            breadcrumbs: false
        }
    ]
})
*/

export const reportsItems = () => ({
    id: 'groupReports',
    type: 'group',
    children: [
        {
            id: 'reports',
            title: 'Reports',
            type: 'item',
            url: config.urls.blank,
            icon: icons.reports,
            breadcrumbs: false
        }
    ]
})

export const trucksItems = () => ({
    id: 'groupTrucks',
    type: 'group',
    children: [
        {
            id: 'trucks',
            title: 'Units',
            type: 'item',
            url: generatePath( config.urls.trucks, { company: auth.currentCompanyId }),
            icon: icons.trucks,
            breadcrumbs: false
        }
    ]
})

export const settingsItems = () => ({
    id: 'groupSettings',
    type: 'group',
    children: [
        {
            id: 'settings',
            title: 'Settings',
            type: 'item',
            url: generatePath( config.urls.settings, { company: auth.currentCompanyId }),
            icon: icons.settings,
            breadcrumbs: false
        }
    ]
})

export const invitationsItems = () => ({
    id: 'groupInvitations',
    type: 'group',
    children: [
        {
            id: 'team',
            title: 'Invitations',
            type: 'item',
            url: generatePath( config.urls.members, { company: auth.currentCompanyId }),
            icon: icons.invitations,
            breadcrumbs: false
        }
    ]
})
/*
const menuItems = () => ({
    items: [ issuesItems(), workOrdersItems(), trucksItems(), reportsItems(),], //customersitems(),
})
*/

const menuItems = () => (
    [{
        id: 'issues',
        url: config.urls.blank,
        primary: 'Issues',
        icon: icons.issues,
        chip: {
            label: '02',
        }
    },
    {
        id: 'work_orders',
        url: config.urls.blank,
        primary: 'Work Orders',
        icon: icons.work_orders,
    },
    {
        id: 'units',
        primary: 'Units',
        url: generatePath( config.urls.trucks, { company: auth.currentCompanyId }),
        icon: icons.trucks,
    },
    {
        id: 'reports',
        primary: 'Reports',
        url: config.urls.blank,
        icon: icons.reports,
    }
])

export default menuItems

const useStylesProfile = makeStyles( () => ({
    menuItem: {
        '& .MuiTypography-root.MuiTypography-body1': {
            fontSize: '16px',
        }
    }
}))
export const userProfileItems = () => ({
    id: 'userProfile',
    type: 'group',
    devider: true,
    children: [
        {
            id: 'profile',
            title: "My profile",
            type: 'item',
            url: generatePath( config.urls.userProfile, { company: auth.currentCompanyId }),
            icon: icons.profile,
            breadcrumbs: false,
            useStyles: useStylesProfile,
        }
    ]
})

export const companySettingsItems = () => ({
    id: 'companySettingsProfile',
    type: 'group',
    devider: true,
    children: [
        {
            id: 'company',
            title: 'Company Settings',
            type: 'item',
            url: generatePath( config.urls.company, { company: auth.currentCompanyId }),
            icon: icons.company,
            breadcrumbs: false
        }
    ]
})

export const logoutItems = () => ({
    id: 'logoutProfile',
    type: 'group',
    children: [
        {
            id: 'logout',
            title: "Logout",
            type: 'item',
            url: generatePath( config.urls.logout, { company: auth.currentCompanyId }),
            icon: icons.logout,
            breadcrumbs: false,
        }
    ]
})
/*
export const profileMenuItems = () => ({
    items: [ userProfileItems(), companySettingsItems(), logoutItems(), ],
})
*/
export const profileMenuItems = () => (
    [{
        divider: true,
        id: 'profile',
        primary: "My profile",
        url: generatePath( config.urls.userProfile, { company: auth.currentCompanyId }),
        icon: icons.profile,
        type: 'extended'
    },
    {
        divider: true,
        id: 'company',
        primary: 'Company Settings',
        url: generatePath( config.urls.company, { company: auth.currentCompanyId }),
        icon: icons.company,
        type: 'extended'
    },
    {
        id: 'logout',
        primary: "Logout",
        url: generatePath( config.urls.logout, { company: auth.currentCompanyId }),
        icon: icons.logout,
        type: 'extended'
    }]
)


// vim:ts=4:sw=4:expandtab
