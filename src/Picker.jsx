import { useState } from 'react'

const API_URL = 'https://whoisbetter-api.ponceduranluismiguel.workers.dev'
const SEASON = '2025'

const ligasConfig = [
  { nombre: 'LaLiga', bandera: '🇪🇸', id: 140 },
  { nombre: 'Premier League', bandera: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', id: 39 },
  { nombre: 'Serie A', bandera: '🇮🇹', id: 135 },
  { nombre: 'Bundesliga', bandera: '🇩🇪', id: 78 },
  { nombre: 'Ligue 1', bandera: '🇫🇷', id: 61 },
]

function Picker({ onSelect, onClose }) {
  const [paso, setPaso] = useState('liga')
  const [ligaSeleccionada, setLigaSeleccionada] = useState(null)
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null)
  const [equipos, setEquipos] = useState([])
  const [primerEquipo, setPrimerEquipo] = useState([])
  const [cantera, setCantera] = useState([])
  const [cargando, setCargando] = useState(false)

  const elegirLiga = async (liga) => {
    setLigaSeleccionada(liga)
    setPaso('equipo')
    setCargando(true)
    setEquipos([])
    try {
      const res = await fetch(`${API_URL}/teams?league=${liga.id}&season=${SEASON}`)
      const data = await res.json()
      const lista = (data.response || []).map(t => ({
        id: t.team.id,
        nombre: t.team.name,
        logo: t.team.logo,
        ligaId: liga.id,
      }))
      setEquipos(lista)
    } catch (e) {
      console.error(e)
    }
    setCargando(false)
  }

  const elegirEquipo = async (equipo) => {
    setEquipoSeleccionado(equipo)
    setPaso('jugador')
    setCargando(true)
    setPrimerEquipo([])
    setCantera([])

    try {
      let pagina = 1
      let todos = []
      let seguir = true

      while (seguir) {
        const res = await fetch(`${API_URL}/players?team=${equipo.id}&season=${SEASON}&league=${equipo.ligaId}&page=${pagina}`)
        const data = await res.json()
        todos = [...todos, ...(data.response || [])]
        if (pagina >= (data.paging?.total || 1)) seguir = false
        else pagina++
      }

      const conMinutos = todos
        .filter(j => (j.statistics?.[0]?.games?.minutes || 0) > 0)
        .sort((a, b) => {
          const numA = a.statistics?.[0]?.games?.number || 99
          const numB = b.statistics?.[0]?.games?.number || 99
          return numA - numB
        })
        .map(j => ({
          nombre: j.player.name,
          dorsal: j.statistics?.[0]?.games?.number || '?',
          apiId: j.player.id,
        }))

      const sinMinutos = todos
        .filter(j => (j.statistics?.[0]?.games?.minutes || 0) === 0)
        .sort((a, b) => a.player.name.localeCompare(b.player.name))
        .map(j => ({
          nombre: j.player.name,
          dorsal: j.statistics?.[0]?.games?.number || '?',
          apiId: j.player.id,
        }))

      setPrimerEquipo(conMinutos)
      setCantera(sinMinutos)

    } catch (e) {
      console.error(e)
    }
    setCargando(false)
  }

  const elegirJugador = (jugador) => {
    onSelect({
      ...jugador,
      equipo: equipoSeleccionado.nombre,
      liga: ligaSeleccionada.nombre,
    })
  }

  const volver = () => {
    if (paso === 'jugador') setPaso('equipo')
    else if (paso === 'equipo') setPaso('liga')
    else onClose()
  }

  return (
    <div className="picker-overlay">
      <div className="picker-card">
        <div className="picker-handle"></div>
        <div className="picker-header">
          <button className="picker-back" onClick={volver}>←</button>
          <div className="picker-title">
            {paso === 'liga' && 'Elige una liga'}
            {paso === 'equipo' && ligaSeleccionada?.nombre}
            {paso === 'jugador' && equipoSeleccionado?.nombre}
          </div>
          <button className="picker-close" onClick={onClose}>✕</button>
        </div>

        <div className="picker-list">

          {paso === 'liga' && ligasConfig.map(liga => (
            <div key={liga.id} className="league-item" onClick={() => elegirLiga(liga)}>
              <span className="league-flag">{liga.bandera}</span>
              <div className="league-info">
                <div className="league-name">{liga.nombre}</div>
              </div>
              <span className="league-arrow">›</span>
            </div>
          ))}

          {paso === 'equipo' && cargando && (
            <div className="picker-loading">Cargando equipos...</div>
          )}

          {paso === 'equipo' && !cargando && equipos.map(equipo => (
            <div key={equipo.id} className="league-item" onClick={() => elegirEquipo(equipo)}>
              <img
                src={equipo.logo}
                alt={equipo.nombre}
                style={{width:'32px',height:'32px',objectFit:'contain'}}
                onError={e => e.target.style.display='none'}
              />
              <div className="league-info">
                <div className="league-name">{equipo.nombre}</div>
              </div>
              <span className="league-arrow">›</span>
            </div>
          ))}

          {paso === 'jugador' && cargando && (
            <div className="picker-loading">Cargando jugadores...</div>
          )}

          {paso === 'jugador' && !cargando && (
            <>
              {primerEquipo.map((j, i) => (
                <div key={`p-${j.apiId}-${i}`} className="league-item" onClick={() => elegirJugador(j)}>
                  <div className="player-dorsal">{j.dorsal}</div>
                  <div className="league-info">
                    <div className="league-name">{j.nombre}</div>
                  </div>
                  <span className="league-arrow">›</span>
                </div>
              ))}

              {cantera.length > 0 && (
                <>
                  <div className="cantera-divider">Sin minutos esta temporada</div>
                  {cantera.map((j, i) => (
                    <div key={`c-${j.apiId}-${i}`} className="league-item" onClick={() => elegirJugador(j)}>
                      <div className="player-cantera">—</div>
                      <div className="league-info">
                        <div className="league-name">{j.nombre}</div>
                      </div>
                      <span className="league-arrow">›</span>
                    </div>
                  ))}
                </>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  )
}

export default Picker