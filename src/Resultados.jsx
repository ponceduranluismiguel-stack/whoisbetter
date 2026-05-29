import { useState, useEffect, useRef } from 'react'

const API_URL = 'https://whoisbetter-api.ponceduranluismiguel.workers.dev'

async function fetchJson(url) {
  try { const r = await fetch(url); return await r.json() } catch { return null }
}

const competiciones = [
  { id: 140, nombre: 'LaLiga', logoId: 140, temporada: 2025, max: 38 },
  { id: 39, nombre: 'Premier League', logoId: 39, temporada: 2025, max: 38 },
  { id: 135, nombre: 'Serie A', logoId: 135, temporada: 2025, max: 38 },
  { id: 78, nombre: 'Bundesliga', logoId: 78, temporada: 2025, max: 34 },
  { id: 61, nombre: 'Ligue 1', logoId: 61, temporada: 2025, max: 34 },
  { id: 94, nombre: 'Liga Portuguesa', logoId: 94, temporada: 2025, max: 34 },
  { id: 88, nombre: 'Eredivisie', logoId: 88, temporada: 2025, max: 34 },
  { id: 128, nombre: 'Liga Argentina', logoId: 128, temporada: 2025, max: 28 },
  { id: 71, nombre: 'Brasileirão', logoId: 71, temporada: 2025, max: 38 },
  { id: 253, nombre: 'MLS', logoId: 253, temporada: 2025, max: 34 },
  { id: 2, nombre: 'Champions League', logoId: 2, temporada: 2025, max: 8 },
  { id: 3, nombre: 'Europa League', logoId: 3, temporada: 2025, max: 8 },
  { id: 848, nombre: 'Conference League', logoId: 848, temporada: 2025, max: 8 },
]

const estadoPartido = (fixture) => {
  const s = fixture.status?.short
  if (s === 'FT' || s === 'AET' || s === 'PEN') return 'finalizado'
  if (s === '1H' || s === '2H' || s === 'HT' || s === 'ET' || s === 'BT' || s === 'P') return 'en_juego'
  if (s === 'NS') return 'no_empezado'
  return 'otro'
}

const formatearHora = (fecha) => {
  const d = new Date(fecha)
  return d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
}

export default function Resultados({ onBack }) {
  const [compActiva, setCompActiva] = useState(140)
  const [jornada, setJornada] = useState(null)
  const [partidos, setPartidos] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [cargandoJornadas, setCargandoJornadas] = useState(true)
  const jornadasRef = useRef(null)

  const comp = competiciones.find(c => c.id === compActiva)
  const maxJornada = comp?.max || 38

  useEffect(() => {
    setCargandoJornadas(true)
    setJornada(null)
    setPartidos(null)

    async function buscarJornadaActual() {
      const res = await fetchJson(`${API_URL}/fixtures?league=${compActiva}&season=${comp.temporada}&last=1`)
      const ultimoPartido = res?.response?.[0]
      if (ultimoPartido) {
        const roundStr = ultimoPartido.league?.round || ''
        const match = roundStr.match(/(\d+)$/)
        const num = match ? parseInt(match[1]) : 1
        setJornada(num)
      } else {
        setJornada(1)
      }
      setCargandoJornadas(false)
    }

    buscarJornadaActual()
  }, [compActiva])

  useEffect(() => {
    if (jornada === null || !jornadasRef.current) return
    const el = jornadasRef.current.querySelector(`[data-jornada="${jornada}"]`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [jornada])

  useEffect(() => {
    if (jornada === null) return
    setCargando(true)
    setPartidos(null)

    async function cargarPartidos() {
      let roundStr
      if (compActiva === 2 || compActiva === 3 || compActiva === 848) {
        roundStr = `League Stage - ${jornada}`
      } else {
        roundStr = `Regular Season - ${jornada}`
      }

      const res = await fetchJson(`${API_URL}/fixtures?league=${compActiva}&season=${comp.temporada}&round=${encodeURIComponent(roundStr)}`)
      const fixtures = res?.response || []
      fixtures.sort((a, b) => new Date(a.fixture.date) - new Date(b.fixture.date))

      const grupos = {}
      fixtures.forEach(f => {
        const fecha = new Date(f.fixture.date).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })
        if (!grupos[fecha]) grupos[fecha] = []
        grupos[fecha].push(f)
      })

      setPartidos(grupos)
      setCargando(false)
    }

    cargarPartidos()
  }, [jornada, compActiva])

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0a1740 0%, #02081f 100%)', paddingBottom: '80px' }}>

      {/* Header */}
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px', background: 'linear-gradient(180deg, rgba(255,212,0,0.08), transparent)', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'sticky', top: 0, zIndex: 10, backdropFilter: 'blur(10px)' }}>
        <button onClick={onBack} style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.1rem', flexShrink: 0 }}>←</button>
        <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.2rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.3px' }}>Resultados</div>
      </div>

      {/* Selector competición */}
      <div style={{ overflowX: 'auto', padding: '12px 16px 0' }}>
        <div style={{ display: 'flex', gap: '8px', paddingBottom: '4px' }}>
          {competiciones.map(c => (
            <button key={c.id} onClick={() => setCompActiva(c.id)} style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0, padding: '6px 12px', borderRadius: '20px', border: 'none', cursor: 'pointer', background: compActiva === c.id ? '#ffd400' : 'rgba(255,255,255,0.08)', color: compActiva === c.id ? '#0a1740' : '#fff' }}>
              <div style={{ width: '18px', height: '18px', background: compActiva === c.id ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.9)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <img src={`${API_URL}/img/football/leagues/${c.logoId}.png`} alt={c.nombre} style={{ width: '14px', height: '14px', objectFit: 'contain' }} onError={e => { e.target.style.display = 'none' }} />
              </div>
              <span style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.6rem', letterSpacing: '0.5px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{c.nombre}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Círculos de jornadas */}
      <div ref={jornadasRef} style={{ overflowX: 'auto', padding: '14px 16px 10px', display: 'flex', gap: '8px', alignItems: 'center', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {cargandoJornadas ? (
          <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.7rem', color: '#7a8aa8', letterSpacing: '1px', padding: '0 8px' }}>CARGANDO...</div>
        ) : (
          Array.from({ length: maxJornada }, (_, i) => i + 1).map(n => {
            const activa = jornada === n
            return (
              <button key={n} data-jornada={n} onClick={() => setJornada(n)} style={{ width: '34px', height: '34px', borderRadius: '50%', flexShrink: 0, border: '2px solid #ffd400', background: activa ? '#ffd400' : 'transparent', color: activa ? '#0a1740' : '#ffd400', fontFamily: 'Anton, sans-serif', fontSize: '0.7rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s', boxShadow: activa ? '0 2px 12px rgba(255,212,0,0.4)' : 'none' }}>
                {n}
              </button>
            )
          })
        )}
      </div>

      {/* Título jornada con flechas */}
      <div style={{ padding: '0 16px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => jornada > 1 && setJornada(jornada - 1)} disabled={!jornada || jornada <= 1} style={{ width: '36px', height: '36px', borderRadius: '50%', background: !jornada || jornada <= 1 ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.1)', border: 'none', color: !jornada || jornada <= 1 ? 'rgba(255,255,255,0.2)' : '#fff', cursor: !jornada || jornada <= 1 ? 'default' : 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1rem', color: '#fff', letterSpacing: '-0.3px' }}>
            {jornada ? `Jornada ${jornada}` : '...'}
          </div>
          <div style={{ fontSize: '0.5rem', color: '#7a8aa8', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginTop: '2px' }}>
            {comp?.nombre} · {comp?.temporada}/{String(comp?.temporada + 1).slice(2)}
          </div>
        </div>

        <button onClick={() => jornada < maxJornada && setJornada(jornada + 1)} disabled={!jornada || jornada >= maxJornada} style={{ width: '36px', height: '36px', borderRadius: '50%', background: !jornada || jornada >= maxJornada ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.1)', border: 'none', color: !jornada || jornada >= maxJornada ? 'rgba(255,255,255,0.2)' : '#fff', cursor: !jornada || jornada >= maxJornada ? 'default' : 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>→</button>
      </div>

      {/* Partidos */}
      <div style={{ padding: '0 16px' }}>
        {cargando || cargandoJornadas ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#ffd400', fontFamily: 'Anton, sans-serif', fontSize: '0.9rem', letterSpacing: '1px' }}>CARGANDO...</div>
        ) : !partidos || Object.keys(partidos).length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#7a8aa8', fontFamily: 'Anton, sans-serif', fontSize: '0.8rem', letterSpacing: '1px' }}>SIN PARTIDOS EN ESTA JORNADA</div>
        ) : (
          Object.entries(partidos).map(([fecha, fixtures]) => (
            <div key={fecha} style={{ marginBottom: '20px' }}>
              <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.55rem', color: '#7a8aa8', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px', borderLeft: '3px solid #ffd400', paddingLeft: '8px' }}>
                {fecha}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {fixtures.map((f, i) => {
                  const estado = estadoPartido(f.fixture)
                  const finalizado = estado === 'finalizado'
                  const enJuego = estado === 'en_juego'

                  return (
                    <div key={i} style={{ background: enJuego ? 'rgba(34,197,94,0.08)' : 'rgba(255,255,255,0.03)', borderRadius: '12px', boxShadow: enJuego ? 'inset 0 0 0 1px rgba(34,197,94,0.3)' : 'inset 0 0 0 1px rgba(255,255,255,0.05)', padding: '12px 14px', display: 'grid', gridTemplateColumns: '1fr 80px 1fr', alignItems: 'center', gap: '8px' }}>

                      {/* Local */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' }}>
                        <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.8rem', color: '#fff', textTransform: 'uppercase', textAlign: 'right', letterSpacing: '-0.2px', lineHeight: 1.2 }}>{f.teams.home.name}</div>
                        <div style={{ width: '28px', height: '28px', background: 'rgba(255,255,255,0.95)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <img src={`${API_URL}/img/${f.teams.home.logo.replace('https://media.api-sports.io/', '')}`} alt={f.teams.home.name} style={{ width: '22px', height: '22px', objectFit: 'contain' }} onError={e => { e.target.style.display = 'none' }} />
                        </div>
                      </div>

                      {/* Marcador */}
                      <div style={{ textAlign: 'center' }}>
                        {finalizado || enJuego ? (
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                            <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.4rem', color: finalizado ? '#fff' : '#22c55e', lineHeight: 1 }}>{f.goals.home ?? '-'}</div>
                            <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.8rem', color: '#7a8aa8' }}>-</div>
                            <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.4rem', color: finalizado ? '#fff' : '#22c55e', lineHeight: 1 }}>{f.goals.away ?? '-'}</div>
                          </div>
                        ) : (
                          <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.9rem', color: '#ffd400' }}>{formatearHora(f.fixture.date)}</div>
                        )}
                        <div style={{ fontSize: '0.4rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginTop: '3px', color: enJuego ? '#22c55e' : '#7a8aa8' }}>
                          {enJuego ? `${f.fixture.status?.elapsed}'` : finalizado ? 'FIN' : ''}
                        </div>
                      </div>

                      {/* Visitante */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '28px', height: '28px', background: 'rgba(255,255,255,0.95)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <img src={`${API_URL}/img/${f.teams.away.logo.replace('https://media.api-sports.io/', '')}`} alt={f.teams.away.name} style={{ width: '22px', height: '22px', objectFit: 'contain' }} onError={e => { e.target.style.display = 'none' }} />
                        </div>
                        <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.8rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.2px', lineHeight: 1.2 }}>{f.teams.away.name}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}