import React, { useState } from 'react';
import { DatePicker, InputNumber, Button, Radio } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, CalculatorOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import './App.css';

interface CalculationResult {
  id: number;
  operation: 'add' | 'subtract';
  hours: number;
  minutes: number;
  result: Dayjs;
  timestamp: Dayjs;
}

function App() {
  const [baseTime, setBaseTime] = useState<Dayjs | null>(dayjs());
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [results, setResults] = useState<CalculationResult[]>([]);

  const handleCalculate = () => {
    if (!baseTime) return;

    const totalMinutes = hours * 60 + minutes;
    const newResult = operation === 'add' 
      ? baseTime.add(totalMinutes, 'minute')
      : baseTime.subtract(totalMinutes, 'minute');

    const newCalculation: CalculationResult = {
      id: Date.now(),
      operation,
      hours,
      minutes,
      result: newResult,
      timestamp: dayjs()
    };

    setResults(prev => [newCalculation, ...prev]);
  };

  const formatDuration = (hours: number, minutes: number) => {
    const parts = [];
    if (hours > 0) parts.push(`${hours}小时`);
    if (minutes > 0) parts.push(`${minutes}分钟`);
    return parts.join('');
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="main-title">时间计算器</h1>
        <p className="subtitle">精准的时间加减运算工具</p>
        
        <div className="main-content">
          {/* 输入区域 */}
          <div className="input-section">
            <h2 className="section-title">
              <div className="section-icon">
                <CalculatorOutlined />
              </div>
              计算设置
            </h2>
            
            <div className="form-group">
              <label className="form-label">
                <CalendarOutlined style={{ marginRight: 8 }} />
                选择基准时间
              </label>
              <DatePicker
                showTime
                value={baseTime}
                onChange={setBaseTime}
                placeholder="请选择日期和时间"
                format="YYYY-MM-DD HH:mm:ss"
                style={{ width: '100%' }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">选择操作类型</label>
              <Radio.Group 
                value={operation} 
                onChange={(e) => setOperation(e.target.value)}
                style={{ width: '100%' }}
              >
                <Radio.Button value="add">
                  <PlusOutlined style={{ marginRight: 4 }} />
                  增加时间
                </Radio.Button>
                <Radio.Button value="subtract">
                  <MinusOutlined style={{ marginRight: 4 }} />
                  减少时间
                </Radio.Button>
              </Radio.Group>
            </div>

            <div className="form-group">
              <label className="form-label">
                <ClockCircleOutlined style={{ marginRight: 8 }} />
                设置时长
              </label>
              <div className="time-inputs">
                <div className="time-input-group">
                  <div className="time-input-label">小时</div>
                  <InputNumber
                    min={0}
                    max={23}
                    value={hours}
                    onChange={(value) => setHours(value || 0)}
                    placeholder="0"
                  />
                </div>
                <div className="time-input-group">
                  <div className="time-input-label">分钟</div>
                  <InputNumber
                    min={0}
                    max={59}
                    value={minutes}
                    onChange={(value) => setMinutes(value || 0)}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            <Button 
              type="primary" 
              onClick={handleCalculate}
              disabled={!baseTime || (hours === 0 && minutes === 0)}
              className="calculate-btn"
            >
              <CalculatorOutlined style={{ marginRight: 8 }} />
              开始计算
            </Button>
          </div>

          {/* 结果区域 */}
          <div className="results-section">
            <h2 className="section-title">
              <div className="section-icon">
                <ClockCircleOutlined />
              </div>
              计算结果
            </h2>
            
            <div className="results-list">
              {results.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">🕐</div>
                  <div className="empty-text">暂无计算结果</div>
                  <div className="empty-subtitle">请在左侧设置时间并点击计算</div>
                </div>
              ) : (
                results.map((result) => (
                  <div key={result.id} className="result-item">
                    <div className="result-operation">
                      <div className={`operation-icon ${result.operation === 'add' ? 'operation-add' : 'operation-subtract'}`}>
                        {result.operation === 'add' ? '+' : '-'}
                      </div>
                      {result.operation === 'add' ? '增加' : '减少'} {formatDuration(result.hours, result.minutes)}
                    </div>
                    <div className="result-time">
                      {result.result.format('YYYY-MM-DD HH:mm:ss')}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
