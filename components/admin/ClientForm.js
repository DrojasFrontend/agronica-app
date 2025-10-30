export default function ClientForm({ clientName, onClientNameChange, generatedURL }) {
  return (
    <div>
      <h2 style={{
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '20px',
        fontWeight: 600,
        color: '#1C2E3E',
        marginBottom: '1.5rem'
      }}>
        Información del Cliente
      </h2>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{
          display: 'block',
          fontFamily: 'Roboto, sans-serif',
          fontSize: '14px',
          fontWeight: 500,
          color: '#1C2E3E',
          marginBottom: '0.5rem'
        }}>
          Nombre del Cliente *
        </label>
        <input
          type="text"
          value={clientName}
          onChange={(e) => onClientNameChange(e.target.value)}
          placeholder="Ej: Cliente Prueba"
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '2px solid #E0E0E0',
            borderRadius: '8px',
            fontFamily: 'Roboto, sans-serif',
            fontSize: '14px',
            color: '#1C2E3E',
            outline: 'none',
            transition: 'border-color 0.2s'
          }}
          onFocus={(e) => e.target.style.borderColor = '#39B54A'}
          onBlur={(e) => e.target.style.borderColor = '#E0E0E0'}
        />
      </div>

      {clientName && (
        <div style={{
          padding: '1rem',
          background: 'rgba(57, 181, 74, 0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(57, 181, 74, 0.2)'
        }}>
          <label style={{
            display: 'block',
            fontFamily: 'Roboto, sans-serif',
            fontSize: '12px',
            fontWeight: 500,
            color: '#6b7280',
            marginBottom: '0.25rem'
          }}>
            URL Generada:
          </label>
          <div style={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: '#39B54A',
            wordBreak: 'break-all'
          }}>
            {generatedURL}
          </div>
        </div>
      )}
    </div>
  );
}

