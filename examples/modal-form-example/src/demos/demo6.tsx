import { Modal } from '@zddi/components';
import CodeDisplay from'./CodeDisplay';




const genOptions =  (num: number, prefix='') => Array.from({length: num}, (_, i) => ({ value: `${prefix}${i}`, label: `选项${i}` })) 

const fetchOptions = async () => {
    console.log('fetchOptions start')
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(genOptions(10, 'fetch'))
            console.log('fetchOptions end')
        }, 1000)
    })

}
window.__modalDynamicMaxHeight = true;


const code1 = `
const genAllFields = () => [
            {
                // 1、processData 用法
                name: 'input',
                label: '更新输入框2的值',
                type: 'input',
                required: true,
                processData: (data) => ({ ...data, input2: data.input })
            },
            {
                name: 'input2',
                label: '输入框2',
                type: 'input',
                required: true,
                defaultValue: '自定义'
            },
            {
                // 2、 validate 用法
                name: 'input4',
                label: '校验',
                type: 'input',
                placeholder: '请输入123',
                // 3、validate: v.string.ip.exec,
                validate: [{ required: true }, { 
                    validator: (value) => value == '123', 
                    message: '必须是123'
                }],
                defaultValue: '',
            },
            {
                name: 'input3',
                label: '设置秘密框字段前缀',
                type: 'input',
                required: true,
                defaultValue: '',
            },
            {
                // 4、props 用法
                name: 'password',
                label: '密码框',
                type: 'password',
                defaultValue: '123456',
                props: (data) => ({ label: data.input3 + '密码框' })
            },
            {
                // 5、自定义类型
                name: 'custom-1',
                label: '自定义类型',
                type: CustomField,
                defaultValue: false,
            },
            {
                // 6、异步获取options
                name: 'radio',
                label: '单选按钮',
                type: 'radio',
                options: fetchOptions, // 异步获取option字段
                props: (data) => ({ hidden: !data['custom-1'] })
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
            title: '高级示例-动态操作',
            fields: genAllFields(),
            className: 'dt_w200',
            submit: async (data) => { 
                console.log(data)
                throw new Error(\`submit data \${JSON.stringify(data)}\`)
            }
        })
`

// 自定字段
import { Switch } from 'antd';

const CustomField = ({ onChange, value, disabled, ...props }) => {
    return (
        <>
            <Switch defaultChecked={value} onChange={onChange} disabled={disabled} { ...props } />
        </>
    )
}



function Demo6() {
      
    const onclick = () => {
        const genAllFields = () => [
            {
                // 1、processData 用法
                name: 'input',
                label: '更新输入框2的值',
                type: 'input',
                required: true,
                processData: (data) => ({ ...data, input2: data.input })
            },
            {
                name: 'input2',
                label: '输入框2',
                type: 'input',
                required: true,
                defaultValue: '自定义'
            },
            {
                // 2、 validate 用法
                name: 'input4',
                label: '校验',
                type: 'input',
                placeholder: '请输入123',
                // 3、validate: v.string.ip.exec,
                validate: [{ required: true }, { 
                    validator: (value) => value == '123', 
                    message: '必须是123'
                }],
                defaultValue: '',
            },
            {
                name: 'input3',
                label: '设置秘密框字段前缀',
                type: 'input',
                required: true,
                defaultValue: '',
            },
            {
                // 4、props 用法
                name: 'password',
                label: '密码框',
                type: 'password',
                defaultValue: '123456',
                props: (data) => ({ label: data.input3 + '密码框' })
            },
            {
                // 5、自定义类型
                name: 'custom-1',
                label: '自定义类型',
                type: CustomField,
                defaultValue: false,
            },
            {
                // 6、异步获取options
                name: 'radio',
                label: '单选按钮',
                type: 'radio',
                options: fetchOptions, // 异步获取option字段
                props: (data) => ({ hidden: !data['custom-1'] })
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
            title: '高级示例-动态操作',
            fields: genAllFields(),
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
                <button onClick={onclick}>高级示例-动态操作</button>
                <CodeDisplay codeString={code1} /> 
            </div>
 
        </>
    )
}

export default Demo6
