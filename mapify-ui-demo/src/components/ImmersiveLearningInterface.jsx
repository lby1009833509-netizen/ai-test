import React, { useCallback } from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';
import { Layout, Input, Button, Card, Avatar } from 'antd';
import { SendOutlined, UserOutlined, RobotOutlined } from '@ant-design/icons';
import './LearningInterface.css';

const { Sider, Content } = Layout;

// 初始数据
const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '商业计划书核心', status: 'learned' }, type: 'custom' },
  { id: '2', position: { x: -250, y: 120 }, data: { label: '市场竞争分析', status: 'learning' }, type: 'custom' },
  { id: '3', position: { x: 250, y: 120 }, data: { label: '资金链风险', status: 'todo' }, type: 'custom' },
  { id: '4', position: { x: -350, y: 240 }, data: { label: '竞品 A 优势', status: 'todo' }, type: 'custom' },
  { id: '5', position: { x: -150, y: 240 }, data: { label: '市场饱和度', status: 'learned' }, type: 'custom' },
];

const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', animated: true, style: { strokeWidth: 2 } }, 
    { id: 'e1-3', source: '1', target: '3', style: { strokeWidth: 2 } },
    { id: 'e2-4', source: '2', target: '4', style: { strokeWidth: 2 } },
    { id: 'e2-5', source: '2', target: '5', style: { strokeWidth: 2 } },
];

// 自定义节点组件
const CustomNode = ({ data }) => {
    const getNodeClass = (status) => {
        switch (status) {
            case 'learned': return 'node-learned';
            case 'learning': return 'node-learning';
            case 'todo': return 'node-todo';
            default: return '';
        }
    };
    return (
        <div className={`custom-node ${getNodeClass(data.status)}`}>
            {data.label}
        </div>
    );
};

const nodeTypes = { custom: CustomNode };

// 主界面组件
export const ImmersiveLearningInterface = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <Layout className="learning-interface">
      <Sider width={350} className="sider-chatbox" theme="light">
        <div className="chatbox-header">AI 学习向导</div>
        <div className="chatbox-content">
            <Card size="small" title="学习简报 (Briefing)" style={{marginBottom: '16px'}}>
                <p>根据你的问题，这份商业计划书的最大风险主要体现在<strong>市场竞争</strong>和<strong>资金链</strong>两个方面。导图中粉色节点是我们正在学习的重点。</p>
            </Card>
            <div className="message message-ai">
                <Avatar icon={<RobotOutlined />} />
                <div className="message-bubble">好的，关于“市场竞争分析”部分，您想先了解哪个方面？</div>
            </div>
             <div className="message message-user">
                <div className="message-bubble">先说说市场饱和度吧。</div>
                <Avatar icon={<UserOutlined />} />
            </div>
        </div>
        <div className="chatbox-input">
            <Input.TextArea autoSize={{minRows: 1, maxRows: 4}} placeholder="继续提问..." />
            <Button type="primary" icon={<SendOutlined />} />
        </div>
      </Sider>

      <Content className="content-mindmap">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Controls />
          <MiniMap nodeColor={n => {
            if (n.data.status === 'learned') return '#4ade80';
            if (n.data.status === 'learning') return '#ec4899';
            return '#6366f1';
          }} />
          <Background variant="dots" gap={16} size={1} />
        </ReactFlow>
      </Content>

      <Sider width={350} className="sider-source" theme="light">
         <div className="source-header">信息源: 商业计划书.pdf</div>
         <div className="source-content">
             <div className="source-toolbar">
                <Input.Search placeholder="在文档中搜索..." allowClear />
             </div>
             <div className="source-document">
                <h4>3. 市场分析</h4>
                <p>当前市场的增长率放缓，逐渐趋于饱和。尤其是在一线城市，用户获取成本急剧上升...</p>
                <h4>4. 竞争格局</h4>
                <p>...主要的<mark>市场竞争</mark>来自于已上市的竞品A和新兴的创业公司B。竞品A凭借其雄厚的资本和品牌效应，占据了约40%的市场份额...</p>
                <h4>5. 风险评估</h4>
                <p>...最大的不确定性在于<mark>资金链</mark>能否支撑到产品实现盈利。根据预测，我们需要至少18个月的持续投入...</p>
             </div>
         </div>
      </Sider>
    </Layout>
  );
};