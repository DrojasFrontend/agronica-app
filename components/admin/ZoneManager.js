import { useState } from 'react';
import UMManager from './UMManager';

export default function ZoneManager({ zone, zoneIndex, onUpdate, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleZoneNameChange = (name) => {
    onUpdate({ ...zone, zone_name: name });
  };

  const handleAddUM = () => {
    const umNumber = zone.UM.length + 1;
    const newUM = {
      name: `UM${umNumber}`,
      sensors: [
        { id: '', depth: 30 },
        { id: '', depth: 60 },
        { id: '', depth: 90 }
      ]
    };
    onUpdate({ ...zone, UM: [...zone.UM, newUM] });
  };

  const handleUpdateUM = (umIndex, updatedUM) => {
    const newUMs = [...zone.UM];
    newUMs[umIndex] = updatedUM;
    onUpdate({ ...zone, UM: newUMs });
  };

  const handleDeleteUM = (umIndex) => {
    const newUMs = zone.UM.filter((_, index) => index !== umIndex);
    // Re-numerar las UMs
    const renumberedUMs = newUMs.map((um, index) => ({
      ...um,
      name: `UM${index + 1}`
    }));
    onUpdate({ ...zone, UM: renumberedUMs });
  };

  return (
    <div style={{
      border: '2px solid #E0E0E0',
      borderRadius: '12px',
      padding: '1.5rem',
      background: '#fafafa'
    }}>
      {/* Header de Zona */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '1rem',
        gap: '1rem'
      }}>
        <div style={{ flex: 1 }}>
          <label style={{
            display: 'block',
            fontFamily: 'Roboto, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: '#1C2E3E',
            marginBottom: '0.5rem'
          }}>
            Nombre de la Zona {zoneIndex + 1} *
          </label>
          <input
            type="text"
            value={zone.zone_name}
            onChange={(e) => handleZoneNameChange(e.target.value)}
            placeholder="Ej: Zona 1"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #E0E0E0',
              borderRadius: '8px',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '14px',
              color: '#1C2E3E',
              background: 'white',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.borderColor = '#39B54A'}
            onBlur={(e) => e.target.style.borderColor = '#E0E0E0'}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              background: 'white',
              border: '2px solid #E0E0E0',
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '14px',
              color: '#1C2E3E'
            }}
          >
            {isExpanded ? '▼ Contraer' : '▶ Expandir'}
          </button>
          <button
            onClick={onDelete}
            style={{
              background: '#ef4444',
              border: 'none',
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              color: 'white',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '14px'
            }}
          >
            🗑️ Eliminar
          </button>
        </div>
      </div>

      {/* Contenido expandible */}
      {isExpanded && (
        <>
          {/* Header de UMs */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '1.5rem',
            marginBottom: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid #E0E0E0'
          }}>
            <h3 style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '16px',
              fontWeight: 600,
              color: '#1C2E3E',
              margin: 0
            }}>
              Unidades de Muestra
            </h3>
            <button
              onClick={handleAddUM}
              style={{
                background: '#39B54A',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontFamily: 'Roboto, sans-serif',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              ➕ Agregar UM
            </button>
          </div>

          {/* Lista de UMs */}
          {zone.UM.length === 0 ? (
            <div style={{
              padding: '2rem',
              textAlign: 'center',
              color: '#6b7280',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '14px',
              background: 'white',
              borderRadius: '8px'
            }}>
              No hay unidades de muestra. Haz clic en "Agregar UM" para comenzar.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {zone.UM.map((um, umIndex) => (
                <UMManager
                  key={umIndex}
                  um={um}
                  umIndex={umIndex}
                  onUpdate={(updatedUM) => handleUpdateUM(umIndex, updatedUM)}
                  onDelete={() => handleDeleteUM(umIndex)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

