import { useState } from 'react'
import domtoimage from 'dom-to-image-more'
import './App.css'
import Picker from './Picker'
import ShareCard from './ShareCard'
import ComparadorCompleto from './ComparadorCompleto'

const nombresConocidos = {
  278: 'Mbappé',
  386828: 'Lamine Yamal',
  56: 'Griezmann',
  25759: 'Vinicius Jr.',
  1254: 'Bellingham',
  243048: 'Rodrygo',
  521: 'Lewandowski',
  306669: 'Pedri',
  284397: 'Raphinha',
  48063: 'Julián Álvarez',
  37145: 'Sørloth',
  710: 'Koke',
  183799: 'Nico Williams',
  184698: 'Iñaki Williams',
  2295: 'Oyarzabal',
  2285: 'Merino',
  19229: 'Oblak',
  750: 'De Bruyne',
  626: 'Salah',
  47: 'Benzema',
}

function formatearNombre(jugador) {
  if (nombresConocidos[jugador.apiId]) return nombresConocidos[jugador.apiId]
  const partes = jugador.nombre.split(' ')
  if (partes.length <= 2) return jugador.nombre
  return `${partes[0]} ${partes[1]}`
}

function apellidoParaCamiseta(jugador) {
  const nombre = formatearNombre(jugador)
  const partes = nombre.split(' ')
  return partes[partes.length - 1]
}

const kitStyles = {
  'Real Madrid': { background: 'linear-gradient(145deg, #fff, #f0f0f0)', nameColor: '#1a1a1a', numColor: '#1a1a1a', stroke: 'none' },
  'FC Barcelona': { background: 'linear-gradient(90deg, #004d98 0%, #004d98 25%, #a50044 25%, #a50044 50%, #004d98 50%, #004d98 75%, #a50044 75%, #a50044 100%)', nameColor: '#ffed02', numColor: '#ffed02', stroke: '1px rgba(0,0,0,0.3)' },
  'Atletico Madrid': { background: 'linear-gradient(90deg, #cb3524 0%, #cb3524 16.66%, #fff 16.66%, #fff 33.33%, #cb3524 33.33%, #cb3524 50%, #fff 50%, #fff 66.66%, #cb3524 66.66%, #cb3524 83.33%, #fff 83.33%, #fff 100%)', nameColor: '#0a1f3d', numColor: '#0a1f3d', stroke: '0.5px #fff' },
  'Athletic Club': { background: 'linear-gradient(90deg, #ee2523 0%, #ee2523 50%, #fff 50%, #fff 100%)', nameColor: '#fff', numColor: '#fff', stroke: 'none' },
  'Real Sociedad': { background: 'linear-gradient(90deg, #fff 0%, #fff 20%, #0057a8 20%, #0057a8 40%, #fff 40%, #fff 60%, #0057a8 60%, #0057a8 80%, #fff 80%, #fff 100%)', nameColor: '#0a1f3d', numColor: '#0a1f3d', stroke: '0.5px #fff' },
  'Manchester City': { background: 'linear-gradient(145deg, #6cabdd, #5a9fd4)', nameColor: '#fff', numColor: '#fff', stroke: 'none' },
  'Arsenal': { background: 'linear-gradient(145deg, #ef0107, #cc0000)', nameColor: '#fff', numColor: '#fff', stroke: 'none' },
  'Liverpool': { background: 'linear-gradient(145deg, #c8102e, #a00020)', nameColor: '#fff', numColor: '#fff', stroke: 'none' },
  'Chelsea': { background: 'linear-gradient(145deg, #034694, #023070)', nameColor: '#fff', numColor: '#fff', stroke: 'none' },
  'Manchester United': { background: 'linear-gradient(145deg, #da291c, #b02015)', nameColor: '#fff', numColor: '#ffe500', stroke: 'none' },
  'Tottenham': { background: 'linear-gradient(145deg, #fff, #f0f0f0)', nameColor: '#132257', numColor: '#132257', stroke: 'none' },
  'Inter': { background: 'linear-gradient(90deg, #003399 0%, #003399 50%, #000 50%, #000 100%)', nameColor: '#fff', numColor: '#fff', stroke: 'none' },
  'AC Milan': { background: 'linear-gradient(90deg, #fb090b 0%, #fb090b 50%, #000 50%, #000 100%)', nameColor: '#fff', numColor: '#fff', stroke: 'none' },
  'Juventus': { background: 'linear-gradient(90deg, #fff 0%, #fff 50%, #000 50%, #000 100%)', nameColor: '#000', numColor: '#000', stroke: '0.5px #fff' },
  'Bayern Munich': { background: 'linear-gradient(90deg, #dc052d 0%, #dc052d 50%, #fff 50%, #fff 100%)', nameColor: '#fff', numColor: '#fff', stroke: 'none' },
  'Borussia Dortmund': { background: 'linear-gradient(145deg, #fde100, #f0d000)', nameColor: '#000', numColor: '#000', stroke: 'none' },
  'PSG': { background: 'linear-gradient(145deg, #003f7f, #002d5a)', nameColor: '#fff', numColor: '#ffd700', stroke: 'none' },
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
    <div className="slot-kit" style={{ background: kit.background, position: 'relative', overflow: 'visible' }}>
      {jugador.foto ? (
        <img
          src={jugador.foto}
          alt={jugador.nombreMostrado || jugador.nombre}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top center',
            borderRadius: '50%',
          }}
          onError={e => { e.target.style.display = 'none' }}
        />
      ) : (
        <>
          <div className="slot-kit-name" style={{ color: kit.nameColor, WebkitTextStroke: kit.stroke }}>
            {apellidoParaCamiseta(jugador)}
          </div>
          <div className="slot-kit-num" style={{ color: kit.numColor, WebkitTextStroke: kit.stroke }}>
            {jugador.dorsal}
          </div>
        </>
      )}
      <div style={{
        position: 'absolute',
        bottom: '-4px',
        right: '-4px',
        background: '#ffd400',
        color: '#0a1740',
        fontFamily: 'Anton, sans-serif',
        fontSize: '0.65rem',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
        zIndex: 2,
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
  const [compartiendo, setCompartiendo] = useState(false)
  const [comparadorOpen, setComparadorOpen] = useState(false)

  const abrirPicker = (indice) => {
    setSlotActivo(indice)
    setPickerOpen(true)
  }

  const seleccionarJugador = (jugador) => {
    const nuevos = [...jugadores]
    nuevos[slotActivo] = {
      ...jugador,
      nombreMostrado: formatearNombre(jugador)
    }
    setJugadores(nuevos)
    setPickerOpen(false)
  }

  const quitarJugador = (indice) => {
    const nuevos = [...jugadores]
    nuevos[indice] = null
    setJugadores(nuevos)
  }

  const capturar = async () => {
    const elemento = document.querySelector('.share-card')
    if (!elemento) return null
    await document.fonts.ready
    try {
      const blob = await domtoimage.toBlob(elemento, {
        scale: 3,
        bgcolor: '#04102e',
      })
      return blob
    } catch(e) {
      console.error('Error en captura:', e)
      return null
    }
  }

  const descargar = async () => {
    setCompartiendo(true)
    try {
      const blob = await capturar()
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'whoisbetter.png'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      setTimeout(() => URL.revokeObjectURL(url), 1000)
    } catch (e) {
      console.error(e)
    }
    setCompartiendo(false)
  }

  const compartir = async () => {
    setCompartiendo(true)
    try {
      const blob = await capturar()
      if (!blob) return
      const file = new File([blob], 'whoisbetter.png', { type: 'image/png' })
      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: 'Whoisbetter?' })
      } else {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'whoisbetter.png'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        setTimeout(() => URL.revokeObjectURL(url), 1000)
      }
    } catch (e) {
      console.error(e)
    }
    setCompartiendo(false)
  }

  const tieneJugadores = jugadores[0] && jugadores[1]

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
                <button key={c} className={`ctx-chip ${competicion === c ? 'active' : ''}`} onClick={() => setCompeticion(c)}>{c}</button>
              ))}
            </div>
          </div>
          <div className="ctx-section">
            <div className="ctx-section-label">Temporada</div>
            <div className="ctx-chips">
              {['25/26','24/25','23/24','22/23','21/22','Carrera'].map(t => (
                <button key={t} className={`ctx-chip ${temporada === t ? 'active' : ''}`} onClick={() => setTemporada(t)}>{t}</button>
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
                <div className="slot-name">{jugador.nombreMostrado || formatearNombre(jugador)}</div>
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

      {tieneJugadores && (
        <>
          <button
            className="btn-comparador-completo"
            onClick={() => setComparadorOpen(true)}
          >
            Comparación completa →
          </button>

          <div className="actions">
            <button className="action-btn action-share" onClick={compartir} disabled={compartiendo}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg>
              {compartiendo ? 'Generando...' : 'Compartir'}
            </button>
            <button className="action-btn action-download" onClick={descargar} disabled={compartiendo}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M5 20H19V18H5M19 9H15V3H9V9H5L12 16L19 9Z"/></svg>
              Descargar
            </button>
          </div>
        </>
      )}

      {comparadorOpen && (
        <ComparadorCompleto
          jugadores={jugadores}
          competicion={competicion}
          onClose={() => setComparadorOpen(false)}
        />
      )}

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