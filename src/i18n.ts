import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation files would typically go into public/locales/ or be imported directly
const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        trends: 'Trends',
        categories: 'Categories',
        about: 'About',
      },
      search: {
        placeholder: 'Search CVE, Malware...',
      },
      footer: {
        connected: 'DATABASE CONNECTED',
        latency: 'LATENCY',
        loc: 'LOC',
      },
      home: {
        hero: {
          title1: 'Track Global',
          title2: 'Security Trends',
          subtitle: 'Stay ahead of zero-days, massive data breaches, and emerging malware threats with real-time intelligence and analysis.',
        },
        search_btn: 'SEARCH',
        stats: {
          active_threats: 'ACTIVE THREATS',
          critical_cves: 'CRITICAL CVES',
          data_breached: 'DATA BREACHED (TB)',
        },
        critical_threats: {
          title: 'CRITICAL THREATS',
          subtitle: 'High priority threats requiring immediate attention.',
          view_all: 'VIEW ALL',
          view_all_mobile: 'VIEW ALL CRITICAL',
        },
        latest_intel: {
          title: 'LATEST INTELLIGENCE',
          subtitle: 'Recently discovered vulnerabilities and breaches.',
          browse_all: 'BROWSE ALL',
          explore_all: 'EXPLORE ARCHIVE',
        }
      },
      categories: {
        title: 'Threat Vectors',
        subtitle: 'Analyze the security landscape by specific vectors, from software vulnerabilities to massive data exfiltration events.',
        incidents: 'INCIDENTS',
      },
      trends: {
        filters: 'FILTERS',
        keyword: 'Keyword...',
        severity: 'Severity',
        category: 'Category',
        clear: 'CLEAR',
        reset: 'RESET ALL',
        title: 'Security Archive',
        showing: 'Showing {{count}} analyzed incidents',
        no_data: 'No data found',
        no_data_desc: 'Modify filter parameters to see results.',
      },
      trend_detail: {
        back: 'BACK',
        executive_summary: 'Executive Summary',
        remediation_protocol: 'Remediation Protocol',
        incident_timeline: 'Incident Timeline',
        target_systems: 'Target Systems',
        external_logs: 'External Logs',
        share_report: 'SHARE REPORT',
        related_anomalies: 'Related Anomalies',
        discovered: 'Discovered',
        mentions: 'global mentions',
      }
    }
  },
  es: {
    translation: {
      nav: {
        home: 'Inicio',
        trends: 'Tendencias',
        categories: 'Categorías',
        about: 'Acerca de',
      },
      search: {
        placeholder: 'Buscar CVE, Malware...',
      },
      footer: {
        connected: 'BASE DE DATOS CONECTADA',
        latency: 'LATENCIA',
        loc: 'LOC',
      },
      home: {
        hero: {
          title1: 'Rastrea Globalmente las',
          title2: 'Tendencias de Seguridad',
          subtitle: 'Manténgase a la vanguardia de los ataques de día cero, las filtraciones masivas de datos y las amenazas de malware emergentes con inteligencia y análisis en tiempo real.',
        },
        search_btn: 'BUSCAR',
        stats: {
          active_threats: 'AMENAZAS ACTIVAS',
          critical_cves: 'CVES CRÍTICOS',
          data_breached: 'DATOS FILTRADOS (TB)',
        },
        critical_threats: {
          title: 'AMENAZAS CRÍTICAS',
          subtitle: 'Amenazas de alta prioridad que requieren atención inmediata.',
          view_all: 'VER TODO',
          view_all_mobile: 'VER TODAS LAS CRÍTICAS',
        },
        latest_intel: {
          title: 'ÚLTIMA INTELIGENCIA',
          subtitle: 'Vulnerabilidades y brechas descubiertas recientemente.',
          browse_all: 'EXPLORAR TODO',
          explore_all: 'EXPLORAR ARCHIVO',
        }
      },
      categories: {
        title: 'Vectores de Amenaza',
        subtitle: 'Analizar el panorama de la seguridad por vectores específicos, desde vulnerabilidades de software hasta eventos masivos de exfiltración de datos.',
        incidents: 'INCIDENTES',
      },
      trends: {
        filters: 'FILTROS',
        keyword: 'Palabra clave...',
        severity: 'Severidad',
        category: 'Categoría',
        clear: 'LIMPIAR',
        reset: 'REINICIAR',
        title: 'Archivo de Seguridad',
        showing: 'Mostrando {{count}} incidentes analizados',
        no_data: 'No se encontraron datos',
        no_data_desc: 'Modifique los parámetros de filtro para ver resultados.',
      },
      trend_detail: {
        back: 'VOLVER',
        executive_summary: 'Resumen Ejecutivo',
        remediation_protocol: 'Protocolo de Remediación',
        incident_timeline: 'Línea de Tiempo del Incidente',
        target_systems: 'Sistemas Objetivo',
        external_logs: 'Registros Externos',
        share_report: 'COMPARTIR REPORTE',
        related_anomalies: 'Anomalías Relacionadas',
        discovered: 'Descubierto',
        mentions: 'menciones globales',
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
