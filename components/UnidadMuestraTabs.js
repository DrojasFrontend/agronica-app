export default function UnidadMuestraTabs({ unidadesMuestra, selectedUnidadMuestra, onUnidadMuestraChange }) {
  if (!unidadesMuestra || unidadesMuestra.length === 0) return null;

  return (
    <div style={{ 
      maxWidth: '1400px', 
      margin: '1.5rem auto',
      padding: '0 1rem'
    }}>
      <h4 style={{ 
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '16px',
        fontWeight: 600,
        color: '#1C2E3E',
        marginBottom: '1rem'
      }}>
        Unidades de Muestra
      </h4>
      <div style={{ 
        display: 'flex', 
        gap: '1rem',
        overflowX: 'auto',
        paddingBottom: '0.5rem'
      }}>
        {unidadesMuestra.map(unidad => (
          <button
            key={unidad.id}
            className={`chart-tab ${selectedUnidadMuestra === unidad.id ? 'active' : ''}`}
            onClick={() => onUnidadMuestraChange(unidad.id)}
            style={{
              fontFamily: 'Roboto, sans-serif',
              backgroundColor: selectedUnidadMuestra === unidad.id ? '#39B54A' : 'white',
              color: selectedUnidadMuestra === unidad.id ? 'white' : '#6b7280',
              border: `2px solid ${selectedUnidadMuestra === unidad.id ? '#39B54A' : '#E0E0E0'}`,
              padding: '0.75rem 1.5rem',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              transition: 'all 0.3s',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              minWidth: '150px'
            }}
          >
            <span style={{ fontWeight: 600 }}>{unidad.name}</span>
            {unidad.location && (
              <span style={{ 
                fontSize: '12px', 
                opacity: 0.8,
                marginTop: '0.25rem'
              }}>
                {unidad.location}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

