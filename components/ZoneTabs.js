import Icon from './Icon';

export default function ZoneTabs({ activeZone, onZoneChange, zones }) {
  const handleZoneClick = (zoneId) => {
    if (onZoneChange) {
      onZoneChange(zoneId);
    }
  };

  if (!zones || zones.length === 0) {
    return null;
  }

  return (
    <div className="zone-tabs">
      {zones.map((zone) => {
        const sensorsText = zone.sensors || `${zone.sensorsActive || 0}/${zone.sensorsTotal || 0} sensores`;
        return (
          <button
            key={zone.id}
            className={`zone-tab ${activeZone === zone.id ? 'active' : ''}`}
            onClick={() => handleZoneClick(zone.id)}
          >
            <span className="zone-icon">
              {zone.icon === 'warning' ? '⚠️' : <Icon name={zone.icon} />}
            </span>
            <div className="zone-info">
              <h3>{zone.name}</h3>
              <p>{zone.area} • {sensorsText}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

