import "./app.css";
import EmotionCSS from "./emotion-css";

// import { Button } from '@zdns/design'
import { Button, ZFilter } from "./lib";
import { ZProTable } from "./lib";
// import 'moment/locale/zh-cn';
// import 'dayjs/locale/zh-cn';
import { ZDatePicker } from "@zdns/design";
 

 
// console.log(Table);
function App() {
  const columns = [
    {
      dataIndex: 'name',
      field: "name", // ColDef expects 'field' instead of 'dataIndex'
      headerName: "名字", // ColDef expects 'headerName' instead of 'title'
    },
    {
      dataIndex: 'name1',
      field: "name1", // ColDef expects 'field' instead of 'dataIndex'
      headerName: "年龄", // ColDef expects 'headerName' instead of 'title'
    },
  ];
  const data = [{ name: "123" }];

  return (
    <>
      <EmotionCSS />
      <p className="read-the-docs">
        {/* <Button type="primary"> Text </Button> */}
        <ZDatePicker.RangePicker
          onChange={(value: string) => { console.log('onChange', value); }}
        />
        <Button type="primary"> Text </Button>
        <ZFilter fields={[{ key: '123', label: "名字", type: "input" }]} />
        <ZProTable columns={columns} dataSource={data} />
        {/* <ZProTable
          headerTitle="HeaderName展示"
          toolBarRender={[<Button>按钮展示</Button>]}
          columnSettingVisible
          columns={columns}
          dataSource={data}
          rowKey="ip"
          gridHeight="500px"
          // rowSelection={{
          //   pinned: true,
          //   selectedRowKeys: ['1.0.0.0/29'],
          //   // disabled:(record) => {
          //   //   return record.data.network === '1.0.0.0/22'
          //   // },
          //   onChange: () => {},
          // }}
          bordered
          columnState={{
            persistenceKey: 'test123',
            persistenceType: 'localStorage',
          }}
          onSortChanged={(sortColumns) => {
            console.log(sortColumns)
          }}
        /> */}
      </p>
    </>
  );
}

export default App;
