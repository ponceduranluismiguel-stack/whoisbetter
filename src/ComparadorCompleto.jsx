import { useState, useEffect } from 'react'

const API_URL = 'https://whoisbetter-api.ponceduranluismiguel.workers.dev'
const SEASON = '2025'

const CROWN_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{width:'12px',height:'12px'}}>
    <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5M19 19V20C19 20.5 18.5 21 18 21H6C5.45 21 5 20.55 5 20V19H19Z"/>
  </svg>
)

async function cargarStats(apiId, liga) {
  const leagueIds = {
    'LaLiga': 140, 'Premier League': 39, 'Serie A': 135,
    'Bundesliga': 78, 'Ligue 1': 61, 'Toda la temporada': 140,
  }
  const leagueId = leagueIds[liga] || 140
  const res = await fetch(`${API_URL}/players?id=${apiId}&season=${SEASON}&league=${leagueId}`)
  const data = await res.json()
  const st = data.response?.[0]?.statistics?.[0]
  if (!st) return null
  const minutos = st.games?.minutes || 0
  const goles = st.goals?.total || 0
  const asistencias = st.goals?.assists || 0
  const disparosTotales = st.shots?.total || 0
  const disparosPuerta = st.shots?.on || 0
  return {
    goles, asistencias,
    gA: goles + asistencias,
    partidos: st.games?.appearences || 0,
    titularidades: st.games?.lineups || 0,
    minutos,
    rating: parseFloat(st.games?.rating) || 0,
    minGol: goles > 0 ? Math.round(minutos / goles) : 999,
    minAsist: asistencias > 0 ? Math.round(minutos / asistencias) : 999,
    penaltis: st.penalty?.scored || 0,
    disparosTotales, disparosPuerta,
    precisionDisparo: disparosTotales > 0 ? Math.round((disparosPuerta / disparosTotales) * 100) : 0,
    pasesClave: st.passes?.key || 0,
    pasesTotales: st.passes?.total || 0,
    precisionPase: st.passes?.accuracy || 0,
    duelosTotales: st.duels?.total || 0,
    duelosGanados: st.duels?.won || 0,
    pctDuelos: st.duels?.total > 0 ? Math.round((st.duels.won / st.duels.total) * 100) : 0,
    regatesInt: st.dribbles?.attempts || 0,
    regatesOk: st.dribbles?.success || 0,
    faltasRecibidas: st.fouls?.drawn || 0,
    tackles: st.tackles?.total || 0,
    intercepciones: st.tackles?.interceptions || 0,
    faltasCometidas: st.fouls?.committed || 0,
    amarillas: st.cards?.yellow || 0,
  }
}

function Seccion({ titulo, filas }) {
  return (
    <div className="cc-seccion">
      <div className="cc-seccion-titulo">{titulo}</div>
      {filas.map((fila, i) => {
        const gana1 = fila.menorEsMejor ? fila.v1 < fila.v2 : fila.v1 > fila.v2
        const gana2 = fila.menorEsMejor ? fila.v2 < fila.v1 : fila.v2 > fila.v1
        return (
          <div key={i} className="cc-fila">
            <div className={`cc-val left ${gana1 ? 'win' : ''}`}>
              {gana1 && <span className="cc-crown">{CROWN_SVG}</span>}
              {fila.v1}
            </div>
            <div className="cc-label">{fila.label}</div>
            <div className={`cc-val right ${gana2 ? 'win' : ''}`}>
              {fila.v2}
              {gana2 && <span className="cc-crown">{CROWN_SVG}</span>}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function ComparadorCompleto({ jugadores, competicion, onClose }) {
  const [s1, setS1] = useState(null)
  const [s2, setS2] = useState(null)
  const [cargando, setCargando] = useState(true)

  const j1 = jugadores[0]
  const j2 = jugadores[1]

  useEffect(() => {
    if (!j1?.apiId || !j2?.apiId) return
    setCargando(true)
    Promise.all([
      cargarStats(j1.apiId, competicion),
      cargarStats(j2.apiId, competicion),
    ]).then(([r1, r2]) => {
      setS1(r1)
      setS2(r2)
      setCargando(false)
    })
  }, [])

  return (
    <div className="cc-overlay">
      <div className="cc-card">
        <div className="picker-handle"></div>
        <div className="cc-header">
          <div className="cc-header-players">
            <span className="cc-header-name">{j1?.nombre}</span>
            <span className="cc-header-vs">vs</span>
            <span className="cc-header-name">{j2?.nombre}</span>
          </div>
          <button className="picker-close" onClick={onClose}>✕</button>
        </div>

        {cargando || !s1 || !s2 ? (
          <div style={{
            flex:1, display:'flex', alignItems:'center', justifyContent:'center',
            color:'#ffd400', fontFamily:'Anton,sans-serif', fontSize:'1.1rem'
          }}>
            CARGANDO DATOS...
          </div>
        ) : (
          <>
            <div className="cc-jugadores-header">
              <div className="cc-jh-name">{j1.nombre.split(' ').slice(-1)[0]}</div>
              <div className="cc-jh-center">STAT</div>
              <div className="cc-jh-name right">{j2.nombre.split(' ').slice(-1)[0]}</div>
            </div>
            <div className="cc-body">
              <Seccion titulo="Gol" filas={[
                { label: 'Goles', v1: s1.goles, v2: s2.goles, menorEsMejor: false },
                { label: 'Penaltis marcados', v1: s1.penaltis, v2: s2.penaltis, menorEsMejor: false },
                { label: 'Disparos totales', v1: s1.disparosTotales, v2: s2.disparosTotales, menorEsMejor: false },
                { label: 'Disparos a puerta', v1: s1.disparosPuerta, v2: s2.disparosPuerta, menorEsMejor: false },
                { label: 'Precision disparo %', v1: s1.precisionDisparo, v2: s2.precisionDisparo, menorEsMejor: false },
                { label: 'Min/gol', v1: s1.minGol, v2: s2.minGol, menorEsMejor: true },
              ]} />
              <Seccion titulo="Creacion" filas={[
                { label: 'Asistencias', v1: s1.asistencias, v2: s2.asistencias, menorEsMejor: false },
                { label: 'G + A', v1: s1.gA, v2: s2.gA, menorEsMejor: false },
                { label: 'Pases clave', v1: s1.pasesClave, v2: s2.pasesClave, menorEsMejor: false },
                { label: 'Pases totales', v1: s1.pasesTotales, v2: s2.pasesTotales, menorEsMejor: false },
                { label: 'Precision pase %', v1: s1.precisionPase, v2: s2.precisionPase, menorEsMejor: false },
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