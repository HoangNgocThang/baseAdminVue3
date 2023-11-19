import {createRouter, createWebHistory} from 'vue-router'
import DashboardIndex from '@/admin/dashboard/DashboardIndex.vue';
import LoginApp from "@/admin/auth/LoginApp.vue";
import RegisterView from "@/admin/register/RegisterView.vue";
import AccountInfoView from "@/admin/account-info/AccountInfoView.vue";
import WalletAccountView from "@/admin/wallet-account/main/WalletAccountView.vue";
import {getAccessToken} from "@/lib/auth";
import RequireListView from "@/admin/transaction/transfer/require-list/RequireListView.vue";
import BankLinkView from "@/admin/transaction/bank-link/BankLinkView.vue";
import CashInView from "@/admin/transaction/cash-in/CashInView.vue";
import CashOutView from "@/admin/transaction/cash-out/CashOutView.vue";
import TransferDetailView from "@/admin/transaction/transfer/transfer-detail/TransferDetailView.vue";
import WalletIndex from '@/admin/wallets/WalletIndex.vue';
import ForgotPasswordView from "@/admin/forgot-password/ForgotPasswordView.vue";
import WalletAccountAddView from "@/admin/wallet-account/wa-add/WalletAccountAddView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: LoginApp,
            meta: {
                layout: 'auth'
            }
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView,
            meta: {
                layout: 'blank'
            }
        },
        {
            path: '/forgot-password',
            name: 'forgot-password',
            component: ForgotPasswordView,
            meta: {
                layout: 'blank'
            }
        },
        {
            path: '/',
            name: 'home',
            component: DashboardIndex
        },
        {
            path: '/wallets',
            name: 'wallets',
            component: WalletAccountView
        },
        {
            path: '/wallets/add',
            name: 'wallets-add',
            component: WalletAccountAddView
        },
        {
            path: '/account-info',
            name: 'accountInfo',
            component: AccountInfoView
        },
        {
            path: '/transaction/transfer/require-list',
            name: 'transaction_Transfer_RequireList',
            component: RequireListView
        },
        {
            path: '/transaction/bank-link',
            name: 'transaction_BankLink',
            component: BankLinkView
        },
        {
            path: '/transaction/cash-in',
            name: 'transaction_CashIn',
            component: CashInView
        },
        {
            path: '/transaction/cash-out',
            name: 'transaction_CashOut',
            component: CashOutView
        },
        {
            path: '/transaction/transfer/transfer-detail/:id',
            name: 'transaction_Transfer_TransferDetail',
            component: TransferDetailView
        },
    ]
});

router.beforeEach((to, from) => {
    if (to.name === 'login') {
        return true;
    }
    if (to.name === 'register') {
        return true;
    }
    if (to.name === 'forgot-password') {
        return  true
    }
    // explicitly return false to cancel the navigation
    if (!getAccessToken()) {
        return {name: 'login'};
    }
    return true
})

export default router
