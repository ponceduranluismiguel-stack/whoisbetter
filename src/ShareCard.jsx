const CROWN_SVG = (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{width:'14px',height:'14px'}}>
      <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5M19 19V20C19 20.5 18.5 21 18 21H6C5.45 21 5 20.55 5 20V19H19Z"/>
    </svg>
  )
  
  const kitStyles = {
    'Real Madrid': { background: 'linear-gradient(145deg, #fff, #f0f0f0)', nameColor: '#1a1a1a', numColor: '#1a1a1a' },
    'FC Barcelona': { background: 'linear-gradient(90deg, #004d98 0%, #004d98 25%, #a50044 25%, #a50044 50%, #004d98 50%, #004d98 75%, #a50044 75%, #a50044 100%)', nameColor: '#ffed02', numColor: '#ffed02' },
    'Atlético de Madrid': { background: 'linear-gradient(90deg, #cb3524 0%, #cb3524 16.66%, #fff 16.66%, #fff 33.33%, #cb3524 33.33%, #cb3524 50%, #fff 50%, #fff 66.66%, #cb3524 66.66%, #cb3524 83.33%, #fff 83.33%, #fff 100%)', nameColor: '#0a1f3d', numColor: '#0a1f3d' },
    'Athletic Club': { background: 'linear-gradient(90deg, #ee2523 0%, #ee2523 50%, #fff 50%, #fff 100%)', nameColor: '#fff', numColor: '#fff' },
    'Real Sociedad': { background: 'linear-gradient(90deg, #fff 0%, #fff 20%, #0057a8 20%, #0057a8 40%, #fff 40%, #fff 60%, #0057a8 60%, #0057a8 80%, #fff 80%, #fff 100%)', nameColor: '#0a1f3d', numColor: '#0a1f3d' },
    'Manchester City': { background: 'linear-gradient(145deg, #6cabdd, #5a9fd4)', nameColor: '#fff', numColor: '#fff' },
    'Arsenal': { background: 'linear-gradient(145deg, #ef0107, #cc0000)', nameColor: '#fff', numColor: '#fff' },
    'Liverpool': { background: 'linear-gradient(145deg, #c8102e, #a00020)', nameColor: '#fff', numColor: '#fff' },
    'Chelsea': { background: 'linear-gradient(145deg, #034694, #023070)', nameColor: '#fff', numColor: '#fff' },
    'PSG': { background: 'linear-gradient(145deg, #003f7f, #002d5a)', nameColor: '#fff', numColor: '#ffd700' },
    'Inter': { background: 'linear-gradient(90deg, #003399 0%, #003399 50%, #000 50%, #000 100%)', nameColor: '#fff', numColor: '#fff' },
    'AC Milan': { background: 'linear-gradient(90deg, #fb090b 0%, #fb090b 50%, #000 50%, #000 100%)', nameColor: '#fff', numColor: '#fff' },
    'Juventus': { background: 'linear-gradient(90deg, #fff 0%, #fff 50%, #000 50%, #000 100%)', nameColor: '#000', numColor: '#000' },
    'Bayern Munich': { background: 'linear-gradient(90deg, #dc052d 0%, #dc052d 50%, #fff 50%, #fff 100%)', nameColor: '#fff', numColor: '#fff' },
    'Borussia Dortmund': { background: 'linear-gradient(145deg, #fde100, #f0d000)', nameColor: '#000', numColor: '#000' },
  }
  
  const kitDefault = {
    background: 'linear-gradient(135deg, #1a2750, #0a1428)',
    nameColor: '#fff',
    numColor: '#ffd400'
  }
  
  const datosEjemplo = {
    'Mbappé': { goles: 24, asistencias: 7, partidos: 28, minutos: 2484, rating: 7.91 },
    'Lamine Yamal': { goles: 15, asistencias: 13, partidos: 29, minutos: 2410, rating: 7.84 },
    'Vinicius Jr.': { goles: 18, asistencias: 9, partidos: 27, minutos: 2250, rating: 7.75 },
    'J. Álvarez': { goles: 8, asistencias: 4, partidos: 29, minutos: 1904, rating: 7.11 },
    'Bellingham': { goles: 14, asistencias: 6, partidos: 26, minutos: 2100, rating: 7.55 },
    'Lewandowski': { goles: 20, asistencias: 5, partidos: 28, minutos: 2300, rating: 7.42 },
    'Pedri': { goles: 6, asistencias: 10, partidos: 25, minutos: 1980, rating: 7.38 },
    'Griezmann': { goles: 7, asistencias: 5, partidos: 22, minutos: 1650, rating: 7.05 },
  }
  
  const datosDefault = { goles: 0, asistencias: 0, partidos: 0, minutos: 0, rating: 0 }
  
  function calcularStats(jugador) {
    const d = datosEjemplo[jugador.nombre] || datosDefault
    return {
      ...d,
      gA: d.goles + d.asistencias,
      minGol: d.goles > 0 ? Math.round(d.minutos / d.goles) : 999,
      minAsist: d.asistencias > 0 ? Math.round(d.minutos / d.asistencias) : 999,
    }
  }
  
  function determinarGanador(stats1, stats2) {
    const metricas = ['goles', 'asistencias', 'gA', 'partidos', 'minutos', 'rating']
    const menorEsMejor = ['minGol', 'minAsist']
    let puntos1 = 0
    let puntos2 = 0
    const todas = [...metricas, ...menorEsMejor]
    todas.forEach(m => {
      const esMenor = menorEsMejor.includes(m)
      const v1 = stats1[m]
      const v2 = stats2[m]
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
    if (!jugadores[0] || !jugadores[1]) return null
  
    const j1 = jugadores[0]
    const j2 = jugadores[1]
    const s1 = calcularStats(j1)
    const s2 = calcularStats(j2)
    const { puntos1, puntos2, total } = determinarGanador(s1, s2)
    const ganador = puntos1 >= puntos2 ? j1 : j2
    const puntosGanador = puntos1 >= puntos2 ? puntos1 : puntos2
  
    const kit1 = kitStyles[j1.equipo] || kitDefault
    const kit2 = kitStyles[j2.equipo] || kitDefault
  
    const stats = [
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
          {stats.map((stat, i) => {
            const gana1 = stat.menorEsMejor ? stat.v1 < stat.v2 : stat.v1 > stat.v2
            const gana2 = stat.menorEsMejor ? stat.v2 < stat.v1 : stat.v2 > stat.v1
            return (
              <div key={i} className="sc-stat-row">
                <div className={`sc-stat-val left ${gana1 ? 'win' : ''}`}>{stat.v1}</div>
                <div className="sc-stat-label">
                  {stat.label}
                  {stat.sublabel && <span className="sc-stat-src">{stat.sublabel}</span>}
                </div>
                <div className={`sc-stat-val right ${gana2 ? 'win' : ''}`}>{stat.v2}</div>
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