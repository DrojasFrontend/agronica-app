const ICON_MAP = {
  // Estados y alertas
  warning: '⚠️',
  success: '✅',
  error: '❌',
  info: 'ℹ️',
  
  // Métricas
  humidity: '💧',
  temperature: '🌡️',
  water_flow: '📊',
  savings: '📈',
  calendar: '📅',
  
  // Dispositivos y sensores
  sensor: '📡',
  valve: '🔧',
  device: '📱',
  
  // Otros
  chart: '📊',
  settings: '⚙️',
  alert: '🔔'
};

export default function Icon({ name, className = '', style = {} }) {
  // Si el nombre del icono no existe en el mapa, devolver un placeholder o null
  if (!ICON_MAP[name]) {
    console.warn(`Icon "${name}" not found in icon map`);
    return null;
  }

  return (
    <span 
      className={`icon icon-${name} ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style
      }}
      role="img"
      aria-label={name}
    >
      {ICON_MAP[name]}
    </span>
  );
}

// Exportar el mapa de iconos para uso en otros componentes si es necesario
export { ICON_MAP };
