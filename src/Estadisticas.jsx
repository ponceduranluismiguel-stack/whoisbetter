import { useState, useEffect } from 'react'

const API_URL = 'https://whoisbetter-api.ponceduranluismiguel.workers.dev'

const delay = ms => new Promise(r => setTimeout(r, ms))
async function fetchJson(url) {
  try { const r = await fetch(url); return await r.json() } catch { return null }
}

const ligas = [
  { id: 140, nombre: 'LaLiga', logoId: 140 },
  { id: 39, nombre: 'Premier League', logoId: 39 },
  { id: 135, nombre: 'Serie A', logoId: 135 },
  { id: 78, nombre: 'Bundesliga', logoId: 78 },
  { id: 61, nombre: 'Ligue 1', logoId: 61 },
]

const nombrePichichi = {
  140: 'Pichichi',
  39: 'Máximo Goleador',
  135: 'Máximo Goleador',
  78: 'Máximo Goleador',
  61: 'Máximo Goleador',
}

const pichichisLaLiga = [
  { temp: '2024/25', jugador: 'Robert Lewandowski', equipo: 'Barcelona', goles: 26 },
  { temp: '2023/24', jugador: 'Artem Dovbyk', equipo: 'Girona', goles: 24 },
  { temp: '2022/23', jugador: 'Robert Lewandowski', equipo: 'Barcelona', goles: 23 },
  { temp: '2021/22', jugador: 'Karim Benzema', equipo: 'Real Madrid', goles: 27 },
  { temp: '2020/21', jugador: 'Lionel Messi', equipo: 'Barcelona', goles: 30 },
  { temp: '2019/20', jugador: 'Lionel Messi', equipo: 'Barcelona', goles: 25 },
  { temp: '2018/19', jugador: 'Lionel Messi', equipo: 'Barcelona', goles: 36 },
  { temp: '2017/18', jugador: 'Lionel Messi', equipo: 'Barcelona', goles: 34 },
  { temp: '2016/17', jugador: 'Lionel Messi', equipo: 'Barcelona', goles: 37 },
  { temp: '2015/16', jugador: 'Luis Suárez', equipo: 'Barcelona', goles: 40 },
  { temp: '2014/15', jugador: 'Cristiano Ronaldo', equipo: 'Real Madrid', goles: 48 },
  { temp: '2013/14', jugador: 'Cristiano Ronaldo', equipo: 'Real Madrid', goles: 31 },
  { temp: '2012/13', jugador: 'Lionel Messi', equipo: 'Barcelona', goles: 46 },
  { temp: '2011/12', jugador: 'Lionel Messi', equipo: 'Barcelona', goles: 50 },
  { temp: '2010/11', jugador: 'Cristiano Ronaldo', equipo: 'Real Madrid', goles: 40 },
  { temp: '2009/10', jugador: 'Lionel Messi', equipo: 'Barcelona', goles: 34 },
  { temp: '2008/09', jugador: 'Diego Forlán', equipo: 'Atletico Madrid', goles: 32 },
  { temp: '2007/08', jugador: 'Daniel Güiza', equipo: 'Mallorca', goles: 27 },
  { temp: '2006/07', jugador: 'Ruud van Nistelrooy', equipo: 'Real Madrid', goles: 25 },
  { temp: '2005/06', jugador: "Samuel Eto'o", equipo: 'Barcelona', goles: 26 },
  { temp: '2004/05', jugador: "Forlán / Eto'o", equipo: 'Villarreal / Barcelona', goles: 25 },
  { temp: '2003/04', jugador: 'Ronaldo', equipo: 'Real Madrid', goles: 24 },
  { temp: '2002/03', jugador: 'Roy Makaay', equipo: 'Deportivo', goles: 29 },
  { temp: '2001/02', jugador: 'Diego Tristán', equipo: 'Deportivo', goles: 21 },
  { temp: '2000/01', jugador: 'Raúl', equipo: 'Real Madrid', goles: 24 },
  { temp: '1999/00', jugador: 'Salva Ballesta', equipo: 'Racing Santander', goles: 27 },
  { temp: '1998/99', jugador: 'Raúl', equipo: 'Real Madrid', goles: 25 },
  { temp: '1997/98', jugador: 'Christian Vieri', equipo: 'Atletico Madrid', goles: 24 },
  { temp: '1996/97', jugador: 'Ronaldo', equipo: 'Barcelona', goles: 34 },
  { temp: '1995/96', jugador: 'Juan Antonio Pizzi', equipo: 'Tenerife', goles: 31 },
  { temp: '1994/95', jugador: 'Iván Zamorano', equipo: 'Real Madrid', goles: 28 },
  { temp: '1993/94', jugador: 'Romário', equipo: 'Barcelona', goles: 30 },
  { temp: '1992/93', jugador: 'Bebeto', equipo: 'Deportivo', goles: 29 },
  { temp: '1991/92', jugador: 'Manolo', equipo: 'Atletico Madrid', goles: 27 },
  { temp: '1990/91', jugador: 'Emilio Butragueño', equipo: 'Real Madrid', goles: 19 },
]

const pichichisPremier = [
  { temp: '2024/25', jugador: 'Mohamed Salah', equipo: 'Liverpool', goles: 29 },
  { temp: '2023/24', jugador: 'Erling Haaland', equipo: 'Manchester City', goles: 27 },
  { temp: '2022/23', jugador: 'Erling Haaland', equipo: 'Manchester City', goles: 36 },
  { temp: '2021/22', jugador: 'Mohamed Salah', equipo: 'Liverpool', goles: 23 },
  { temp: '2020/21', jugador: 'Harry Kane', equipo: 'Tottenham', goles: 23 },
  { temp: '2019/20', jugador: 'Jamie Vardy', equipo: 'Leicester City', goles: 23 },
  { temp: '2018/19', jugador: 'Aubameyang / Mané / Salah', equipo: 'Arsenal / Liverpool', goles: 22 },
  { temp: '2017/18', jugador: 'Mohamed Salah', equipo: 'Liverpool', goles: 32 },
  { temp: '2016/17', jugador: 'Harry Kane', equipo: 'Tottenham', goles: 29 },
  { temp: '2015/16', jugador: 'Harry Kane', equipo: 'Tottenham', goles: 25 },
  { temp: '2014/15', jugador: 'Sergio Agüero', equipo: 'Manchester City', goles: 26 },
  { temp: '2013/14', jugador: 'Luis Suárez', equipo: 'Liverpool', goles: 31 },
  { temp: '2012/13', jugador: 'Robin van Persie', equipo: 'Manchester United', goles: 26 },
  { temp: '2011/12', jugador: 'Robin van Persie', equipo: 'Arsenal', goles: 30 },
  { temp: '2010/11', jugador: 'Tévez / Berbatov', equipo: 'Man City / Man Utd', goles: 20 },
  { temp: '2009/10', jugador: 'Didier Drogba', equipo: 'Chelsea', goles: 29 },
  { temp: '2008/09', jugador: 'Nicolas Anelka', equipo: 'Chelsea', goles: 19 },
  { temp: '2007/08', jugador: 'Cristiano Ronaldo', equipo: 'Manchester United', goles: 31 },
  { temp: '2006/07', jugador: 'Didier Drogba', equipo: 'Chelsea', goles: 20 },
  { temp: '2005/06', jugador: 'Thierry Henry', equipo: 'Arsenal', goles: 27 },
  { temp: '2004/05', jugador: 'Thierry Henry', equipo: 'Arsenal', goles: 25 },
  { temp: '2003/04', jugador: 'Thierry Henry', equipo: 'Arsenal', goles: 30 },
  { temp: '2002/03', jugador: 'Ruud van Nistelrooy', equipo: 'Manchester United', goles: 25 },
  { temp: '2001/02', jugador: 'Thierry Henry', equipo: 'Arsenal', goles: 24 },
  { temp: '2000/01', jugador: 'Jimmy Floyd Hasselbaink', equipo: 'Chelsea', goles: 23 },
  { temp: '1999/00', jugador: 'Kevin Phillips', equipo: 'Sunderland', goles: 30 },
  { temp: '1998/99', jugador: 'Hasselbaink / Owen / Yorke', equipo: 'Leeds / Liverpool / Man Utd', goles: 18 },
  { temp: '1997/98', jugador: 'Dublin / Owen / Sutton', equipo: 'Coventry / Liverpool / Blackburn', goles: 18 },
  { temp: '1996/97', jugador: 'Alan Shearer', equipo: 'Newcastle', goles: 25 },
  { temp: '1995/96', jugador: 'Alan Shearer', equipo: 'Blackburn', goles: 31 },
  { temp: '1994/95', jugador: 'Alan Shearer', equipo: 'Blackburn', goles: 34 },
  { temp: '1993/94', jugador: 'Andrew Cole', equipo: 'Newcastle', goles: 34 },
  { temp: '1992/93', jugador: 'Teddy Sheringham', equipo: 'Tottenham', goles: 22 },
]

const pichichisSerieA = [
  { temp: '2024/25', jugador: 'Mateo Retegui', equipo: 'Atalanta', goles: 25 },
  { temp: '2023/24', jugador: 'Lautaro Martínez', equipo: 'Inter', goles: 24 },
  { temp: '2022/23', jugador: 'Victor Osimhen', equipo: 'Napoli', goles: 26 },
  { temp: '2021/22', jugador: 'Ciro Immobile', equipo: 'Lazio', goles: 27 },
  { temp: '2020/21', jugador: 'Cristiano Ronaldo', equipo: 'Juventus', goles: 29 },
  { temp: '2019/20', jugador: 'Ciro Immobile', equipo: 'Lazio', goles: 36 },
  { temp: '2018/19', jugador: 'Fabio Quagliarella', equipo: 'Sampdoria', goles: 26 },
  { temp: '2017/18', jugador: 'Ciro Immobile', equipo: 'Lazio', goles: 29 },
  { temp: '2016/17', jugador: 'Edin Džeko', equipo: 'Roma', goles: 29 },
  { temp: '2015/16', jugador: 'Gonzalo Higuaín', equipo: 'Napoli', goles: 36 },
  { temp: '2014/15', jugador: 'Luca Toni', equipo: 'Verona', goles: 22 },
  { temp: '2013/14', jugador: 'Ciro Immobile', equipo: 'Torino', goles: 22 },
  { temp: '2012/13', jugador: 'Edinson Cavani', equipo: 'Napoli', goles: 29 },
  { temp: '2011/12', jugador: 'Zlatan Ibrahimović', equipo: 'AC Milan', goles: 28 },
  { temp: '2010/11', jugador: 'Antonio Di Natale', equipo: 'Udinese', goles: 28 },
  { temp: '2009/10', jugador: 'Antonio Di Natale', equipo: 'Udinese', goles: 29 },
  { temp: '2008/09', jugador: 'Zlatan Ibrahimović', equipo: 'Inter', goles: 25 },
  { temp: '2007/08', jugador: 'Alessandro Del Piero', equipo: 'Juventus', goles: 21 },
  { temp: '2006/07', jugador: 'Francesco Totti', equipo: 'Roma', goles: 26 },
  { temp: '2005/06', jugador: 'Luca Toni', equipo: 'Fiorentina', goles: 31 },
  { temp: '2004/05', jugador: 'Cristiano Lucarelli', equipo: 'Livorno', goles: 24 },
  { temp: '2003/04', jugador: 'Andriy Shevchenko', equipo: 'AC Milan', goles: 24 },
  { temp: '2002/03', jugador: 'Christian Vieri', equipo: 'Inter', goles: 24 },
  { temp: '2001/02', jugador: 'Trezeguet / Hübner', equipo: 'Juventus / Piacenza', goles: 24 },
  { temp: '2000/01', jugador: 'Hernán Crespo', equipo: 'Lazio', goles: 26 },
  { temp: '1999/00', jugador: 'Andriy Shevchenko', equipo: 'AC Milan', goles: 24 },
  { temp: '1998/99', jugador: 'Marcio Amoroso', equipo: 'Udinese', goles: 22 },
  { temp: '1997/98', jugador: 'Oliver Bierhoff', equipo: 'Udinese', goles: 27 },
  { temp: '1996/97', jugador: 'Filippo Inzaghi', equipo: 'Atalanta', goles: 24 },
  { temp: '1995/96', jugador: 'Igor Protti / G. Signori', equipo: 'Bari / Lazio', goles: 24 },
  { temp: '1994/95', jugador: 'Gabriel Batistuta', equipo: 'Fiorentina', goles: 26 },
  { temp: '1993/94', jugador: 'Giuseppe Signori', equipo: 'Lazio', goles: 23 },
  { temp: '1992/93', jugador: 'Giuseppe Signori', equipo: 'Lazio', goles: 26 },
  { temp: '1991/92', jugador: 'Marco van Basten', equipo: 'AC Milan', goles: 25 },
  { temp: '1990/91', jugador: 'Gianluca Vialli', equipo: 'Sampdoria', goles: 19 },
]

const pichichisBundesliga = [
  { temp: '2024/25', jugador: 'Harry Kane', equipo: 'Bayern Munich', goles: 30 },
  { temp: '2023/24', jugador: 'Harry Kane', equipo: 'Bayern Munich', goles: 36 },
  { temp: '2022/23', jugador: 'Niclas Füllkrug', equipo: 'Werder Bremen', goles: 16 },
  { temp: '2021/22', jugador: 'Robert Lewandowski', equipo: 'Bayern Munich', goles: 35 },
  { temp: '2020/21', jugador: 'Robert Lewandowski', equipo: 'Bayern Munich', goles: 41 },
  { temp: '2019/20', jugador: 'Robert Lewandowski', equipo: 'Bayern Munich', goles: 34 },
  { temp: '2018/19', jugador: 'Robert Lewandowski', equipo: 'Bayern Munich', goles: 22 },
  { temp: '2017/18', jugador: 'Robert Lewandowski', equipo: 'Bayern Munich', goles: 29 },
  { temp: '2016/17', jugador: 'Pierre-Emerick Aubameyang', equipo: 'Borussia Dortmund', goles: 31 },
  { temp: '2015/16', jugador: 'Robert Lewandowski', equipo: 'Bayern Munich', goles: 30 },
  { temp: '2014/15', jugador: 'Alexander Meier', equipo: 'Eintracht Frankfurt', goles: 19 },
  { temp: '2013/14', jugador: 'Robert Lewandowski', equipo: 'Borussia Dortmund', goles: 20 },
  { temp: '2012/13', jugador: 'Stefan Kießling', equipo: 'Bayer Leverkusen', goles: 25 },
  { temp: '2011/12', jugador: 'Mario Gómez', equipo: 'Bayern Munich', goles: 26 },
  { temp: '2010/11', jugador: 'Mario Gómez', equipo: 'Bayern Munich', goles: 28 },
  { temp: '2009/10', jugador: 'Edin Džeko', equipo: 'Wolfsburg', goles: 22 },
  { temp: '2008/09', jugador: 'Grafite', equipo: 'Wolfsburg', goles: 28 },
  { temp: '2007/08', jugador: 'Luca Toni', equipo: 'Bayern Munich', goles: 24 },
  { temp: '2006/07', jugador: 'Theofanis Gekas', equipo: 'Bochum', goles: 20 },
  { temp: '2005/06', jugador: 'Miroslav Klose', equipo: 'Werder Bremen', goles: 25 },
  { temp: '2004/05', jugador: 'Marek Mintál', equipo: 'Nürnberg', goles: 24 },
  { temp: '2003/04', jugador: 'Aílton', equipo: 'Werder Bremen', goles: 28 },
  { temp: '2002/03', jugador: 'Élber / Christiansen', equipo: 'Bayern / Bochum', goles: 21 },
  { temp: '2001/02', jugador: 'Amoroso / Martin Max', equipo: 'Dortmund / 1860', goles: 18 },
  { temp: '2000/01', jugador: 'Barbarez / Ebbe Sand', equipo: 'Hamburg / Schalke', goles: 22 },
  { temp: '1999/00', jugador: 'Martin Max', equipo: '1860 Munich', goles: 19 },
  { temp: '1998/99', jugador: 'Michael Preetz', equipo: 'Hertha BSC', goles: 23 },
  { temp: '1997/98', jugador: 'Ulf Kirsten', equipo: 'Bayer Leverkusen', goles: 22 },
  { temp: '1996/97', jugador: 'Ulf Kirsten', equipo: 'Bayer Leverkusen', goles: 22 },
  { temp: '1995/96', jugador: 'Fredi Bobic', equipo: 'VfB Stuttgart', goles: 17 },
  { temp: '1994/95', jugador: 'Basler / Herrlich', equipo: "Bremen / M'gladbach", goles: 20 },
  { temp: '1993/94', jugador: 'Kuntz / Yeboah', equipo: 'Kaiserslautern / Frankfurt', goles: 18 },
  { temp: '1992/93', jugador: 'Kirsten / Yeboah', equipo: 'Leverkusen / Frankfurt', goles: 20 },
  { temp: '1991/92', jugador: 'Fritz Walter', equipo: 'VfB Stuttgart', goles: 22 },
  { temp: '1990/91', jugador: 'Roland Wohlfarth', equipo: 'Bayern Munich', goles: 21 },
]

const pichichisLigue1 = [
  { temp: '2024/25', jugador: 'Jonathan David', equipo: 'Lille', goles: 26 },
  { temp: '2023/24', jugador: 'Jonathan David', equipo: 'Lille', goles: 19 },
  { temp: '2022/23', jugador: 'Kylian Mbappé', equipo: 'PSG', goles: 29 },
  { temp: '2021/22', jugador: 'Kylian Mbappé', equipo: 'PSG', goles: 28 },
  { temp: '2020/21', jugador: 'Wissam Ben Yedder', equipo: 'Monaco', goles: 20 },
  { temp: '2019/20', jugador: 'Wissam Ben Yedder', equipo: 'Monaco', goles: 18 },
  { temp: '2018/19', jugador: 'Kylian Mbappé', equipo: 'PSG', goles: 33 },
  { temp: '2017/18', jugador: 'Edinson Cavani', equipo: 'PSG', goles: 28 },
  { temp: '2016/17', jugador: 'Edinson Cavani', equipo: 'PSG', goles: 35 },
  { temp: '2015/16', jugador: 'Zlatan Ibrahimović', equipo: 'PSG', goles: 38 },
  { temp: '2014/15', jugador: 'Alexandre Lacazette', equipo: 'Lyon', goles: 27 },
  { temp: '2013/14', jugador: 'Zlatan Ibrahimović', equipo: 'PSG', goles: 26 },
  { temp: '2012/13', jugador: 'Zlatan Ibrahimović', equipo: 'PSG', goles: 30 },
  { temp: '2011/12', jugador: 'Zlatan Ibrahimović', equipo: 'PSG', goles: 21 },
  { temp: '2010/11', jugador: 'Kevin Gameiro', equipo: 'Lorient', goles: 18 },
  { temp: '2009/10', jugador: 'Mamadou Niang', equipo: 'Toulouse', goles: 18 },
  { temp: '2008/09', jugador: 'André-Pierre Gignac', equipo: 'Toulouse', goles: 24 },
  { temp: '2007/08', jugador: 'Guillaume Hoarau', equipo: 'PSG', goles: 18 },
  { temp: '2006/07', jugador: 'Pauleta', equipo: 'PSG', goles: 15 },
  { temp: '2005/06', jugador: 'Djibril Cissé', equipo: 'Marseille', goles: 20 },
  { temp: '2004/05', jugador: 'Alexander Frei', equipo: 'Rennes', goles: 20 },
  { temp: '2003/04', jugador: 'Djibril Cissé', equipo: 'Auxerre', goles: 26 },
  { temp: '2002/03', jugador: 'Shabani Nonda', equipo: 'Monaco', goles: 26 },
  { temp: '2001/02', jugador: 'Djibril Cissé', equipo: 'Auxerre', goles: 22 },
  { temp: '2000/01', jugador: 'Sonny Anderson', equipo: 'Lyon', goles: 22 },
  { temp: '1999/00', jugador: 'Sonny Anderson', equipo: 'Monaco', goles: 23 },
  { temp: '1998/99', jugador: 'Sylvain Wiltord', equipo: 'Bordeaux', goles: 22 },
  { temp: '1997/98', jugador: "Stéphane Guivarc'h", equipo: 'Auxerre', goles: 21 },
  { temp: '1996/97', jugador: "Stéphane Guivarc'h", equipo: 'Auxerre', goles: 22 },
  { temp: '1995/96', jugador: 'Sonny Anderson', equipo: 'Monaco', goles: 21 },
  { temp: '1994/95', jugador: 'Patrice Loko', equipo: 'Nantes', goles: 22 },
  { temp: '1993/94', jugador: 'Djorkaeff / Boli / Ouédec', equipo: 'PSG / Marseille / Nantes', goles: 20 },
  { temp: '1992/93', jugador: 'Alen Bokšić', equipo: 'Marseille', goles: 23 },
  { temp: '1991/92', jugador: 'Jean-Pierre Papin', equipo: 'Marseille', goles: 27 },
  { temp: '1990/91', jugador: 'Jean-Pierre Papin', equipo: 'Marseille', goles: 23 },
]

const pichichisPorLiga = {
  140: pichichisLaLiga,
  39: pichichisPremier,
  135: pichichisSerieA,
  78: pichichisBundesliga,
  61: pichichisLigue1,
}

const botaDeOroHistorico = [
  { temp: '2024/25', jugador: 'Robert Lewandowski', equipo: 'Barcelona', liga: 'LaLiga', goles: 26 },
  { temp: '2023/24', jugador: 'Kylian Mbappé', equipo: 'Real Madrid', liga: 'LaLiga', goles: 27 },
  { temp: '2022/23', jugador: 'Erling Haaland', equipo: 'Manchester City', liga: 'Premier League', goles: 36 },
  { temp: '2021/22', jugador: 'Ciro Immobile', equipo: 'Lazio', liga: 'Serie A', goles: 27 },
  { temp: '2020/21', jugador: 'Lionel Messi', equipo: 'Barcelona', liga: 'LaLiga', goles: 30 },
  { temp: '2019/20', jugador: 'Ciro Immobile', equipo: 'Lazio', liga: 'Serie A', goles: 36 },
  { temp: '2018/19', jugador: 'Lionel Messi', equipo: 'Barcelona', liga: 'LaLiga', goles: 36 },
  { temp: '2017/18', jugador: 'Mohamed Salah', equipo: 'Liverpool', liga: 'Premier League', goles: 32 },
  { temp: '2016/17', jugador: 'Lionel Messi', equipo: 'Barcelona', liga: 'LaLiga', goles: 37 },
  { temp: '2015/16', jugador: 'Luis Suárez', equipo: 'Barcelona', liga: 'LaLiga', goles: 40 },
  { temp: '2014/15', jugador: 'Cristiano Ronaldo', equipo: 'Real Madrid', liga: 'LaLiga', goles: 48 },
  { temp: '2013/14', jugador: 'Cristiano Ronaldo', equipo: 'Real Madrid', liga: 'LaLiga', goles: 31 },
  { temp: '2012/13', jugador: 'Lionel Messi', equipo: 'Barcelona', liga: 'LaLiga', goles: 46 },
  { temp: '2011/12', jugador: 'Lionel Messi', equipo: 'Barcelona', liga: 'LaLiga', goles: 50 },
  { temp: '2010/11', jugador: 'Cristiano Ronaldo', equipo: 'Real Madrid', liga: 'LaLiga', goles: 40 },
  { temp: '2009/10', jugador: 'Lionel Messi', equipo: 'Barcelona', liga: 'LaLiga', goles: 34 },
  { temp: '2008/09', jugador: 'Diego Forlán', equipo: 'Atletico Madrid', liga: 'LaLiga', goles: 32 },
  { temp: '2007/08', jugador: 'Cristiano Ronaldo', equipo: 'Manchester United', liga: 'Premier League', goles: 31 },
  { temp: '2006/07', jugador: 'Francesco Totti', equipo: 'Roma', liga: 'Serie A', goles: 26 },
  { temp: '2005/06', jugador: 'Luca Toni', equipo: 'Fiorentina', liga: 'Serie A', goles: 31 },
  { temp: '2004/05', jugador: 'Thierry Henry', equipo: 'Arsenal', liga: 'Premier League', goles: 25 },
  { temp: '2003/04', jugador: 'Thierry Henry', equipo: 'Arsenal', liga: 'Premier League', goles: 30 },
  { temp: '2002/03', jugador: 'Roy Makaay', equipo: 'Deportivo', liga: 'LaLiga', goles: 29 },
  { temp: '2001/02', jugador: 'Thierry Henry', equipo: 'Arsenal', liga: 'Premier League', goles: 24 },
  { temp: '2000/01', jugador: 'Hernán Crespo', equipo: 'Lazio', liga: 'Serie A', goles: 26 },
  { temp: '1999/00', jugador: 'Kevin Phillips', equipo: 'Sunderland', liga: 'Premier League', goles: 30 },
  { temp: '1998/99', jugador: 'Marcio Amoroso', equipo: 'Udinese', liga: 'Serie A', goles: 22 },
  { temp: '1997/98', jugador: 'Ronaldo', equipo: 'Barcelona', liga: 'LaLiga', goles: 34 },
  { temp: '1996/97', jugador: 'Ronaldo', equipo: 'Barcelona', liga: 'LaLiga', goles: 34 },
  { temp: '1995/96', jugador: 'Alan Shearer', equipo: 'Blackburn', liga: 'Premier League', goles: 31 },
  { temp: '1994/95', jugador: 'Alan Shearer', equipo: 'Blackburn', liga: 'Premier League', goles: 34 },
  { temp: '1993/94', jugador: 'Andrew Cole', equipo: 'Newcastle', liga: 'Premier League', goles: 34 },
  { temp: '1992/93', jugador: 'Romário', equipo: 'Barcelona', liga: 'LaLiga', goles: 30 },
  { temp: '1991/92', jugador: 'Marco van Basten', equipo: 'AC Milan', liga: 'Serie A', goles: 25 },
  { temp: '1990/91', jugador: 'Jean-Pierre Papin', equipo: 'Marseille', liga: 'Ligue 1', goles: 23 },
]

export default function Estadisticas({ onBack, onJugador }) {
  const [seccion, setSeccion] = useState('bota')
  const [ligaActiva, setLigaActiva] = useState(140)
  const [tabLiga, setTabLiga] = useState('temporada')
  const [topGoleadores, setTopGoleadores] = useState(null)
  const [topAsistentes, setTopAsistentes] = useState(null)
  const [topAmarillas, setTopAmarillas] = useState(null)
  const [topRojas, setTopRojas] = useState(null)
  const [tabTemporada, setTabTemporada] = useState('goles')
  const [cargando, setCargando] = useState(false)
  const [botaActual, setBotaActual] = useState(null)
  const [cargandoBota, setCargandoBota] = useState(false)
  const [statsEquipos, setStatsEquipos] = useState(null)
  const [cargandoEquipos, setCargandoEquipos] = useState(false)
  const [ordenEquipos, setOrdenEquipos] = useState({ col: 'golesFavor', dir: 'desc' })

  useEffect(() => {
    if (seccion !== 'bota') return
    if (botaActual) return
    setCargandoBota(true)
    async function cargar() {
      const ligaIds = [140, 39, 135, 78, 61]
      let todos = []
      for (const lid of ligaIds) {
        const res = await fetchJson(`${API_URL}/players/topscorers?league=${lid}&season=2025`)
        const jugadores = res?.response || []
        for (const j of jugadores.slice(0, 10)) {
          const goles = j.statistics?.[0]?.goals?.total || 0
          todos.push({ id: j.player.id, nombre: j.player.name, foto: j.player.photo, equipo: j.statistics?.[0]?.team?.name || '', liga: lid, goles })
        }
        await delay(150)
      }
      todos.sort((a, b) => b.goles - a.goles)
      setBotaActual(todos.slice(0, 25))
      setCargandoBota(false)
    }
    cargar()
  }, [seccion])

  useEffect(() => {
    if (seccion !== 'liga') return
    if (tabLiga !== 'temporada') return
    setCargando(true)
    setTopGoleadores(null)
    setTopAsistentes(null)
    setTopAmarillas(null)
    setTopRojas(null)
    setStatsEquipos(null)
    async function cargar() {
      const [golesRes, asistRes, amarillasRes, rojasRes] = await Promise.all([
        fetchJson(`${API_URL}/players/topscorers?league=${ligaActiva}&season=2025`),
        fetchJson(`${API_URL}/players/topassists?league=${ligaActiva}&season=2025`),
        fetchJson(`${API_URL}/players/topyellowcards?league=${ligaActiva}&season=2025`),
        fetchJson(`${API_URL}/players/topredcards?league=${ligaActiva}&season=2025`),
      ])
      setTopGoleadores(golesRes?.response || [])
      setTopAsistentes(asistRes?.response || [])
      setTopAmarillas(amarillasRes?.response || [])
      setTopRojas(rojasRes?.response || [])
      setCargando(false)
    }
    cargar()
  }, [seccion, ligaActiva, tabLiga])

  useEffect(() => {
    if (seccion !== 'liga' || tabLiga !== 'temporada' || tabTemporada !== 'equipos') return
    if (statsEquipos) return
    setCargandoEquipos(true)
    async function cargar() {
      const res = await fetchJson(`${API_URL}/standings?league=${ligaActiva}&season=2025`)
      const standing = res?.response?.[0]?.league?.standings?.[0] || []
      setStatsEquipos(standing.map(s => ({
        id: s.team.id, nombre: s.team.name, logo: s.team.logo,
        golesFavor: s.all?.goals?.for || 0,
        golesContra: s.all?.goals?.against || 0,
        partidos: s.all?.played || 0,
        puntos: s.points || 0,
        rank: s.rank,
      })))
      setCargandoEquipos(false)
    }
    cargar()
  }, [seccion, ligaActiva, tabLiga, tabTemporada, statsEquipos])

  const ligaIdANombre = { 140: 'LaLiga', 39: 'Premier League', 135: 'Serie A', 78: 'Bundesliga', 61: 'Ligue 1' }

  const seccionTitulo = (texto) => (
    <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.6rem', color: '#0a1740', background: '#ffd400', padding: '4px 10px', borderRadius: '5px', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '10px', display: 'inline-block' }}>{texto}</div>
  )

  const filaJugador = (j, i, stat, sufijo = '') => (
    <div key={i}
      onClick={() => onJugador && onJugador({ apiId: j.player?.id || j.id, nombre: j.player?.name || j.nombre, nombreMostrado: j.player?.name || j.nombre, equipo: j.statistics?.[0]?.team?.name || j.equipo || '', dorsal: '?' })}
      style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05)', cursor: 'pointer', marginBottom: '6px' }}>
      <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.8rem', color: i < 3 ? '#ffd400' : '#7a8aa8', width: '20px', textAlign: 'center', flexShrink: 0 }}>{i + 1}</div>
      <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', background: 'linear-gradient(135deg, #1a2750, #0a1428)', flexShrink: 0 }}>
        <img src={`${API_URL}/img/${(j.player?.photo || j.foto)?.replace('https://media.api-sports.io/', '')}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
          onError={e => { e.target.style.display = 'none' }} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.85rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.2px' }}>{j.player?.name || j.nombre}</div>
        <div style={{ fontSize: '0.5rem', color: '#7a8aa8', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginTop: '1px' }}>{j.statistics?.[0]?.team?.name || j.equipo}</div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.2rem', color: '#ffd400' }}>{stat}</div>
        {sufijo && <div style={{ fontSize: '0.45rem', color: '#7a8aa8', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>{sufijo}</div>}
      </div>
    </div>
  )

  const equiposOrdenados = () => {
    if (!statsEquipos) return []
    return [...statsEquipos].sort((a, b) => {
      const v = ordenEquipos.dir === 'desc' ? b[ordenEquipos.col] - a[ordenEquipos.col] : a[ordenEquipos.col] - b[ordenEquipos.col]
      return v
    })
  }

  const toggleOrden = (col) => {
    setOrdenEquipos(prev => ({
      col,
      dir: prev.col === col && prev.dir === 'desc' ? 'asc' : 'desc'
    }))
  }

  const flechita = (col) => {
    if (ordenEquipos.col !== col) return <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.5rem' }}>⇅</span>
    return <span style={{ color: '#ffd400', fontSize: '0.5rem' }}>{ordenEquipos.dir === 'desc' ? '▼' : '▲'}</span>
  }

  const tabsTemporada = [
    { key: 'goles', label: '⚽ Goles' },
    { key: 'asistencias', label: '🎯 Asist.' },
    { key: 'golesMinuto', label: '⏱ G/Min' },
    { key: 'amarillas', label: '🟨 Amarillas' },
    { key: 'rojas', label: '🟥 Rojas' },
    { key: 'equipos', label: '🏟 Equipos' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0a1740 0%, #02081f 100%)', paddingBottom: '80px' }}>
      <div style={{
        padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px',
        background: 'linear-gradient(180deg, rgba(255,212,0,0.08), transparent)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        position: 'sticky', top: 0, zIndex: 10, backdropFilter: 'blur(10px)',
      }}>
        <button onClick={onBack} style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.1rem', flexShrink: 0 }}>←</button>
        <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.2rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.3px' }}>Estadísticas</div>
      </div>

      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          {[
            { key: 'bota', label: '🥾 Bota de Oro' },
            { key: 'liga', label: '🏆 Por Liga' },
          ].map(tab => (
            <button key={tab.key} onClick={() => setSeccion(tab.key)} style={{
              fontFamily: 'Anton, sans-serif', fontSize: '0.65rem', letterSpacing: '1px',
              padding: '8px 14px', borderRadius: '20px', border: 'none', cursor: 'pointer',
              background: seccion === tab.key ? '#ffd400' : 'rgba(255,255,255,0.08)',
              color: seccion === tab.key ? '#0a1740' : '#fff',
              textTransform: 'uppercase', flex: 1,
            }}>{tab.label}</button>
          ))}
        </div>

        {seccion === 'bota' && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              {seccionTitulo('Bota de Oro 25/26')}
              {cargandoBota ? (
                <div style={{ padding: '20px', textAlign: 'center', color: '#ffd400', fontFamily: 'Anton, sans-serif', fontSize: '0.8rem' }}>CARGANDO...</div>
              ) : (
                (botaActual || []).map((j, i) => filaJugador(j, i, j.goles, 'GOL'))
              )}
            </div>
            <div>
              {seccionTitulo('Histórico Bota de Oro')}
              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 80px 40px', gap: '4px', padding: '6px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  {['Temp.', 'Jugador', 'Liga', 'G'].map((h, i) => (
                    <div key={i} style={{ fontSize: '0.45rem', fontWeight: 700, color: '#7a8aa8', letterSpacing: '1px', textTransform: 'uppercase', textAlign: i === 3 ? 'center' : 'left' }}>{h}</div>
                  ))}
                </div>
                {botaDeOroHistorico.map((b, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 80px 40px', gap: '4px', padding: '8px 12px', borderBottom: i < botaDeOroHistorico.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none', alignItems: 'center' }}>
                    <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.7rem', color: '#7a8aa8' }}>{b.temp}</div>
                    <div>
                      <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.8rem', color: '#fff', textTransform: 'uppercase' }}>{b.jugador}</div>
                      <div style={{ fontSize: '0.5rem', color: '#7a8aa8', fontWeight: 600 }}>{b.equipo}</div>
                    </div>
                    <div style={{ fontSize: '0.6rem', color: '#a8b4cc', fontWeight: 600 }}>{b.liga}</div>
                    <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1rem', color: '#ffd400', textAlign: 'center' }}>{b.goles}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {seccion === 'liga' && (
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
              {ligas.map(liga => (
                <button key={liga.id} onClick={() => { setLigaActiva(liga.id); setStatsEquipos(null) }} style={{
                  display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0,
                  padding: '6px 12px', borderRadius: '20px', border: 'none', cursor: 'pointer',
                  background: ligaActiva === liga.id ? '#ffd400' : 'rgba(255,255,255,0.08)',
                  color: ligaActiva === liga.id ? '#0a1740' : '#fff',
                }}>
                  <div style={{ width: '18px', height: '18px', background: ligaActiva === liga.id ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.9)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <img src={`${API_URL}/img/football/leagues/${liga.logoId}.png`} alt={liga.nombre}
                      style={{ width: '14px', height: '14px', objectFit: 'contain' }}
                      onError={e => { e.target.style.display = 'none' }} />
                  </div>
                  <span style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.6rem', letterSpacing: '0.5px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{liga.nombre}</span>
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              {[
                { key: 'temporada', label: 'Temporada 25/26' },
                { key: 'historico', label: `Histórico ${nombrePichichi[ligaActiva]}` },
              ].map(tab => (
                <button key={tab.key} onClick={() => setTabLiga(tab.key)} style={{
                  fontFamily: 'Anton, sans-serif', fontSize: '0.6rem', letterSpacing: '1px',
                  padding: '6px 12px', borderRadius: '20px', border: 'none', cursor: 'pointer',
                  background: tabLiga === tab.key ? '#ffd400' : 'rgba(255,255,255,0.08)',
                  color: tabLiga === tab.key ? '#0a1740' : '#fff',
                  textTransform: 'uppercase', flex: 1,
                }}>{tab.label}</button>
              ))}
            </div>

            {tabLiga === 'temporada' && (
              <div>
                <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', overflowX: 'auto', paddingBottom: '4px' }}>
                  {tabsTemporada.map(tab => (
                    <button key={tab.key} onClick={() => setTabTemporada(tab.key)} style={{
                      fontFamily: 'Anton, sans-serif', fontSize: '0.55rem', letterSpacing: '0.8px',
                      padding: '6px 10px', borderRadius: '20px', border: 'none', cursor: 'pointer', flexShrink: 0,
                      background: tabTemporada === tab.key ? '#ffd400' : 'rgba(255,255,255,0.08)',
                      color: tabTemporada === tab.key ? '#0a1740' : '#fff',
                      textTransform: 'uppercase',
                    }}>{tab.label}</button>
                  ))}
                </div>

                {cargando ? (
                  <div style={{ padding: '20px', textAlign: 'center', color: '#ffd400', fontFamily: 'Anton, sans-serif', fontSize: '0.8rem' }}>CARGANDO...</div>
                ) : tabTemporada === 'goles' ? (
                  (topGoleadores || []).map((j, i) => filaJugador(j, i, j.statistics?.[0]?.goals?.total || 0, 'GOL'))
                ) : tabTemporada === 'asistencias' ? (
                  (topAsistentes || []).map((j, i) => filaJugador(j, i, j.statistics?.[0]?.goals?.assists || 0, 'AST'))
                ) : tabTemporada === 'golesMinuto' ? (
                  [...(topGoleadores || [])]
                    .filter(j => (j.statistics?.[0]?.games?.minutes || 0) > 0 && (j.statistics?.[0]?.goals?.total || 0) > 0)
                    .map(j => ({ ...j, minPorGol: Math.round((j.statistics?.[0]?.games?.minutes || 0) / (j.statistics?.[0]?.goals?.total || 1)) }))
                    .sort((a, b) => a.minPorGol - b.minPorGol)
                    .map((j, i) => filaJugador(j, i, `${j.minPorGol}'`, 'MIN/GOL'))
                ) : tabTemporada === 'amarillas' ? (
                  (topAmarillas || []).map((j, i) => filaJugador(j, i, j.statistics?.[0]?.cards?.yellow || 0, '🟨'))
                ) : tabTemporada === 'rojas' ? (
                  (topRojas || []).length === 0 ? (
                    <div style={{ padding: '20px', textAlign: 'center', color: '#7a8aa8', fontFamily: 'Anton, sans-serif', fontSize: '0.8rem', letterSpacing: '1px' }}>
                      SIN DATOS DE ROJAS
                    </div>
                  ) : (
                    (topRojas || []).map((j, i) => filaJugador(j, i, j.statistics?.[0]?.cards?.red || 0, '🟥'))
                  )
                ) : tabTemporada === 'equipos' ? (
                  cargandoEquipos ? (
                    <div style={{ padding: '20px', textAlign: 'center', color: '#ffd400', fontFamily: 'Anton, sans-serif', fontSize: '0.8rem' }}>CARGANDO...</div>
                  ) : (
                    <div>
                      {seccionTitulo('Goles por equipo — 25/26')}
                      <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '28px 1fr 52px 52px 52px', gap: '4px', padding: '6px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)', alignItems: 'center' }}>
                          <div style={{ fontSize: '0.45rem', fontWeight: 700, color: '#7a8aa8', letterSpacing: '1px', textTransform: 'uppercase' }}>#</div>
                          <div style={{ fontSize: '0.45rem', fontWeight: 700, color: '#7a8aa8', letterSpacing: '1px', textTransform: 'uppercase' }}>Equipo</div>
                          {[
                            { col: 'golesFavor', label: 'GF' },
                            { col: 'golesContra', label: 'GC' },
                            { col: 'puntos', label: 'Pts' },
                          ].map(h => (
                            <button key={h.col} onClick={() => toggleOrden(h.col)} style={{
                              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px',
                              background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0',
                            }}>
                              <span style={{ fontSize: '0.45rem', fontWeight: 700, color: ordenEquipos.col === h.col ? '#ffd400' : '#7a8aa8', letterSpacing: '1px', textTransform: 'uppercase' }}>{h.label}</span>
                              {flechita(h.col)}
                            </button>
                          ))}
                        </div>
                        {equiposOrdenados().map((e, i) => (
                          <div key={i} style={{ display: 'grid', gridTemplateColumns: '28px 1fr 52px 52px 52px', gap: '4px', padding: '8px 12px', borderBottom: i < (statsEquipos.length - 1) ? '1px solid rgba(255,255,255,0.03)' : 'none', alignItems: 'center' }}>
                            <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.75rem', color: '#7a8aa8', textAlign: 'center' }}>{e.rank}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <img src={`${API_URL}/img/${e.logo.replace('https://media.api-sports.io/', '')}`} alt={e.nombre}
                                style={{ width: '16px', height: '16px', objectFit: 'contain', flexShrink: 0 }}
                                onError={e2 => { e2.target.style.display = 'none' }} />
                              <div style={{ fontSize: '0.75rem', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.nombre}</div>
                            </div>
                            <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.9rem', color: ordenEquipos.col === 'golesFavor' ? '#ffd400' : '#a8b4cc', textAlign: 'center' }}>{e.golesFavor}</div>
                            <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.9rem', color: ordenEquipos.col === 'golesContra' ? '#ffd400' : '#ef4444', textAlign: 'center' }}>{e.golesContra}</div>
                            <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.9rem', color: ordenEquipos.col === 'puntos' ? '#ffd400' : '#a8b4cc', textAlign: 'center' }}>{e.puntos}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                ) : null}
              </div>
            )}

            {tabLiga === 'historico' && (
              <div>
                {seccionTitulo(`${nombrePichichi[ligaActiva]} — ${ligaIdANombre[ligaActiva]}`)}
                <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 40px', gap: '4px', padding: '6px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    {['Temp.', 'Jugador', 'G'].map((h, i) => (
                      <div key={i} style={{ fontSize: '0.45rem', fontWeight: 700, color: '#7a8aa8', letterSpacing: '1px', textTransform: 'uppercase', textAlign: i === 2 ? 'center' : 'left' }}>{h}</div>
                    ))}
                  </div>
                  {(pichichisPorLiga[ligaActiva] || []).map((p, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 40px', gap: '4px', padding: '8px 12px', borderBottom: i < (pichichisPorLiga[ligaActiva]?.length - 1) ? '1px solid rgba(255,255,255,0.03)' : 'none', alignItems: 'center' }}>
                      <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.7rem', color: '#7a8aa8' }}>{p.temp}</div>
                      <div>
                        <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.8rem', color: '#fff', textTransform: 'uppercase' }}>{p.jugador}</div>
                        <div style={{ fontSize: '0.5rem', color: '#7a8aa8', fontWeight: 600 }}>{p.equipo}</div>
                      </div>
                      <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1rem', color: '#ffd400', textAlign: 'center' }}>{p.goles}</div>
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