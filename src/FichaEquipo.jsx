import { useState, useEffect } from 'react'

const API_URL = 'https://whoisbetter-api.ponceduranluismiguel.workers.dev'
const SEASON = '2025'

const delay = ms => new Promise(r => setTimeout(r, ms))
async function fetchJson(url) {
  try { const r = await fetch(url); return await r.json() } catch { return null }
}

const ligaDeEquipo = {
  529: 140, 541: 140, 530: 140, 531: 140, 548: 140, 532: 140, 533: 140,
  536: 140, 543: 140, 538: 140, 546: 140, 728: 140, 540: 140, 542: 140,
  539: 140, 727: 140, 798: 140, 547: 140, 718: 140, 797: 140,
  50: 39, 42: 39, 40: 39, 33: 39, 47: 39, 49: 39, 34: 39, 66: 39,
  51: 39, 48: 39, 55: 39, 36: 39, 52: 39, 39: 39, 65: 39, 45: 39,
  35: 39, 46: 39, 41: 39, 62: 39,
  505: 135, 489: 135, 496: 135, 492: 135, 497: 135, 487: 135, 502: 135,
  488: 135, 494: 135, 500: 135, 511: 135, 495: 135, 503: 135, 499: 135,
  486: 135, 504: 135, 498: 135, 867: 135, 490: 135, 491: 135,
  157: 78, 165: 78, 173: 78, 168: 78, 169: 78, 161: 78, 163: 78,
  170: 78, 167: 78, 172: 78, 164: 78, 162: 78, 176: 78, 174: 78,
  171: 78, 160: 78, 166: 78, 175: 78,
  85: 61, 91: 61, 80: 61, 81: 61, 84: 61, 94: 61, 93: 61, 97: 61,
  98: 61, 95: 61, 111: 61, 96: 61, 108: 61, 113: 61, 112: 61,
  116: 61, 109: 61, 114: 61,
}

const posicionOrden = { 'Goalkeeper': 0, 'Defender': 1, 'Midfielder': 2, 'Attacker': 3, 'Forward': 3 }
const posicionES = { 'Goalkeeper': 'Porteros', 'Defender': 'Defensas', 'Midfielder': 'Centrocampistas', 'Attacker': 'Delanteros', 'Forward': 'Delanteros' }

const titulosEquipo = {
  541: {
    fundacion: 1902, nombreCompleto: 'Real Madrid Club de Fútbol',
    estadio: 'Santiago Bernabéu', ciudad: 'Madrid',
    titulos: [
      { comp: 'La Liga', n: 36, logo: 140 },
      { comp: 'Copa del Rey', n: 20, logo: 143 },
      { comp: 'Supercopa de España', n: 13, logo: 556 },
      { comp: 'UEFA Champions League', n: 15, logo: 2 },
      { comp: 'UEFA Europa League', n: 2, logo: 3 },
      { comp: 'UEFA Super Cup', n: 5, logo: 531 },
      { comp: 'FIFA Club World Cup', n: 8, logo: 15 },
    ]
  },
  529: {
    fundacion: 1899, nombreCompleto: 'Futbol Club Barcelona',
    estadio: 'Spotify Camp Nou', ciudad: 'Barcelona',
    titulos: [
      { comp: 'La Liga', n: 27, logo: 140 },
      { comp: 'Copa del Rey', n: 31, logo: 143 },
      { comp: 'Supercopa de España', n: 14, logo: 556 },
      { comp: 'UEFA Champions League', n: 5, logo: 2 },
      { comp: 'UEFA Super Cup', n: 5, logo: 531 },
      { comp: 'FIFA Club World Cup', n: 3, logo: 15 },
    ]
  },
  530: {
    fundacion: 1903, nombreCompleto: 'Club Atlético de Madrid',
    estadio: 'Cívitas Metropolitano', ciudad: 'Madrid',
    titulos: [
      { comp: 'La Liga', n: 11, logo: 140 },
      { comp: 'Copa del Rey', n: 10, logo: 143 },
      { comp: 'Supercopa de España', n: 2, logo: 556 },
      { comp: 'UEFA Europa League', n: 3, logo: 3 },
      { comp: 'UEFA Super Cup', n: 3, logo: 531 },
      { comp: 'Copa Intercontinental', n: 1, logo: 36 },
    ]
  },
  531: {
    fundacion: 1898, nombreCompleto: 'Athletic Club',
    estadio: 'San Mamés', ciudad: 'Bilbao',
    titulos: [
      { comp: 'La Liga', n: 8, logo: 140 },
      { comp: 'Copa del Rey', n: 24, logo: 143 },
      { comp: 'Supercopa de España', n: 2, logo: 556 },
    ]
  },
  532: {
    fundacion: 1919, nombreCompleto: 'Valencia Club de Fútbol',
    estadio: 'Mestalla', ciudad: 'Valencia',
    titulos: [
      { comp: 'La Liga', n: 6, logo: 140 },
      { comp: 'Copa del Rey', n: 8, logo: 143 },
      { comp: 'Supercopa de España', n: 1, logo: 556 },
      { comp: 'UEFA Cup / Europa League', n: 2, logo: 3 },
      { comp: 'UEFA Super Cup', n: 2, logo: 531 },
      { comp: 'Copa Intercontinental', n: 1, logo: 36 },
    ]
  },
  536: {
    fundacion: 1890, nombreCompleto: 'Sevilla Fútbol Club',
    estadio: 'Ramón Sánchez-Pizjuán', ciudad: 'Sevilla',
    titulos: [
      { comp: 'La Liga', n: 1, logo: 140 },
      { comp: 'Copa del Rey', n: 5, logo: 143 },
      { comp: 'Supercopa de España', n: 1, logo: 556 },
      { comp: 'UEFA Europa League', n: 7, logo: 3 },
      { comp: 'UEFA Super Cup', n: 1, logo: 531 },
    ]
  },
  543: {
    fundacion: 1907, nombreCompleto: 'Real Betis Balompié',
    estadio: 'Estadio Benito Villamarín', ciudad: 'Sevilla',
    titulos: [
      { comp: 'La Liga', n: 1, logo: 140 },
      { comp: 'Copa del Rey', n: 3, logo: 143 },
    ]
  },
  548: {
    fundacion: 1909, nombreCompleto: 'Real Sociedad de Fútbol',
    estadio: 'Reale Arena', ciudad: 'San Sebastián',
    titulos: [
      { comp: 'La Liga', n: 2, logo: 140 },
      { comp: 'Copa del Rey', n: 3, logo: 143 },
    ]
  },
  533: { fundacion: 1923, nombreCompleto: 'Villarreal Club de Fútbol', estadio: 'Estadio de la Cerámica', ciudad: 'Villarreal', titulos: [{ comp: 'UEFA Europa League', n: 1, logo: 3 }] },
  727: { fundacion: 1920, nombreCompleto: 'Club Atlético Osasuna', estadio: 'El Sadar', ciudad: 'Pamplona', titulos: [] },
  538: { fundacion: 1923, nombreCompleto: 'Real Club Celta de Vigo', estadio: 'Abanca-Balaídos', ciudad: 'Vigo', titulos: [] },
  546: { fundacion: 1983, nombreCompleto: 'Getafe Club de Fútbol', estadio: 'Coliseum Alfonso Pérez', ciudad: 'Getafe', titulos: [] },
  728: { fundacion: 1924, nombreCompleto: 'Rayo Vallecano de Madrid', estadio: 'Estadio de Vallecas', ciudad: 'Madrid', titulos: [] },
  798: { fundacion: 1916, nombreCompleto: 'Real Club Deportivo Mallorca', estadio: 'Visit Mallorca Estadi', ciudad: 'Palma', titulos: [{ comp: 'Copa del Rey', n: 1, logo: 143 }] },
  540: { fundacion: 1900, nombreCompleto: 'RCD Espanyol de Barcelona', estadio: 'Stage Front Stadium', ciudad: 'Barcelona', titulos: [{ comp: 'Copa del Rey', n: 4, logo: 143 }] },
  542: { fundacion: 1921, nombreCompleto: 'Deportivo Alavés', estadio: 'Mendizorrotza', ciudad: 'Vitoria-Gasteiz', titulos: [] },
  547: { fundacion: 1930, nombreCompleto: 'Girona Fútbol Club', estadio: 'Estadio Municipal de Montilivi', ciudad: 'Girona', titulos: [] },
  539: { fundacion: 1909, nombreCompleto: 'Levante Unión Deportiva', estadio: 'Estadio Ciudad de Valencia', ciudad: 'Valencia', titulos: [] },
  718: { fundacion: 1926, nombreCompleto: 'Real Oviedo', estadio: 'Carlos Tartiere', ciudad: 'Oviedo', titulos: [] },
  797: { fundacion: 1923, nombreCompleto: 'Elche Club de Fútbol', estadio: 'Estadio Manuel Martínez Valero', ciudad: 'Elche', titulos: [] },
}

export default function FichaEquipo({ equipoId, equipoNombre, equipoLogo, onBack, onJugador }) {
  const [datos, setDatos] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [tabActiva, setTabActiva] = useState('goles')

  const ligaId = ligaDeEquipo[equipoId] || 140
  const infoHardcoded = titulosEquipo[equipoId]

  useEffect(() => {
    setCargando(true)
    setDatos(null)

    async function cargar() {
      // Cargamos squad para dorsales + info + clasificación en paralelo
      const [infoRes, clasificacionRes, squadRes] = await Promise.all([
        fetchJson(`${API_URL}/teams?id=${equipoId}`),
        fetchJson(`${API_URL}/standings?league=${ligaId}&season=${SEASON}`),
        fetchJson(`${API_URL}/players/squads?team=${equipoId}`),
      ])
      await delay(150)

      // Mapa id → dorsal desde el squad oficial
      const dorsalMap = {}
      const squadJugadores = squadRes?.response?.[0]?.players || []
      squadJugadores.forEach(j => {
        if (j.id && j.number) dorsalMap[j.id] = j.number
      })

      const ligasParaJugadores = [ligaId, 2, 3, 143, 556, 531, 848]
      let jugadoresMap = {}

      for (const lid of ligasParaJugadores) {
        let pagina = 1
        let seguir = true
        while (seguir) {
          const res = await fetchJson(`${API_URL}/players?team=${equipoId}&season=${SEASON}&league=${lid}&page=${pagina}`)
          const jugadores = res?.response || []
          for (const j of jugadores) {
            const st = j.statistics?.[0]
            if (!st) continue
            const id = j.player.id
            if (!jugadoresMap[id]) {
              jugadoresMap[id] = {
                id,
                nombre: j.player.name,
                foto: j.player.photo,
                posicion: st.games?.position || '',
                dorsal: dorsalMap[id] || null,
                goles: 0, asistencias: 0, partidos: 0,
              }
            }
            jugadoresMap[id].goles += st.goals?.total || 0
            jugadoresMap[id].asistencias += st.goals?.assists || 0
            jugadoresMap[id].partidos += st.games?.appearences || 0
          }
          if (pagina >= (res?.paging?.total || 1)) seguir = false
          else { pagina++; await delay(100) }
        }
        await delay(150)
      }

      const jugadoresConStats = Object.values(jugadoresMap)
      const topGoles = [...jugadoresConStats].sort((a, b) => b.goles - a.goles).slice(0, 25)
      const topAsistencias = [...jugadoresConStats].sort((a, b) => b.asistencias - a.asistencias).slice(0, 25)
      const topPartidos = [...jugadoresConStats].sort((a, b) => b.partidos - a.partidos).slice(0, 25)

      // Plantilla agrupada por posición
      const gruposPosicion = {}
      jugadoresConStats.forEach(j => {
        const pos = j.posicion || 'Unknown'
        if (!gruposPosicion[pos]) gruposPosicion[pos] = []
        gruposPosicion[pos].push(j)
      })
      Object.keys(gruposPosicion).forEach(pos => {
        gruposPosicion[pos].sort((a, b) => {
          if (a.dorsal && b.dorsal) return a.dorsal - b.dorsal
          if (a.dorsal) return -1
          if (b.dorsal) return 1
          return a.nombre.localeCompare(b.nombre)
        })
      })
      const plantillaOrdenada = Object.entries(gruposPosicion)
        .sort((a, b) => (posicionOrden[a[0]] ?? 99) - (posicionOrden[b[0]] ?? 99))

      const info = infoRes?.response?.[0]
      const standing = clasificacionRes?.response?.[0]?.league?.standings?.[0] || []
      const posicionEquipo = standing.findIndex(s => s.team.id === equipoId) + 1
      const statsEquipoRes = await fetchJson(`${API_URL}/teams/statistics?team=${equipoId}&season=${SEASON}&league=${ligaId}`)
      const statsEquipo = statsEquipoRes?.response

      setDatos({ info, standing, posicionEquipo, topGoles, topAsistencias, topPartidos, plantillaOrdenada, statsEquipo })
      setCargando(false)
    }

    cargar()
  }, [equipoId])

  const seccionTitulo = (texto) => (
    <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.6rem', color: '#0a1740', background: '#ffd400', padding: '4px 10px', borderRadius: '5px', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '10px', display: 'inline-block' }}>{texto}</div>
  )

  const { info, standing, posicionEquipo, topGoles, topAsistencias, topPartidos, plantillaOrdenada, statsEquipo } = datos || {}
  const topActivo = tabActiva === 'goles' ? topGoles : tabActiva === 'asistencias' ? topAsistencias : tabActiva === 'partidos' ? topPartidos : null
  const labelActivo = tabActiva === 'goles' ? 'G' : tabActiva === 'asistencias' ? 'A' : 'PJ'

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0a1740 0%, #02081f 100%)', paddingBottom: '80px' }}>
      <div style={{
        padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px',
        background: 'linear-gradient(180deg, rgba(255,212,0,0.08), transparent)',
        borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'sticky', top: 0, zIndex: 10,
        backdropFilter: 'blur(10px)',
      }}>
        <button onClick={onBack} style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.1rem', flexShrink: 0 }}>←</button>
        <div style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.95)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <img src={`${API_URL}/img/${equipoLogo.replace('https://media.api-sports.io/', '')}`} alt={equipoNombre}
            style={{ width: '28px', height: '28px', objectFit: 'contain' }}
            onError={e => { e.target.style.display = 'none' }} />
        </div>
        <div>
          <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.1rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.3px', lineHeight: 1 }}>{equipoNombre}</div>
          {infoHardcoded?.ciudad && <div style={{ fontSize: '0.6rem', color: '#7a8aa8', fontWeight: 600, marginTop: '2px' }}>{infoHardcoded.ciudad}</div>}
        </div>
      </div>

      {cargando ? (
        <div style={{ padding: '60px', textAlign: 'center', color: '#ffd400', fontFamily: 'Anton, sans-serif', fontSize: '1rem', letterSpacing: '1px' }}>CARGANDO DATOS...</div>
      ) : (
        <div style={{ padding: '16px' }}>

          {infoHardcoded && (
            <div style={{ marginBottom: '20px' }}>
              {seccionTitulo('Ficha del club')}
              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '12px 14px', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05)', marginBottom: '12px' }}>
                {[
                  { label: 'Nombre completo', val: infoHardcoded.nombreCompleto },
                  { label: 'Fundación', val: infoHardcoded.fundacion },
                  { label: 'Estadio', val: infoHardcoded.estadio || info?.venue?.name || '—' },
                  { label: 'Ciudad', val: infoHardcoded.ciudad },
                ].map((d, i, arr) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                    <div style={{ fontSize: '0.55rem', fontWeight: 700, color: '#7a8aa8', letterSpacing: '1px', textTransform: 'uppercase' }}>{d.label}</div>
                    <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.85rem', color: '#fff', textAlign: 'right', maxWidth: '65%' }}>{d.val}</div>
                  </div>
                ))}
              </div>

              {infoHardcoded.titulos.filter(t => t.n > 0).length > 0 && (
                <>
                  <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.55rem', color: '#7a8aa8', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>Palmarés histórico</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {infoHardcoded.titulos.filter(t => t.n > 0).map((t, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05)' }}>
                        <div style={{ width: '28px', height: '28px', background: 'rgba(255,255,255,0.95)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <img src={`${API_URL}/img/football/leagues/${t.logo}.png`} alt={t.comp}
                            style={{ width: '22px', height: '22px', objectFit: 'contain' }}
                            onError={e => { e.target.style.display = 'none' }} />
                        </div>
                        <div style={{ flex: 1, fontFamily: 'Anton, sans-serif', fontSize: '0.85rem', color: '#fff', textTransform: 'uppercase' }}>{t.comp}</div>
                        <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.3rem', color: '#ffd400' }}>×{t.n}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {statsEquipo && (
            <div style={{ marginBottom: '20px' }}>
              {seccionTitulo('Temporada 25/26')}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '8px' }}>
                {[
                  { val: statsEquipo.fixtures?.played?.total || 0, label: 'PJ' },
                  { val: statsEquipo.fixtures?.wins?.total || 0, label: 'V' },
                  { val: statsEquipo.fixtures?.draws?.total || 0, label: 'E' },
                  { val: statsEquipo.fixtures?.loses?.total || 0, label: 'D' },
                ].map((s, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '10px 8px', textAlign: 'center', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05)' }}>
                    <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.4rem', color: '#ffd400', lineHeight: 1, marginBottom: '3px' }}>{s.val}</div>
                    <div style={{ fontSize: '0.5rem', fontWeight: 700, color: '#7a8aa8', letterSpacing: '1px', textTransform: 'uppercase' }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {[
                  { val: statsEquipo.goals?.for?.total?.total || 0, label: 'Goles a favor' },
                  { val: statsEquipo.goals?.against?.total?.total || 0, label: 'Goles en contra' },
                  { val: posicionEquipo || '—', label: 'Posición liga' },
                ].map((s, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '10px 8px', textAlign: 'center', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05)' }}>
                    <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.4rem', color: '#ffd400', lineHeight: 1, marginBottom: '3px' }}>{s.val}</div>
                    <div style={{ fontSize: '0.5rem', fontWeight: 700, color: '#7a8aa8', letterSpacing: '1px', textTransform: 'uppercase' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {standing.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              {seccionTitulo('Clasificación')}
              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '28px 1fr 28px 28px 28px 28px 40px', gap: '4px', padding: '6px 10px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  {['#', 'Equipo', 'PJ', 'V', 'E', 'D', 'Pts'].map((h, i) => (
                    <div key={i} style={{ fontSize: '0.45rem', fontWeight: 700, color: '#7a8aa8', letterSpacing: '1px', textTransform: 'uppercase', textAlign: i > 1 ? 'center' : 'left' }}>{h}</div>
                  ))}
                </div>
                {standing.slice(0, 20).map((s, i) => {
                  const esActual = s.team.id === equipoId
                  return (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '28px 1fr 28px 28px 28px 28px 40px', gap: '4px', padding: '7px 10px', borderBottom: i < standing.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none', background: esActual ? 'rgba(255,212,0,0.08)' : 'transparent' }}>
                      <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.8rem', color: esActual ? '#ffd400' : '#7a8aa8' }}>{s.rank}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <img src={`${API_URL}/img/${s.team.logo.replace('https://media.api-sports.io/', '')}`} alt={s.team.name}
                          style={{ width: '16px', height: '16px', objectFit: 'contain' }}
                          onError={e => { e.target.style.display = 'none' }} />
                        <div style={{ fontSize: '0.75rem', color: esActual ? '#ffd400' : '#fff', fontFamily: esActual ? 'Anton, sans-serif' : 'inherit', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.team.name}</div>
                      </div>
                      {[s.all?.played, s.all?.win, s.all?.draw, s.all?.lose, s.points].map((v, j) => (
                        <div key={j} style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.8rem', color: esActual ? '#ffd400' : '#a8b4cc', textAlign: 'center' }}>{v}</div>
                      ))}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            {seccionTitulo('Jugadores 25/26 — Todas las competiciones')}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
              {[
                { key: 'goles', label: '⚽ Goles' },
                { key: 'asistencias', label: '🎯 Asist.' },
                { key: 'partidos', label: '📅 Partidos' },
                { key: 'plantilla', label: '👥 Plantilla' },
              ].map(tab => (
                <button key={tab.key} onClick={() => setTabActiva(tab.key)} style={{
                  fontFamily: 'Anton, sans-serif', fontSize: '0.6rem', letterSpacing: '1px',
                  padding: '6px 12px', borderRadius: '20px', border: 'none', cursor: 'pointer', flexShrink: 0,
                  background: tabActiva === tab.key ? '#ffd400' : 'rgba(255,255,255,0.08)',
                  color: tabActiva === tab.key ? '#0a1740' : '#fff',
                  textTransform: 'uppercase',
                }}>{tab.label}</button>
              ))}
            </div>

            {tabActiva !== 'plantilla' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {(topActivo || []).map((j, i) => (
                  <div key={i}
                    onClick={() => onJugador({ apiId: j.id, nombre: j.nombre, nombreMostrado: j.nombre, equipo: equipoNombre, dorsal: j.dorsal || '?' })}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05)', cursor: 'pointer' }}>
                    <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.8rem', color: i < 3 ? '#ffd400' : '#7a8aa8', width: '20px', textAlign: 'center', flexShrink: 0 }}>{i + 1}</div>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', background: 'linear-gradient(135deg, #1a2750, #0a1428)', flexShrink: 0 }}>
                      <img src={`${API_URL}/img/${j.foto?.replace('https://media.api-sports.io/', '')}`} alt={j.nombre}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                        onError={e => { e.target.style.display = 'none' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.85rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.2px' }}>{j.nombre}</div>
                      <div style={{ fontSize: '0.5rem', color: '#7a8aa8', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginTop: '1px' }}>{j.posicion}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.2rem', color: '#ffd400' }}>
                        {tabActiva === 'goles' ? j.goles : tabActiva === 'asistencias' ? j.asistencias : j.partidos}
                      </div>
                      <div style={{ fontSize: '0.45rem', fontWeight: 700, color: '#7a8aa8', letterSpacing: '1px', textTransform: 'uppercase' }}>{labelActivo}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {(plantillaOrdenada || []).map(([posicion, jugadores]) => (
                  <div key={posicion}>
                    <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.55rem', color: '#7a8aa8', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px', borderLeft: '3px solid #ffd400', paddingLeft: '8px' }}>
                      {posicionES[posicion] || posicion} — {jugadores.length}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      {jugadores.map((j, i) => (
                        <div key={i}
                          onClick={() => onJugador({ apiId: j.id, nombre: j.nombre, nombreMostrado: j.nombre, equipo: equipoNombre, dorsal: j.dorsal || '?' })}
                          style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05)', cursor: 'pointer' }}>
                          <div style={{
                            fontFamily: 'Anton, sans-serif', fontSize: '0.9rem',
                            color: j.dorsal ? '#ffd400' : 'rgba(255,255,255,0.2)',
                            width: '24px', textAlign: 'center', flexShrink: 0
                          }}>
                            {j.dorsal || '—'}
                          </div>
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', background: 'linear-gradient(135deg, #1a2750, #0a1428)', flexShrink: 0 }}>
                            <img src={`${API_URL}/img/${j.foto?.replace('https://media.api-sports.io/', '')}`} alt={j.nombre}
                              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                              onError={e => { e.target.style.display = 'none' }} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.85rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.2px' }}>{j.nombre}</div>
                          </div>
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            {j.goles > 0 && (
                              <div style={{ textAlign: 'center' }}>
                                <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.9rem', color: '#ffd400' }}>{j.goles}</div>
                                <div style={{ fontSize: '0.4rem', color: '#7a8aa8', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>G</div>
                              </div>
                            )}
                            {j.asistencias > 0 && (
                              <div style={{ textAlign: 'center' }}>
                                <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.9rem', color: '#a8b4cc' }}>{j.asistencias}</div>
                                <div style={{ fontSize: '0.4rem', color: '#7a8aa8', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>A</div>
                              </div>
                            )}
                            <div style={{ textAlign: 'center' }}>
                              <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.9rem', color: '#7a8aa8' }}>{j.partidos}</div>
                              <div style={{ fontSize: '0.4rem', color: '#7a8aa8', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>PJ</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  )
}