import { useCallback, useState, memo, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Panel,
  useReactFlow,
  NodeResizer,
  NodeToolbar,
  Handle,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './styles.css';


const initialNodes = [
  {
    id: '1',
    type: 'customNode',
    data: { 
      label: '节点 1',
      style: {
        background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)',
        border: '1.5px solid #6366f1',
        borderRadius: '8px',
        padding: '14px',
        fontSize: '13px',
        color: '#373737',
        boxShadow: '0 2px 8px 0 rgba(99,102,241,0.08)',
        transition: 'all 0.2s ease',
      }
    },
    position: { x: 250, y: 5 },
  },
  {
    id: '2',
    type: 'customNode',
    data: { 
      label: '节点 2',
      style: {
        background: 'linear-gradient(135deg, #f0fdfa 0%, #f8fafc 100%)',
        border: '1.5px solid #14b8a6',
        borderRadius: '8px',
        padding: '14px',
        fontSize: '13px',
        color: '#373737',
        boxShadow: '0 2px 8px 0 rgba(20,184,166,0.08)',
        transition: 'box-shadow 0.2s',
      }
    },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    type: 'customNode',
    data: { 
      label: '节点 3',
      style: {
        background: 'linear-gradient(135deg, #fef9c3 0%, #f8fafc 100%)',
        border: '1.5px solid #facc15',
        borderRadius: '8px',
        padding: '14px',
        fontSize: '13px',
        color: '#373737',
        boxShadow: '0 2px 8px 0 rgba(250,204,21,0.08)',
        transition: 'box-shadow 0.2s',
      }
    },
    position: { x: 400, y: 100 },
  },
  {
    id: '4',
    type: 'customNode',
    data: { 
      label: '节点 4',
      style: {
        background: 'linear-gradient(135deg, #fee2e2 0%, #f8fafc 100%)',
        border: '1.5px solid #ef4444',
        borderRadius: '8px',
        padding: '14px',
        fontSize: '13px',
        color: '#373737',
        boxShadow: '0 2px 8px 0 rgba(239,68,68,0.08)',
        transition: 'box-shadow 0.2s',
      }
    },
    position: { x: 400, y: 200 },
  },
];

const initialEdges = [
  { 
    id: 'e1-2', 
    source: '1', 
    target: '2', 
    sourceHandle: 'bottom',
    targetHandle: 'top',
    style: { stroke: '#999' } 
  },
  { 
    id: 'e1-3', 
    source: '1', 
    target: '3', 
    sourceHandle: 'bottom',
    targetHandle: 'top',
    style: { stroke: '#999' } 
  },
  { 
    id: 'e3-4', 
    source: '3', 
    target: '4', 
    sourceHandle: 'bottom',
    targetHandle: 'top',
    style: { stroke: '#999' } 
  },
];

let groupId = 0;

const flowStyles = {
  background: 'linear-gradient(120deg, #f8fafc 60%, #e0e7ff 100%)',
};

// 1. 先定义 CustomNode
const CustomNode = memo(({ data, selected }) => {
  const style = {
    ...data.style,
    transform: selected ? 'scale(1.02)' : 'scale(1)',
    boxShadow: selected 
      ? '0 4px 12px rgba(0, 0, 0, 0.15)' 
      : data.style.boxShadow,
    transition: 'all 0.2s ease',
    position: 'relative',
    zIndex: selected ? 2 : 1,
  };

  return (
    <>
      <Handle
        type="target"
        position="top"
        style={{ background: '#555', zIndex: 3 }}
        id="top"
      />
      {selected && (
        <NodeResizer
          minWidth={100}
          minHeight={50}
          isVisible={selected}
          lineStyle={{ borderWidth: 1, zIndex: 3 }}
          handleStyle={{ 
            borderWidth: 1,
            zIndex: 4,
          }}
        />
      )}
      <div style={style}>{data.label}</div>
      <Handle
        type="source"
        position="bottom"
        style={{ background: '#555', zIndex: 3 }}
        id="bottom"
      />
    </>
  );
});

// 2. 再定义 GroupNode
const GroupNode = memo(({ data, selected }) => {
  const [isHovered, setIsHovered] = useState(false);

  const containerStyle = {
    width: data.style?.width || '100%',
    height: data.style?.height || '100%',
    backgroundColor: 'rgba(240, 240, 240, 0.3)',
    border: selected ? '1.5px solid #6366f1' : '1px solid #bbb',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    position: 'relative',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    padding: '0',
    margin: selected ? '4px' : '0px',
    transform: selected ? 'scale(1)' : 'scale(1)',
    opacity: 0
  };

  const titleStyle = {
    position: 'absolute',
    top: '-28px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '4px 8px',
    fontSize: '12px',
    color: '#666',
    background: 'white',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    border: '1px solid #e2e8f0',
    opacity: isHovered ? 1 : 0,
    transition: 'opacity 0.2s ease',
    pointerEvents: 'none',
    zIndex: 5,
    whiteSpace: 'nowrap',
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      boxSizing: 'border-box',
    }}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    >
      {selected && (
        <NodeResizer
          minWidth={100}
          minHeight={80}
          isVisible={selected}
          lineStyle={{ 
            borderWidth: 1, 
            borderColor: '#6366f1',
            zIndex: 3,
          }}
          handleStyle={{ 
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#6366f1',
            zIndex: 4,
          }}
        />
      )}
      <div style={containerStyle}>
        <div style={titleStyle}>{data.label}</div>
      </div>
    </div>
  );
});

// 3. 最后定义 nodeTypes
const nodeTypes = {
  customNode: CustomNode,
  group: GroupNode
};

const ContextMenu = memo(({ x, y, node, nodes, selectedNodes, onRemoveNode, onClose, onCreateGroup, onCreateEmptyGroup, onBatchRemoveFromGroup, onBatchAddToGroup, position, onAddNode }) => {
  const menuItemStyle = {
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '13px',
    transition: 'all 0.2s',
    borderBottom: '1px solid #f1f5f9',
  };

  const menuItemHoverStyle = {
    backgroundColor: '#f8fafc',
  };

  // 获取所有分组节点
  const groupNodes = nodes.filter(n => n.type === 'group');

  // 判断是否有选中的节点
  const hasSelectedNodes = selectedNodes.length > 0;
  
  // 判断选中节点是否都在分组中
  const allSelectedNodesInGroup = hasSelectedNodes && 
    selectedNodes.every(node => node.parentNode);

  // 判断是否为空白区域右键
  const isBlankArea = !node;

  // 判断当前节点类型
  const isGroupNode = node?.type === 'group';
  const isCustomNode = node?.type === 'customNode';

  // 节点样式列表
  const nodeStyles = [
    {
      label: '默认节点',
      style: {
        background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)',
        border: '1.5px solid #6366f1',
      }
    },
    {
      label: '成功节点',
      style: {
        background: 'linear-gradient(135deg, #f0fdfa 0%, #f8fafc 100%)',
        border: '1.5px solid #14b8a6',
      }
    },
    {
      label: '警告节点',
      style: {
        background: 'linear-gradient(135deg, #fef9c3 0%, #f8fafc 100%)',
        border: '1.5px solid #facc15',
      }
    },
    {
      label: '错误节点',
      style: {
        background: 'linear-gradient(135deg, #fee2e2 0%, #f8fafc 100%)',
        border: '1.5px solid #ef4444',
      }
    }
  ];

  return (
    <div
      style={{
        position: 'fixed',
        left: x,
        top: y,
        background: 'white',
        borderRadius: '6px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0',
        zIndex: 1000,
        minWidth: '160px',
        overflow: 'hidden',
      }}
      onClick={e => e.stopPropagation()}
    >
      {/* 空白区域菜单 */}
      {isBlankArea && (
        <>
          <div style={{ padding: '4px 0' }}>
            <div style={{ padding: '4px 8px', fontSize: '12px', color: '#94a3b8' }}>
              创建节点
            </div>
            {nodeStyles.map((nodeStyle, index) => (
              <div
                key={index}
                style={{
                  ...menuItemStyle,
                  paddingLeft: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
                onMouseEnter={e => Object.assign(e.currentTarget.style, menuItemHoverStyle)}
                onMouseLeave={e => Object.assign(e.currentTarget.style, { backgroundColor: 'transparent' })}
                onClick={() => {
                  onAddNode(position, nodeStyle.style);
                  onClose();
                }}
              >
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '3px',
                  ...nodeStyle.style,
                }}></div>
                {nodeStyle.label}
              </div>
            ))}
          </div>
          <div style={{ padding: '4px 0' }}>
            <div style={{ padding: '4px 8px', fontSize: '12px', color: '#94a3b8' }}>
              创建分组
            </div>
            <div
              style={menuItemStyle}
              onMouseEnter={e => Object.assign(e.currentTarget.style, menuItemHoverStyle)}
              onMouseLeave={e => Object.assign(e.currentTarget.style, { backgroundColor: 'transparent' })}
              onClick={() => {
                onCreateEmptyGroup();
                onClose();
              }}
            >
              创建空分组
            </div>
            {hasSelectedNodes && (
              <div
                style={menuItemStyle}
                onMouseEnter={e => Object.assign(e.currentTarget.style, menuItemHoverStyle)}
                onMouseLeave={e => Object.assign(e.currentTarget.style, { backgroundColor: 'transparent' })}
                onClick={() => {
                  onCreateGroup();
                  onClose();
                }}
              >
                创建选中分组
              </div>
            )}
          </div>
        </>
      )}

      {/* 普通节点菜单 */}
      {isCustomNode && (
        <>
          <div
            style={{...menuItemStyle, color: '#ef4444'}}
            onMouseEnter={e => Object.assign(e.currentTarget.style, {...menuItemHoverStyle, color: '#ef4444'})}
            onMouseLeave={e => Object.assign(e.currentTarget.style, { backgroundColor: 'transparent' })}
            onClick={() => {
              onRemoveNode(node.id);
              onClose();
            }}
          >
            删除节点
          </div>
          {!node.parentNode && groupNodes.length > 0 && (
            <div style={{ padding: '4px 0' }}>
              <div style={{ padding: '4px 8px', fontSize: '12px', color: '#94a3b8' }}>
                添加到分组
              </div>
              {groupNodes.map(group => (
                <div
                  key={group.id}
                  style={{...menuItemStyle, paddingLeft: '24px'}}
                  onMouseEnter={e => Object.assign(e.currentTarget.style, menuItemHoverStyle)}
                  onMouseLeave={e => Object.assign(e.currentTarget.style, { backgroundColor: 'transparent' })}
                  onClick={() => {
                    onBatchAddToGroup(group.id);
                    onClose();
                  }}
                >
                  {group.data.label}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* 分组节点菜单 */}
      {isGroupNode && (
        <div
          style={{...menuItemStyle, color: '#ef4444'}}
          onMouseEnter={e => Object.assign(e.currentTarget.style, {...menuItemHoverStyle, color: '#ef4444'})}
          onMouseLeave={e => Object.assign(e.currentTarget.style, { backgroundColor: 'transparent' })}
          onClick={() => {
            onRemoveNode(node.id);
            onClose();
          }}
        >
          删除分组
        </div>
      )}

      {/* 批量操作菜单 */}
      {hasSelectedNodes && !isBlankArea && (
        <>
          {allSelectedNodesInGroup && (
            <div
              style={menuItemStyle}
              onMouseEnter={e => Object.assign(e.currentTarget.style, menuItemHoverStyle)}
              onMouseLeave={e => Object.assign(e.currentTarget.style, { backgroundColor: 'transparent' })}
              onClick={() => {
                onBatchRemoveFromGroup();
                onClose();
              }}
            >
              批量移出分组
            </div>
          )}
          {!allSelectedNodesInGroup && groupNodes.length > 0 && (
            <div style={{ padding: '4px 0' }}>
              <div style={{ padding: '4px 8px', fontSize: '12px', color: '#94a3b8' }}>
                批量添加到分组
              </div>
              {groupNodes.map(group => (
                <div
                  key={group.id}
                  style={{...menuItemStyle, paddingLeft: '24px'}}
                  onMouseEnter={e => Object.assign(e.currentTarget.style, menuItemHoverStyle)}
                  onMouseLeave={e => Object.assign(e.currentTarget.style, { backgroundColor: 'transparent' })}
                  onClick={() => {
                    onBatchAddToGroup(group.id);
                    onClose();
                  }}
                >
                  {group.data.label}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
});

function SelectionGrouping() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodes, setSelectedNodes] = useState([]);
  const { project } = useReactFlow();
  const [contextMenu, setContextMenu] = useState(null);

  
  const onConnect = useCallback(
    (params) => {
      const newParams = {
        ...params,
        sourceHandle: params.sourceHandle || 'bottom',
        targetHandle: params.targetHandle || 'top',
      };
      setEdges((eds) => addEdge(newParams, eds));
    },
    [setEdges]
  );

  const onSelectionChange = useCallback((params) => {
    setSelectedNodes(params.nodes);
  }, []);

  const onGroupClick = useCallback(() => {
    if (selectedNodes.length < 2) {
      alert('请选择至少两个节点进行分组！');
      return;
    }

    groupId++;
    const groupName = `分组 ${groupId}`;
    const minX = Math.min(...selectedNodes.map((node) => node.position.x));
    const minY = Math.min(...selectedNodes.map((node) => node.position.y));
    const maxX = Math.max(...selectedNodes.map((node) => node.position.x + (node.width || 150)));
    const maxY = Math.max(...selectedNodes.map((node) => node.position.y + (node.height || 40)));
    
    const padding = 50;
    const groupNode = {
      id: `group-${groupId}`,
      type: 'group',
      data: { 
        label: groupName,
        style: {
          width: maxX - minX + padding * 2,
          height: maxY - minY + padding * 2,
        }
      },
      position: { x: minX - padding, y: minY - padding },
      style: {
        width: maxX - minX + padding * 2,
        height: maxY - minY + padding * 2,
        backgroundColor: 'rgba(240, 240, 240, 0.3)',
        border: '1px solid #bbb',
        borderRadius: '8px',
        boxSizing: 'border-box',
        padding: '0',
      },
      draggable: true,
      resizable: true,
    };

    const updatedNodes = nodes.map((node) => {
      if (selectedNodes.find((selectedNode) => selectedNode.id === node.id)) {
        return {
          ...node,
          parentNode: `group-${groupId}`,
          extent: 'parent',
          position: {
            x: node.position.x - minX + padding,
            y: node.position.y - minY + padding,
          },
        };
      }
      return node;
    });

    setNodes([groupNode, ...updatedNodes]);
  }, [nodes, selectedNodes]);

  // 添加右键菜单处理函数
  const onContextMenu = useCallback(
    (event) => {
      event.preventDefault();
      const bounds = event.currentTarget.getBoundingClientRect();
      const position = project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      setContextMenu({
        x: event.clientX,
        y: event.clientY,
        position,
      });
    },
    [project]
  );

  // 添加新节点
  const addNode = useCallback(
    (position, style) => {
      if (!position) return;

      const newNode = {
        id: `node-${nodes.length + 1}`,
        type: 'customNode',
        position: position,
        data: { 
          label: `节点 ${nodes.length + 1}`,
          style: {
            ...style,
            borderRadius: '8px',
            padding: '14px',
            fontSize: '13px',
            color: '#373737',
            boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)',
            transition: 'all 0.2s ease',
          }
        },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [nodes, setNodes]
  );

  // 修改分组大小调整的处理函数
  const handleNodeDragStop = useCallback(
    (event, node) => {
      if (node.type === 'group') {
        const groupNodes = nodes.filter((n) => n.parentNode === node.id);
        if (groupNodes.length === 0) return;

        const minX = Math.min(...groupNodes.map((n) => n.position.x));
        const minY = Math.min(...groupNodes.map((n) => n.position.y));
        const maxX = Math.max(...groupNodes.map((n) => n.position.x + (n.width || 150)));
        const maxY = Math.max(...groupNodes.map((n) => n.position.y + (n.height || 40)));

        const padding = 50;
        setNodes((nds) =>
          nds.map((n) => {
            if (n.id === node.id) {
              return {
                ...n,
                style: {
                  ...n.style,
                  width: maxX - minX + padding * 2,
                  height: maxY - minY + padding * 2,
                },
              };
            }
            return n;
          })
        );
      }
    },
    [nodes, setNodes]
  );

  // 修改为 handleNodesChange
  const handleNodesChange = useCallback(
    (changes) => {
      // 只在必要时处理节点变化
      changes.forEach((change) => {
        if (change.type === 'dimensions' || change.type === 'position') {
          const node = nodes.find((n) => n.id === change.id);
          if (node && node.parentNode) {
            // 保持子节点在父节点内的相对位置
            const parentNode = nodes.find((n) => n.id === node.parentNode);
            if (parentNode && parentNode.type === 'group') {
              // 不自动调整分组大小
              return;
            }
          }
        }
      });

      // 调用原始的 onNodesChange
      onNodesChange(changes);
    },
    [nodes, onNodesChange]
  );

  // 修改创建空分组的处理函数
  const onCreateEmptyGroup = useCallback(() => {
    groupId++;
    const groupName = `分组 ${groupId}`;
    
    const groupNode = {
      id: `group-${groupId}`,
      type: 'group',
      data: { 
        label: groupName,
        style: {
          width: 200,
          height: 150,
        }
      },
      position: { x: 100, y: 100 },
      style: {
        width: 200,
        height: 150,
        backgroundColor: 'rgba(240, 240, 240, 0.3)',
        border: '1px solid #bbb',
        borderRadius: '8px',
        boxSizing: 'border-box',
        padding: '10px',
      },
      draggable: true,
      resizable: true,
    };

    setNodes((nds) => [...nds, groupNode]);
  }, [setNodes]);

  // 添加节点右键菜单处理函数
  const onNodeContextMenu = useCallback(
    (event, node) => {
      event.preventDefault();
      event.stopPropagation();
      
      setContextMenu({
        x: event.clientX,
        y: event.clientY,
        node: node,
      });
    },
    []
  );
  
  // 批量移出分组
  const batchRemoveFromGroup =  () => {
    if (selectedNodes.length === 0) {
      alert('请选择要移出的节点！');
      return;
    }
    setNodes((nds) =>
      nds.map((node) => {
        if (selectedNodes.find((selectedNode) => selectedNode.id === node.id)) {
          const { parentNode, extent, ...rest } = node;
          return {
            ...rest,
            position: {
              x: node.position.x + (node.parentNode ? (nodes.find(n => n.id === node.parentNode)?.position.x || 0) : 0),
              y: node.position.y + (node.parentNode ? (nodes.find(n => n.id === node.parentNode)?.position.y || 0) : 0),
            },
          };
        }
        return node;
      })
    );
  };
   
  // 批量将选中节点添加到指定分组
  const batchAddToGroup = useCallback((groupId) => {
    if (selectedNodes.length === 0) {
      alert('请先选择要添加的节点！');
      return;
    }
    
    setNodes((nds) => {
      const groupNode = nds.find((n) => n.id === groupId);
      if (!groupNode) return nds;
      
      // 计算选中节点的边界
      const selectedNodeIds = new Set(selectedNodes.map(n => n.id));
      const nodesToUpdate = nds.filter(n => selectedNodeIds.has(n.id));
      
      // 获取当前分组内的所有节点（包括已有的和将要添加的）
      const allGroupNodes = [
        ...nds.filter(n => n.parentNode === groupId),
        ...nodesToUpdate
      ];
      
      // 计算所有节点的边界
      const minX = Math.min(...allGroupNodes.map(n => n.position.x));
      const minY = Math.min(...allGroupNodes.map(n => n.position.y));
      const maxX = Math.max(...allGroupNodes.map(n => n.position.x + (n.width || 150)));
      const maxY = Math.max(...allGroupNodes.map(n => n.position.y + (n.height || 40)));
      
      const padding = 50;
      
      // 更新分组大小和位置
      return nds.map(node => {
        if (node.id === groupId) {
          // 更新分组节点
          return {
            ...node,
            style: {
              ...node.style,
              width: maxX - minX + padding * 2,
              height: maxY - minY + padding * 2,
            },
            data: {
              ...node.data,
              style: {
                ...node.data.style,
                width: maxX - minX + padding * 2,
                height: maxY - minY + padding * 2,
              }
            },
            position: {
              x: minX - padding,
              y: minY - padding,
            }
          };
        }
        if (selectedNodeIds.has(node.id)) {
          // 更新要添加到分组的节点
          return {
            ...node,
            parentNode: groupId,
            extent: 'parent',
            position: {
              x: node.position.x - minX + padding,
              y: node.position.y - minY + padding,
            },
          };
        }
        if (node.parentNode === groupId) {
          // 更新已在分组内的节点位置
          return {
            ...node,
            position: {
              x: node.position.x - minX + padding,
              y: node.position.y - minY + padding,
            },
          };
        }
        return node;
      });
    });
  }, [selectedNodes]);

  // 修改 addToGroup 函数
  const addToGroup = useCallback((groupId) => {
    if (!contextMenu?.node) return;
    
    setNodes((nds) => {
      const nodeToAdd = contextMenu.node;
      
      // 获取当前分组内的所有节点（包括已有的和将要添加的）
      const allGroupNodes = [
        ...nds.filter(n => n.parentNode === groupId),
        nodeToAdd
      ];
      
      // 计算所有节点的边界
      const minX = Math.min(...allGroupNodes.map(n => n.position.x));
      const minY = Math.min(...allGroupNodes.map(n => n.position.y));
      const maxX = Math.max(...allGroupNodes.map(n => n.position.x + (n.width || 150)));
      const maxY = Math.max(...allGroupNodes.map(n => n.position.y + (n.height || 40)));
      
      const padding = 50;
      
      return nds.map(node => {
        if (node.id === groupId) {
          // 更新分组节点
          return {
            ...node,
            style: {
              ...node.style,
              width: maxX - minX + padding * 2,
              height: maxY - minY + padding * 2,
            },
            data: {
              ...node.data,
              style: {
                ...node.data.style,
                width: maxX - minX + padding * 2,
                height: maxY - minY + padding * 2,
              }
            },
            position: {
              x: minX - padding,
              y: minY - padding,
            }
          };
        }
        if (node.id === nodeToAdd.id) {
          // 更新要添加到分组的节点
          return {
            ...node,
            parentNode: groupId,
            extent: 'parent',
            position: {
              x: node.position.x - minX + padding,
              y: node.position.y - minY + padding,
            },
          };
        }
        if (node.parentNode === groupId) {
          // 更新已在分组内的节点位置
          return {
            ...node,
            position: {
              x: node.position.x - minX + padding,
              y: node.position.y - minY + padding,
            },
          };
        }
        return node;
      });
    });
    setContextMenu(null);
  }, [contextMenu]);

  // 从分组中移除
  const removeFromGroup = useCallback(() => {
    if (!contextMenu?.node) return;
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === contextMenu.node.id) {
          const groupNode = nds.find((n) => n.parentNode === node.parentNode);
          return {
            ...node,
            parentNode: undefined,
            extent: undefined,
            position: {
              x: node.position.x + (groupNode?.position.x || 0),
              y: node.position.y + (groupNode?.position.y || 0),
            },
          };
        }
        return node;
      })
    );
    setContextMenu(null);
  }, [contextMenu, setNodes]);

  // 修改分组大小调整的处理函数
  const onNodeResize = useCallback(
    (evt, node, newWidth, newHeight) => {
      if (node.type === 'group') {
        setNodes((nds) =>
          nds.map((n) => {
            if (n.id === node.id) {
              // 更新分组节点的样式
              return {
                ...n,
                style: {
                  ...n.style,
                  width: newWidth,
                  height: newHeight,
                },
                // 更新数据中的样式
                data: {
                  ...n.data,
                  style: {
                    ...n.data.style,
                    width: newWidth,
                    height: newHeight,
                  }
                }
              };
            }
            return n;
          })
        );
      }
    },
    [setNodes]
  );

  const onNodeDragStop = useCallback(() => {
    // 移除自动调整大小的逻辑，保持分组大小不变
  }, []);

  const onRemoveNode = useCallback((nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    // 同时删除相关的边
    setEdges((eds) => eds.filter((edge) => 
      edge.source !== nodeId && edge.target !== nodeId
    ));
  }, [setNodes, setEdges]);

  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    if (contextMenu) {
      window.addEventListener('click', handleClick);
      return () => window.removeEventListener('click', handleClick);
    }
  }, [contextMenu]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onSelectionChange={onSelectionChange}
        onNodeDragStop={onNodeDragStop}
        onContextMenu={onContextMenu}
        onNodeContextMenu={onNodeContextMenu}
        onNodeResize={onNodeResize}
        nodeTypes={nodeTypes}
        multiSelectionKeyCode="Control"
        selectionMode="partial"
        style={{...flowStyles, borderRadius: '18px', boxShadow: '0 4px 24px 0 rgba(99,102,241,0.10)', border: '1.5px solid #e0e7ff'}} 
        nodesFocusable={true}
        selectNodesOnDrag={true}
        className="react-flow-node-selected"
        fitView
      >
        <Controls 
          style={{ 
            button: {
              backgroundColor: '#fefefe',
              border: '1px solid #eee',
              borderRadius: '4px',
            },
          }} 
        />
        <Background variant="dots" gap={12} size={1} color="#99999922" />
        {contextMenu && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            node={contextMenu.node}
            nodes={nodes}
            selectedNodes={selectedNodes}
            onRemoveNode={onRemoveNode}
            onClose={() => setContextMenu(null)}
            onCreateGroup={onGroupClick}
            onCreateEmptyGroup={onCreateEmptyGroup}
            onBatchRemoveFromGroup={batchRemoveFromGroup}
            onBatchAddToGroup={batchAddToGroup}
            position={contextMenu.position}
            onAddNode={addNode}
          />
        )}
      </ReactFlow>
    </div>
  );
}

export default SelectionGrouping;
