import { useState, useEffect } from 'react'
export default function FichaJugador({ jugador, onClose }) { return (<div className='ficha-overlay'><div className='ficha-card'><button onClick={onClose}>X</button><p>{jugador?.nombre}</p></div></div>) }
