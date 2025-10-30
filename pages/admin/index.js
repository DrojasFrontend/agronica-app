import { useState } from 'react';
import Head from 'next/head';
import ClientForm from '../../components/admin/ClientForm';
import ZoneManager from '../../components/admin/ZoneManager';
import JSONPreview from '../../components/admin/JSONPreview';

export default function AdminPage() {
  const [clientName, setClientName] = useState('');
  const [zones, setZones] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Generar URL automáticamente
  const generateURL = (name) => {
    return `https://agronica.cl/${name.toLowerCase().replace(/ /g, '_')}`;
  };

  // Agregar nueva zona
  const handleAddZone = () => {
    const newZone = {
      id: `zone-${Date.now()}`,
      zone_name: '',
      UM: []
    };
    setZones([...zones, newZone]);
  };

  // Actualizar zona
  const handleUpdateZone = (zoneId, updatedZone) => {
    setZones(zones.map(zone => 
      zone.id === zoneId ? { ...zone, ...updatedZone } : zone
    ));
  };

  // Eliminar zona
  const handleDeleteZone = (zoneId) => {
    setZones(zones.filter(zone => zone.id !== zoneId));
  };

  // Generar JSON para enviar
  const generateJSON = () => {
    return {
      client_name: clientName,
      layout: zones.map(zone => ({
        zone_name: zone.zone_name,
        UM: zone.UM
      })),
      url: generateURL(clientName)
    };
  };

  // Validar datos antes de guardar
  const validateData = () => {
    if (!clientName.trim()) {
      return { valid: false, message: 'El nombre del cliente es requerido' };
    }
    if (zones.length === 0) {
      return { valid: false, message: 'Debe agregar al menos una zona' };
    }
    for (const zone of zones) {
      if (!zone.zone_name.trim()) {
        return { valid: false, message: 'Todos los nombres de zona son requeridos' };
      }
      if (zone.UM.length === 0) {
        return { valid: false, message: `La zona "${zone.zone_name}" debe tener al menos una unidad de muestra` };
      }
      for (const um of zone.UM) {
        if (um.sensors.length !== 3) {
          return { valid: false, message: `La unidad "${um.name}" debe tener 3 sensores` };
        }
        for (const sensor of um.sensors) {
          if (!sensor.id.trim()) {
            return { valid: false, message: `Todos los IDs de sensores deben estar completados en "${um.name}"` };
          }
        }
      }
    }
    return { valid: true };
  };

  // Guardar configuración
  const handleSave = async () => {
    const validation = validateData();
    if (!validation.valid) {
      setSaveStatus({ type: 'error', message: validation.message });
      return;
    }

    setIsLoading(true);
    setSaveStatus(null);

    try {
      const data = generateJSON();
      const response = await fetch('https://n8n-fastmvp-u38739.vm.elestio.app/webhook/create-demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${responseData?.message || 'Error al guardar la configuración'}`);
      }

      setSaveStatus({ 
        type: 'success', 
        message: `✓ Configuración guardada exitosamente (Status: ${response.status})`,
        statusCode: response.status,
        responseData: responseData
      });

    } catch (error) {
      console.error('Error:', error);
      setSaveStatus({ 
        type: 'error', 
        message: error.message || 'Error al guardar la configuración' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Limpiar formulario manualmente
  const handleClearForm = () => {
    setClientName('');
    setZones([]);
    setSaveStatus(null);
  };

  return (
    <>
      <Head>
        <title>Administración - AGRONICA</title>
        <meta name="description" content="Panel de administración AGRONICA" />
      </Head>

      <div style={{ 
        minHeight: '100vh', 
        background: '#F5F7F8',
        padding: '2rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Header */}
          <div style={{
            background: '#E8EBED',
            padding: '2rem',
            borderRadius: '12px',
            marginBottom: '2rem'
          }}>
            <h1 style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '32px',
              fontWeight: 700,
              color: '#1C2E3E',
              margin: 0
            }}>
              Panel de Administración
            </h1>
            <p style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: '16px',
              color: '#6b7280',
              margin: '0.5rem 0 0 0'
            }}>
              Configura clientes, zonas y unidades de muestra
            </p>
          </div>

          {/* Formulario Principal */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            marginBottom: '1.5rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <ClientForm 
              clientName={clientName}
              onClientNameChange={setClientName}
              generatedURL={generateURL(clientName)}
            />
          </div>

          {/* Gestión de Zonas */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            marginBottom: '1.5rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '24px',
                fontWeight: 600,
                color: '#1C2E3E',
                margin: 0
              }}>
                Zonas
              </h2>
              <button
                onClick={handleAddZone}
                style={{
                  background: '#39B54A',
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
                ➕ Agregar Zona
              </button>
            </div>

            {zones.length === 0 ? (
              <div style={{
                padding: '3rem',
                textAlign: 'center',
                color: '#6b7280',
                fontFamily: 'Roboto, sans-serif'
              }}>
                No hay zonas agregadas. Haz clic en "Agregar Zona" para comenzar.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {zones.map((zone, index) => (
                  <ZoneManager
                    key={zone.id}
                    zone={zone}
                    zoneIndex={index}
                    onUpdate={(updatedZone) => handleUpdateZone(zone.id, updatedZone)}
                    onDelete={() => handleDeleteZone(zone.id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Acciones */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'flex-end'
          }}>
            <button
              onClick={() => setShowPreview(!showPreview)}
              disabled={zones.length === 0}
              style={{
                background: 'white',
                color: '#1C2E3E',
                border: '2px solid #E0E0E0',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontFamily: 'Roboto, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                cursor: zones.length === 0 ? 'not-allowed' : 'pointer',
                opacity: zones.length === 0 ? 0.5 : 1
              }}
            >
              {showPreview ? '❌ Cerrar Preview' : '👁️ Preview JSON'}
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading || zones.length === 0}
              style={{
                background: '#39B54A',
                color: 'white',
                border: 'none',
                padding: '0.75rem 2rem',
                borderRadius: '8px',
                fontFamily: 'Roboto, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                cursor: isLoading || zones.length === 0 ? 'not-allowed' : 'pointer',
                opacity: isLoading || zones.length === 0 ? 0.5 : 1
              }}
            >
              {isLoading ? '⏳ Guardando...' : '💾 Guardar Configuración'}
            </button>
          </div>

          {/* Status Message */}
          {saveStatus && (
            <div style={{
              marginTop: '1rem',
              padding: '1.5rem',
              borderRadius: '12px',
              background: saveStatus.type === 'success' ? '#d1fae5' : '#fee2e2',
              border: `2px solid ${saveStatus.type === 'success' ? '#39B54A' : '#ef4444'}`,
              fontFamily: 'Roboto, sans-serif'
            }}>
              <div style={{
                fontSize: '16px',
                fontWeight: 600,
                color: saveStatus.type === 'success' ? '#065f46' : '#991b1b',
                marginBottom: '0.5rem'
              }}>
                {saveStatus.message}
              </div>
              
              {saveStatus.type === 'success' && saveStatus.responseData && (
                <div style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  background: 'white',
                  borderRadius: '8px',
                  fontSize: '13px',
                  color: '#1C2E3E'
                }}>
                  <strong>Respuesta del servidor:</strong>
                  <pre style={{
                    marginTop: '0.5rem',
                    padding: '0.75rem',
                    background: '#f5f5f5',
                    borderRadius: '6px',
                    overflow: 'auto',
                    fontSize: '12px'
                  }}>
                    {JSON.stringify(saveStatus.responseData, null, 2)}
                  </pre>
                </div>
              )}

              {saveStatus.type === 'success' && (
                <button
                  onClick={handleClearForm}
                  style={{
                    marginTop: '1rem',
                    background: '#39B54A',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: 'pointer'
                  }}
                >
                  ✨ Crear Nueva Configuración
                </button>
              )}
            </div>
          )}

          {/* JSON Preview */}
          {showPreview && (
            <JSONPreview 
              data={generateJSON()}
              onClose={() => setShowPreview(false)}
            />
          )}
        </div>
      </div>
    </>
  );
}

