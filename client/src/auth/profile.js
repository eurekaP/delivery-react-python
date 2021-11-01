import ProfileInfo from './profile_info'
import ProfilePersonalAccount from './profile_personal'
import LinkTabs from '../lib/tabs'
import { PageTitle } from '../theme/components/content'

const tabs = [
    {
      label: "Profile Info",
      value: "/",
      exact: true,
      component: () => <ProfileInfo />
    },
    {
      label: "Personal Account",
      value: "/account",
      exact: true,
      component: () => <ProfilePersonalAccount />
    }
  ]

const Profile = () => {
    return (
        <>
            <PageTitle>
                My Profile
            </PageTitle>
            <LinkTabs tabs={tabs} basepath={"/profile"} fullHeight />
        </>
    )
}

export default Profile

// vim:ts=4:sw=4:expandtab
