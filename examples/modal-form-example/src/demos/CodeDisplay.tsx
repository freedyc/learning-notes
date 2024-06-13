import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeDisplay: React.FC<{ codeString?: string}> = ({ codeString  }) => {
    const [show, setShow] = React.useState(false);
    return (
        <div style={{ marginTop: '2px'}}>
            <button onClick={() => setShow(!show)}>{ show ? '隐藏代码': '显示代码'}</button>
            { show && 
                (
                    <SyntaxHighlighter language="javascript" style={dark}>
                        {codeString}
                    </SyntaxHighlighter>
                )
            }
        </div>
    );
};

export default CodeDisplay;