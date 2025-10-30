import { useState } from 'react';

export default function JSONPreview({ data, onClose }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        maxWidth: '800px',
        width: '100%',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '2px solid #E0E0E0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '20px',
            fontWeight: 600,
            color: '#1C2E3E',
            margin: 0
          }}>
            Vista Previa del JSON
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#6b7280',
              padding: '0.25rem'
            }}
          >
            ✕
          </button>
        </div>

        {/* JSON Content */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          padding: '1.5rem'
        }}>
          <pre style={{
            fontFamily: 'monospace',
            fontSize: '13px',
            background: '#1C2E3E',
            color: '#10B981',
            padding: '1.5rem',
            borderRadius: '8px',
            overflow: 'auto',
            margin: 0,
            lineHeight: 1.6
          }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>

        {/* Footer */}
        <div style={{
          padding: '1.5rem',
          borderTop: '2px solid #E0E0E0',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '1rem'
        }}>
          <button
            onClick={handleCopy}
            style={{
              background: copied ? '#10B981' : '#39B54A',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            {copied ? '✓ Copiado' : '📋 Copiar JSON'}
          </button>
          <button
            onClick={onClose}
            style={{
              background: 'white',
              color: '#1C2E3E',
              border: '2px solid #E0E0E0',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

