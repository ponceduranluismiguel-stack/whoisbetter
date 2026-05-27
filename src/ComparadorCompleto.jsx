import { useState, useEffect } from 'react'
import { fetchStatsCompleto } from './ShareCard'

const CROWN_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{width:'12px',height:'12px'}}>
    <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5M19 19V20C19 20.5 18.5 21 18 21H6C5.45 21 5 20.55 5 20V19H19Z"/>
  </svg>
)

function fmtVal(v) {
  if (v == null) return '—'
  return v
}

function Seccion({ titulo, filas }) {
  return (
    <div className="cc-seccion">
      <div className="cc-seccion-titulo">{titulo}</div>
      {filas.map((fila, i) => {
        const v1 = fila.v1, v2 = fila.v2
        const ambosValidos = v1 != null && v2 != null
        const gana1 = ambosValidos && (fila.menorEsMejor ? v1 < v2 : v1 > v2)
        const gana2 = ambosValidos && (fila.menorEsMejor ? v2 < v1 : v2 > v1)
        return (
          <div key={i} className="cc-fila">
            <div className={`cc-val left ${gana1 ? 'win' : ''}`}>
              {gana1 && <span className="cc-crown">{CROWN_SVG}</span>}
              {fmtVal(v1)}
            </div>
            <div className="cc-label">{fila.label}</div>
            <div className={`cc-val right ${gana2 ? 'win' : ''}`}>
              {fmtVal(v2)}
              {gana2 && <span className="cc-crown">{CROWN_SVG}</span>}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function ComparadorCompleto({ jugadores, competicion, temporada, onClose }) {
  const [s1, setS1] = useState(null)
  const [s2, setS2] = useState(null)
  const [ligaNombre, setLigaNombre] = useState(competicion)
  const [cargando, setCargando] = useState(true)

  const j1 = jugadores[0]
  const j2 = jugadores[1]

  useEffect(() => {
    if (!j1?.apiId || !j2?.apiId) return
    setCargando(true)
    setS1(null)
    setS2(null)

    const comp = competicion === 'LaLiga' ? 'Liga Nacional' : competicion

    Promise.all([
      fetchStatsCompleto(j1.apiId, comp, temporada, j1.equipo),
      fetchStatsCompleto(j2.apiId, comp, temporada, j2.equipo),
    ]).then(([r1, r2]) => {
      setS1(r1.stats)
      setS2(r2.stats)
      if (r1.ligaNombre === r2.ligaNombre) setLigaNombre(r1.ligaNombre)
      else setLigaNombre('Liga Nacional')
      setCargando(false)
    })
  }, [competicion, temporada])

  const etiquetaComp = competicion === 'LaLiga' ? ligaNombre : competicion

  return (
    <div className="cc-overlay">
      <div className="cc-card">
        <div className="picker-handle"></div>
        <div className="cc-header">
          <div className="cc-header-players">
            <span className="cc-header-name">{j1?.nombreMostrado || j1?.nombre}</span>
            <span className="cc-header-vs">vs</span>
            <span className="cc-header-name">{j2?.nombreMostrado || j2?.nombre}</span>
          </div>
          <button className="picker-close" onClick={onClose}>✕</button>
        </div>

        {cargando || !s1 || !s2 ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffd400', fontFamily: 'Anton,sans-serif', fontSize: '1.1rem' }}>
            CARGANDO DATOS...
          </div>
        ) : (
          <>
            <div className="cc-jugadores-header">
              <div className="cc-jh-name">{(j1.nombreMostrado || j1.nombre).split(' ').slice(-1)[0]}</div>
              <div className="cc-jh-center">{etiquetaComp}</div>
              <div className="cc-jh-name right">{(j2.nombreMostrado || j2.nombre).split(' ').slice(-1)[0]}</div>
            </div>
            <div className="cc-body">
              <Seccion titulo="Gol" filas={[
                { label: 'Goles', v1: s1.goles, v2: s2.goles, menorEsMejor: false },
                { label: 'Penaltis marcados', v1: s1.penaltis, v2: s2.penaltis, menorEsMejor: false },
                { label: 'Disparos totales', v1: s1.disparosTotales, v2: s2.disparosTotales, menorEsMejor: false },
                { label: 'Disparos a puerta', v1: s1.disparosPuerta, v2: s2.disparosPuerta, menorEsMejor: false },
                { label: 'Precisión disparo %', v1: s1.precisionDisparo, v2: s2.precisionDisparo, menorEsMejor: false },
                { label: 'Min/gol', v1: s1.minGol, v2: s2.minGol, menorEsMejor: true },
              ]} />
              <Seccion titulo="Creación" filas={[
                { label: 'Asistencias', v1: s1.asistencias, v2: s2.asistencias, menorEsMejor: false },
                { label: 'G + A', v1: s1.gA, v2: s2.gA, menorEsMejor: false },
                { label: 'Pases clave', v1: s1.pasesClave, v2: s2.pasesClave, menorEsMejor: false },
                { label: 'Pases totales', v1: s1.pasesTotales, v2: s2.pasesTotales, menorEsMejor: false },
                { label: 'Precisión pase %', v1: s1.precisionPase, v2: s2.precisionPase, menorEsMejor: false },
                { label: 'Min/asist', v1: s1.minAsist, v2: s2.minAsist, menorEsMejor: true },
              ]} />
              <Seccion titulo="Duelos" filas={[
                { label: 'Duelos totales', v1: s1.duelosTotales, v2: s2.duelosTotales, menorEsMejor: false },
                { label: 'Duelos ganados', v1: s1.duelosGanados, v2: s2.duelosGanados, menorEsMejor: false },
                { label: '% duelos ganados', v1: s1.pctDuelos, v2: s2.pctDuelos, menorEsMejor: false },
                { label: 'Regates intentados', v1: s1.regatesInt, v2: s2.regatesInt, menorEsMejor: false },
                { label: 'Regates completados', v1: s1.regatesOk, v2: s2.regatesOk, menorEsMejor: false },
                { label: 'Faltas recibidas', v1: s1.faltasRecibidas, v2: s2.faltasRecibidas, menorEsMejor: false },
              ]} />
              <Seccion titulo="Defensa" filas={[
                { label: 'Tackles', v1: s1.tackles, v2: s2.tackles, menorEsMejor: false },
                { label: 'Intercepciones', v1: s1.intercepciones, v2: s2.intercepciones, menorEsMejor: false },
                { label: 'Faltas cometidas', v1: s1.faltasCometidas, v2: s2.faltasCometidas, menorEsMejor: true },
                { label: 'Tarjetas amarillas', v1: s1.amarillas, v2: s2.amarillas, menorEsMejor: true },
              ]} />
              <Seccion titulo="Rendimiento" filas={[
                { label: 'Partidos', v1: s1.partidos, v2: s2.partidos, menorEsMejor: false },
                { label: 'Titularidades', v1: s1.titularidades, v2: s2.titularidades, menorEsMejor: false },
                { label: 'Minutos', v1: s1.minutos, v2: s2.minutos, menorEsMejor: false },
                { label: 'Rating', v1: s1.rating, v2: s2.rating, menorEsMejor: false },
              ]} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ComparadorCompleto