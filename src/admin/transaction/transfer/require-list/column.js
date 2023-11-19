export default [
    {
        title: 'STT',
        dataIndex: 'rowIndex',
        scopedSlots: { customRender: 'rowIndex' },
        align: 'center',
        width: 70
    },
    {
        title: 'Mã giao dịch',
        dataIndex: 'phoneNub',
        scopedSlots: { customRender: 'phoneNub' },
        align: 'left',
        width: 150
    },
    {
        title: 'Loại GD',
        dataIndex: 'phoneNub2',
        scopedSlots: { customRender: 'phoneNub' },
        align: 'left',
        width: 150
    },
    {
        title: 'Tài khoản nguồn',
        dataIndex: 'customerName',
        scopedSlots: { customRender: 'customerName' },
        width: 150,
        align: 'left'
    },
    {
        title: 'Giá trị GD (đ)',
        dataIndex: 'communeCode',
        scopedSlots: { customRender: 'communeCode' },
        width: 150,
        align: 'left'
    },
    {
        title: 'Phí (đ)',
        dataIndex: 'communeCode',
        scopedSlots: { customRender: 'communeCode' },
        width: 200,
        align: 'center'
    },
    {
        title: 'Thuế (đ)',
        dataIndex: 'communeCode',
        scopedSlots: { customRender: 'communeCode' },
        width: 200,
        align: 'center'
    },
    {
        title: 'Thời gian GD',
        dataIndex: 'communeCode',
        scopedSlots: { customRender: 'communeCode' },
        width: 200,
        align: 'center'
    },
    {
        title: 'Trạng thái GD',
        dataIndex: 'communeCode',
        scopedSlots: { customRender: 'communeCode' },
        width: 200,
        align: 'center'
    },
    {
        title: 'Thao tác',
        slots: { title: 'actionTitle' },
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' },
        width: 200,
        align: 'center'
    },
]
