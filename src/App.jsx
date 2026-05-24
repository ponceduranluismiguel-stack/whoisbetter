import { useState } from 'react'
import './App.css'
import Picker from './Picker'
import ShareCard from './ShareCard'

const kitStyles = {
  'Real Madrid': {
    background: 'linear-gradient(145deg, #fff, #f0f0f0)',
    nameColor: '#1a1a1a',
    numColor: '#1a1a1a',
    stroke: 'none'
  },
  'FC Barcelona': {
    background: 'linear-gradient(90deg, #004d98 0%, #004d98 25%, #a50044 25%, #a50044 50%, #004d98 50%, #004d98 75%, #a50044 75%, #a50044 100%)',
    nameColor: '#ffed02',
    numColor: '#ffed02',
    stroke: '1px rgba(0,0,0,0.3)'
  },
  'Atlético de Madrid': {
    background: 'linear-gradient(90deg, #cb3524 0%, #cb3524 16.66%, #fff 16.66%, #fff 33.33%, #cb3524 33.33%, #cb3524 50%, #fff 50%, #fff 66.66%, #cb3524 66.66%, #cb3524 83.33%, #fff 83.33%, #fff 100%)',
    nameColor: '#0a1f3d',
    numColor: '#0a1f3d',
    stroke: '0.5px #fff'
  },
  'Athletic Club': {
    background: 'linear-gradient(90deg, #ee2523 0%, #ee2523 50%, #fff 50%, #fff 100%)',
    nameColor: '#fff',
    numColor: '#fff',
    stroke: 'none'
  },
  'Real Sociedad': {
    background: 'linear-gradient(90deg, #fff 0%, #fff 20%, #0057a8 20%, #0057a8 40%, #fff 40%, #fff 60%, #0057a8 60%, #0057a8 80%, #fff 80%, #fff 100%)',
    nameColor: '#0a1f3d',
    numColor: '#0a1f3d',
    stroke: '0.5px #fff'
  },
  'Villarreal': {
    background: 'linear-gradient(145deg, #ffcd00, #f0be00)',
    nameColor: '#003366',
    numColor: '#003366',
    stroke: 'none'
  },
  'Real Betis': {
    background: 'linear-gradient(90deg, #00a650 0%, #00a650 50%, #fff 50%, #fff 100%)',
    nameColor: '#00a650',
    numColor: '#00a650',
    stroke: '0.5px #fff'
  },
  'Sevilla': {
    background: 'linear-gradient(145deg, #fff, #f0f0f0)',
    nameColor: '#d91020',
    numColor: '#d91020',
    stroke: 'none'
  },
  'Manchester City': {
    background: 'linear-gradient(145deg, #6cabdd, #5a9fd4)',
    nameColor: '#fff',
    numColor: '#fff',
    stroke: 'none'
  },
  'Arsenal': {
    background: 'linear-gradient(145deg, #ef0107, #cc0000)',
    nameColor: '#fff',
    numColor: '#fff',
    stroke: 'none'
  },
  'Liverpool': {
    background: 'linear-gradient(145deg, #c8102e, #a00020)',
    nameColor: '#fff',
    numColor: '#fff',
    stroke: 'none'
  },
  'Chelsea': {
    background: 'linear-gradient(145deg, #034694, #023070)',
    nameColor: '#fff',
    numColor: '#fff',
    stroke: 'none'
  },
  'Manchester United': {
    background: 'linear-gradient(145deg, #da291c, #b02015)',
    nameColor: '#fff',
    numColor: '#ffe500',
    stroke: 'none'
  },
  'Tottenham': {
    background: 'linear-gradient(145deg, #fff, #f0f0f0)',
    nameColor: '#132257',
    numColor: '#132257',
    stroke: 'none'
  },
  'Inter': {
    background: 'linear-gradient(90deg, #003399 0%, #003399 50%, #000 50%, #000 100%)',
    nameColor: '#fff',
    numColor: '#fff',
    stroke: 'none'
  },
  'AC Milan': {
    background: 'linear-gradient(90deg, #fb090b 0%, #fb090b 50%, #000 50%, #000 100%)',
    nameColor: '#fff',
    numColor: '#fff',
    stroke: 'none'
  },
  'Juventus': {
    background: 'linear-gradient(90deg, #fff 0%, #fff 50%, #000 50%, #000 100%)',
    nameColor: '#000',
    numColor: '#000',
    stroke: '0.5px #fff'
  },
  'Napoli': {
    background: 'linear-gradient(145deg, #12a0d7, #0e8bbf)',
    nameColor: '#fff',
    numColor: '#fff',
    stroke: 'none'
  },
  'Roma': {
    background: 'linear-gradient(145deg, #8b0000, #6b0000)',
    nameColor: '#f5c518',
    numColor: '#f5c518',
    stroke: 'none'
  },
  'Lazio': {
    background: 'linear-gradient(145deg, #87ceeb, #6bb8d8)',
    nameColor: '#fff',
    numColor: '#fff',
    stroke: 'none'
  },
  'Bayern Munich': {
    background: 'linear-gradient(90deg, #dc052d 0%, #dc052d 50%, #fff 50%, #fff 100%)',
    nameColor: '#fff',
    numColor: '#fff',
    stroke: 'none'
  },
  'Borussia Dortmund': {
    background: 'linear-gradient(145deg, #fde100, #f0d000)',
    nameColor: '#000',
    numColor: '#000',
    stroke: 'none'
  },
  'Bayer Leverkusen': {
    background: 'linear-gradient(145deg, #e32221, #c01c1c)',
    nameColor: '#fff',
    numColor: '#000',
    stroke: 'none'
  },
  'RB Leipzig': {
    background: 'linear-gradient(145deg, #fff, #f0f0f0)',
    nameColor: '#cc0000',
    numColor: '#cc0000',
    stroke: 'none'
  },
  'PSG': {
    background: 'linear-gradient(145deg, #003f7f, #002d5a)',
    nameColor: '#fff',
    numColor: '#ffd700',
    stroke: 'none'
  },
  'Marseille': {
    background: 'linear-gradient(145deg, #2faee0, #1a9fd0)',
    nameColor: '#fff',
    numColor: '#fff',
    stroke: 'none'
  },
  'Monaco': {
    background: 'linear-gradient(90deg, #e8001c 0%, #e8001c 50%, #fff 50%, #fff 100%)',
    nameColor: '#e8001c',
    numColor: '#e8001c',
    stroke: '0.5px #fff'
  },
  'Lyon': {
    background: 'linear-gradient(145deg, #fff, #f0f0f0)',
    nameColor: '#1c1c8a',
    numColor: '#1c1c8a',
    stroke: 'none'
  },
}

const kitDefault = {
  background: 'linear-gradient(135deg, #1a2750, #0a1428)',
  nameColor: '#fff',
  numColor: '#ffd400',
  stroke: 'none'
}

function KitAvatar({ jugador }) {
  const kit = kitStyles[jugador.equipo] || kitDefault
  return (
    <div className="slot-kit" style={{ background: kit.background }}>
      <div className="slot-kit-name" style={{
        color: kit.nameColor,
        WebkitTextStroke: kit.stroke
      }}>
        {jugador.nombre.split(' ').pop()}
      </div>
      <div className="slot-kit-num" style={{
        color: kit.numColor,
        WebkitTextStroke: kit.stroke
      }}>
        {jugador.dorsal}
      </div>
    </div>
  )
}

function App() {
  const [contextOpen, setContextOpen] = useState(false)
  const [competicion, setCompeticion] = useState('LaLiga')
  const [temporada, setTemporada] = useState('25/26')
  const [pickerOpen, setPickerOpen] = useState(false)
  const [slotActivo, setSlotActivo] = useState(null)
  const [jugadores, setJugadores] = useState([null, null])

  const abrirPicker = (indice) => {
    setSlotActivo(indice)
    setPickerOpen(true)
  }

  const seleccionarJugador = (jugador) => {
    const nuevos = [...jugadores]
    nuevos[slotActivo] = jugador
    setJugadores(nuevos)
    setPickerOpen(false)
  }

  const quitarJugador = (indice) => {
    const nuevos = [...jugadores]
    nuevos[indice] = null
    setJugadores(nuevos)
  }

  return (
    <div className="app">
      <div className="hero-tag">Comparador</div>
      <h1 className="hero-title">¿Quién es <em>mejor</em>?</h1>
      <p className="hero-sub">Elige hasta 4 jugadores</p>

      <button
        className={`context-chip ${contextOpen ? 'open' : ''}`}
        onClick={() => setContextOpen(!contextOpen)}
      >
        <span className="context-chip-left">
          <span className="context-chip-label">{competicion} · {temporada}</span>
        </span>
        <span className="context-chip-arrow">▼</span>
      </button>

      {contextOpen && (
        <div className="context-panel">
          <div className="ctx-section">
            <div className="ctx-section-label">Competición</div>
            <div className="ctx-chips">
              {['Toda la temporada','LaLiga','Copa del Rey','Champions','Europa','Selección'].map(c => (
                <button
                  key={c}
                  className={`ctx-chip ${competicion === c ? 'active' : ''}`}
                  onClick={() => setCompeticion(c)}
                >{c}</button>
              ))}
            </div>
          </div>
          <div className="ctx-section">
            <div className="ctx-section-label">Temporada</div>
            <div className="ctx-chips">
              {['25/26','24/25','23/24','22/23','21/22','Carrera'].map(t => (
                <button
                  key={t}
                  className={`ctx-chip ${temporada === t ? 'active' : ''}`}
                  onClick={() => setTemporada(t)}
                >{t}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="slots-grid">
        {jugadores.map((jugador, i) => (
          <div
            key={i}
            className={`slot ${jugador ? 'filled' : 'empty'}`}
            onClick={() => !jugador && abrirPicker(i)}
          >
            {jugador ? (
              <>
                <button className="slot-remove" onClick={(e) => { e.stopPropagation(); quitarJugador(i) }}>✕</button>
                <KitAvatar jugador={jugador} />
                <div className="slot-name">{jugador.nombre}</div>
                <div className="slot-club">{jugador.equipo}</div>
              </>
            ) : (
              <>
                <div className="slot-plus">+</div>
                <div className="slot-empty-label">Añadir jugador</div>
              </>
            )}
          </div>
        ))}
      </div>

      <ShareCard
        jugadores={jugadores}
        competicion={competicion}
        temporada={temporada}
      />

      {pickerOpen && (
        <Picker
          onClose={() => setPickerOpen(false)}
          onSelect={seleccionarJugador}
        />
      )}

    </div>
  )
}

export default App