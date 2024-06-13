import { Modal } from '@zddi/components';
import CodeDisplay from './CodeDisplay';


const code = `
const genCreateFields = () => [
    {
         name: 'name',
         label: '名字',
         type: 'input',
         required: true,
         defaultValue: 'X Z',
     }
 ]
Modal.confirm({
    title: '简单Confirm例子',
    fields: genCreateFields(),
    message: '是否要导出 ？',
    submit: async (data) => { 
        console.log(data)
    }
})
`


function Demo1() {
    const onclick = () => {
        const genCreateFields = () => [
            {
                 name: 'name',
                 label: '域名',
                 type: 'input',
                 required: true,
                 defaultValue: 'X Z',
             }
        ]
        Modal.confirm({
            title: '简单带参数导出例子',
            fields: genCreateFields(),
            message: '是否要导出 ？', // 必要字段
            beforeMessage: 'beforeMessage 提前告知信息',
            afterMessage: 'afterMessage 补充提示信息，如果需要导出指定字段请填写',
            
            submit: async (data) => { 
                console.log(data)
                throw new Error(`submit data ${JSON.stringify(data)}`)
            }
        })
    }

    return (
        <div style={{ margin: '10px 0'}}>
            <button onClick={onclick}>简单带参数导出例子</button>
            <CodeDisplay codeString={code}></CodeDisplay>
        </div>
    )
}

export default Demo1
