import { Modal } from '@zddi/components';
import CodeDisplay from './CodeDisplay';


const code = `
Modal.deleteConfirm({
    title: '信息',
    message: '是否要删除吗 ？',
    descriptionTitle: '删除的域名有：',
    description: ['abc.om', 'bac.cn'],
    info: '这些域名删除无法恢复，请谨慎操作',
    submit: async (data) => { 
        console.log(data)
        throw new Error('submit data' + JSON.stringify(data))
    }
})
`


function Demo4() {
    const onclick = () => {
        Modal.deleteConfirm({
            title: '信息',
            descriptionTitle: '删除的域名有：',
            description: ['abc.om', 'bac.cn'],
            info: '这些域名删除无法恢复，请谨慎操作',
            submit: async (data) => { 
                console.log(data)
                throw new Error('submit data' + JSON.stringify(data))
            }
        })
    }

    return (
        <div style={{ margin: '10px 0'}}>
            <button onClick={onclick}>简单删除例子</button>
            <CodeDisplay codeString={code}></CodeDisplay>
        </div>
    )
}

export default Demo4
