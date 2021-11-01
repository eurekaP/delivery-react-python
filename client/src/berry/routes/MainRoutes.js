import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// project imports
import MainLayout from './../layout/MainLayout';
import Loadable from '../ui-component/Loadable';
import AuthGuard from './../utils/route-guard/AuthGuard';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard/Default')));
const DashboardAnalytics = Loadable(lazy(() => import('../views/dashboard/Analytics')));

// widget routing
const WidgetStatistics = Loadable(lazy(() => import('../views/widget/Statistics')));
const WidgetData = Loadable(lazy(() => import('../views/widget/Data')));
const WidgetChart = Loadable(lazy(() => import('../views/widget/Chart')));

// application - user social & account profile routing
const AppUserSocialProfile = Loadable(lazy(() => import('../views/application/users/social-profile')));
const AppUserAccountProfile1 = Loadable(lazy(() => import('../views/application/users/account-profile/Profile1')));
const AppUserAccountProfile2 = Loadable(lazy(() => import('../views/application/users/account-profile/Profile2')));
const AppUserAccountProfile3 = Loadable(lazy(() => import('../views/application/users/account-profile/Profile3')));

// application - user cards & list variant routing
const AppProfileCardStyle1 = Loadable(lazy(() => import('../views/application/users/card/CardStyle1')));
const AppProfileCardStyle2 = Loadable(lazy(() => import('../views/application/users/card/CardStyle2')));
const AppProfileCardStyle3 = Loadable(lazy(() => import('../views/application/users/card/CardStyle3')));
const AppProfileListStyle1 = Loadable(lazy(() => import('../views/application/users/list/Style1')));
const AppProfileListStyle2 = Loadable(lazy(() => import('../views/application/users/list/Style2')));

// application - customer routing
const AppCustomerList = Loadable(lazy(() => import('../views/application/customer/CustomerList')));
const AppCustomerOrderList = Loadable(lazy(() => import('../views/application/customer/OrderList')));
const AppCustomerOrderDetails = Loadable(lazy(() => import('../views/application/customer/OrderDetails')));
const AppCustomerProduct = Loadable(lazy(() => import('../views/application/customer/Product')));
const AppCustomerProductReview = Loadable(lazy(() => import('../views/application/customer/ProductReview')));

// application routing
const AppChat = Loadable(lazy(() => import('../views/application/chat')));
const AppMail = Loadable(lazy(() => import('../views/application/mail')));
const AppCalendar = Loadable(lazy(() => import('../views/application/calendar')));
const AppContactCard = Loadable(lazy(() => import('../views/application/contact/Card')));
const AppContactList = Loadable(lazy(() => import('../views/application/contact/List')));

// forms component routing
const FrmComponentsTextfield = Loadable(lazy(() => import('../views/forms/components/TextField')));
const FrmComponentsButton = Loadable(lazy(() => import('../views/forms/components/Button')));
const FrmComponentsCheckbox = Loadable(lazy(() => import('../views/forms/components/Checkbox')));
const FrmComponentsRadio = Loadable(lazy(() => import('../views/forms/components/Radio')));
const FrmComponentsSwitch = Loadable(lazy(() => import('../views/forms/components/Switch')));
const FrmComponentsAutoComplete = Loadable(lazy(() => import('../views/forms/components/AutoComplete')));
const FrmComponentsSlider = Loadable(lazy(() => import('../views/forms/components/Slider')));
const FrmComponentsDateTime = Loadable(lazy(() => import('../views/forms/components/DateTime')));

// forms plugins layout
const FrmLayoutLayout = Loadable(lazy(() => import('../views/forms/layouts/Layouts')));
const FrmLayoutMultiColumnForms = Loadable(lazy(() => import('../views/forms/layouts/MultiColumnForms')));
const FrmLayoutActionBar = Loadable(lazy(() => import('../views/forms/layouts/ActionBar')));
const FrmLayoutStickyActionBar = Loadable(lazy(() => import('../views/forms/layouts/StickyActionBar')));

// forms plugins routing
const FrmAutocomplete = Loadable(lazy(() => import('../views/forms/plugins/AutoComplete')));
const FrmMask = Loadable(lazy(() => import('../views/forms/plugins/Mask')));
const FrmClipboard = Loadable(lazy(() => import('../views/forms/plugins/Clipboard')));
const FrmRecaptcha = Loadable(lazy(() => import('../views/forms/plugins/Recaptcha')));
const FrmWysiwugEditor = Loadable(lazy(() => import('../views/forms/plugins/WysiwugEditor')));
const FrmModal = Loadable(lazy(() => import('../views/forms/plugins/Modal')));
const FrmTooltip = Loadable(lazy(() => import('../views/forms/plugins/Tooltip')));

// table routing
const TableBasic = Loadable(lazy(() => import('../views/forms/tables/TableBasic')));
const TableDense = Loadable(lazy(() => import('../views/forms/tables/TableDense')));
const TableEnhanced = Loadable(lazy(() => import('../views/forms/tables/TableEnhanced')));
const TableData = Loadable(lazy(() => import('../views/forms/tables/TableData')));
const TableCustomized = Loadable(lazy(() => import('../views/forms/tables/TablesCustomized')));
const TableStickyHead = Loadable(lazy(() => import('../views/forms/tables/TableStickyHead')));
const TableCollapsible = Loadable(lazy(() => import('../views/forms/tables/TableCollapsible')));

// forms validation
const FrmFormsValidation = Loadable(lazy(() => import('../views/forms/forms-validation')));
const FrmFormsWizard = Loadable(lazy(() => import('../views/forms/forms-wizard')));

// chart routing
const ChartApexchart = Loadable(lazy(() => import('../views/forms/chart/Apexchart')));

// basic ui-elements routing
const BasicUIAccordion = Loadable(lazy(() => import('../views/ui-elements/basic/UIAccordion')));
const BasicUIAvatar = Loadable(lazy(() => import('../views/ui-elements/basic/UIAvatar')));
const BasicUIBadges = Loadable(lazy(() => import('../views/ui-elements/basic/UIBadges')));
const BasicUIBreadcrumb = Loadable(lazy(() => import('../views/ui-elements/basic/UIBreadcrumb')));
const BasicUICards = Loadable(lazy(() => import('../views/ui-elements/basic/UICards')));
const BasicUIChip = Loadable(lazy(() => import('../views/ui-elements/basic/UIChip')));
const BasicUIList = Loadable(lazy(() => import('../views/ui-elements/basic/UIList')));
const BasicUITabs = Loadable(lazy(() => import('../views/ui-elements/basic/UITabs')));

// advance ui-elements routing
const AdvanceUIAlert = Loadable(lazy(() => import('../views/ui-elements/advance/UIAlert')));
const AdvanceUIDialog = Loadable(lazy(() => import('../views/ui-elements/advance/UIDialog')));
const AdvanceUIPagination = Loadable(lazy(() => import('../views/ui-elements/advance/UIPagination')));
const AdvanceUIProgress = Loadable(lazy(() => import('../views/ui-elements/advance/UIProgress')));
const AdvanceUIRating = Loadable(lazy(() => import('../views/ui-elements/advance/UIRating')));
const AdvanceUISnackbar = Loadable(lazy(() => import('../views/ui-elements/advance/UISnackbar')));
const AdvanceUISkeleton = Loadable(lazy(() => import('../views/ui-elements/advance/UISkeleton')));
const AdvanceUISpeeddial = Loadable(lazy(() => import('../views/ui-elements/advance/UISpeeddial')));
const AdvanceUITimeline = Loadable(lazy(() => import('../views/ui-elements/advance/UITimeline')));
const AdvanceUIToggleButton = Loadable(lazy(() => import('../views/ui-elements/advance/UIToggleButton')));
const AdvanceUITreeview = Loadable(lazy(() => import('../views/ui-elements/advance/UITreeview')));

// pricing page routing
const PagesPrice1 = Loadable(lazy(() => import('../views/pages/pricing/Price1')));
const PagesPrice2 = Loadable(lazy(() => import('../views/pages/pricing/Price2')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('../views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('../views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('../views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('../views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('../views/utilities/TablerIcons')));
const UtilsAnimation = Loadable(lazy(() => import('../views/utilities/Animation')));
const UtilsGrid = Loadable(lazy(() => import('../views/utilities/Grid')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('../views/sample-page')));

//-----------------------|| MAIN ROUTING ||-----------------------//

const MainRoutes = () => {
    const location = useLocation();

    return (
        <Route
            path={[
                '/dashboard/default',
                '/dashboard/analytics',

                '/widget/statistics',
                '/widget/data',
                '/widget/chart',
                '/widget/chart2',

                '/user/social-profile/:tab',
                '/user/account-profile/profile1',
                '/user/account-profile/profile2',
                '/user/account-profile/profile3',

                '/user/card/card1',
                '/user/card/card2',
                '/user/card/card3',
                '/user/List/list1',
                '/user/List/list2',

                '/customer/customer-list',
                '/customer/order-list',
                '/customer/order-details',
                '/customer/product',
                '/customer/product-review',

                '/app/chat',
                '/app/mail',
                '/app/calendar',
                '/app/contact/c-card',
                '/app/contact/c-list',

                '/components/text-field',
                '/components/button',
                '/components/checkbox',
                '/components/autoComplete',
                '/components/slider',
                '/components/radio',
                '/components/switch',
                '/components/date-time',

                '/forms/frm-autocomplete',
                '/forms/frm-mask',
                '/forms/frm-clipboard',
                '/forms/frm-recaptcha',
                '/forms/frm-wysiwug',
                '/forms/frm-modal',
                '/forms/frm-tooltip',

                '/forms/layouts/layouts',
                '/forms/layouts/multicolumnforms',
                '/forms/layouts/actionbar',
                '/forms/layouts/stickyactionbar',

                '/tables/tbl-basic',
                '/tables/tbl-dense',
                '/tables/tbl-enhanced',
                '/tables/tbl-data',
                '/tables/tbl-customized',
                '/tables/tbl-sticky-header',
                '/tables/tbl-collapse',

                '/chart/apexchart',
                '/forms/forms-validation',
                '/forms/forms-wizard',

                '/basic/accordion',
                '/basic/avatar',
                '/basic/badges',
                '/basic/breadcrumb',
                '/basic/cards',
                '/basic/chip',
                '/basic/list',
                '/basic/tabs',

                '/advance/alert',
                '/advance/dialog',
                '/advance/pagination',
                '/advance/progress',
                '/advance/rating',
                '/advance/snackbar',
                '/advance/skeleton',
                '/advance/speeddial',
                '/advance/timeline',
                '/advance/toggle-button',
                '/advance/treeview',

                '/pages/price/price1',
                '/pages/price/price2',

                '/utils/util-typography',
                '/utils/util-color',
                '/utils/util-shadow',
                '/icons/tabler-icons',
                '/icons/material-icons',
                '/utils/util-animation',
                '/utils/util-grid',

                '/sample-page'
            ]}
        >
            <MainLayout>
                <Switch location={location} key={location.pathname}>
                    <AuthGuard>
                        <Route path="/dashboard/default" component={DashboardDefault} />
                        <Route path="/dashboard/analytics" component={DashboardAnalytics} />

                        <Route path="/widget/statistics" component={WidgetStatistics} />
                        <Route path="/widget/data" component={WidgetData} />
                        <Route path="/widget/chart" component={WidgetChart} />

                        <Route path="/user/social-profile/:tab" component={AppUserSocialProfile} />
                        <Route path="/user/account-profile/profile1" component={AppUserAccountProfile1} />
                        <Route path="/user/account-profile/profile2" component={AppUserAccountProfile2} />
                        <Route path="/user/account-profile/profile3" component={AppUserAccountProfile3} />

                        <Route path="/user/card/card1" component={AppProfileCardStyle1} />
                        <Route path="/user/card/card2" component={AppProfileCardStyle2} />
                        <Route path="/user/card/card3" component={AppProfileCardStyle3} />
                        <Route path="/user/list/list1" component={AppProfileListStyle1} />
                        <Route path="/user/list/list2" component={AppProfileListStyle2} />

                        <Route path="/customer/customer-list" component={AppCustomerList} />
                        <Route path="/customer/order-list" component={AppCustomerOrderList} />
                        <Route path="/customer/order-details" component={AppCustomerOrderDetails} />
                        <Route path="/customer/product" component={AppCustomerProduct} />
                        <Route path="/customer/product-review" component={AppCustomerProductReview} />

                        <Route path="/app/chat" component={AppChat} />
                        <Route path="/app/mail" component={AppMail} />
                        <Route path="/app/calendar" component={AppCalendar} />
                        <Route path="/app/contact/c-card" component={AppContactCard} />
                        <Route path="/app/contact/c-list" component={AppContactList} />

                        <Route path="/components/text-field" component={FrmComponentsTextfield} />
                        <Route path="/components/button" component={FrmComponentsButton} />
                        <Route path="/components/checkbox" component={FrmComponentsCheckbox} />
                        <Route path="/components/radio" component={FrmComponentsRadio} />
                        <Route path="/components/autoComplete" component={FrmComponentsAutoComplete} />
                        <Route path="/components/slider" component={FrmComponentsSlider} />
                        <Route path="/components/switch" component={FrmComponentsSwitch} />
                        <Route path="/components/date-time" component={FrmComponentsDateTime} />

                        <Route path="/forms/layouts/layouts" component={FrmLayoutLayout} />
                        <Route path="/forms/layouts/multicolumnforms" component={FrmLayoutMultiColumnForms} />
                        <Route path="/forms/layouts/actionbar" component={FrmLayoutActionBar} />
                        <Route path="/forms/layouts/stickyactionbar" component={FrmLayoutStickyActionBar} />

                        <Route path="/forms/frm-autocomplete" component={FrmAutocomplete} />
                        <Route path="/forms/frm-mask" component={FrmMask} />
                        <Route path="/forms/frm-clipboard" component={FrmClipboard} />
                        <Route path="/forms/frm-recaptcha" component={FrmRecaptcha} />
                        <Route path="/forms/frm-wysiwug" component={FrmWysiwugEditor} />
                        <Route path="/forms/frm-modal" component={FrmModal} />
                        <Route path="/forms/frm-tooltip" component={FrmTooltip} />

                        <Route path="/tables/tbl-basic" component={TableBasic} />
                        <Route path="/tables/tbl-dense" component={TableDense} />
                        <Route path="/tables/tbl-enhanced" component={TableEnhanced} />
                        <Route path="/tables/tbl-data" component={TableData} />
                        <Route path="/tables/tbl-customized" component={TableCustomized} />
                        <Route path="/tables/tbl-sticky-header" component={TableStickyHead} />
                        <Route path="/tables/tbl-collapse" component={TableCollapsible} />

                        <Route path="/chart/apexchart" component={ChartApexchart} />
                        <Route path="/forms/forms-validation" component={FrmFormsValidation} />
                        <Route path="/forms/forms-wizard" component={FrmFormsWizard} />

                        <Route path="/basic/accordion" component={BasicUIAccordion} />
                        <Route path="/basic/avatar" component={BasicUIAvatar} />
                        <Route path="/basic/badges" component={BasicUIBadges} />
                        <Route path="/basic/breadcrumb" component={BasicUIBreadcrumb} />
                        <Route path="/basic/cards" component={BasicUICards} />
                        <Route path="/basic/chip" component={BasicUIChip} />
                        <Route path="/basic/list" component={BasicUIList} />
                        <Route path="/basic/tabs" component={BasicUITabs} />

                        <Route path="/advance/alert" component={AdvanceUIAlert} />
                        <Route path="/advance/dialog" component={AdvanceUIDialog} />
                        <Route path="/advance/pagination" component={AdvanceUIPagination} />
                        <Route path="/advance/progress" component={AdvanceUIProgress} />
                        <Route path="/advance/rating" component={AdvanceUIRating} />
                        <Route path="/advance/snackbar" component={AdvanceUISnackbar} />
                        <Route path="/advance/skeleton" component={AdvanceUISkeleton} />
                        <Route path="/advance/speeddial" component={AdvanceUISpeeddial} />
                        <Route path="/advance/timeline" component={AdvanceUITimeline} />
                        <Route path="/advance/toggle-button" component={AdvanceUIToggleButton} />
                        <Route path="/advance/treeview" component={AdvanceUITreeview} />

                        <Route path="/pages/price/price1" component={PagesPrice1} />
                        <Route path="/pages/price/price2" component={PagesPrice2} />

                        <Route path="/utils/util-typography" component={UtilsTypography} />
                        <Route path="/utils/util-color" component={UtilsColor} />
                        <Route path="/utils/util-shadow" component={UtilsShadow} />
                        <Route path="/icons/tabler-icons" component={UtilsTablerIcons} />
                        <Route path="/icons/material-icons" component={UtilsMaterialIcons} />
                        <Route path="/utils/util-animation" component={UtilsAnimation} />
                        <Route path="/utils/util-grid" component={UtilsGrid} />

                        <Route path="/sample-page" component={SamplePage} />
                    </AuthGuard>
                </Switch>
            </MainLayout>
        </Route>
    );
};

export default MainRoutes;
