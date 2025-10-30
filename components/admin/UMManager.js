import SensorInputs from './SensorInputs';

export default function UMManager({ um, umIndex, onUpdate, onDelete }) {
  const handleSensorChange = (sensorIndex, newId) => {
    const newSensors = [...um.sensors];
    newSensors[sensorIndex] = { ...newSensors[sensorIndex], id: newId };
    onUpdate({ ...um, sensors: newSensors });
  };

  return (
    <div style={{
      background: 'white',
      border: '2px solid #E0E0E0',
      borderRadius: '8px',
      padding: '1.25rem'
    }}>
      {/* Header de UM */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <h4 style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '15px',
          fontWeight: 600,
          color: '#1C2E3E',
          margin: 0
        }}>
          {um.name}
        </h4>
        <button
          onClick={onDelete}
          style={{
            background: 'transparent',
            border: '1px solid #ef4444',
            borderRadius: '6px',
            padding: '0.35rem 0.75rem',
            cursor: 'pointer',
            color: '#ef4444',
            fontFamily: 'Roboto, sans-serif',
            fontSize: '12px',
            fontWeight: 500
          }}
        >
          🗑️ Eliminar
        </button>
      </div>

      {/* Inputs de Sensores */}
      <SensorInputs
        sensors={um.sensors}
        onSensorChange={handleSensorChange}
      />
    </div>
  );
}

