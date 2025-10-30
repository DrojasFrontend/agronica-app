export default function SensorInputs({ sensors, onSensorChange }) {
  const getDepthLabel = (depth) => {
    switch(depth) {
      case 30: return '30cm (Superficie)';
      case 60: return '60cm (Medio)';
      case 90: return '90cm (Profundo)';
      default: return `${depth}cm`;
    }
  };

  const getDepthColor = (depth) => {
    switch(depth) {
      case 30: return '#3B82F6'; // Azul
      case 60: return '#EF4444'; // Rojo
      case 90: return '#10B981'; // Verde
      default: return '#6b7280';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {sensors.map((sensor, index) => (
        <div key={index}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: 'Roboto, sans-serif',
            fontSize: '13px',
            fontWeight: 500,
            color: '#1C2E3E',
            marginBottom: '0.4rem'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: getDepthColor(sensor.depth)
            }}></span>
            Sensor {getDepthLabel(sensor.depth)} *
          </label>
          <input
            type="text"
            value={sensor.id}
            onChange={(e) => onSensorChange(index, e.target.value)}
            placeholder={`ID del sensor a ${sensor.depth}cm`}
            style={{
              width: '100%',
              padding: '0.65rem',
              border: '2px solid #E0E0E0',
              borderRadius: '6px',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '13px',
              color: '#1C2E3E',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = getDepthColor(sensor.depth)}
            onBlur={(e) => e.target.style.borderColor = '#E0E0E0'}
          />
        </div>
      ))}
    </div>
  );
}

