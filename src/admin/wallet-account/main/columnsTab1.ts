export default [
    {
        title: 'STT',
        dataIndex: 'rowIndex',
        scopedSlots: {customRender: 'rowIndex'},
        align: 'center',
        width: 70
    },
    {
        title: 'Số tài khoản ví',
        dataIndex: 'a1',
        scopedSlots: {customRender: 'a1'},
        align: 'left',
        width: 200
    },
    {
        title: 'Tên tài khoản',
        dataIndex: 'a2',
        scopedSlots: {customRender: 'a2'},
        align: 'left',
        width: 200
    },
    {
        title: 'Số dư (đ)',
        dataIndex: 'a3',
        scopedSlots: {customRender: 'a3'},
        width: 200,
        align: 'right'
    },
    {
        title: 'Diễn giải',
        dataIndex: 'a4',
        scopedSlots: {customRender: 'a4'},
        width: 200,
        align: 'left'
    },
    {
        title: 'Người tạo',
        dataIndex: 'a5',
        scopedSlots: {customRender: 'a5'},
        width: 200,
        align: 'left'
    },
    {
        title: 'Thời gian khởi tạo',
        dataIndex: 'a6',
        scopedSlots: {customRender: 'a6'},
        width: 200,
        align: 'left'
    },
    {
        title: 'Người kiểm duyệt',
        dataIndex: 'a7',
        scopedSlots: {customRender: 'a7'},
        width: 200,
        align: 'left'
    },
    {
        title: 'Thời gian kiểm duyệt',
        dataIndex: 'a8',
        scopedSlots: {customRender: 'a8'},
        width: 150,
        align: 'left'
    },
    {
        title: 'Người duyệt',
        dataIndex: 'a9',
        scopedSlots: {customRender: 'a9'},
        width: 200,
        align: 'left'
    },
    {
        title: 'Thời gian duyệt',
        dataIndex: 'a8',
        scopedSlots: {customRender: 'a10'},
        width: 200,
        align: 'left'
    },
    {
        title: 'Trạng thái',
        dataIndex: 'a10',
        scopedSlots: {customRender: 'a11'},
        width: 200,
        align: 'left'
    },
    {
        title: 'Thao tác',
        slots: {title: 'actionTitle'},
        dataIndex: 'operation',
        scopedSlots: {customRender: 'operation'},
        width: 200,
        align: 'center'
    },
]
