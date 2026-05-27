import { useState, useEffect } from 'react'
import domtoimage from 'dom-to-image-more'
import './App.css'
import Picker from './Picker'
import ShareCard from './ShareCard'
import ComparadorCompleto from './ComparadorCompleto'
import FichaEquipo from './FichaEquipo'
import Clasificaciones from './Clasificaciones'

const API_URL = 'https://whoisbetter-api.ponceduranluismiguel.workers.dev'
const SEASON = '2025'
const TODAS_LIGAS = [140, 39, 135, 78, 61, 2, 143, 3, 10]

const posicionES = {
  'Attacker': 'Delantero', 'Midfielder': 'Centrocampista',
  'Defender': 'Defensa', 'Goalkeeper': 'Portero',
  'Winger': 'Delantero', 'Forward': 'Delantero',
}

const posicionManual = {
  183799: 'Delantero', 184698: 'Delantero', 9971: 'Delantero',
  386828: 'Delantero', 278: 'Delantero', 25759: 'Delantero',
  284397: 'Delantero', 243048: 'Delantero', 626: 'Delantero',
  521: 'Delantero', 56: 'Delantero', 47: 'Delantero',
  6009: 'Delantero', 306669: 'Centrocampista', 1254: 'Centrocampista',
  710: 'Centrocampista', 750: 'Centrocampista',
}

const paisES = {
  'France': 'Francia', 'Spain': 'España', 'Brazil': 'Brasil',
  'Argentina': 'Argentina', 'Portugal': 'Portugal', 'Germany': 'Alemania',
  'England': 'Inglaterra', 'Netherlands': 'Países Bajos', 'Belgium': 'Bélgica',
  'Croatia': 'Croacia', 'Poland': 'Polonia', 'Italy': 'Italia',
  'Uruguay': 'Uruguay', 'Colombia': 'Colombia', 'Morocco': 'Marruecos',
  'Senegal': 'Senegal', 'Japan': 'Japón', 'Korea Republic': 'Corea del Sur',
  'Algeria': 'Argelia', 'Nigeria': 'Nigeria', 'Cameroon': 'Camerún',
  'Ivory Coast': 'Costa de Marfil', 'Ghana': 'Ghana', 'Tunisia': 'Túnez',
  'Egypt': 'Egipto', 'Saudi Arabia': 'Arabia Saudí', 'Iran': 'Irán',
  'Australia': 'Australia', 'Mexico': 'México', 'USA': 'Estados Unidos',
  'Canada': 'Canadá', 'Switzerland': 'Suiza', 'Denmark': 'Dinamarca',
  'Sweden': 'Suecia', 'Norway': 'Noruega', 'Austria': 'Austria',
  'Serbia': 'Serbia', 'Turkey': 'Turquía', 'Ukraine': 'Ucrania',
  'Romania': 'Rumanía', 'Hungary': 'Hungría', 'Scotland': 'Escocia',
  'Wales': 'Gales', 'Czech Republic': 'República Checa', 'Slovakia': 'Eslovaquia',
  'Slovenia': 'Eslovenia', 'Greece': 'Grecia', 'Albania': 'Albania',
  'Georgia': 'Georgia', 'Ecuador': 'Ecuador', 'Peru': 'Perú',
  'Chile': 'Chile', 'Paraguay': 'Paraguay', 'Venezuela': 'Venezuela',
  'Bolivia': 'Bolivia', 'Jamaica': 'Jamaica', 'Costa Rica': 'Costa Rica',
  'Panama': 'Panamá', 'Honduras': 'Honduras', 'El Salvador': 'El Salvador',
  'Guinea': 'Guinea', 'Mali': 'Malí', 'Burkina Faso': 'Burkina Faso',
  'World': 'Internacional', 'Congo DR': 'Congo', 'Gabon': 'Gabón',
  'Finland': 'Finlandia', 'Iceland': 'Islandia', 'Israel': 'Israel',
  'North Macedonia': 'Macedonia del Norte', 'Montenegro': 'Montenegro',
  'Kosovo': 'Kosovo', 'Bosnia': 'Bosnia',
}

const trofeoImportante = {
  'UEFA Champions League': 2, 'La Liga': 140, 'Ligue 1': 61,
  'Premier League': 39, 'Serie A': 135, 'Bundesliga': 78,
  'Copa del Rey': 143, 'FIFA World Cup': 1, 'UEFA Europa League': 3,
  'UEFA Conference League': 848, 'UEFA Super Cup': 531,
  'FIFA Intercontinental Cup': 36, 'FIFA Club World Cup': 15,
  'UEFA Nations League': 5, 'UEFA European Championship': 4,
  'Copa America': 9, 'CONMEBOL Libertadores': 13, 'FA Cup': 45,
  'Coupe de France': 66, 'DFB Pokal': 81, 'Coppa Italia': 137,
  'Trophée des Champions': 65, 'Community Shield': 48,
  'Supercoppa Italiana': 136, 'Supercopa de España': 556,
}

const nombresConocidos = {
  278: 'Mbappé', 386828: 'Lamine Yamal', 56: 'Griezmann',
  25759: 'Vinicius Jr.', 1254: 'Bellingham', 243048: 'Rodrygo',
  521: 'Lewandowski', 306669: 'Pedri', 284397: 'Raphinha',
  6009: 'Julián Álvarez', 37145: 'Sørloth', 710: 'Koke',
  183799: 'Nico Williams', 184698: 'Iñaki Williams',
  2295: 'Oyarzabal', 2285: 'Merino', 19229: 'Oblak',
  750: 'De Bruyne', 626: 'Salah', 47: 'Benzema', 9971: 'Antony',
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

const delay = ms => new Promise(r => setTimeout(r, ms))

async function fetchJson(url) {
  try {
    const r = await fetch(url)
    return await r.json()
  } catch { return null }
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
  nameColor: '#fff', numColor: '#ffd400', stroke: 'none'
}

function KitAvatar({ jugador }) {
  const kit = kitStyles[jugador.equipo] || kitDefault
  const fotoUrl = jugador.apiId ? `${API_URL}/img/football/players/${jugador.apiId}.png` : null
  return (
    <div className="slot-kit" style={{ background: kit.background, position: 'relative', overflow: 'visible' }}>
      {fotoUrl ? (
        <img src={fotoUrl} alt={jugador.nombreMostrado || jugador.nombre}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', borderRadius: '50%' }}
          onError={e => { e.target.style.display = 'none' }} />
      ) : (
        <>
          <div className="slot-kit-name" style={{ color: kit.nameColor, WebkitTextStroke: kit.stroke }}>{apellidoParaCamiseta(jugador)}</div>
          <div className="slot-kit-num" style={{ color: kit.numColor, WebkitTextStroke: kit.stroke }}>{jugador.dorsal}</div>
        </>
      )}
      <div style={{
        position: 'absolute', bottom: '-4px', right: '-4px',
        background: '#ffd400', color: '#0a1740', fontFamily: 'Anton, sans-serif',
        fontSize: '0.65rem', width: '20px', height: '20px', borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 6px rgba(0,0,0,0.4)', zIndex: 2,
      }}>{jugador.dorsal}</div>
    </div>
  )
}

function FichaJugador({ jugador, onClose, onVerEquipo }) {
  const [datos, setDatos] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [trofeoTooltip, setTrofeoTooltip] = useState(null)

  const fotoUrl = `${API_URL}/img/football/players/${jugador.apiId}.png`
  const nombre = jugador.nombreMostrado || jugador.nombre

  useEffect(() => {
    if (!jugador.apiId) return
    setCargando(true)
    setDatos(null)

    async function cargar() {
      const id = jugador.apiId

      const perfilRes = await fetchJson(`${API_URL}/players/profiles?player=${id}`)
      await delay(150)
      const trofeosRes = await fetchJson(`${API_URL}/trophies?player=${id}`)
      await delay(150)
      const intlRes = await fetchJson(`${API_URL}/players?id=${id}&season=${SEASON}&league=10`)
      await delay(150)

      const statsResults = []
      for (let i = 0; i < TODAS_LIGAS.length; i += 3) {
        const grupo = TODAS_LIGAS.slice(i, i + 3)
        const res = await Promise.all(grupo.map(lid =>
          fetchJson(`${API_URL}/players?id=${id}&season=${SEASON}&league=${lid}`)
        ))
        statsResults.push(...res)
        if (i + 3 < TODAS_LIGAS.length) await delay(200)
      }

      const trayectoriaRes = await fetchJson(`${API_URL}/trayectoria?player=${id}`)
      const trayectoria = trayectoriaRes?.trayectoria || []

      const p = perfilRes?.response?.[0]?.player
      const perfil = p ? {
        nombreCompleto: `${p.firstname} ${p.lastname}`,
        edad: p.age,
        fechaNacimiento: p.birth?.date,
        lugarNacimiento: p.birth?.place,
        paisNacimiento: paisES[p.birth?.country] || p.birth?.country,
        nacionalidad: paisES[p.nationality] || p.nationality,
        altura: p.height,
        peso: p.weight,
        posicion: posicionManual[id] || posicionES[p.position] || p.position,
        dorsal: p.number,
      } : null

      const primerStat = statsResults.find(r => r?.response?.[0]?.statistics?.[0]?.team)
      const equipoActual = primerStat ? {
        id: primerStat.response[0].statistics[0].team.id,
        nombre: primerStat.response[0].statistics[0].team.name,
        logo: primerStat.response[0].statistics[0].team.logo,
      } : null

      const todasStats = statsResults.flatMap(r => r?.response?.[0]?.statistics || []).filter(Boolean)
      let stats = null
      if (todasStats.length > 0) {
        const ratings = todasStats.filter(st => st.games?.rating).map(st => parseFloat(st.games.rating))
        const avgRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0
        stats = {
          goles: todasStats.reduce((s, st) => s + (st.goals?.total || 0), 0),
          asistencias: todasStats.reduce((s, st) => s + (st.goals?.assists || 0), 0),
          partidos: todasStats.reduce((s, st) => s + (st.games?.appearences || 0), 0),
          minutos: todasStats.reduce((s, st) => s + (st.games?.minutes || 0), 0),
          rating: parseFloat(avgRating.toFixed(2)),
          disparosTotales: todasStats.reduce((s, st) => s + (st.shots?.total || 0), 0),
          pasesClave: todasStats.reduce((s, st) => s + (st.passes?.key || 0), 0),
          regatesOk: todasStats.reduce((s, st) => s + (st.dribbles?.success || 0), 0),
          amarillas: todasStats.reduce((s, st) => s + (st.cards?.yellow || 0), 0),
        }
      }

      const intlSt = intlRes?.response?.[0]?.statistics?.[0]
      const internacionales = intlSt && (intlSt.games?.appearences || 0) > 0 ? {
        partidos: intlSt.games?.appearences || 0,
        goles: intlSt.goals?.total || 0,
      } : null

      const soloGanados = (trofeosRes?.response || []).filter(t => t.place === 'Winner')
      const soloImportantes = soloGanados.filter(t => trofeoImportante[t.league])
      const agrupados = {}
      soloImportantes.forEach(t => {
        if (!agrupados[t.league]) agrupados[t.league] = 0
        agrupados[t.league]++
      })
      const titulosAgrupados = Object.entries(agrupados)
        .map(([liga, veces]) => ({ liga, veces: Math.round(veces / 2), logoId: trofeoImportante[liga] }))
        .filter(t => t.veces > 0)
        .sort((a, b) => b.veces - a.veces)
        .slice(0, 10)

      setDatos({ perfil, equipoActual, stats, internacionales, titulosAgrupados, trayectoria })
      setCargando(false)
    }

    cargar()
  }, [jugador.apiId])

  const stat = (val, label) => (
    <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '10px 8px', textAlign: 'center', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05)' }}>
      <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.4rem', color: '#ffd400', letterSpacing: '-0.5px', lineHeight: 1, marginBottom: '3px' }}>{val}</div>
      <div style={{ fontSize: '0.5rem', fontWeight: 700, color: '#7a8aa8', letterSpacing: '1px', textTransform: 'uppercase' }}>{label}</div>
    </div>
  )

  const seccionTitulo = (texto) => (
    <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.6rem', color: '#0a1740', background: '#ffd400', padding: '4px 10px', borderRadius: '5px', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '10px', display: 'inline-block' }}>{texto}</div>
  )

  const esfera = (contenido, size = '80px') => (
    <div style={{
      width: size, height: size, borderRadius: '50%', overflow: 'hidden',
      background: 'linear-gradient(135deg, #1a2750, #0a1428)', flexShrink: 0,
      boxShadow: '0 8px 24px rgba(0,0,0,0.5)', border: '2px solid rgba(255,212,0,0.3)',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      {contenido}
    </div>
  )

  const { perfil, equipoActual, stats, internacionales, titulosAgrupados, trayectoria } = datos || {}

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      width: '100vw', height: '100vh',
      background: 'rgba(2,8,31,0.97)', zIndex: 9999,
      display: 'flex', alignItems: 'flex-end', overflow: 'hidden'
    }} onClick={() => setTrofeoTooltip(null)}>
      <div style={{
        width: '100%', maxHeight: '95vh',
        background: 'linear-gradient(180deg, #0a1740 0%, #04102e 50%, #02081f 100%)',
        borderTopLeftRadius: '28px', borderTopRightRadius: '28px',
        display: 'flex', flexDirection: 'column',
        position: 'relative', overflowY: 'auto',
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '16px', right: '16px',
          width: '32px', height: '32px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)', border: 'none',
          color: '#fff', cursor: 'pointer', fontSize: '0.9rem', zIndex: 2
        }}>✕</button>

        <div style={{
          padding: '24px 20px 16px',
          background: 'linear-gradient(180deg, rgba(255,212,0,0.08), transparent)',
          borderBottom: '1px solid rgba(255,255,255,0.06)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '14px' }}>
            {esfera(<img src={fotoUrl} alt={nombre}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
              onError={e => { e.target.style.display = 'none' }} />)}

            {equipoActual && (
              <div onClick={() => onVerEquipo && onVerEquipo(equipoActual.id, equipoActual.nombre, equipoActual.logo)}
                style={{ cursor: onVerEquipo ? 'pointer' : 'default' }}>
                {esfera(<img
                  src={`${API_URL}/img/${equipoActual.logo.replace('https://media.api-sports.io/', '')}`}
                  alt={equipoActual.nombre}
                  style={{ width: '65%', height: '65%', objectFit: 'contain' }}
                  onError={e => { e.target.style.display = 'none' }} />)}
              </div>
            )}

            {perfil && esfera(<div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.8rem', color: '#ffd400', letterSpacing: '-2px' }}>
              {perfil.dorsal || jugador.dorsal}
            </div>)}
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.6rem', color: '#fff', letterSpacing: '-0.5px', textTransform: 'uppercase', lineHeight: 1, marginBottom: '4px' }}>{nombre}</div>
            <div onClick={() => equipoActual && onVerEquipo && onVerEquipo(equipoActual.id, equipoActual.nombre, equipoActual.logo)}
              style={{ fontSize: '0.72rem', color: '#a8b4cc', fontWeight: 600, marginBottom: '6px', cursor: onVerEquipo ? 'pointer' : 'default', textDecoration: onVerEquipo ? 'underline' : 'none', textUnderlineOffset: '3px' }}>
              {jugador.equipo}
            </div>
            {perfil && <div style={{ fontSize: '0.6rem', fontWeight: 700, color: '#ffd400', letterSpacing: '1.5px', textTransform: 'uppercase', background: 'rgba(255,212,0,0.1)', padding: '3px 10px', borderRadius: '4px', display: 'inline-block' }}>{perfil.posicion}</div>}
          </div>

          {titulosAgrupados && titulosAgrupados.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginTop: '12px' }}>
              {titulosAgrupados.map((t, i) => (
                <div key={i} style={{ position: 'relative' }}>
                  <div onClick={e => { e.stopPropagation(); setTrofeoTooltip(trofeoTooltip === i ? null : i) }}
                    style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(255,255,255,0.95)', borderRadius: '20px', padding: '5px 10px', cursor: 'pointer' }}>
                    {t.logoId ? (
                      <img src={`${API_URL}/img/football/leagues/${t.logoId}.png`} alt={t.liga}
                        style={{ width: '18px', height: '18px', objectFit: 'contain' }}
                        onError={e => { e.target.style.display = 'none' }} />
                    ) : <span style={{ fontSize: '14px' }}>🏆</span>}
                    <span style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.75rem', color: '#0a1740' }}>×{t.veces}</span>
                  </div>
                  {trofeoTooltip === i && (
                    <div style={{
                      position: 'absolute', bottom: '110%', left: '50%', transform: 'translateX(-50%)',
                      background: '#0a1740', color: '#ffd400', fontFamily: 'Anton, sans-serif',
                      fontSize: '0.65rem', padding: '5px 10px', borderRadius: '6px',
                      whiteSpace: 'nowrap', zIndex: 10, letterSpacing: '0.5px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                    }}>{t.liga}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {cargando ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#ffd400', fontFamily: 'Anton, sans-serif', fontSize: '1rem', letterSpacing: '1px' }}>
            CARGANDO DATOS...
          </div>
        ) : (
          <div style={{ padding: '16px' }}>

            {perfil && (
              <div style={{ marginBottom: '20px' }}>
                {seccionTitulo('Datos personales')}
                <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '12px 14px', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05)' }}>
                  {[
                    { label: 'Nombre completo', val: perfil.nombreCompleto },
                    { label: 'Posición', val: perfil.posicion },
                    { label: 'Edad', val: `${perfil.edad} años` },
                    { label: 'Fecha nacimiento', val: perfil.fechaNacimiento },
                    { label: 'Lugar nacimiento', val: `${perfil.lugarNacimiento}, ${perfil.paisNacimiento}` },
                    { label: 'Nacionalidad', val: perfil.nacionalidad },
                    { label: 'Altura / Peso', val: `${perfil.altura} · ${perfil.peso ? perfil.peso + ' kg' : '—'}` },
                    internacionales ? { label: 'Internacionales', val: `${internacionales.partidos} partidos · ${internacionales.goles} goles` } : null,
                  ].filter(Boolean).map((d, i, arr) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                      <div style={{ fontSize: '0.55rem', fontWeight: 700, color: '#7a8aa8', letterSpacing: '1px', textTransform: 'uppercase' }}>{d.label}</div>
                      <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.85rem', color: '#fff', letterSpacing: '-0.2px', textAlign: 'right', maxWidth: '60%' }}>{d.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {stats && (
              <div style={{ marginBottom: '20px' }}>
                {seccionTitulo('Temporada 25/26 — Todas las competiciones')}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {stat(stats.goles, 'Goles')}
                  {stat(stats.asistencias, 'Asist.')}
                  {stat(stats.partidos, 'Partidos')}
                  {stat(stats.minutos, 'Minutos')}
                  {stat(stats.rating, 'Rating')}
                  {stat(stats.amarillas, 'Amarillas')}
                  {stat(stats.disparosTotales, 'Disparos')}
                  {stat(stats.pasesClave, 'Pases clave')}
                  {stat(stats.regatesOk, 'Regates')}
                </div>
              </div>
            )}

            {trayectoria && trayectoria.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                {seccionTitulo('Trayectoria')}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {trayectoria.map((t, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05)' }}>
                      <div style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.95)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <img src={`${API_URL}/img/${t.logo.replace('https://media.api-sports.io/', '')}`} alt={t.nombre}
                          style={{ width: '28px', height: '28px', objectFit: 'contain' }}
                          onError={e => { e.target.style.display = 'none' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.9rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.2px' }}>{t.nombre}</div>
                        <div style={{ fontSize: '0.5rem', color: '#7a8aa8', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginTop: '2px' }}>{t.temporadas}</div>
                      </div>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.1rem', color: '#ffd400' }}>{t.partidos}</div>
                          <div style={{ fontSize: '0.45rem', color: '#7a8aa8', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>PJ</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.1rem', color: '#ffd400' }}>{t.goles}</div>
                          <div style={{ fontSize: '0.45rem', color: '#7a8aa8', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>G</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.1rem', color: '#ffd400' }}>{t.asistencias}</div>
                          <div style={{ fontSize: '0.45rem', color: '#7a8aa8', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>A</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
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
  const [fichaJugador, setFichaJugador] = useState(null)
  const [vista, setVista] = useState('comparador')
  const [fichaEquipo, setFichaEquipo] = useState(null)
  const [vistaAnterior, setVistaAnterior] = useState('comparador')

  const abrirEquipo = (id, nombre, logo) => {
    setVistaAnterior(vista)
    setFichaEquipo({ id, nombre, logo })
    setVista('equipo')
  }

  const abrirPicker = (indice) => {
    setSlotActivo(indice)
    setPickerOpen(true)
  }

  const seleccionarJugador = (jugador) => {
    const nuevos = [...jugadores]
    nuevos[slotActivo] = { ...jugador, nombreMostrado: formatearNombre(jugador) }
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
      const blob = await domtoimage.toBlob(elemento, { scale: 3, bgcolor: '#04102e' })
      return blob
    } catch(e) { return null }
  }

  const descargar = async () => {
    setCompartiendo(true)
    try {
      const blob = await capturar()
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = 'whoisbetter.png'
      document.body.appendChild(a); a.click()
      document.body.removeChild(a)
      setTimeout(() => URL.revokeObjectURL(url), 1000)
    } catch(e) {}
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
        a.href = url; a.download = 'whoisbetter.png'
        document.body.appendChild(a); a.click()
        document.body.removeChild(a)
        setTimeout(() => URL.revokeObjectURL(url), 1000)
      }
    } catch(e) {}
    setCompartiendo(false)
  }

  const tieneJugadores = jugadores[0] && jugadores[1]

  if (vista === 'clasificaciones') {
    return <Clasificaciones
      onBack={() => setVista('comparador')}
      onEquipo={(id, nombre, logo) => abrirEquipo(id, nombre, logo)}
    />
  }

  if (vista === 'equipo' && fichaEquipo) {
    return <FichaEquipo
      equipoId={fichaEquipo.id}
      equipoNombre={fichaEquipo.nombre}
      equipoLogo={fichaEquipo.logo}
      onBack={() => setVista(vistaAnterior)}
      onJugador={(jugador) => setFichaJugador(jugador)}
    />
  }

  return (
    <div className="app">
      <div className="hero-tag">Comparador</div>
      <h1 className="hero-title">¿Quién es <em>mejor</em>?</h1>
      <p className="hero-sub">Elige hasta 4 jugadores</p>

      <button onClick={() => setVista('clasificaciones')} style={{
        display: 'flex', alignItems: 'center', gap: '8px', margin: '0 auto 16px',
        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '20px', padding: '8px 16px', cursor: 'pointer', color: '#fff',
        fontFamily: 'Anton, sans-serif', fontSize: '0.7rem', letterSpacing: '1.5px', textTransform: 'uppercase',
      }}>
        <span style={{ fontSize: '1rem' }}>🏆</span> Clasificaciones
      </button>

      <button className={`context-chip ${contextOpen ? 'open' : ''}`} onClick={() => setContextOpen(!contextOpen)}>
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
              {['Toda la temporada','LaLiga','Premier League','Serie A','Bundesliga','Ligue 1','Copa del Rey','Champions','Europa','Selección'].map(c => (
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
          <div key={i} className={`slot ${jugador ? 'filled' : 'empty'}`}
            onClick={() => {
              if (jugador) setFichaJugador(jugador)
              else abrirPicker(i)
            }}>
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

      <ShareCard jugadores={jugadores} competicion={competicion} temporada={temporada} />

      {tieneJugadores && (
        <>
          <button className="btn-comparador-completo" onClick={() => setComparadorOpen(true)}>
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
        <ComparadorCompleto jugadores={jugadores} competicion={competicion} temporada={temporada} onClose={() => setComparadorOpen(false)} />
      )}

      {fichaJugador && (
        <FichaJugador
          jugador={fichaJugador}
          competicion={competicion}
          onClose={() => setFichaJugador(null)}
          onVerEquipo={(id, nombre, logo) => {
            setFichaJugador(null)
            abrirEquipo(id, nombre, logo)
          }}
        />
      )}

      {pickerOpen && (
        <Picker onClose={() => setPickerOpen(false)} onSelect={seleccionarJugador} />
      )}
    </div>
  )
}

export default App