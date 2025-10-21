import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Upload, Input, Tooltip } from 'antd';
import { ThunderboltOutlined, ExperimentOutlined, UploadOutlined, InfoCircleOutlined } from '@ant-design/icons';
import './ModeSelection.css';

const { TextArea } = Input;

// 页面二：学习任务定义页
const LearningTaskPage = ({ onStart }) => (
  <motion.div
    className="learning-task-container"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: 0.4 }}
  >
    <div className="task-card">
      <div className="step">
        <h2 className="step-title">第一步：提供你的学习资料</h2>
        <Upload.Dragger name="file" multiple={false} action="/upload.do" className="upload-dragger">
          <p className="ant-upload-drag-icon">
            <UploadOutlined />
          </p>
          <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
          <p className="ant-upload-hint">支持 PDF, TXT, 等格式, 或在下方粘贴链接/文本。</p>
        </Upload.Dragger>
        <TextArea rows={3} placeholder="在此粘贴网址、YouTube链接或任何文本内容..." className="text-input" />
      </div>
      <div className="step">
        <h2 className="step-title">第二步：设定你的学习目标 (选填)
          <Tooltip title="提供学习目标能让 AI 生成的导图和总结更具针对性。">
            <InfoCircleOutlined style={{ marginLeft: 8, color: 'rgba(0,0,0,0.45)', cursor: 'pointer' }} />
          </Tooltip>
        </h2>
        <TextArea
          rows={2}
          placeholder="例如：‘这份商业计划书最大的风险是什么？’"
          className="goal-input"
        />
      </div>
      <Button type="primary" size="large" block onClick={onStart} className="start-button">
        开始构建学习地图
      </Button>
    </div>
  </motion.div>
);

// 页面一：模式选择主页
export const ModeSelectionHomepage = ({ onModeSelect, onStartLearning }) => {
  const [mode, setMode] = useState(null);

  const handleSelectMode = (selectedMode) => {
    if (selectedMode === 'summary') {
      onModeSelect('summary'); 
    } else {
      setMode('learning');
    }
  };

  return (
    <div className="homepage-container">
      <AnimatePresence>
        {mode !== 'learning' && (
          <motion.div className="split-screen">
            <motion.div
              className="mode-panel summary-panel"
              whileHover={{ scale: 1.03 }}
              onClick={() => handleSelectMode('summary')}
              initial={{ x: 0 }}
              animate={{ x: mode === 'learning' ? '-100vw' : 0 }}
              exit={{ x: '-100vw' }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            >
              <div className="panel-content">
                <ThunderboltOutlined className="mode-icon" />
                <h1 className="mode-title">快速总结</h1>
                <p className="mode-description">上传资料，一键提炼核心要点。适合快速阅览、提炼精华、把握主旨。</p>
                <motion.div className="cta-text">
                  选择总结模式 →
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="mode-panel learning-panel"
              whileHover={{ scale: 1.03 }}
              onClick={() => handleSelectMode('learning')}
              initial={{ x: 0 }}
              animate={{ x: mode === 'learning' ? '-50vw' : 0 }}
              exit={{ x: '-50vw' }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            >
              <div className="panel-content">
                <ExperimentOutlined className="mode-icon" />
                <h1 className="mode-title">深度学习</h1>
                <p className="mode-description">提出你的学习目标，与 AI 共同探索、构建、内化知识。适合系统学习、课题研究。</p>
                <motion.div className="cta-text">
                  选择学习模式 →
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mode === 'learning' && <LearningTaskPage onStart={onStartLearning} />}
      </AnimatePresence>
    </div>
  );
};