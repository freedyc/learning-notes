import { useCallback } from 'react';
import { Tooltip, TooltipProvider } from 'react-tooltip';
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Handle,
} from 'reactflow';
// 👇 you need to import the reactflow styles


import 'react-tooltip/dist/react-tooltip.css'
import 'reactflow/dist/style.css';


const initialNodes = [
    { id: '1', position: { x: 0, y: 120 },  sourcePosition: 'right', targetPosition: 'right', data: { label: 'zdns.cn' } },
    { id: '2', position: { x: 300, y: 0 },  sourcePosition: 'right', targetPosition: 'left', data: { label: 'pool1' } },
    { id: '3', position: { x: 300, y: 80 }, sourcePosition: 'right', targetPosition: 'left', data: { label: 'pool2' } },
    { id: '4', position: { x: 300, y: 160 }, sourcePosition: 'right', targetPosition: 'left', data: { label: 'pool0003' } },
    { id: '5', position: { x: 300, y: 240 }, sourcePosition: 'right', targetPosition: 'left', data: { label: 'pool0004' } },
    { id: '5-7', position: { x: 600, y: 200 }, type: 'tipNode', sourcePosition: 'left', targetPosition: 'left', data: { label: 'dc-2.2.2.2' } },
    { id: '5-8', position: { x: 600, y: 280 }, sourcePosition: 'left', targetPosition: 'left', data: { label: 'dc2-6.6.6.6' } },
  ];
  
const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', },
    { id: 'e1-3', source: '1', target: '3', },
    { id: 'e1-4', source: '1', target: '4', },
    { id: 'e1-5', source: '1', target: '5', animated: true,},
    { id: 'e1-6', source: '5', target: '5-7', },
    { id: 'e1-7', source: '5', target: '5-8',  animated: true,},
];

const TipNode = ({ data, isConnectable }: any) => {
    console.log(data, isConnectable);
    return (
        <>
            <Handle 
                type="target"
                position="left"
                style={{ background: '#555' }}
                isConnectable={isConnectable}
            >
            </Handle>
            <TooltipProvider>

            <div id="attributes-basic" data-tooltip-content="type: A
ttl: 3600
hms: icmp1
name: pool">{data.label}</div>
            <Tooltip anchorId="attributes-basic" />
            </TooltipProvider>
        </>
    )
}

const nodeTypes = {
    tipNode: TipNode
}
const Flow  = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
    const onConnect = useCallback((params:any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
    return (
        <div style={{ height: '500px' }}>
            <h3>React Flow</h3>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                attributionPosition="bottom-left"
                nodeTypes={nodeTypes}
            >
                {/* <MiniMap /> */}
                <Controls />
                {/* <Background /> */}
            </ReactFlow>
        </div>
    )
}

export default Flow;