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
Modal.form({
    title: '简单例子',
    fields: genCreateFields(),
    submit: async (data) => { 
        console.log(data)
        throw new Error(\`submit data \${JSON.stringify(data)}\`)
    }
})`


function Demo1() {
  
    const onclick = () => {
        const genCreateFields = () => [
            {
                 name: 'name',
                 label: '名字',
                 type: 'input',
                 required: true,
                 defaultValue: 'X Z',
             }
         ]
        Modal.form({
            title: '简单例子',
            fields: genCreateFields(),
            submit: async (data) => { 
                console.log(data)
                throw new Error(`submit data ${JSON.stringify(data)}`)
            }
        })
    }

    return (
        <div style={{ margin: '10px 0'}}>
            <button onClick={onclick}>简单</button>
            <CodeDisplay codeString={code}></CodeDisplay>
        </div>
    )
}

export default Demo1
