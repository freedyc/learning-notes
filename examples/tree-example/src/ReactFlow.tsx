import { useCallback, FC, useState } from "react";
import { Tooltip, TooltipProvider } from "react-tooltip";
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Handle,
    Position,
    NodeProps,
    NodeToolbar,
} from "reactflow";
import dagre from "dagre";

import "react-tooltip/dist/react-tooltip.css";
import "reactflow/dist/style.css";

import icon, { IconType } from "./icon";

type IconKeysType = keyof IconType;

const iconKeys: string[] = Object.keys(icon);

const defaultNodeStyle = {
    borderRadius: "4.8px",
    border: "1.6px solid rgba(194, 203, 219, 1)",
    background: "rgba(255, 255, 255, 1)",
};

const Detail: FC<{
    data?: { label: string; value: string }[];
    onClose?: () => void;
}> = ({ data, onClose }) => {
    return (
        <div className="detail-box">
            <header className="detail-box-header">
                详情
                <div className="close" onClick={onClose} style={{ cursor: "pointer" }}>
                    X
                </div>
            </header>
            <div className="detail-box-content">
                <div>
                    <span className="detail-box-content-key">Key: </span>
                    <span className="detail-box-content-value">Value</span>
                </div>
                {data?.map((it) => (
                    <div>
                        <span className="detail-box-content-key">{it.label}</span>
                        <span className="detail-box-content-value">{it.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
const genPoolData = (num: number) =>
    new Array(num).fill(0).map((_, index) => ({
        id: `pool-${index}`,
        sourcePosition: Position.Left,
        targetPosition: Position.Right,
        type: "custom",
        style: defaultNodeStyle,
        data: {
            label: `pool-${index} `,
            toolbarPosition: Position.Bottom,
            icon: iconKeys[Math.floor(Math.random() * 4)],
        },
    }));

const genRRData = (num: number) =>
    new Array(num).fill(0).map((_, index) => ({
        id: `rrs-${Math.random().toString(32)}-${index}`,
        sourcePosition: Position.Left,
        targetPosition: Position.Left,
        type: "custom",
        style: defaultNodeStyle,
        data: {
            label: `rrs-${index}-8.8.8.8`,
            toolbarPosition: Position.Bottom,
            icon: iconKeys[Math.floor(Math.random() * 4)],
        },
    }));

const nameNodes = [
    {
        id: "zdns.cn",
        type: "custom",
        sourcePosition: Position.Right,
        targetPosition: Position.Right,
        style: defaultNodeStyle,
        data: {
            label: "zddi.lookz.cn",
            toolbarPosition: Position.Bottom,
            icon: iconKeys[Math.floor(Math.random() * 4)],
        },
    },
];

const poolNodes = genPoolData(40);

const rrsNodes: any = poolNodes.reduce(
    (prev, it) => ({ ...prev, [it.id]: genRRData(3) }),
    {}
);

const initialNodes = [...nameNodes, ...poolNodes];

console.time("initialEdges");
const initialEdges = nameNodes.reduce((prev: any, curr: any, index) => {
    return [
        ...prev,
        ...poolNodes.reduce((prev1: any, curr1: any) => {
            initialNodes.push(...rrsNodes[curr1.id]);
            return [
                ...prev1,
                {
                    id: `edge-${index}-${curr1.id}`,
                    source: curr.id,
                    target: curr1.id,
                },
                ...rrsNodes[curr1.id].reduce((prev2: any, curr2: any) => {
                    return [
                        ...prev2,
                        {
                            id: `edge-${curr1.id}-${curr2.id}`,
                            source: curr1.id,
                            target: curr2.id,
                        },
                    ];
                }, []),
            ];
        }, []),
    ];
}, []);

console.log(initialEdges);
console.timeEnd("initialEdges");
const nodeWidth = 200;
const nodeHeight = 40;

const dagreGraph: any = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes: any, edges: any, direction = "LR") => {
    const isHorizontal = direction === "LR";
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node: any) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge: any) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node: any) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        node.targetPosition = isHorizontal ? Position.Left : "top";
        node.sourcePosition = isHorizontal ? Position.Right : "bottom";

        // We are shifting the dagre node position (anchor=center center) to the top left
        // so it matches the React Flow node anchor point (top left).
        node.position = {
            x: nodeWithPosition.x - nodeWidth / 2,
            y: nodeWithPosition.y - nodeHeight / 2,
        };

        return node;
    });

    return { nodes, edges };
};

const CustomNode: FC<NodeProps> = ({ data, isConnectable, targetPosition, sourcePosition, id }) => {
    const [isVisible, setVisible] = useState(false);
    const iconName: IconKeysType = data.icon;
    const Icon = icon[iconName || "circle"] || <span></span>;
    const onClose = useCallback(() => {
        setVisible(false);
    }, [setVisible]);
    return (
        <div onDoubleClick={() => setVisible(false)} style={{ padding: "10px" }}>
           <Handle
                type="target"
                style={{ background: "#555" }}
                isConnectable={isConnectable}
                position={targetPosition || Position.Left}
            ></Handle>
            <NodeToolbar isVisible={isVisible} position={data.toolbarPosition}>
                <Detail onClose={onClose} />
            </NodeToolbar>
            <Icon />
            <div
                onClick={() => setVisible(true)}
                style={{
                    marginLeft: "14px",
                    fontSize: "19px",
                    display: "inline-block",
                }}
            >
                {data.label}
            </div>
            <Handle
                type="source"
                style={{ background: "#555" }}
                isConnectable={isConnectable}
                position={sourcePosition || Position.Right}
            ></Handle>
        </div>
    );
};

const nodeTypes = {
    custom: CustomNode,
};

console.time("getLayoutedElements");
const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    initialNodes,
    initialEdges
);
console.timeEnd("getLayoutedElements");
console.log(layoutedNodes, layoutedEdges);

const Flow = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );
    return (
        <div
            style={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <h3>React Flow</h3>
            <div style={{ height: "90%", width: "90%", background: "#fff" }}>
                <TooltipProvider>
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
                        {/* <Controls /> */}
                        <Background />
                    </ReactFlow>
                </TooltipProvider>
            </div>
        </div>
    );
};

export default Flow;
