import { Modal } from '@zddi/components';
import CodeDisplay from './CodeDisplay';


const code = `
const fields = [
    {
        name: 'param1',
        label: '参数1',
        cardName: '卡片A',
        options: [{ label: '选项1', value: '1' }, { label: '选项2', value: '2' }],
        defaultValue: '1',
        type: 'radio',
    },
    {
        name: 'param2',
        label: '参数2',
        cardName:'卡片A',
        type: 'text',
        required: true,
        props: (data: any) => ({ hidden: data.param1 === '1' }),
       
    },
    {
        name: 'param4',
        label: '参数3',
        cardName: '卡片B',
        type: 'text',
        defaultValue: '4096',
        required: true,
    },
    {
        name: 'param3',
        label: '参数4',
        cardName: '卡片B',
        type: 'text',
        required: true,
    },
    {
        name: 'param5',
        label: '参数4',
        cardName: '卡片B',
        type: 'text',
        required: true,
    },
]
Modal.cardForm({
    title: '卡片表单',
    fields: fields,
    submit: async (data) => { 
        console.log(data)
        throw new Error('submit data' + JSON.stringify(data))
    }
})
`


function Demo5() {
    const onclick = () => {
        const fields = [
            {
                name: 'param1',
                label: '参数1',
                cardName: '卡片A',
                options: [{ label: '选项1', value: '1' }, { label: '选项2', value: '2' }],
                defaultValue: '1',
                type: 'radio',
            },
            {
                name: 'param2',
                label: '参数2',
                cardName:'卡片A',
                type: 'text',
                required: true,
                props: (data: any) => ({ hidden: data.param1 === '1' }),
               
            },
            {
                name: 'param4',
                label: '参数3',
                cardName: '卡片B',
                type: 'text',
                defaultValue: '4096',
                required: true,
            },
            {
                name: 'param3',
                label: '参数4',
                cardName: '卡片B',
                type: 'text',
                required: true,
            },
            {
                name: 'param5',
                label: '参数4',
                cardName: '卡片B',
                type: 'text',
                required: true,
            },
        ]
        Modal.cardForm({
            title: '卡片表单',
            fields: fields,
            submit: async (data) => { 
                console.log(data)
                throw new Error('submit data' + JSON.stringify(data))
            }
        })
    }

    return (
        <div style={{ margin: '10px 0'}}>
            <button onClick={onclick}>卡片表单</button>
            <CodeDisplay codeString={code}></CodeDisplay>
        </div>
    )
}

export default Demo5
