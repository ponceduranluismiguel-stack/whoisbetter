import { useState } from 'react'

const datos = {
  'LaLiga': ['Real Madrid', 'FC Barcelona', 'Atlético de Madrid', 'Athletic Club', 'Real Sociedad', 'Villarreal', 'Real Betis', 'Sevilla'],
  'Premier League': ['Manchester City', 'Arsenal', 'Liverpool', 'Chelsea', 'Manchester United', 'Tottenham'],
  'Serie A': ['Inter', 'AC Milan', 'Juventus', 'Napoli', 'Roma', 'Lazio'],
  'Bundesliga': ['Bayern Munich', 'Borussia Dortmund', 'Bayer Leverkusen', 'RB Leipzig'],
  'Ligue 1': ['PSG', 'Marseille', 'Monaco', 'Lyon'],
}

const jugadoresPorEquipo = {
  'Real Madrid': [
    { nombre: 'Mbappé', dorsal: 10 },
    { nombre: 'Vinicius Jr.', dorsal: 7 },
    { nombre: 'Bellingham', dorsal: 5 },
    { nombre: 'Rodrygo', dorsal: 11 },
  ],
  'FC Barcelona': [
    { nombre: 'Lamine Yamal', dorsal: 10 },
    { nombre: 'Lewandowski', dorsal: 9 },
    { nombre: 'Pedri', dorsal: 8 },
    { nombre: 'Raphinha', dorsal: 11 },
  ],
  'Atlético de Madrid': [
    { nombre: 'J. Álvarez', dorsal: 19 },
    { nombre: 'Griezmann', dorsal: 7 },
    { nombre: 'Sørloth', dorsal: 9 },
    { nombre: 'Koke', dorsal: 6 },
  ],
}

const ligas = [
  { nombre: 'LaLiga', bandera: '🇪🇸' },
  { nombre: 'Premier League', bandera: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { nombre: 'Serie A', bandera: '🇮🇹' },
  { nombre: 'Bundesliga', bandera: '🇩🇪' },
  { nombre: 'Ligue 1', bandera: '🇫🇷' },
]

function Picker({ onSelect, onClose }) {
  const [paso, setPaso] = useState('liga')
  const [ligaSeleccionada, setLigaSeleccionada] = useState(null)
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null)

  const elegirLiga = (liga) => {
    setLigaSeleccionada(liga)
    setPaso('equipo')
  }

  const elegirEquipo = (equipo) => {
    setEquipoSeleccionado(equipo)
    setPaso('jugador')
  }

  const elegirJugador = (jugador) => {
    onSelect({ ...jugador, equipo: equipoSeleccionado, liga: ligaSeleccionada })
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
            {paso === 'equipo' && ligaSeleccionada}
            {paso === 'jugador' && equipoSeleccionado}
          </div>
          <button className="picker-close" onClick={onClose}>✕</button>
        </div>

        <div className="picker-list">

          {paso === 'liga' && ligas.map(liga => (
            <div key={liga.nombre} className="league-item" onClick={() => elegirLiga(liga.nombre)}>
              <span className="league-flag">{liga.bandera}</span>
              <div className="league-info">
                <div className="league-name">{liga.nombre}</div>
                <div className="league-meta">{(datos[liga.nombre] || []).length} equipos</div>
              </div>
              <span className="league-arrow">›</span>
            </div>
          ))}

          {paso === 'equipo' && (datos[ligaSeleccionada] || []).map(equipo => (
            <div key={equipo} className="league-item" onClick={() => elegirEquipo(equipo)}>
              <div className="team-crest">{equipo.slice(0,3).toUpperCase()}</div>
              <div className="league-info">
                <div className="league-name">{equipo}</div>
              </div>
              <span className="league-arrow">›</span>
            </div>
          ))}

          {paso === 'jugador' && (jugadoresPorEquipo[equipoSeleccionado] || []).map(jugador => (
            <div key={jugador.nombre} className="league-item" onClick={() => elegirJugador(jugador)}>
              <div className="player-dorsal">{jugador.dorsal}</div>
              <div className="league-info">
                <div className="league-name">{jugador.nombre}</div>
              </div>
              <span className="league-arrow">›</span>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}

export default Picker