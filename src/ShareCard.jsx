import { useState, useEffect } from 'react'

const API_URL = 'https://whoisbetter-api.ponceduranluismiguel.workers.dev'
const SEASON = '2025'

const CROWN_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{width:'14px',height:'14px'}}>
    <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5M19 19V20C19 20.5 18.5 21 18 21H6C5.45 21 5 20.55 5 20V19H19Z"/>
  </svg>
)

const kitStyles = {
  'Real Madrid': { background: 'linear-gradient(145deg, #fff, #f0f0f0)', nameColor: '#1a1a1a', numColor: '#1a1a1a' },
  'FC Barcelona': { background: 'linear-gradient(90deg, #004d98 0%, #004d98 25%, #a50044 25%, #a50044 50%, #004d98 50%, #004d98 75%, #a50044 75%, #a50044 100%)', nameColor: '#ffed02', numColor: '#ffed02' },
  'Atletico Madrid': { background: 'linear-gradient(90deg, #cb3524 0%, #cb3524 16.66%, #fff 16.66%, #fff 33.33%, #cb3524 33.33%, #cb3524 50%, #fff 50%, #fff 66.66%, #cb3524 66.66%, #cb3524 83.33%, #fff 83.33%, #fff 100%)', nameColor: '#0a1f3d', numColor: '#0a1f3d' },
  'Athletic Club': { background: 'linear-gradient(90deg, #ee2523 0%, #ee2523 50%, #fff 50%, #fff 100%)', nameColor: '#fff', numColor: '#fff' },
  'Real Sociedad': { background: 'linear-gradient(90deg, #fff 0%, #fff 20%, #0057a8 20%, #0057a8 40%, #fff 40%, #fff 60%, #0057a8 60%, #0057a8 80%, #fff 80%, #fff 100%)', nameColor: '#0a1f3d', numColor: '#0a1f3d' },
  'Manchester City': { background: 'linear-gradient(145deg, #6cabdd, #5a9fd4)', nameColor: '#fff', numColor: '#fff' },
  'Arsenal': { background: 'linear-gradient(145deg, #ef0107, #cc0000)', nameColor: '#fff', numColor: '#fff' },
  'Liverpool': { background: 'linear-gradient(145deg, #c8102e, #a00020)', nameColor: '#fff', numColor: '#fff' },
  'Chelsea': { background: 'linear-gradient(145deg, #034694, #023070)', nameColor: '#fff', numColor: '#fff' },
  'Manchester United': { background: 'linear-gradient(145deg, #da291c, #b02015)', nameColor: '#fff', numColor: '#ffe500' },
  'Tottenham': { background: 'linear-gradient(145deg, #fff, #f0f0f0)', nameColor: '#132257', numColor: '#132257' },
  'Inter': { background: 'linear-gradient(90deg, #003399 0%, #003399 50%, #000 50%, #000 100%)', nameColor: '#fff', numColor: '#fff' },
  'AC Milan': { background: 'linear-gradient(90deg, #fb090b 0%, #fb090b 50%, #000 50%, #000 100%)', nameColor: '#fff', numColor: '#fff' },
  'Juventus': { background: 'linear-gradient(90deg, #fff 0%, #fff 50%, #000 50%, #000 100%)', nameColor: '#000', numColor: '#000' },
  'Bayern Munich': { background: 'linear-gradient(90deg, #dc052d 0%, #dc052d 50%, #fff 50%, #fff 100%)', nameColor: '#fff', numColor: '#fff' },
  'Borussia Dortmund': { background: 'linear-gradient(145deg, #fde100, #f0d000)', nameColor: '#000', numColor: '#000' },
  'PSG': { background: 'linear-gradient(145deg, #003f7f, #002d5a)', nameColor: '#fff', numColor: '#ffd700' },
}

const kitDefault = {
  background: 'linear-gradient(135deg, #1a2750, #0a1428)',
  nameColor: '#fff',
  numColor: '#ffd400'
}

export const leagueIds = {
  'LaLiga': 140,
  'Premier League': 39,
  'Serie A': 135,
  'Bundesliga': 78,
  'Ligue 1': 61,
  'Champions': 2,
  'Copa del Rey': 143,
  'Europa': 3,
  'Selección': 10,
}

const todasLasLigas = [140, 39, 135, 78, 61, 2, 143, 3, 10]

async function fetchUnaLiga(apiId, leagueId) {
  const res = await fetch(`${API_URL}/players?id=${apiId}&season=${SEASON}&league=${leagueId}`)
  const data = await res.json()
  return data.response?.[0]?.statistics?.[0] || null
}

function sumarStats(estadisticas) {
  const validas = estadisticas.filter(Boolean)
  if (validas.length === 0) return null

  const totalMinutos = validas.reduce((s, st) => s + (st.games?.minutes || 0), 0)
  const totalGoles = validas.reduce((s, st) => s + (st.goals?.total || 0), 0)
  const totalAsistencias = validas.reduce((s, st) => s + (st.goals?.assists || 0), 0)
  const totalPartidos = validas.reduce((s, st) => s + (st.games?.appearences || 0), 0)
  const totalTitularidades = validas.reduce((s, st) => s + (st.games?.lineups || 0), 0)
  const totalDisparosTotales = validas.reduce((s, st) => s + (st.shots?.total || 0), 0)
  const totalDisparosPuerta = validas.reduce((s, st) => s + (st.shots?.on || 0), 0)
  const totalPasesClave = validas.reduce((s, st) => s + (st.passes?.key || 0), 0)
  const totalPasesTotales = validas.reduce((s, st) => s + (st.passes?.total || 0), 0)
  const totalDuelosTotales = validas.reduce((s, st) => s + (st.duels?.total || 0), 0)
  const totalDuelosGanados = validas.reduce((s, st) => s + (st.duels?.won || 0), 0)
  const totalRegatesInt = validas.reduce((s, st) => s + (st.dribbles?.attempts || 0), 0)
  const totalRegatesOk = validas.reduce((s, st) => s + (st.dribbles?.success || 0), 0)
  const totalFaltasRecibidas = validas.reduce((s, st) => s + (st.fouls?.drawn || 0), 0)
  const totalTackles = validas.reduce((s, st) => s + (st.tackles?.total || 0), 0)
  const totalIntercepciones = validas.reduce((s, st) => s + (st.tackles?.interceptions || 0), 0)
  const totalFaltasCometidas = validas.reduce((s, st) => s + (st.fouls?.committed || 0), 0)
  const totalAmarillas = validas.reduce((s, st) => s + (st.cards?.yellow || 0), 0)
  const totalPenaltis = validas.reduce((s, st) => s + (st.penalty?.scored || 0), 0)
  const avgRating = validas.reduce((s, st) => s + (parseFloat(st.games?.rating) || 0), 0) / validas.length
  const avgPrecisionPase = validas.reduce((s, st) => s + (st.passes?.accuracy || 0), 0) / validas.length

  return {
    goles: totalGoles,
    asistencias: totalAsistencias,
    gA: totalGoles + totalAsistencias,
    partidos: totalPartidos,
    titularidades: totalTitularidades,
    minutos: totalMinutos,
    rating: parseFloat(avgRating.toFixed(2)),
    minGol: totalGoles > 0 ? Math.round(totalMinutos / totalGoles) : 999,
    minAsist: totalAsistencias > 0 ? Math.round(totalMinutos / totalAsistencias) : 999,
    penaltis: totalPenaltis,
    disparosTotales: totalDisparosTotales,
    disparosPuerta: totalDisparosPuerta,
    precisionDisparo: totalDisparosTotales > 0 ? Math.round((totalDisparosPuerta / totalDisparosTotales) * 100) : 0,
    pasesClave: totalPasesClave,
    pasesTotales: totalPasesTotales,
    precisionPase: parseFloat(avgPrecisionPase.toFixed(1)),
    duelosTotales: totalDuelosTotales,
    duelosGanados: totalDuelosGanados,
    pctDuelos: totalDuelosTotales > 0 ? Math.round((totalDuelosGanados / totalDuelosTotales) * 100) : 0,
    regatesInt: totalRegatesInt,
    regatesOk: totalRegatesOk,
    faltasRecibidas: totalFaltasRecibidas,
    tackles: totalTackles,
    intercepciones: totalIntercepciones,
    faltasCometidas: totalFaltasCometidas,
    amarillas: totalAmarillas,
  }
}

export async function fetchStatsCompleto(apiId, liga) {
  if (liga === 'Toda la temporada') {
    const todas = await Promise.all(todasLasLigas.map(id => fetchUnaLiga(apiId, id)))
    return sumarStats(todas)
  }
  const leagueId = leagueIds[liga] || 140
  const res = await fetch(`${API_URL}/players?id=${apiId}&season=${SEASON}&league=${leagueId}`)
  const data = await res.json()
  const st = data.response?.[0]?.statistics?.[0]
  if (!st) return null
  const g = st.goals
  const games = st.games
  const minutos = games.minutes || 0
  const goles = g.total || 0
  const asistencias = g.assists || 0
  const disparosTotales = st.shots?.total || 0
  const disparosPuerta = st.shots?.on || 0
  return {
    goles,
    asistencias,
    gA: goles + asistencias,
    partidos: games.appearences || 0,
    titularidades: games.lineups || 0,
    minutos,
    rating: parseFloat(games.rating) || 0,
    minGol: goles > 0 ? Math.round(minutos / goles) : 999,
    minAsist: asistencias > 0 ? Math.round(minutos / asistencias) : 999,
    penaltis: st.penalty?.scored || 0,
    disparosTotales,
    disparosPuerta,
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

function determinarGanador(s1, s2) {
  const metricas = ['goles', 'asistencias', 'gA', 'partidos', 'minutos', 'rating']
  const menorEsMejor = ['minGol', 'minAsist']
  let puntos1 = 0
  let puntos2 = 0
  const todas = [...metricas, ...menorEsMejor]
  todas.forEach(m => {
    const esMenor = menorEsMejor.includes(m)
    const v1 = s1[m]
    const v2 = s2[m]
    if (esMenor) {
      if (v1 < v2) puntos1++
      else if (v2 < v1) puntos2++
    } else {
      if (v1 > v2) puntos1++
      else if (v2 > v1) puntos2++
    }
  })
  return { puntos1, puntos2, total: todas.length }
}

function ShareCard({ jugadores, competicion, temporada }) {
  const [stats, setStats] = useState([null, null])
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    if (!jugadores[0] || !jugadores[1]) return
    if (!jugadores[0].apiId || !jugadores[1].apiId) return
    setCargando(true)
    setStats([null, null])
    Promise.all([
      fetchStatsCompleto(jugadores[0].apiId, competicion),
      fetchStatsCompleto(jugadores[1].apiId, competicion),
    ]).then(([s1, s2]) => {
      setStats([s1, s2])
      setCargando(false)
    })
  }, [jugadores, competicion])

  if (!jugadores[0] || !jugadores[1]) return null

  const j1 = jugadores[0]
  const j2 = jugadores[1]
  const kit1 = kitStyles[j1.equipo] || kitDefault
  const kit2 = kitStyles[j2.equipo] || kitDefault

  if (cargando) {
    return (
      <div className="share-card" style={{alignItems:'center',justifyContent:'center'}}>
        <div style={{color:'#ffd400',fontFamily:'Anton',fontSize:'1.2rem',letterSpacing:'-0.5px'}}>
          CARGANDO DATOS...
        </div>
      </div>
    )
  }

  if (!stats[0] || !stats[1]) return null

  const s1 = stats[0]
  const s2 = stats[1]
  const { puntos1, puntos2, total } = determinarGanador(s1, s2)
  const ganador = puntos1 >= puntos2 ? j1 : j2
  const puntosGanador = puntos1 >= puntos2 ? puntos1 : puntos2

  const filas = [
    { label: 'Goles', v1: s1.goles, v2: s2.goles, menorEsMejor: false },
    { label: 'Asistencias', v1: s1.asistencias, v2: s2.asistencias, menorEsMejor: false },
    { label: 'G + A', v1: s1.gA, v2: s2.gA, menorEsMejor: false },
    { label: 'Partidos', v1: s1.partidos, v2: s2.partidos, menorEsMejor: false },
    { label: 'Minutos', v1: s1.minutos, v2: s2.minutos, menorEsMejor: false },
    { label: 'Min/gol', v1: s1.minGol, v2: s2.minGol, menorEsMejor: true },
    { label: 'Min/asist', v1: s1.minAsist, v2: s2.minAsist, menorEsMejor: true },
    { label: 'Rating', sublabel: 'Sofascore', v1: s1.rating, v2: s2.rating, menorEsMejor: false },
  ]

  return (
    <div className="share-card">
      <div className="sc-head">
        <div className="sc-brand">
          <div className="sc-brand-ico">W</div>
          <div className="sc-brand-name">Who<span>is</span>better<span className="sc-brand-q">?</span></div>
        </div>
        <div className="sc-context-tag">{competicion} · {temporada}</div>
      </div>

      <div className="sc-players">
        <div className="sc-player">
          <div className={`sc-player-inner ${puntos1 >= puntos2 ? 'win' : ''}`}>
            {puntos1 >= puntos2 && (
              <div className="sc-crown">{CROWN_SVG}<span>GANA</span></div>
            )}
            <div className="sc-kit" style={{ background: kit1.background }}>
              <div className="sc-kit-name" style={{ color: kit1.nameColor }}>{j1.nombre.split(' ').pop()}</div>
              <div className="sc-kit-num" style={{ color: kit1.numColor }}>{j1.dorsal}</div>
            </div>
            <div className="sc-name">{j1.nombre}</div>
            <div className="sc-club">{j1.equipo}</div>
          </div>
        </div>

        <div className="sc-vs-block">
          <div className="sc-vs-glow"></div>
          <div className="sc-vs"><span>V</span><span>S</span></div>
        </div>

        <div className="sc-player">
          <div className={`sc-player-inner ${puntos2 > puntos1 ? 'win' : ''}`}>
            {puntos2 > puntos1 && (
              <div className="sc-crown">{CROWN_SVG}<span>GANA</span></div>
            )}
            <div className="sc-kit" style={{ background: kit2.background }}>
              <div className="sc-kit-name" style={{ color: kit2.nameColor }}>{j2.nombre.split(' ').pop()}</div>
              <div className="sc-kit-num" style={{ color: kit2.numColor }}>{j2.dorsal}</div>
            </div>
            <div className="sc-name">{j2.nombre}</div>
            <div className="sc-club">{j2.equipo}</div>
          </div>
        </div>
      </div>

      <div className="sc-stats">
        {filas.map((fila, i) => {
          const gana1 = fila.menorEsMejor ? fila.v1 < fila.v2 : fila.v1 > fila.v2
          const gana2 = fila.menorEsMejor ? fila.v2 < fila.v1 : fila.v2 > fila.v1
          return (
            <div key={i} className="sc-stat-row">
              <div className={`sc-stat-val left ${gana1 ? 'win' : ''}`}>{fila.v1}</div>
              <div className="sc-stat-label">
                {fila.label}
                {fila.sublabel && <span className="sc-stat-src">{fila.sublabel}</span>}
              </div>
              <div className={`sc-stat-val right ${gana2 ? 'win' : ''}`}>{fila.v2}</div>
            </div>
          )
        })}
      </div>

      <div className="sc-verdict">
        {CROWN_SVG}
        <span className="sc-verdict-name">{ganador.nombre}</span>
        <span className="sc-verdict-score">{puntosGanador} / {total}</span>
      </div>
    </div>
  )
}

export default ShareCard