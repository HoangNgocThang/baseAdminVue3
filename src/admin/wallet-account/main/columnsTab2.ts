export default [
    {
        title: 'STT',
        dataIndex: 'rowIndex',
        scopedSlots: { customRender: 'rowIndex' },
        align: 'center',
        width: 70
    },
    {
        title: 'Tài khoản Ví',
        dataIndex: 'phoneNub',
        scopedSlots: { customRender: 'phoneNub' },
        align: 'left',
        width: 200
    },
    {
        title: 'Loại GD',
        dataIndex: 'customerName',
        scopedSlots: { customRender: 'customerName' },
        width: 200,
        align: 'left'
    },
    {
        title: 'Hạn mức GD / lần',
        dataIndex: 'communeCode',
        scopedSlots: { customRender: 'communeCode' },
        width: 200,
        align: 'left'
    },
    {
        title: 'Hạn mức GD / ngày',
        dataIndex: 'communeName',
        scopedSlots: { customRender: 'communeName' },
        width: 200,
        align: 'left'
    },
    {
        title: 'Hạn mức GD/ tháng',
        dataIndex: 'status',
        scopedSlots: { customRender: 'status' },
        width: 200,
        align: 'left'
    },
    {
        title: 'Thời gian cập nhật',
        dataIndex: 'createByName',
        scopedSlots: { customRender: 'createByName' },
        width: 200,
        align: 'left'
    },
    {
        title: 'Trạng thái',
        dataIndex: 'approveByName',
        scopedSlots: { customRender: 'approveByName' },
        width: 200,
        align: 'left'
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