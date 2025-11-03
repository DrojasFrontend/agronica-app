import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import CampoBanner from '../components/CampoBanner';
import ZoneTabs from '../components/ZoneTabs';
import UnidadMuestraTabs from '../components/UnidadMuestraTabs';
import MetricsSection from '../components/MetricsSection';
import ChartSection from '../components/ChartSection';
import ControlPanel from '../components/ControlPanel';
import { useRouter } from 'next/router';
import fallbackData from '../data/zones.json';

// Configuración de fuentes de datos
// Opción 1: Usar API externa (descomentar cuando Gonzalo tenga el endpoint listo)
// const API_BASE_URL = 'https://n8n-fastmvp-u38739.vm.elestio.app/webhook/data';

// Opción 2: Usar datos locales (ACTIVO PARA PRUEBAS)
const API_BASE_URL = '/api/local-data';

export default function ClientePage() {
  const router = useRouter();
  const { cliente } = router.query;
  
  const [activeZone, setActiveZone] = useState(0);
  const [selectedUnidadMuestra, setSelectedUnidadMuestra] = useState(null);
  const [zonesData, setZonesData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  
  const currentZoneData = zonesData.zones.find(zone => zone.id === activeZone);
  
  // Obtener unidades de muestra de la zona actual
  const unidadesMuestra = currentZoneData?.chartData?.devices || [];

  // Función para obtener datos de la API
  const fetchData = async () => {
    try {
      setError(null);
      
      // Construir URL con parámetro del cliente
      let apiUrl = API_BASE_URL;
      if (cliente) {
        apiUrl = `${API_BASE_URL}?cliente=${cliente}`;
      }
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudieron cargar los datos`);
      }
      
      const data = await response.json();
      setZonesData(data);
      setLastUpdate(new Date());
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message);
      // Usar datos de respaldo en caso de error
      setZonesData(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos cuando el componente se monta y cuando cambia el cliente
  useEffect(() => {
    if (router.isReady && cliente) {
      fetchData();
      const interval = setInterval(fetchData, 30000);
      return () => clearInterval(interval);
    }
  }, [router.isReady, cliente]);

  // Auto-seleccionar la primera unidad de muestra cuando cambia la zona
  useEffect(() => {
    if (zonesData && !selectedUnidadMuestra) {
      const firstZone = zonesData.zones?.[activeZone];
      const firstUnidadMuestra = firstZone?.chartData?.devices?.[0]?.id;
      if (firstUnidadMuestra) {
        setSelectedUnidadMuestra(firstUnidadMuestra);
      }
    }
  }, [zonesData, activeZone]);

  const handleZoneChange = (zoneId) => {
    setActiveZone(zoneId);
    const newZoneData = zonesData.zones.find(zone => zone.id === zoneId);
    const firstUnidadMuestra = newZoneData?.chartData?.devices?.[0]?.id;
    setSelectedUnidadMuestra(firstUnidadMuestra || null);
  };

  const handleUnidadMuestraChange = (unidadId) => {
    setSelectedUnidadMuestra(unidadId);
  };

  return (
    <>
      <Head>
        <title>AGRONICA - Plataforma de Riego Inteligente</title>
        <meta name="description" content="Sistema de monitoreo inteligente para riego agrícola" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
        <Header lastUpdate={lastUpdate} isLoading={loading} />

        <main className="px-3 pb-5">
          {error && (
            <div style={{
              background: '#fee2e2',
              border: '2px solid #ef4444',
              borderRadius: '8px',
              padding: '1rem',
              margin: '1rem 0',
              color: '#991b1b',
              fontFamily: 'Roboto, sans-serif'
            }}>
              ⚠️ {error}
            </div>
          )}

          {cliente && (
            <div style={{
              background: 'white',
              border: '2px solid #39B54A',
              borderRadius: '12px',
              padding: '1rem 1.5rem',
              margin: '1.5rem 0',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              <span style={{ fontSize: '18px' }}>👤</span>
              <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', color: '#1C2E3E' }}>
                Visualizando datos del cliente: <strong>{cliente}</strong>
              </span>
            </div>
          )}

          <CampoBanner zonesData={zonesData} />
          
          <ZoneTabs 
            activeZone={activeZone} 
            onZoneChange={handleZoneChange} 
            zones={zonesData.zones} 
          />
          
          <UnidadMuestraTabs 
            unidadesMuestra={unidadesMuestra}
            selectedUnidadMuestra={selectedUnidadMuestra}
            onUnidadMuestraChange={handleUnidadMuestraChange}
          />
          
          <MetricsSection 
            zoneData={currentZoneData}
            selectedUnidadMuestra={selectedUnidadMuestra}
          />
          
          <div className="two-column-layout">
            <div className="main-column">
              <ChartSection 
                zoneData={currentZoneData}
                selectedUnidadMuestra={selectedUnidadMuestra}
              />
            </div>
            <div className="sidebar-column">
              <ControlPanel zoneData={currentZoneData} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

