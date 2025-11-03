import React, { useState } from 'react';
import Icon from '../Icon';

export default function PinLock({ onUnlock }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const CORRECT_PIN = '1234'; // PIN por defecto

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Solo números
    if (value.length <= 4) {
      setPin(value);
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin === CORRECT_PIN) {
      onUnlock();
    } else {
      setError('PIN incorrecto. Intenta nuevamente.');
      setPin('');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(28, 46, 62, 0.95)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '3rem 2.5rem',
        maxWidth: '400px',
        width: '90%',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
        textAlign: 'center'
      }}>
        {/* Logo/Icon */}
        <div style={{
          width: '80px',
          height: '80px',
          background: 'rgba(57, 181, 74, 0.15)',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto 1.5rem',
          fontSize: '40px'
        }}>
          🔐
        </div>

        {/* Título */}
        <h2 style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '24px',
          fontWeight: 700,
          color: '#1C2E3E',
          marginBottom: '0.5rem'
        }}>
          Panel Administrativo
        </h2>

        <p style={{
          fontFamily: 'Roboto, sans-serif',
          fontSize: '14px',
          color: '#6b7280',
          marginBottom: '2rem'
        }}>
          Ingresa tu PIN de 4 dígitos para continuar
        </p>

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <input
              type="password"
              inputMode="numeric"
              value={pin}
              onChange={handleChange}
              placeholder="••••"
              autoFocus
              style={{
                width: '100%',
                padding: '1rem',
                border: error ? '2px solid #ef4444' : '2px solid #E0E0E0',
                borderRadius: '8px',
                fontFamily: 'Roboto, sans-serif',
                fontSize: '24px',
                color: '#1C2E3E',
                textAlign: 'center',
                letterSpacing: '0.5rem',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => {
                if (!error) e.target.style.borderColor = '#39B54A';
              }}
              onBlur={(e) => {
                if (!error) e.target.style.borderColor = '#E0E0E0';
              }}
            />
            
            {error && (
              <div style={{
                marginTop: '0.75rem',
                padding: '0.75rem',
                background: '#fee2e2',
                borderRadius: '6px',
                color: '#991b1b',
                fontSize: '13px',
                fontFamily: 'Roboto, sans-serif',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}>
                ⚠️ {error}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={pin.length !== 4}
            style={{
              width: '100%',
              background: pin.length === 4 ? '#39B54A' : '#E0E0E0',
              color: pin.length === 4 ? 'white' : '#6b7280',
              border: 'none',
              padding: '1rem',
              borderRadius: '8px',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '16px',
              fontWeight: 500,
              cursor: pin.length === 4 ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            {pin.length === 4 ? '🔓 Desbloquear' : '🔒 Ingresa PIN'}
          </button>
        </form>

        {/* Indicador de PIN */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.75rem',
          marginTop: '1.5rem'
        }}>
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: pin.length > index ? '#39B54A' : '#E0E0E0',
                transition: 'background 0.2s'
              }}
            />
          ))}
        </div>

        {/* Hint para desarrollo */}
        <div style={{
          marginTop: '2rem',
          padding: '0.75rem',
          background: '#f5f7f8',
          borderRadius: '6px',
          fontSize: '12px',
          color: '#6b7280',
          fontFamily: 'Roboto, sans-serif'
        }}>
          💡 PIN por defecto: <strong>1234</strong>
        </div>
      </div>
    </div>
  );
}

