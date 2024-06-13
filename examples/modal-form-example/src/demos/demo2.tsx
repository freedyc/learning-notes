import { Modal } from '@zddi/components';
import CodeDisplay from'./CodeDisplay';




const genOptions =  (num: number, prefix='') => Array.from({length: num}, (_, i) => ({ value: `${prefix}${i}`, label: `选项${i}` })) 

window.__modalDynamicMaxHeight = true;


const code1 = `
const onclick = () => {
    const genAllFields = () => [
        {
            name: 'input',
            label: '输入框 input',
            type: 'input',
            required: true,
            defaultValue: 'xz',
        },
        {
            name: 'password',
            label: '密码框 password',
            type: 'password',
            required: true,
            defaultValue: '123456',
        },
        {
            name: 'radio',
            label: '单选按钮 radio',
            type: 'radio',
            options: genOptions(10), // 专有属性
            defaultValue: genOptions(10)?.[0]?.value,
  
        },
        {
            name: 'select',
            label: '单/多下拉选择 select',
            type: 'select',
            options: genOptions(10),
            defaultValue: genOptions(10)[0]?.value,
        },
        {
            name: 'file',
            label: '上传文件 file',
            type: 'file',
        },
        {
            name: 'checkbox',
            label: '复选框 checkbox',
            hideLabel: true, // 专有属性
            type: 'checkbox',
            options: genOptions(10),  // 专有属性
            defaultValue: [genOptions(10)[0]?.value],
        },
        {
            name: 'ellipsis',
            label: '省略号展示 ellipsis',
            type: 'ellipsis',
            defaultValue: '这是一个超长的值啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦'
        },
        {
            name: 'select2',
            label: '多选 select2',
            type: 'select2',
            options: genOptions(10), // 专有属性
            defaultValue: [genOptions(10)[0]?.value],
            style: { width: '300px'}
        },
        {
            name: 'treeSelectNode',
            label: '多选 treeSelectNode',
            type: 'treeSelectNode',
            treeData: [{ value: 'local2', label: 'local', children: genOptions(10) }, { value: 'local3', label: 'local2', children: genOptions(10) }  ], // 专有属性
            defaultValue: ['local2'],
        },
        {
            name: 'checkGroup',
            label: '复选框组 checkGroup',
            type: 'checkGroup',
            options: genOptions(10),
            defaultValue: [],
        },
        {
            name: 'slider',
            label: '滑动 slider',
            type: 'slider',
            marks: { 0: '0', 50: '50', 100: '100' }, // 专有属性
            value: 50,
            style: { width: '300px'} 
        },
        {
            name: 'textarea',
            label: '多行文本框 textarea',
            type: 'textarea',
            placeholder: '请输入...',
            style: { width: '300px'} 
        },
    ]
    Modal.form({
        title: '高级示例',
        fields: genAllFields(),
        tips: '*注意： 这是一个提示信息这是一个提示信息这是一个提示信息这是一个提示信息这是一个提示信息',
        beforeTips: '*注意： 这是一个前置提示信息这是一个前置提示信息这是一个前置提示信息这是一个前置提示信息这是一个前置提示信息',
        className: 'dt_w200',
        submit: async (data) => { 
            console.log(data)
            throw new Error(\`submit data \${JSON.stringify(data)}\`)
        }
    })
}
`
const code2 = `
const genAllFields = () => [
    {
        name: 'input',
        label: '输入框 input',
        type: 'input',
        required: true,
        defaultValue: 'xz',
    },
    {
        name: 'password',
        label: '密码框 password',
        type: 'password',
        required: true,
        defaultValue: '123456',
    },
    {
        name: 'radio',
        label: '单选按钮 radio',
        type: 'radio',
        options: genOptions(10), // 专有属性
        defaultValue: genOptions(10)?.[0]?.value,

    },
    {
        name: 'select',
        label: '单/多下拉选择 select',
        type: 'select',
        options: genOptions(10),
        defaultValue: genOptions(10)[0]?.value,
    },
    {
        name: 'file',
        label: '上传文件 file',
        type: 'file',
    },
    {
        name: 'checkbox',
        label: '复选框 checkbox',
        hideLabel: true, // 专有属性
        type: 'checkbox',
        options: genOptions(10),  // 专有属性
        defaultValue: [genOptions(10)[0]?.value],
    },
    {
        name: 'ellipsis',
        label: '省略号展示 ellipsis',
        type: 'ellipsis',
        defaultValue: '这是一个超长的值啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦'
    },
    {
        name: 'select2',
        label: '多选 select2',
        type: 'select2',
        options: genOptions(10), // 专有属性
        defaultValue: [genOptions(10)[0]?.value],
        style: { width: '300px'}
    },
    {
        name: 'treeSelectNode',
        label: '多选 treeSelectNode',
        type: 'treeSelectNode',
        treeData: [{ value: 'local2', label: 'local', children: genOptions(10) }, { value: 'local3', label: 'local2', children: genOptions(10) }  ], // 专有属性
        defaultValue: ['local2'],
    },
    {
        name: 'checkGroup',
        label: '复选框组 checkGroup',
        type: 'checkGroup',
        options: genOptions(10),
        defaultValue: [],
    },
    {
        name: 'slider',
        label: '滑动 slider',
        type: 'slider',
        marks: { 0: '0', 50: '50', 100: '100' }, // 专有属性
        value: 50,
        style: { width: '300px'} 
    },
    {
        name: 'textarea',
        label: '多行文本框 textarea',
        type: 'textarea',
        placeholder: '请输入...',
        style: { width: '300px'} 
    },
]
Modal.form({
    title: '高级示例-批量编辑',
    fields: genAllFields().map((field) => ({ ...field, group: field.name })), // 带 group 字段会自动进入批量编辑模式
    tips: '*注意： 这是一个提示信息这是一个提示信息这是一个提示信息这是一个提示信息这是一个提示信息',
    beforeTips: '*注意： 这是一个前置提示信息这是一个前置提示信息这是一个前置提示信息这是一个前置提示信息这是一个前置提示信息',
    className: 'dt_w200',
    submit: async (data) => { 
        console.log(data)
        throw new Error(\`submit data \${JSON.stringify(data)}\`)
    }
})
`

function Demo2() {
      
    const onclick = () => {
        const genAllFields = () => [
            {
                name: 'input',
                label: '输入框 input',
                type: 'input',
                required: true,
                defaultValue: 'xz',
            },
            {
                name: 'password',
                label: '密码框 password',
                type: 'password',
                required: true,
                defaultValue: '123456',
            },
            {
                name: 'radio',
                label: '单选按钮 radio',
                type: 'radio',
                options: genOptions(10), // 专有属性
                defaultValue: genOptions(10)?.[0]?.value,
      
            },
            {
                name: 'select',
                label: '单/多下拉选择 select',
                type: 'select',
                options: genOptions(10),
                defaultValue: genOptions(10)[0]?.value,
            },
            {
                name: 'file',
                label: '上传文件 file',
                type: 'file',
            },
            {
                name: 'checkbox',
                label: '复选框 checkbox',
                hideLabel: true, // 专有属性
                type: 'checkbox',
                options: genOptions(10),  // 专有属性
                defaultValue: [genOptions(10)[0]?.value],
            },
            {
                name: 'ellipsis',
                label: '省略号展示 ellipsis',
                type: 'ellipsis',
                defaultValue: '这是一个超长的值啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦'
            },
            {
                name: 'select2',
                label: '多选 select2',
                type: 'select2',
                options: genOptions(10), // 专有属性
                defaultValue: [genOptions(10)[0]?.value],
                style: { width: '300px'}
            },
            {
                name: 'treeSelectNode',
                label: '多选 treeSelectNode',
                type: 'treeSelectNode',
                treeData: [{ value: 'local2', label: 'local', children: genOptions(10) }, { value: 'local3', label: 'local2', children: genOptions(10) }  ], // 专有属性
                defaultValue: ['local2'],
            },
            {
                name: 'checkGroup',
                label: '复选框组 checkGroup',
                type: 'checkGroup',
                options: genOptions(10),
                defaultValue: [],
            },
            {
                name: 'slider',
                label: '滑动 slider',
                type: 'slider',
                marks: { 0: '0', 50: '50', 100: '100' }, // 专有属性
                value: 50,
                style: { width: '300px'} 
            },
            {
                name: 'textarea',
                label: '多行文本框 textarea',
                type: 'textarea',
                placeholder: '请输入...',
                style: { width: '300px'} 
            },
        ]
        Modal.form({
            title: '高级示例',
            fields: genAllFields(),
            tips: '*注意： 这是一个提示信息这是一个提示信息这是一个提示信息这是一个提示信息这是一个提示信息',
            beforeTips: '*注意： 这是一个前置提示信息这是一个前置提示信息这是一个前置提示信息这是一个前置提示信息这是一个前置提示信息',
            className: 'dt_w200',
            submit: async (data) => { 
                console.log(data)
                throw new Error(`submit data ${JSON.stringify(data)}`)
            }
        })
    }

    const onclick2 = () => {
        const genAllFields = () => [
            {
                name: 'input',
                label: '输入框 input',
                type: 'input',
                required: true,
                defaultValue: 'xz',
            },
            {
                name: 'password',
                label: '密码框 password',
                type: 'password',
                required: true,
                defaultValue: '123456',
            },
            {
                name: 'radio',
                label: '单选按钮 radio',
                type: 'radio',
                options: genOptions(10), // 专有属性
                defaultValue: genOptions(10)?.[0]?.value,
      
            },
            {
                name: 'select',
                label: '单/多下拉选择 select',
                type: 'select',
                options: genOptions(10),
                defaultValue: genOptions(10)[0]?.value,
            },
            {
                name: 'file',
                label: '上传文件 file',
                type: 'file',
            },
            {
                name: 'checkbox',
                label: '复选框 checkbox',
                hideLabel: true, // 专有属性
                type: 'checkbox',
                options: genOptions(10),  // 专有属性
                defaultValue: [genOptions(10)[0]?.value],
            },
            {
                name: 'ellipsis',
                label: '省略号展示 ellipsis',
                type: 'ellipsis',
                defaultValue: '这是一个超长的值啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦'
            },
            {
                name: 'select2',
                label: '多选 select2',
                type: 'select2',
                options: genOptions(10), // 专有属性
                defaultValue: [genOptions(10)[0]?.value],
                style: { width: '300px'}
            },
            {
                name: 'treeSelectNode',
                label: '多选 treeSelectNode',
                type: 'treeSelectNode',
                treeData: [{ value: 'local2', label: 'local', children: genOptions(10) }, { value: 'local3', label: 'local2', children: genOptions(10) }  ], // 专有属性
                defaultValue: ['local2'],
            },
            {
                name: 'checkGroup',
                label: '复选框组 checkGroup',
                type: 'checkGroup',
                options: genOptions(10),
                defaultValue: [],
            },
            {
                name: 'slider',
                label: '滑动 slider',
                type: 'slider',
                marks: { 0: '0', 50: '50', 100: '100' }, // 专有属性
                value: 50,
                style: { width: '300px'} 
            },
            {
                name: 'textarea',
                label: '多行文本框 textarea',
                type: 'textarea',
                placeholder: '请输入...',
                style: { width: '300px'} 
            },
        ]
        Modal.form({
            title: '高级示例-批量编辑',
            fields: genAllFields().map((field) => ({ ...field, group: field.name })), // 带 group 字段会自动进入批量编辑模式
            tips: '*注意： 这是一个提示信息这是一个提示信息这是一个提示信息这是一个提示信息这是一个提示信息',
            beforeTips: '*注意： 这是一个前置提示信息这是一个前置提示信息这是一个前置提示信息这是一个前置提示信息这是一个前置提示信息',
            className: 'dt_w200',
            submit: async (data) => { 
                console.log(data)
                throw new Error(`submit data ${JSON.stringify(data)}`)
            }
        })
    }

    return (
        <>
            <div style={{ margin: '10px 0'}}>
                <button onClick={onclick}>高级示例</button>
                <CodeDisplay codeString={code1} /> 
            </div>
            <div style={{ margin: '10px 0'}}>
                <button onClick={onclick2}>高级示例-批量编辑</button>
                <CodeDisplay codeString={code2} /> 
            </div>
        </>
    )
}

export default Demo2
