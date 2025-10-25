import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Icon from './Icon';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function ChartSection({ zoneData, onDeviceSelect }) {
  const [activeMetric, setActiveMetric] = useState('humedad');
  const [activeTimeRange, setActiveTimeRange] = useState('24h');
  const [selectedDevice, setSelectedDevice] = useState(zoneData?.chartData?.selectedDevice || 'sensor1');

  if (!zoneData) return null;

  // Datos dinámicos por zona
  const generateChartData = () => {
    let data = [];
    let labels = [];
    
    // Obtener el dispositivo seleccionado
    const selectedDeviceData = zoneData.chartData.devices.find(d => d.id === selectedDevice);
    if (!selectedDeviceData) return { labels: [], datasets: [] };
    
    // Obtener datos según el rango de tiempo seleccionado
    if (activeTimeRange === '24h') {
      // Últimas 24 horas
      if (activeMetric === 'humedad') {
        data = selectedDeviceData.humidityData30 || [];
      } else if (activeMetric === 'temperatura') {
        data = selectedDeviceData.temperatureData30 || [];
      } else {
        data = selectedDeviceData.conductivityData30 || [];
      }
      
      // Generar labels de tiempo por hora
      const now = new Date();
      const dataLength = data.length;
      for (let i = dataLength - 1; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        labels.push(time.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }));
      }
    } else if (activeTimeRange === '7d') {
      // Últimos 7 días
      const weekData = zoneData.chartDataWeek.devices.find(d => d.id === selectedDevice);
      if (activeMetric === 'humedad') {
        data = weekData?.humidityData || [];
      } else if (activeMetric === 'temperatura') {
        data = weekData?.temperatureData || [];
      } else {
        data = Array(7).fill(0);
      }
      
      // Labels por día
      const now = new Date();
      const dataLength = data.length;
      for (let i = dataLength - 1; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        labels.push(date.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' }));
      }
    } else if (activeTimeRange === '30d') {
      // Últimos 30 días
      const monthData = zoneData.chartDataMonth.devices.find(d => d.id === selectedDevice);
      if (activeMetric === 'humedad') {
        data = monthData?.humidityData || [];
      } else if (activeMetric === 'temperatura') {
        data = monthData?.temperatureData || [];
      } else {
        data = Array(30).fill(0);
      }
      
      // Labels por día
      const now = new Date();
      const dataLength = data.length;
      for (let i = dataLength - 1; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        labels.push(date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }));
      }
    }

    return {
      labels: labels,
      datasets: activeMetric === 'humedad' ? [
        {
          label: 'Humedad 30cm',
          data: (selectedDeviceData.humidityData30 || []).map(value => value + 40),
          fill: false,
          borderColor: '#3B82F6', // Azul - 30cm
          borderWidth: 3,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
        },
        {
          label: 'Humedad 60cm',
          data: (selectedDeviceData.humidityData60 || []).map(value => value + 20),
          fill: false,
          borderColor: '#EF4444', // Rojo - 60cm
          borderWidth: 3,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
        },
        {
          label: 'Humedad 90cm',
          data: selectedDeviceData.humidityData90 || [],
          fill: false,
          borderColor: '#10B981', // Verde - 90cm
          borderWidth: 3,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
        }
      ] : activeMetric === 'temperatura' ? [
        {
          label: 'Temperatura 30cm (°C)',
          data: (selectedDeviceData.temperatureData30 || []).map(value => value + 40),
          fill: false,
          borderColor: '#3B82F6', // Azul - 30cm
          borderWidth: 3,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
        },
        {
          label: 'Temperatura 60cm (°C)',
          data: (selectedDeviceData.temperatureData60 || []).map(value => value + 20),
          fill: false,
          borderColor: '#EF4444', // Rojo - 60cm
          borderWidth: 3,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
        },
        {
          label: 'Temperatura 90cm (°C)',
          data: selectedDeviceData.temperatureData90 || [],
          fill: false,
          borderColor: '#10B981', // Verde - 90cm
          borderWidth: 3,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
        }
      ] : [
        {
          label: 'Conductividad 30cm',
          data: (selectedDeviceData.conductivityData30 || []).map(value => value + 40),
          fill: false,
          borderColor: '#3B82F6', // Azul - 30cm
          borderWidth: 3,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6
        },
        {
          label: 'Conductividad 60cm',
          data: (selectedDeviceData.conductivityData60 || []).map(value => value + 20),
          fill: false,
          borderColor: '#EF4444', // Rojo - 60cm
          borderWidth: 3,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6
        },
        {
          label: 'Conductividad 90cm',
          data: selectedDeviceData.conductivityData90 || [],
          fill: false,
          borderColor: '#10B981', // Verde - 90cm
          borderWidth: 3,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6
        }
      ]
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            let value = context.parsed.y;
            
            // Ajustar los valores según el offset para todos los tipos
            if (label.includes('30cm')) {
              value = value - 40;
            } else if (label.includes('60cm')) {
              value = value - 20;
            }

            // Agregar las unidades correspondientes
            if (activeMetric === 'humedad') {
              return label + ': ' + value.toFixed(1) + '%';
            } else if (activeMetric === 'temperatura') {
              return label + ': ' + value.toFixed(1) + '°C';
            } else if (activeMetric === 'conductividad') {
              return label + ': ' + value.toFixed(1);
            }
            return label + ': ' + value;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          stepSize: activeMetric === 'temperatura' ? 5 : 10,
          callback: function(value) {
            return activeMetric === 'temperatura' ? value + '°C' : value + '%';
          }
        },
        min: 0,
        max: activeMetric === 'temperatura' ? 80 : activeMetric === 'humedad' ? 140 : 140,
        suggestedMin: 0,
        suggestedMax: activeMetric === 'temperatura' ? 80 : activeMetric === 'humedad' ? 140 : 140,
        ticks: {
          stepSize: activeMetric === 'temperatura' ? 10 : 20,
          callback: function(value) {
            if (activeMetric === 'temperatura') {
              return value + '°C';
            } else if (activeMetric === 'humedad') {
              return value + '%';
            } else {
              return value;
            }
          }
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  const getCurrentValues = () => {
    const selectedDeviceData = zoneData.chartData.devices.find(d => d.id === selectedDevice);
    if (!selectedDeviceData) return ['N/A'];

    if (activeMetric === 'humedad') {
      return [selectedDeviceData.currentHumidity];
    } else if (activeMetric === 'temperatura') {
      return [selectedDeviceData.currentTemperature];
    } else {
      return [selectedDeviceData.conductivityStatus];
    }
  };

  const currentValues = getCurrentValues();

  return (
    <>
      <div className="chart-section shadow-lg">
        <div className="chart-header">
          <div>
            <h3>Datos Históricos</h3>
            <div className="d-flex flex-column gap-2">
              <div className="d-flex gap-2" style={{ marginTop: '0.5rem' }}>
                {zoneData.chartData.devices.map(device => (
                  <button
                    key={device.id}
                    className={`chart-tab ${selectedDevice === device.id ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedDevice(device.id);
                      onDeviceSelect?.(device.id);
                    }}
                    style={{
                      backgroundColor: selectedDevice === device.id ? '#3B82F6' : 'transparent',
                      color: selectedDevice === device.id ? 'white' : '#6b7280',
                      border: `1px solid ${selectedDevice === device.id ? '#3B82F6' : '#e5e7eb'}`
                    }}
                  >
                    {device.name}
                  </button>
                ))}
              </div>
              <div className="d-flex gap-2">
                <button
                  className={`chart-tab ${activeTimeRange === '24h' ? 'active' : ''}`}
                  onClick={() => setActiveTimeRange('24h')}
                >
                  Últimas 24h
                </button>
                <button
                  className={`chart-tab ${activeTimeRange === '7d' ? 'active' : ''}`}
                  onClick={() => setActiveTimeRange('7d')}
                >
                  7 días
                </button>
                <button
                  className={`chart-tab ${activeTimeRange === '30d' ? 'active' : ''}`}
                  onClick={() => setActiveTimeRange('30d')}
                >
                  30 días
                </button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '1rem' }}>Datos en Tiempo Real - Zona {zoneData.id + 1}</h3>
          <div className="chart-tabs d-flex flex-lg-row flex-column gap-2 mb-4">
            <button
              className={`chart-tab ${activeMetric === 'humedad' ? 'active' : ''}`}
              style={{ 
                backgroundColor: activeMetric === 'humedad' ? '#3B82F6' : 'transparent',
                color: activeMetric === 'humedad' ? 'white' : '#6b7280',
                border: `1px solid ${activeMetric === 'humedad' ? '#3B82F6' : '#e5e7eb'}`
              }}
              onClick={() => setActiveMetric('humedad')}
            >
              Humedad del Suelo (%)
            </button>
            <button
              className={`chart-tab ${activeMetric === 'temperatura' ? 'active' : ''}`}
              onClick={() => setActiveMetric('temperatura')}
            >
              Temperatura (°C)
            </button>
            <button
              className={`chart-tab ${activeMetric === 'conductividad' ? 'active' : ''}`}
              onClick={() => setActiveMetric('conductividad')}
            >
              Conductividad
            </button>
          </div>
        </div>

        <div className="chart-container">
          <Line data={generateChartData()} options={options} />
        </div>

        <div className="chart-stats" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 2rem' }}>
          {(() => {
            const selectedDeviceData = zoneData.chartData.devices.find(d => d.id === selectedDevice);
            return selectedDeviceData ? (
              <>
                <div className="chart-stat" style={{ textAlign: 'center' }}>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <span className="chart-stat-value" style={{ color: '#6b7280', fontSize: '1.2rem' }}>
                      {selectedDeviceData.currentHumidity}
                    </span>
                  </div>
                  <span className="chart-stat-label" style={{ color: '#6b7280' }}>Humedad Actual</span>
                </div>
                <div className="chart-stat" style={{ textAlign: 'center' }}>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <span className="chart-stat-value" style={{ color: '#6b7280', fontSize: '1.2rem' }}>
                      {selectedDeviceData.currentTemperature}
                    </span>
                  </div>
                  <span className="chart-stat-label" style={{ color: '#6b7280' }}>Temperatura</span>
                </div>
                <div className="chart-stat" style={{ textAlign: 'center' }}>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <span className="chart-stat-value" style={{ color: '#6b7280', fontSize: '1.2rem' }}>
                      {selectedDeviceData.conductivityStatus}
                    </span>
                  </div>
                  <span className="chart-stat-label" style={{ color: '#6b7280' }}>Estado Riego</span>
                </div>
              </>
            ) : null;
          })()}
        </div>
      </div>

      {/* Programación de Riego */}
      <div className="schedule-card shadow-lg">
        <div className="schedule-header">
          <Icon name="calendar" />
          <h4>Programación de Riego</h4>
        </div>
        <div className="schedule-info">
          <div className="schedule-item">
            <p>Último riego</p>
            <p>{zoneData.schedule.lastIrrigation}</p>
          </div>
          <div className="schedule-item">
            <p>Próximo riego</p>
            <p style={{ 
              color: zoneData.schedule.nextIrrigation === 'Ahora' ? '#059669' : '#1f2937',
              fontWeight: zoneData.schedule.nextIrrigation === 'Ahora' ? '700' : '600'
            }}>
              {zoneData.schedule.nextIrrigation}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

