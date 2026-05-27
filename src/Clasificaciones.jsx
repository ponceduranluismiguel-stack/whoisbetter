import { useState } from 'react'

const API_URL = 'https://whoisbetter-api.ponceduranluismiguel.workers.dev'

const ligas = [
  { id: 140, nombre: 'LaLiga', logoId: 140 },
  { id: 39, nombre: 'Premier League', logoId: 39 },
  { id: 135, nombre: 'Serie A', logoId: 135 },
  { id: 78, nombre: 'Bundesliga', logoId: 78 },
  { id: 61, nombre: 'Ligue 1', logoId: 61 },
]

export default function Clasificaciones({ onBack, onEquipo }) {
  return (
    <div style={{
      minHeight: '100vh', background: 'linear-gradient(180deg, #0a1740 0%, #02081f 100%)',
      overflowY: 'auto',
    }}>
      <div style={{
        padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px',
        background: 'linear-gradient(180deg, rgba(255,212,0,0.08), transparent)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        position: 'sticky', top: 0, zIndex: 10, backdropFilter: 'blur(10px)',
      }}>
        <button onClick={onBack} style={{
          width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)',
          border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.1rem',
        }}>←</button>
        <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.2rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.3px' }}>Clasificaciones</div>
      </div>

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {ligas.map(liga => (
          <LigaCard key={liga.id} liga={liga} onEquipo={onEquipo} />
        ))}
      </div>
    </div>
  )
}

function LigaCard({ liga, onEquipo }) {
  const [standing, setStanding] = useState(null)
  const [abierta, setAbierta] = useState(false)
  const [cargando, setCargando] = useState(false)

  const abrir = async () => {
    if (abierta) { setAbierta(false); return }
    setAbierta(true)
    if (standing) return
    setCargando(true)
    const res = await fetch(`${API_URL}/standings?league=${liga.id}&season=2025`)
    const data = await res.json()
    setStanding(data?.response?.[0]?.league?.standings?.[0] || [])
    setCargando(false)
  }

  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '14px', overflow: 'hidden', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)' }}>
      <div onClick={abrir} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', cursor: 'pointer' }}>
        <div style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.95)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <img src={`${API_URL}/img/football/leagues/${liga.logoId}.png`} alt={liga.nombre}
            style={{ width: '28px', height: '28px', objectFit: 'contain' }}
            onError={e => { e.target.style.display = 'none' }} />
        </div>
        <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.2px', flex: 1 }}>{liga.nombre}</div>
        <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1rem', color: '#ffd400', transition: 'transform 0.2s', transform: abierta ? 'rotate(180deg)' : 'none' }}>▼</div>
      </div>

      {abierta && (
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {cargando ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#ffd400', fontFamily: 'Anton, sans-serif', fontSize: '0.8rem', letterSpacing: '1px' }}>CARGANDO...</div>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '28px 1fr 28px 28px 28px 28px 40px', gap: '4px', padding: '6px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                {['#', 'Equipo', 'PJ', 'V', 'E', 'D', 'Pts'].map((h, i) => (
                  <div key={i} style={{ fontSize: '0.45rem', fontWeight: 700, color: '#7a8aa8', letterSpacing: '1px', textTransform: 'uppercase', textAlign: i > 1 ? 'center' : 'left' }}>{h}</div>
                ))}
              </div>
              {(standing || []).map((s, i) => (
                <div key={i} onClick={() => onEquipo(s.team.id, s.team.name, s.team.logo)} style={{
                  display: 'grid', gridTemplateColumns: '28px 1fr 28px 28px 28px 28px 40px', gap: '4px',
                  padding: '8px 16px', borderBottom: i < standing.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none',
                  cursor: 'pointer',
                  background: 'transparent',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.8rem', color: '#7a8aa8' }}>{s.rank}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <img src={`${API_URL}/img/${s.team.logo.replace('https://media.api-sports.io/', '')}`} alt={s.team.name}
                      style={{ width: '16px', height: '16px', objectFit: 'contain' }}
                      onError={e => { e.target.style.display = 'none' }} />
                    <div style={{ fontSize: '0.75rem', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.team.name}</div>
                  </div>
                  {[s.all?.played, s.all?.win, s.all?.draw, s.all?.lose, s.points].map((v, j) => (
                    <div key={j} style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.8rem', color: '#a8b4cc', textAlign: 'center' }}>{v}</div>
                  ))}
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  )
}