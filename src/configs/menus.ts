export default [
    {
        name: "Trang chủ",
        icon: "fa fa-home",
        url: "/",
        group: 1,
        required_admin: false
    },
    {
        name: "Quản lý tài khoản ví",
        icon: "fa fa-credit-card",
        url: "/wallets",
        group: 1,
        required_admin: false
    },
    {
        name: "Quản lý liên kết ngân hàng",
        icon: "fa fa-credit-card",
        url: '/bank-link',
        group: 1,
        required_admin: false
    },
    {
        name: "Quản lý giao dịch",
        icon: "fas fa-wallet",
        group: 1,
        required_admin: true,
        subs: [
            {
                name: "Liên kết ngân hàng",
                icon: "fa fa-plus",
                url: "/transaction/bank-link",
                group: 1
            },
            {
                name: "Nạp ví",
                icon: "fa fa-plus",
                url: '/transaction/cash-in',
                group: 1
            },
            {
                name: "Rút ví",
                icon: "fa fa-plus",
                url: '/transaction/cash-out',
                group: 1
            },
            {
                name:  "Chuyển tiền",
                icon: "fa fa-plus",
                url: '/transaction/transfer/require-list',
                group: 1
            }
        ]
    },
    {
        name: "Dịch vụ",
        icon: "fas fa-wallet",
        group: 1,
        required_admin: true,
        subs: [
            {
                name: "Chi trả",
                icon: "fa fa-plus",
                url: "#",
                group: 1
            },
            {
                name: "Thanh toán",
                icon: "fa fa-plus",
                url: '#',
                group: 1
            },
        ]
    },
    {
        name: "Lịch sử giao dịch",
        icon: "fa fa-credit-card",
        url: '#',
        group: 1,
        required_admin: false
    },
    {
        name: "Ủy quyền",
        icon: "fa fa-credit-card",
        url: '#',
        group: 1,
        required_admin: false
    },
    {
        name: "Báo cáo",
        icon: "fa fa-credit-card",
        url: '#',
        group: 1,
        required_admin: false
    },
    // {
    //     name: "Chuyển tiền",
    //     icon: "fas fa-wallet",
    //     group: 1,
    //     required_admin: true,
    //     subs: [
    //         {
    //             name: "Chuyển tiền cá nhân",
    //             icon: "fa fa-plus",
    //             url: "/transfers",
    //             group: 1
    //         },
    //         {
    //             name: "Chuyển tiền theo lô",
    //             icon: "fa fa-plus",
    //             url: "/batch-transfers/create",
    //             group: 1
    //         }
    //     ]
    // },
    // {
    //     name: "Báo cáo",
    //     icon: "fas fa-chart-bar",
    //     group: 1,
    //     base: "/xadmin/users",
    //     required_admin: true,
    //     subs: [
    //         {
    //             name: "Giao dịch",
    //             icon: "fa fa-plus",
    //             url: "/transfers/histories",
    //             group: 1
    //         },
    //         {
    //             name: "Giao dịch lô",
    //             icon: "fa fa-plus",
    //             url: "/batch-transfers/index",
    //             group: 1
    //         }
    //     ]
    // }
]