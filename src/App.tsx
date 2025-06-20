import React, { useState } from 'react';
import { DatePicker, InputNumber, Button, Space, Card, Typography, Radio, Row, Col, List } from 'antd';
import { PlusOutlined, MinusOutlined, ClockCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import 'antd/dist/reset.css';

const { Title, Text } = Typography;

interface CalculationResult {
  id: number;
  operation: 'add' | 'subtract';
  hours: number;
  minutes: number;
  resultTime: string;
}

function App() {
  const [baseTime, setBaseTime] = useState<dayjs.Dayjs | null>(null);
  const [durationHours, setDurationHours] = useState<number>(0);
  const [durationMinutes, setDurationMinutes] = useState<number>(0);
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');
  const [results, setResults] = useState<CalculationResult[]>([]);

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setBaseTime(date);
  };

  const calculateTime = () => {
    if (!baseTime) {
      return;
    }

    const totalDurationInMinutes = (durationHours * 60) + durationMinutes;

    const calculatedTime = operation === 'add' 
      ? baseTime.add(totalDurationInMinutes, 'minute')
      : baseTime.subtract(totalDurationInMinutes, 'minute');

    const newResult: CalculationResult = {
      id: Date.now(),
      operation: operation,
      hours: durationHours,
      minutes: durationMinutes,
      resultTime: calculatedTime.format('YYYY-MM-DD HH:mm:ss'),
    };

    setResults([newResult, ...results]);
  };

  const formatDuration = (hours: number, minutes: number): string => {
    let str = '';
    if (hours > 0) {
      str += `${hours}小时 `;
    }
    if (minutes > 0 || hours === 0) {
      str += `${minutes}分钟`;
    }
    return str.trim();
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d30 50%, #1a1a1a 100%)',
      padding: '0',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      {/* Hero Section */}
      <div style={{ 
        textAlign: 'center', 
        padding: '60px 24px 40px',
        background: 'rgba(28, 28, 30, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <ClockCircleOutlined style={{ 
          fontSize: '48px', 
          color: '#007AFF', 
          marginBottom: '24px',
          display: 'block'
        }} />
        <Title 
          level={1} 
          style={{ 
            fontSize: '48px',
            fontWeight: 700,
            color: '#f5f5f7',
            margin: '0 0 16px 0',
            letterSpacing: '-0.02em',
            lineHeight: 1.1
          }}
        >
          时间计算器
        </Title>
        <Text style={{ 
          fontSize: '19px',
          color: '#a1a1a6',
          fontWeight: 400,
          lineHeight: 1.4,
          maxWidth: '600px',
          display: 'block',
          margin: '0 auto'
        }}>
          精准计算时间，让每一分每一秒都有意义
        </Text>
      </div>

      {/* Main Content - 使用两列布局 */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '40px 24px'
      }}>
        <Row gutter={[32, 32]}>
          {/* 左侧：输入区域 */}
          <Col xs={24} lg={12}>
            <Card style={{
              borderRadius: '18px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
              background: 'rgba(28, 28, 30, 0.95)',
              backdropFilter: 'blur(20px)',
              overflow: 'hidden'
            }}>
              <div style={{ padding: '32px' }}>
                <Space direction="vertical" size={32} style={{ width: '100%' }}>
                  
                  {/* Base Time Section */}
                  <div>
                    <Title level={3} style={{ 
                      fontSize: '24px',
                      fontWeight: 600,
                      color: '#f5f5f7',
                      marginBottom: '12px',
                      letterSpacing: '-0.01em'
                    }}>
                      选择基准时间
                    </Title>
                    <Text style={{ 
                      fontSize: '15px',
                      color: '#a1a1a6',
                      display: 'block',
                      marginBottom: '16px'
                    }}>
                      设定您的起始时间点
                    </Text>
                    <DatePicker
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                      value={baseTime}
                      onChange={handleDateChange}
                      style={{ 
                        width: '100%',
                        height: '48px',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        background: 'rgba(44, 44, 46, 0.8)',
                        color: '#f5f5f7',
                        fontSize: '15px',
                        transition: 'all 0.3s ease'
                      }}
                      placeholder="请选择日期和时间"
                    />
                  </div>

                  {/* Operation Section */}
                  <div>
                    <Title level={3} style={{ 
                      fontSize: '24px',
                      fontWeight: 600,
                      color: '#f5f5f7',
                      marginBottom: '12px',
                      letterSpacing: '-0.01em'
                    }}>
                      选择操作
                    </Title>
                    <Text style={{ 
                      fontSize: '15px',
                      color: '#a1a1a6',
                      display: 'block',
                      marginBottom: '16px'
                    }}>
                      增加或减少时间
                    </Text>
                    <Radio.Group 
                      value={operation} 
                      onChange={(e) => setOperation(e.target.value)}
                      style={{ width: '100%' }}
                    >
                      <Row gutter={12}>
                        <Col span={12}>
                          <Radio.Button 
                            value="add" 
                            style={{
                              width: '100%',
                              height: '56px',
                              borderRadius: '12px',
                              border: operation === 'add' ? '2px solid #007AFF' : '1px solid rgba(255, 255, 255, 0.2)',
                              background: operation === 'add' ? '#007AFF' : 'rgba(44, 44, 46, 0.8)',
                              color: operation === 'add' ? '#ffffff' : '#f5f5f7',
                              fontSize: '15px',
                              fontWeight: 500,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.3s ease'
                            }}
                          >
                            <PlusOutlined style={{ marginRight: '6px' }} />
                            增加时间
                          </Radio.Button>
                        </Col>
                        <Col span={12}>
                          <Radio.Button 
                            value="subtract"
                            style={{
                              width: '100%',
                              height: '56px',
                              borderRadius: '12px',
                              border: operation === 'subtract' ? '2px solid #007AFF' : '1px solid rgba(255, 255, 255, 0.2)',
                              background: operation === 'subtract' ? '#007AFF' : 'rgba(44, 44, 46, 0.8)',
                              color: operation === 'subtract' ? '#ffffff' : '#f5f5f7',
                              fontSize: '15px',
                              fontWeight: 500,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.3s ease'
                            }}
                          >
                            <MinusOutlined style={{ marginRight: '6px' }} />
                            减少时间
                          </Radio.Button>
                        </Col>
                      </Row>
                    </Radio.Group>
                  </div>

                  {/* Duration Section */}
                  <div>
                    <Title level={3} style={{ 
                      fontSize: '24px',
                      fontWeight: 600,
                      color: '#f5f5f7',
                      marginBottom: '12px',
                      letterSpacing: '-0.01em'
                    }}>
                      输入时长
                    </Title>
                    <Text style={{ 
                      fontSize: '15px',
                      color: '#a1a1a6',
                      display: 'block',
                      marginBottom: '16px'
                    }}>
                      精确到小时和分钟
                    </Text>
                    <Row gutter={16}>
                      <Col span={12}>
                        <div style={{ textAlign: 'center' }}>
                          <Text style={{ 
                            fontSize: '13px',
                            color: '#a1a1a6',
                            display: 'block',
                            marginBottom: '6px',
                            fontWeight: 500
                          }}>
                            小时
                          </Text>
                          <InputNumber
                            min={0}
                            value={durationHours}
                            onChange={(value) => setDurationHours(value || 0)}
                            style={{ 
                              width: '100%',
                              height: '48px',
                              borderRadius: '12px',
                              border: '1px solid rgba(255, 255, 255, 0.2)',
                              background: 'rgba(44, 44, 46, 0.8)',
                              color: '#f5f5f7',
                              fontSize: '20px',
                              fontWeight: 600,
                              textAlign: 'center'
                            }}
                            controls={false}
                          />
                        </div>
                      </Col>
                      <Col span={12}>
                        <div style={{ textAlign: 'center' }}>
                          <Text style={{ 
                            fontSize: '13px',
                            color: '#a1a1a6',
                            display: 'block',
                            marginBottom: '6px',
                            fontWeight: 500
                          }}>
                            分钟
                          </Text>
                          <InputNumber
                            min={0}
                            max={59}
                            value={durationMinutes}
                            onChange={(value) => setDurationMinutes(value || 0)}
                            style={{ 
                              width: '100%',
                              height: '48px',
                              borderRadius: '12px',
                              border: '1px solid rgba(255, 255, 255, 0.2)',
                              background: 'rgba(44, 44, 46, 0.8)',
                              color: '#f5f5f7',
                              fontSize: '20px',
                              fontWeight: 600,
                              textAlign: 'center'
                            }}
                            controls={false}
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>

                  {/* Calculate Button */}
                  <Button 
                    type="primary" 
                    onClick={calculateTime} 
                    disabled={!baseTime}
                    style={{
                      width: '100%',
                      height: '52px',
                      borderRadius: '26px',
                      border: 'none',
                      background: baseTime ? '#007AFF' : 'rgba(99, 99, 102, 0.6)',
                      fontSize: '16px',
                      fontWeight: 600,
                      boxShadow: baseTime ? '0 4px 16px rgba(0, 122, 255, 0.4)' : 'none',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    计算时间
                  </Button>
                </Space>
              </div>
            </Card>
          </Col>

          {/* 右侧：结果区域 */}
          <Col xs={24} lg={12}>
            {results.length > 0 ? (
              <Card style={{
                borderRadius: '18px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                background: 'rgba(28, 28, 30, 0.95)',
                backdropFilter: 'blur(20px)',
                overflow: 'hidden',
                height: 'fit-content'
              }}>
                <div style={{ padding: '32px' }}>
                  <Title level={3} style={{ 
                    fontSize: '24px',
                    fontWeight: 600,
                    color: '#f5f5f7',
                    marginBottom: '24px',
                    letterSpacing: '-0.01em'
                  }}>
                    计算历史
                  </Title>
                  
                  <div style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    maxHeight: '500px',
                    overflowY: 'auto',
                    paddingRight: '8px'
                  }}>
                    {results.map((item, index) => (
                      <div
                        key={item.id}
                        style={{
                          padding: '20px',
                          borderRadius: '12px',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          background: 'rgba(44, 44, 46, 0.6)',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <div style={{ 
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '12px'
                        }}>
                          <div style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '14px',
                            background: item.operation === 'add' ? '#30D158' : '#FF453A',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '12px'
                          }}>
                            {item.operation === 'add' ? 
                              <PlusOutlined style={{ color: 'white', fontSize: '12px' }} /> :
                              <MinusOutlined style={{ color: 'white', fontSize: '12px' }} />
                            }
                          </div>
                          <Text style={{ 
                            fontSize: '14px',
                            color: '#a1a1a6',
                            fontWeight: 500
                          }}>
                            {item.operation === 'add' ? '增加' : '减少'} {formatDuration(item.hours, item.minutes)}
                          </Text>
                        </div>
                        <Text style={{ 
                          fontSize: '18px',
                          color: '#f5f5f7',
                          fontWeight: 600,
                          display: 'block',
                          marginBottom: '4px'
                        }}>
                          {item.resultTime}
                        </Text>
                        <Text style={{ 
                          fontSize: '12px',
                          color: '#8e8e93'
                        }}>
                          基于 {baseTime?.format('MM-DD HH:mm')}
                        </Text>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ) : (
              <Card style={{
                borderRadius: '18px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                background: 'rgba(28, 28, 30, 0.95)',
                backdropFilter: 'blur(20px)',
                overflow: 'hidden',
                height: 'fit-content'
              }}>
                <div style={{ 
                  padding: '60px 32px',
                  textAlign: 'center'
                }}>
                  <ClockCircleOutlined style={{ 
                    fontSize: '48px', 
                    color: 'rgba(161, 161, 166, 0.5)', 
                    marginBottom: '16px',
                    display: 'block'
                  }} />
                  <Text style={{ 
                    fontSize: '16px',
                    color: '#a1a1a6',
                    display: 'block'
                  }}>
                    选择基准时间并点击计算
                  </Text>
                  <Text style={{ 
                    fontSize: '14px',
                    color: '#8e8e93',
                    display: 'block',
                    marginTop: '8px'
                  }}>
                    计算结果将在这里显示
                  </Text>
                </div>
              </Card>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default App;
