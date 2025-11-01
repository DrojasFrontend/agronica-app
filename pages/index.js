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
// Para cambiar entre API y datos locales, comenta/descomenta las siguientes líneas:

// Opción 1: Usar API externa (descomentar cuando Gonzalo tenga el endpoint listo)
// const API_BASE_URL = 'https://n8n-fastmvp-u38739.vm.elestio.app/webhook/data';

// Opción 2: Usar datos locales (ACTIVO PARA PRUEBAS)
const API_BASE_URL = '/api/local-data';

export default function Home() {
  const router = useRouter();
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
      
      // Obtener el parámetro 'cliente' de la URL
      const { cliente } = router.query;
      
      // Construir URL con parámetro si existe
      let apiUrl = API_BASE_URL;
      if (cliente) {
        apiUrl = `${API_BASE_URL}?cliente=${cliente}`;
      }
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error('Error al obtener datos del servidor');
      }
      
      const data = await response.json();
      
      // Asegurarse de que tenga la estructura correcta
      if (data && data.zones) {
        setZonesData(data);
        setLastUpdate(new Date());
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message);
      // Usar datos de fallback si falla
      setZonesData(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos al montar el componente y cuando cambie el parámetro cliente
  useEffect(() => {
    // Solo ejecutar cuando router.query esté listo
    if (router.isReady) {
      fetchData();
      
      // Actualizar cada 30 segundos
      const interval = setInterval(fetchData, 30000);
      
      return () => clearInterval(interval);
    }
  }, [router.isReady, router.query.cliente]);

  // Seleccionar automáticamente la primera unidad de muestra al cargar
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
    // Seleccionar automáticamente la primera unidad de muestra de la nueva zona
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
        <meta name="description" content="Sistema de riego inteligente para agricultura de precisión" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
        <Header lastUpdate={lastUpdate} isLoading={loading} />
        
        <main className="px-3 pb-5">
          {/* Mostrar error si existe */}
          {error && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fca5a5',
              borderRadius: '8px',
              padding: '1rem',
              margin: '1rem auto',
              maxWidth: '1400px',
              color: '#991b1b'
            }}>
              ⚠️ {error} - Mostrando datos de respaldo
            </div>
          )}

          {/* Indicador de cliente activo */}
          {router.query.cliente && (
            <div style={{
              background: '#d1fae5',
              border: '2px solid #39B54A',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              margin: '1rem auto',
              maxWidth: '1400px',
              color: '#065f46',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ fontSize: '18px' }}>👤</span>
              <span>Visualizando datos del cliente: <strong>{router.query.cliente}</strong></span>
            </div>
          )}
          
          <CampoBanner zonesData={zonesData} />
          <ZoneTabs activeZone={activeZone} onZoneChange={handleZoneChange} zones={zonesData.zones} />
          <UnidadMuestraTabs 
            unidadesMuestra={unidadesMuestra}
            selectedUnidadMuestra={selectedUnidadMuestra}
            onUnidadMuestraChange={handleUnidadMuestraChange}
          />
          <MetricsSection 
            zoneData={currentZoneData} 
            selectedUnidadMuestra={selectedUnidadMuestra}
          />
          {/* Layout de 2 columnas */}
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

