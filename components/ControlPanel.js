export default function ControlPanel({ zoneData }) {
  if (!zoneData) return null;

  const { systemStatus } = zoneData;

  return (
    <div className="control-grid">
      {/* Control Manual */}
      <div className="control-card shadow-lg">
        <h4>Control Manual</h4>
        <div className="d-flex flex-column gap-2">
          <button className="control-btn d-flex justify-content-center gap-2 primary">
            <span>▶️</span> Iniciar riego ahora
          </button>
          <button className="control-btn d-flex justify-content-center gap-2 warning">
            <span>⏸️</span> Pausar riego
          </button>
          <button className="control-btn d-flex justify-content-center gap-2 secondary">
            <span>🔄</span> Reiniciar ciclo
          </button>
          <button className="control-btn d-flex justify-content-center gap-2 outline">
            <span>⚙️</span> Configurar zona
          </button>
        </div>
      </div>

      {/* Estado del Sistema */}
      <div className="control-card shadow-lg">
        <h4>Estado del Sistema</h4>
        <div className="status-list">
          <div className="status-item">
            <span className="status-label">Sensores</span>
            <span className="status-value success">
              ✅ {systemStatus.sensorsActive} Activos
            </span>
          </div>
          <div className="status-item">
            <span className="status-label">Válvulas</span>
            <span className="status-value success">
              ✅ {systemStatus.valvesOperational} Operativas
            </span>
          </div>
          <div className="status-item">
            <span className="status-label">Presión</span>
            <span className="status-value">
              {systemStatus.pressure}
            </span>
          </div>
          <div className="status-item">
            <span className="status-label">Conectividad</span>
            <span className="status-value success">
              📶 {systemStatus.connectivity}
            </span>
          </div>
        </div>
      </div>

      {/* Resumen del Día */}
      <div className="summary-card shadow-lg">
        <h4>Resumen del Día</h4>
        <div className="summary-list">
          <div className="summary-item">
            <span className="summary-label">Agua utilizada</span>
            <span className="summary-value">1,250 L</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Agua ahorrada</span>
            <span className="summary-value">850 L</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Tiempo de riego</span>
            <span className="summary-value">3.5 hrs</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Eficiencia</span>
            <span className="summary-value">94%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

