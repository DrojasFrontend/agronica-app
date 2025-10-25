export default function CampoBanner({ zonesData }) {
  // Calcular estadísticas dinámicamente
  const totalZones = zonesData?.zones?.length || 0;
  
  const totalSensors = zonesData?.zones?.reduce((sum, zone) => {
    return sum + (zone.sensorsTotal || 0);
  }, 0) || 0;
  
  const totalValves = zonesData?.zones?.reduce((sum, zone) => {
    // Extraer número de válvulas del string "X/Y" o campo numérico
    const valvesStr = zone.systemStatus?.valvesOperational || '0/0';
    const valvesNum = parseInt(valvesStr.split('/')[1] || '0');
    return sum + valvesNum;
  }, 0) || 0;
  
  const averageSavings = zonesData?.zones?.reduce((sum, zone) => {
    return sum + (zone.metrics?.savings || 0);
  }, 0) / (totalZones || 1);

  return (
    <div className="campo-banner p-lg-5 p-4">
    <div className="row">
      <div className="campo-header col-12 col-lg-6 mb-lg-0 mb-4">
        <h2>Campo San José</h2>
        <p className="campo-location m-0">Melipilla, Región Metropolitana • 8.0 hectáreas</p>
      </div>

      <div className="campo-stats col-12 col-lg-6">
        <div className="stat-item">
          <span className="stat-value">{totalZones}</span>
          <span className="stat-label">Zonas activas</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{totalSensors}</span>
          <span className="stat-label">Sensores</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{totalValves}</span>
          <span className="stat-label">Válvulas</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{Math.round(averageSavings)}%</span>
          <span className="stat-label">Ahorro promedio</span>
        </div>
      </div>
    </div>
    </div>
  );
}

