import Icon from './Icon';

export default function MetricsSection({ zoneData, selectedDevice }) {
  if (!zoneData) return null;

  const { name, area, sensors, valves, status, statusColor, statusTextColor, metrics, chartData } = zoneData;
  
  // Obtener datos del dispositivo seleccionado si existe
  const deviceData = selectedDevice ? chartData.devices.find(d => d.id === selectedDevice) : null;
  
  // Usar datos del dispositivo si está seleccionado, o datos generales de la zona si no
  const currentMetrics = deviceData ? {
    humidity: parseFloat(deviceData.currentHumidity),
    temperature: parseFloat(deviceData.currentTemperature),
    waterFlow: metrics.waterFlow,
    waterFlowText: metrics.waterFlowText,
    temperatureRange: metrics.temperatureRange,
    savings: metrics.savings
  } : metrics;
  
  // Manejar campos opcionales con valores por defecto
  const sensorsText = sensors || `${zoneData.sensorsActive || 0}/${zoneData.sensorsTotal || 0} sensores`;
  const valvesText = valves || 'N/A';
  const savings = metrics?.savings || 0;

  return (
    <div className="metrics-section">
      <div className="section-header">
        <div>
          <h3>{name}</h3>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
            {area} • {sensorsText} • {valvesText}
          </p>
        </div>
        <span 
          className="status-badge" 
          style={{ 
            backgroundColor: statusColor,
            color: statusTextColor 
          }}
        >
          {status}
        </span>
      </div>

      <div className="metrics-grid">
        {/* Humedad */}
        <div className="metric-card shadow-lg" style={{ backgroundColor: 'rgba(101, 153, 173, 0.15)' }}>
          <div className="metric-header">
            <div className="metric-icon blue">
              <Icon name="humidity" />
            </div>
            <div className="metric-title">
              <h4>Humedad</h4>
              <p>Suelo actual</p>
            </div>
          </div>
          <div className="metric-value" style={{ color: '#6599ad' }}>{currentMetrics.humidity}%</div>
          <div className="metric-progress">
            <div className="metric-progress-bar" style={{ width: `${currentMetrics.humidity}%` }}></div>
          </div>
        </div>

        {/* Temperatura */}
        <div className="metric-card shadow-lg" style={{ backgroundColor: 'rgba(255, 193, 7, 0.15)' }}>
          <div className="metric-header">
            <div className="metric-icon orange">
              <Icon name="temperature" />
            </div>
            <div className="metric-title">
              <h4>Temperatura</h4>
              <p>Suelo actual</p>
            </div>
          </div>
          <div className="metric-value" style={{ color: '#FFC107' }}>{currentMetrics.temperature}°C</div>
          <div className="metric-info" style={{ color: '#FFC107' }}>Rango óptimo: {metrics.temperatureRange}</div>
        </div>

        {/* Flujo de agua */}
        <div className="metric-card shadow-lg" style={{ backgroundColor: 'rgba(57, 181, 74, 0.15)' }}>
          <div className="metric-header">
            <div className="metric-icon green">
              <Icon name="water_flow" />
            </div>
            <div className="metric-title">
              <h4>Flujo de agua</h4>
              <p>Litros/minuto</p>
            </div>
          </div>
          <div className="metric-value" style={{ color: '#39B54A' }}>{metrics.waterFlow}</div>
          <div className="metric-info" style={{ color: '#39B54A' }}>{metrics.waterFlowText}</div>
        </div>

        {/* Ahorro */}
        <div className="metric-card shadow-lg" style={{ backgroundColor: 'rgba(28, 46, 62, 0.15)' }}>
          <div className="metric-header">
            <div className="metric-icon purple">
              <Icon name="savings" />
            </div>
            <div className="metric-title">
              <h4>Ahorro</h4>
              <p>Este mes</p>
            </div>
          </div>
          <div className="metric-value" style={{ color: '#1C2E3E' }}>{savings}%</div>
          <div className="metric-info" style={{ color: '#1C2E3E' }}>
            {savings === 0 ? 'Sin datos' : 'vs. riego tradicional'}
          </div>
        </div>
      </div>
    </div>
  );
}

