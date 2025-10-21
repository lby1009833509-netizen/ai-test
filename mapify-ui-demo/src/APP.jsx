import React, { useState } from 'react';
import { ConfigProvider } from 'antd';
import { ModeSelectionHomepage } from './components/ModeSelectionHomepage';
import { ImmersiveLearningInterface } from './components/ImmersiveLearningInterface';

// 主题配置
const customTheme = {
  token: {
    colorPrimary: '#ec4899',
    colorLink: '#6366f1',
    borderRadius: 12,
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
  },
};

export default function App() {
  const [appState, setAppState] = useState('homepage'); // 'homepage' | 'learning_interface'

  const handleModeSelect = (mode) => {
    if (mode === 'summary') {
      alert('跳转到总结模式上传页 (演示)');
    }
  };
  
  const handleStartLearning = () => {
     // 在实际应用中，这里会有一个加载/处理状态
     setAppState('learning_interface');
  }

  const renderContent = () => {
    switch (appState) {
      case 'learning_interface':
        return <ImmersiveLearningInterface />;
      case 'homepage':
      default:
        return (
          <ModeSelectionHomepage 
            onModeSelect={handleModeSelect} 
            onStartLearning={handleStartLearning} 
          />
        );
    }
  };

  return (
    <ConfigProvider theme={customTheme}>
      {renderContent()}
    </ConfigProvider>
  );
}