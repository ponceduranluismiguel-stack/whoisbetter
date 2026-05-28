import { useState } from 'react'

const API_URL = 'https://whoisbetter-api.ponceduranluismiguel.workers.dev'

const ligas = [
  { id: 140, nombre: 'LaLiga', logoId: 140 },
  { id: 39, nombre: 'Premier League', logoId: 39 },
  { id: 135, nombre: 'Serie A', logoId: 135 },
  { id: 78, nombre: 'Bundesliga', logoId: 78 },
  { id: 61, nombre: 'Ligue 1', logoId: 61 },
]

const colorPosicion = {
  140: {
    1: '#ec4899',
    2: '#22c55e', 3: '#22c55e', 4: '#22c55e', 5: '#22c55e',
    6: '#3b82f6', 7: '#eab308', 10: '#3b82f6',
    18: '#ef4444', 19: '#ef4444', 20: '#ef4444',
  },
  39: {
    1: '#ec4899',
    2: '#22c55e', 3: '#22c55e', 4: '#22c55e', 5: '#22c55e',
    6: '#3b82f6', 7: '#3b82f6', 8: '#eab308',
    18: '#ef4444', 19: '#ef4444', 20: '#ef4444',
  },
  135: {
    1: '#ec4899',
    2: '#22c55e', 3: '#22c55e', 4: '#22c55e',
    5: '#3b82f6', 6: '#3b82f6', 7: '#eab308',
    18: '#ef4444', 19: '#ef4444', 20: '#ef4444',
  },
  78: {
    1: '#ec4899',
    2: '#22c55e', 3: '#22c55e', 4: '#22c55e',
    5: '#3b82f6', 6: '#3b82f6', 7: '#eab308',
    16: '#ef4444', 17: '#ef4444', 18: '#ef4444',
  },
  61: {
    1: '#ec4899',
    2: '#22c55e', 3: '#22c55e', 4: '#22c55e',
    5: '#3b82f6', 6: '#eab308',
    17: '#ef4444', 18: '#ef4444',
  },
}

const campeonesPorLiga = {
  140: [
    { temp: '2024/25', equipo: 'Barcelona' },
    { temp: '2023/24', equipo: 'Real Madrid' },
    { temp: '2022/23', equipo: 'Barcelona' },
    { temp: '2021/22', equipo: 'Real Madrid' },
    { temp: '2020/21', equipo: 'Atletico Madrid' },
    { temp: '2019/20', equipo: 'Real Madrid' },
    { temp: '2018/19', equipo: 'Barcelona' },
    { temp: '2017/18', equipo: 'Barcelona' },
    { temp: '2016/17', equipo: 'Real Madrid' },
    { temp: '2015/16', equipo: 'Barcelona' },
    { temp: '2014/15', equipo: 'Barcelona' },
    { temp: '2013/14', equipo: 'Atletico Madrid' },
    { temp: '2012/13', equipo: 'Barcelona' },
    { temp: '2011/12', equipo: 'Real Madrid' },
    { temp: '2010/11', equipo: 'Barcelona' },
    { temp: '2009/10', equipo: 'Barcelona' },
    { temp: '2008/09', equipo: 'Barcelona' },
    { temp: '2007/08', equipo: 'Real Madrid' },
    { temp: '2006/07', equipo: 'Real Madrid' },
    { temp: '2005/06', equipo: 'Barcelona' },
    { temp: '2004/05', equipo: 'Barcelona' },
    { temp: '2003/04', equipo: 'Valencia' },
    { temp: '2002/03', equipo: 'Real Madrid' },
    { temp: '2001/02', equipo: 'Valencia' },
    { temp: '2000/01', equipo: 'Real Madrid' },
    { temp: '1999/00', equipo: 'Deportivo' },
    { temp: '1998/99', equipo: 'Barcelona' },
    { temp: '1997/98', equipo: 'Barcelona' },
    { temp: '1996/97', equipo: 'Real Madrid' },
    { temp: '1995/96', equipo: 'Atletico Madrid' },
    { temp: '1994/95', equipo: 'Real Madrid' },
    { temp: '1993/94', equipo: 'Barcelona' },
    { temp: '1992/93', equipo: 'Barcelona' },
    { temp: '1991/92', equipo: 'Barcelona' },
    { temp: '1990/91', equipo: 'Barcelona' },
    { temp: '1989/90', equipo: 'Real Madrid' },
    { temp: '1988/89', equipo: 'Real Madrid' },
    { temp: '1987/88', equipo: 'Real Madrid' },
    { temp: '1986/87', equipo: 'Real Madrid' },
    { temp: '1985/86', equipo: 'Real Madrid' },
    { temp: '1984/85', equipo: 'Barcelona' },
    { temp: '1983/84', equipo: 'Athletic Club' },
    { temp: '1982/83', equipo: 'Athletic Club' },
    { temp: '1981/82', equipo: 'Real Sociedad' },
    { temp: '1980/81', equipo: 'Real Sociedad' },
    { temp: '1979/80', equipo: 'Real Madrid' },
    { temp: '1978/79', equipo: 'Real Madrid' },
    { temp: '1977/78', equipo: 'Real Madrid' },
    { temp: '1976/77', equipo: 'Atletico Madrid' },
    { temp: '1975/76', equipo: 'Real Madrid' },
    { temp: '1974/75', equipo: 'Real Madrid' },
    { temp: '1973/74', equipo: 'Barça' },
    { temp: '1972/73', equipo: 'Atletico Madrid' },
    { temp: '1971/72', equipo: 'Real Madrid' },
    { temp: '1970/71', equipo: 'Valencia' },
    { temp: '1969/70', equipo: 'Atletico Madrid' },
    { temp: '1968/69', equipo: 'Real Madrid' },
    { temp: '1967/68', equipo: 'Real Madrid' },
    { temp: '1966/67', equipo: 'Real Madrid' },
    { temp: '1965/66', equipo: 'Atletico Madrid' },
    { temp: '1964/65', equipo: 'Real Madrid' },
    { temp: '1963/64', equipo: 'Real Madrid' },
    { temp: '1962/63', equipo: 'Real Madrid' },
    { temp: '1961/62', equipo: 'Real Madrid' },
    { temp: '1960/61', equipo: 'Real Madrid' },
    { temp: '1959/60', equipo: 'Barcelona' },
    { temp: '1958/59', equipo: 'Barcelona' },
    { temp: '1957/58', equipo: 'Real Madrid' },
    { temp: '1956/57', equipo: 'Real Madrid' },
    { temp: '1955/56', equipo: 'Athletic Club' },
    { temp: '1954/55', equipo: 'Real Madrid' },
    { temp: '1953/54', equipo: 'Real Madrid' },
    { temp: '1952/53', equipo: 'Barcelona' },
    { temp: '1951/52', equipo: 'Barcelona' },
    { temp: '1950/51', equipo: 'Atletico Madrid' },
    { temp: '1949/50', equipo: 'Atletico Madrid' },
    { temp: '1948/49', equipo: 'Barcelona' },
    { temp: '1947/48', equipo: 'Barcelona' },
    { temp: '1944/45', equipo: 'Barcelona' },
    { temp: '1942/43', equipo: 'Athletic Club' },
    { temp: '1940/41', equipo: 'Atletico Aviación' },
    { temp: '1939/40', equipo: 'Atletico Aviación' },
  ],
  39: [
    { temp: '2024/25', equipo: 'Liverpool' },
    { temp: '2023/24', equipo: 'Manchester City' },
    { temp: '2022/23', equipo: 'Manchester City' },
    { temp: '2021/22', equipo: 'Manchester City' },
    { temp: '2020/21', equipo: 'Manchester City' },
    { temp: '2019/20', equipo: 'Liverpool' },
    { temp: '2018/19', equipo: 'Manchester City' },
    { temp: '2017/18', equipo: 'Manchester City' },
    { temp: '2016/17', equipo: 'Chelsea' },
    { temp: '2015/16', equipo: 'Leicester City' },
    { temp: '2014/15', equipo: 'Chelsea' },
    { temp: '2013/14', equipo: 'Manchester City' },
    { temp: '2012/13', equipo: 'Manchester United' },
    { temp: '2011/12', equipo: 'Manchester City' },
    { temp: '2010/11', equipo: 'Manchester United' },
    { temp: '2009/10', equipo: 'Chelsea' },
    { temp: '2008/09', equipo: 'Manchester United' },
    { temp: '2007/08', equipo: 'Manchester United' },
    { temp: '2006/07', equipo: 'Manchester United' },
    { temp: '2005/06', equipo: 'Chelsea' },
    { temp: '2004/05', equipo: 'Chelsea' },
    { temp: '2003/04', equipo: 'Arsenal' },
    { temp: '2002/03', equipo: 'Manchester United' },
    { temp: '2001/02', equipo: 'Arsenal' },
    { temp: '2000/01', equipo: 'Manchester United' },
    { temp: '1999/00', equipo: 'Manchester United' },
    { temp: '1998/99', equipo: 'Manchester United' },
    { temp: '1997/98', equipo: 'Arsenal' },
    { temp: '1996/97', equipo: 'Manchester United' },
    { temp: '1995/96', equipo: 'Manchester United' },
    { temp: '1994/95', equipo: 'Blackburn Rovers' },
    { temp: '1993/94', equipo: 'Manchester United' },
    { temp: '1992/93', equipo: 'Manchester United' },
    { temp: '1991/92', equipo: 'Leeds United', nota: 'First Division' },
    { temp: '1990/91', equipo: 'Arsenal', nota: 'First Division' },
    { temp: '1989/90', equipo: 'Liverpool', nota: 'First Division' },
    { temp: '1988/89', equipo: 'Arsenal', nota: 'First Division' },
    { temp: '1987/88', equipo: 'Liverpool', nota: 'First Division' },
    { temp: '1986/87', equipo: 'Everton', nota: 'First Division' },
    { temp: '1985/86', equipo: 'Liverpool', nota: 'First Division' },
    { temp: '1984/85', equipo: 'Everton', nota: 'First Division' },
    { temp: '1983/84', equipo: 'Liverpool', nota: 'First Division' },
    { temp: '1982/83', equipo: 'Liverpool', nota: 'First Division' },
    { temp: '1981/82', equipo: 'Liverpool', nota: 'First Division' },
    { temp: '1980/81', equipo: 'Aston Villa', nota: 'First Division' },
    { temp: '1979/80', equipo: 'Liverpool', nota: 'First Division' },
    { temp: '1978/79', equipo: 'Liverpool', nota: 'First Division' },
    { temp: '1977/78', equipo: 'Nottingham Forest', nota: 'First Division' },
    { temp: '1976/77', equipo: 'Liverpool', nota: 'First Division' },
    { temp: '1975/76', equipo: 'Liverpool', nota: 'First Division' },
    { temp: '1974/75', equipo: 'Derby County', nota: 'First Division' },
    { temp: '1973/74', equipo: 'Leeds United', nota: 'First Division' },
    { temp: '1972/73', equipo: 'Liverpool', nota: 'First Division' },
    { temp: '1971/72', equipo: 'Derby County', nota: 'First Division' },
    { temp: '1970/71', equipo: 'Arsenal', nota: 'First Division' },
    { temp: '1969/70', equipo: 'Everton', nota: 'First Division' },
    { temp: '1968/69', equipo: 'Leeds United', nota: 'First Division' },
    { temp: '1967/68', equipo: 'Manchester City', nota: 'First Division' },
    { temp: '1966/67', equipo: 'Manchester United', nota: 'First Division' },
    { temp: '1965/66', equipo: 'Liverpool', nota: 'First Division' },
    { temp: '1964/65', equipo: 'Manchester United', nota: 'First Division' },
    { temp: '1963/64', equipo: 'Liverpool', nota: 'First Division' },
    { temp: '1962/63', equipo: 'Everton', nota: 'First Division' },
    { temp: '1961/62', equipo: 'Ipswich Town', nota: 'First Division' },
    { temp: '1960/61', equipo: 'Tottenham Hotspur', nota: 'First Division' },
    { temp: '1959/60', equipo: 'Burnley', nota: 'First Division' },
    { temp: '1958/59', equipo: 'Wolverhampton W.', nota: 'First Division' },
    { temp: '1957/58', equipo: 'Wolverhampton W.', nota: 'First Division' },
    { temp: '1956/57', equipo: 'Manchester United', nota: 'First Division' },
    { temp: '1955/56', equipo: 'Manchester United', nota: 'First Division' },
    { temp: '1954/55', equipo: 'Chelsea', nota: 'First Division' },
    { temp: '1953/54', equipo: 'Wolverhampton W.', nota: 'First Division' },
    { temp: '1952/53', equipo: 'Arsenal', nota: 'First Division' },
    { temp: '1951/52', equipo: 'Manchester United', nota: 'First Division' },
    { temp: '1950/51', equipo: 'Tottenham Hotspur', nota: 'First Division' },
    { temp: '1949/50', equipo: 'Portsmouth', nota: 'First Division' },
    { temp: '1948/49', equipo: 'Portsmouth', nota: 'First Division' },
    { temp: '1947/48', equipo: 'Arsenal', nota: 'First Division' },
    { temp: '1946/47', equipo: 'Liverpool', nota: 'First Division' },
    { temp: '1938/39', equipo: 'Everton', nota: 'First Division' },
    { temp: '1937/38', equipo: 'Arsenal', nota: 'First Division' },
    { temp: '1936/37', equipo: 'Manchester City', nota: 'First Division' },
    { temp: '1935/36', equipo: 'Sunderland', nota: 'First Division' },
    { temp: '1934/35', equipo: 'Arsenal', nota: 'First Division' },
    { temp: '1933/34', equipo: 'Arsenal', nota: 'First Division' },
    { temp: '1932/33', equipo: 'Arsenal', nota: 'First Division' },
    { temp: '1931/32', equipo: 'Everton', nota: 'First Division' },
    { temp: '1930/31', equipo: 'Arsenal', nota: 'First Division' },
    { temp: '1929/30', equipo: 'Sheffield Wednesday', nota: 'First Division' },
    { temp: '1928/29', equipo: 'Sheffield Wednesday', nota: 'First Division' },
    { temp: '1927/28', equipo: 'Everton', nota: 'First Division' },
    { temp: '1926/27', equipo: 'Newcastle United', nota: 'First Division' },
    { temp: '1925/26', equipo: 'Huddersfield Town', nota: 'First Division' },
    { temp: '1924/25', equipo: 'Huddersfield Town', nota: 'First Division' },
    { temp: '1923/24', equipo: 'Huddersfield Town', nota: 'First Division' },
    { temp: '1922/23', equipo: 'Liverpool', nota: 'First Division' },
    { temp: '1921/22', equipo: 'Liverpool', nota: 'First Division' },
    { temp: '1920/21', equipo: 'Burnley', nota: 'First Division' },
    { temp: '1919/20', equipo: 'West Brom', nota: 'First Division' },
    { temp: '1914/15', equipo: 'Everton', nota: 'First Division' },
    { temp: '1913/14', equipo: 'Blackburn Rovers', nota: 'First Division' },
    { temp: '1912/13', equipo: 'Sunderland', nota: 'First Division' },
    { temp: '1911/12', equipo: 'Blackburn Rovers', nota: 'First Division' },
    { temp: '1910/11', equipo: 'Manchester United', nota: 'First Division' },
    { temp: '1909/10', equipo: 'Aston Villa', nota: 'First Division' },
    { temp: '1908/09', equipo: 'Newcastle United', nota: 'First Division' },
    { temp: '1907/08', equipo: 'Manchester United', nota: 'First Division' },
    { temp: '1906/07', equipo: 'Newcastle United', nota: 'First Division' },
    { temp: '1905/06', equipo: 'Liverpool', nota: 'First Division' },
    { temp: '1904/05', equipo: 'Newcastle United', nota: 'First Division' },
    { temp: '1903/04', equipo: 'Sheffield Wednesday', nota: 'First Division' },
    { temp: '1902/03', equipo: 'Sheffield Wednesday', nota: 'First Division' },
    { temp: '1901/02', equipo: 'Sunderland', nota: 'First Division' },
    { temp: '1900/01', equipo: 'Liverpool', nota: 'First Division' },
    { temp: '1899/00', equipo: 'Aston Villa', nota: 'First Division' },
    { temp: '1898/99', equipo: 'Aston Villa', nota: 'First Division' },
    { temp: '1897/98', equipo: 'Sheffield United', nota: 'First Division' },
    { temp: '1896/97', equipo: 'Aston Villa', nota: 'First Division' },
    { temp: '1895/96', equipo: 'Aston Villa', nota: 'First Division' },
    { temp: '1894/95', equipo: 'Sunderland', nota: 'First Division' },
    { temp: '1893/94', equipo: 'Aston Villa', nota: 'First Division' },
    { temp: '1892/93', equipo: 'Sunderland', nota: 'First Division' },
    { temp: '1891/92', equipo: 'Sunderland', nota: 'Football League' },
    { temp: '1890/91', equipo: 'Everton', nota: 'Football League' },
    { temp: '1889/90', equipo: 'Preston North End', nota: 'Football League' },
    { temp: '1888/89', equipo: 'Preston North End', nota: 'Football League' },
  ],
  135: [
    { temp: '2024/25', equipo: 'Napoli' },
    { temp: '2023/24', equipo: 'Inter' },
    { temp: '2022/23', equipo: 'Napoli' },
    { temp: '2021/22', equipo: 'AC Milan' },
    { temp: '2020/21', equipo: 'Inter' },
    { temp: '2019/20', equipo: 'Juventus' },
    { temp: '2018/19', equipo: 'Juventus' },
    { temp: '2017/18', equipo: 'Juventus' },
    { temp: '2016/17', equipo: 'Juventus' },
    { temp: '2015/16', equipo: 'Juventus' },
    { temp: '2014/15', equipo: 'Juventus' },
    { temp: '2013/14', equipo: 'Juventus' },
    { temp: '2012/13', equipo: 'Juventus' },
    { temp: '2011/12', equipo: 'Juventus' },
    { temp: '2010/11', equipo: 'AC Milan' },
    { temp: '2009/10', equipo: 'Inter' },
    { temp: '2008/09', equipo: 'Inter' },
    { temp: '2007/08', equipo: 'Inter' },
    { temp: '2006/07', equipo: 'Inter' },
    { temp: '2005/06', equipo: '— (título retirado)' },
    { temp: '2004/05', equipo: 'Juventus' },
    { temp: '2003/04', equipo: 'AC Milan' },
    { temp: '2002/03', equipo: 'Juventus' },
    { temp: '2001/02', equipo: 'Juventus' },
    { temp: '2000/01', equipo: 'Roma' },
    { temp: '1999/00', equipo: 'Lazio' },
    { temp: '1998/99', equipo: 'AC Milan' },
    { temp: '1997/98', equipo: 'Juventus' },
    { temp: '1996/97', equipo: 'Juventus' },
    { temp: '1995/96', equipo: 'AC Milan' },
    { temp: '1994/95', equipo: 'Juventus' },
    { temp: '1993/94', equipo: 'AC Milan' },
    { temp: '1992/93', equipo: 'AC Milan' },
    { temp: '1991/92', equipo: 'AC Milan' },
    { temp: '1990/91', equipo: 'Sampdoria' },
    { temp: '1989/90', equipo: 'Napoli' },
    { temp: '1988/89', equipo: 'Inter' },
    { temp: '1987/88', equipo: 'AC Milan' },
    { temp: '1986/87', equipo: 'Napoli' },
    { temp: '1985/86', equipo: 'Juventus' },
    { temp: '1984/85', equipo: 'Hellas Verona' },
    { temp: '1983/84', equipo: 'Juventus' },
    { temp: '1982/83', equipo: 'Roma' },
    { temp: '1981/82', equipo: 'Juventus' },
    { temp: '1980/81', equipo: 'Juventus' },
    { temp: '1979/80', equipo: 'Inter' },
    { temp: '1978/79', equipo: 'AC Milan' },
    { temp: '1977/78', equipo: 'Juventus' },
    { temp: '1976/77', equipo: 'Juventus' },
    { temp: '1975/76', equipo: 'Torino' },
    { temp: '1974/75', equipo: 'Juventus' },
    { temp: '1973/74', equipo: 'Lazio' },
    { temp: '1972/73', equipo: 'Juventus' },
    { temp: '1971/72', equipo: 'Juventus' },
    { temp: '1970/71', equipo: 'Inter' },
    { temp: '1969/70', equipo: 'Cagliari' },
    { temp: '1968/69', equipo: 'Fiorentina' },
    { temp: '1967/68', equipo: 'AC Milan' },
    { temp: '1966/67', equipo: 'Juventus' },
    { temp: '1965/66', equipo: 'Inter' },
    { temp: '1964/65', equipo: 'Inter' },
    { temp: '1963/64', equipo: 'Bologna' },
    { temp: '1962/63', equipo: 'Inter' },
    { temp: '1961/62', equipo: 'AC Milan' },
    { temp: '1960/61', equipo: 'Juventus' },
    { temp: '1959/60', equipo: 'Juventus' },
    { temp: '1958/59', equipo: 'AC Milan' },
    { temp: '1957/58', equipo: 'Juventus' },
    { temp: '1956/57', equipo: 'AC Milan' },
    { temp: '1955/56', equipo: 'Fiorentina' },
    { temp: '1954/55', equipo: 'AC Milan' },
    { temp: '1953/54', equipo: 'Inter' },
    { temp: '1952/53', equipo: 'Inter' },
    { temp: '1951/52', equipo: 'Juventus' },
    { temp: '1950/51', equipo: 'AC Milan' },
    { temp: '1949/50', equipo: 'Juventus' },
    { temp: '1948/49', equipo: 'Torino' },
    { temp: '1946/47', equipo: 'Torino' },
    { temp: '1942/43', equipo: 'Torino' },
    { temp: '1941/42', equipo: 'Roma' },
    { temp: '1940/41', equipo: 'Bologna' },
    { temp: '1939/40', equipo: 'Inter' },
  ],
  78: [
    { temp: '2024/25', equipo: 'Bayern Munich' },
    { temp: '2023/24', equipo: 'Bayer Leverkusen' },
    { temp: '2022/23', equipo: 'Bayern Munich' },
    { temp: '2021/22', equipo: 'Bayern Munich' },
    { temp: '2020/21', equipo: 'Bayern Munich' },
    { temp: '2019/20', equipo: 'Bayern Munich' },
    { temp: '2018/19', equipo: 'Bayern Munich' },
    { temp: '2017/18', equipo: 'Bayern Munich' },
    { temp: '2016/17', equipo: 'Bayern Munich' },
    { temp: '2015/16', equipo: 'Bayern Munich' },
    { temp: '2014/15', equipo: 'Bayern Munich' },
    { temp: '2013/14', equipo: 'Bayern Munich' },
    { temp: '2012/13', equipo: 'Bayern Munich' },
    { temp: '2011/12', equipo: 'Borussia Dortmund' },
    { temp: '2010/11', equipo: 'Borussia Dortmund' },
    { temp: '2009/10', equipo: 'Bayern Munich' },
    { temp: '2008/09', equipo: 'VfL Wolfsburg' },
    { temp: '2007/08', equipo: 'Bayern Munich' },
    { temp: '2006/07', equipo: 'VfB Stuttgart' },
    { temp: '2005/06', equipo: 'Bayern Munich' },
    { temp: '2004/05', equipo: 'Bayern Munich' },
    { temp: '2003/04', equipo: 'Werder Bremen' },
    { temp: '2002/03', equipo: 'Bayern Munich' },
    { temp: '2001/02', equipo: 'Borussia Dortmund' },
    { temp: '2000/01', equipo: 'Bayern Munich' },
    { temp: '1999/00', equipo: 'Bayern Munich' },
    { temp: '1998/99', equipo: 'Bayern Munich' },
    { temp: '1997/98', equipo: 'Kaiserslautern' },
    { temp: '1996/97', equipo: 'Bayern Munich' },
    { temp: '1995/96', equipo: 'Borussia Dortmund' },
    { temp: '1994/95', equipo: 'Borussia Dortmund' },
    { temp: '1993/94', equipo: 'Bayern Munich' },
    { temp: '1992/93', equipo: 'Werder Bremen' },
    { temp: '1991/92', equipo: 'VfB Stuttgart' },
    { temp: '1990/91', equipo: 'Kaiserslautern' },
    { temp: '1989/90', equipo: 'Bayern Munich' },
    { temp: '1988/89', equipo: 'Bayern Munich' },
    { temp: '1987/88', equipo: 'Werder Bremen' },
    { temp: '1986/87', equipo: 'Bayern Munich' },
    { temp: '1985/86', equipo: 'Bayern Munich' },
    { temp: '1984/85', equipo: 'Bayern Munich' },
    { temp: '1983/84', equipo: 'VfB Stuttgart' },
    { temp: '1982/83', equipo: 'Hamburger SV' },
    { temp: '1981/82', equipo: 'Hamburger SV' },
    { temp: '1980/81', equipo: 'Bayern Munich' },
    { temp: '1979/80', equipo: 'Bayern Munich' },
    { temp: '1978/79', equipo: 'Hamburger SV' },
    { temp: '1977/78', equipo: 'Borussia Mönchengladbach' },
    { temp: '1976/77', equipo: 'Borussia Mönchengladbach' },
    { temp: '1975/76', equipo: 'Borussia Mönchengladbach' },
    { temp: '1974/75', equipo: 'Borussia Mönchengladbach' },
    { temp: '1973/74', equipo: 'Bayern Munich' },
    { temp: '1972/73', equipo: 'Bayern Munich' },
    { temp: '1971/72', equipo: 'Bayern Munich' },
    { temp: '1970/71', equipo: 'Borussia Mönchengladbach' },
    { temp: '1969/70', equipo: 'Borussia Mönchengladbach' },
    { temp: '1968/69', equipo: 'Bayern Munich' },
    { temp: '1967/68', equipo: 'Nürnberg' },
    { temp: '1966/67', equipo: 'Eintracht Braunschweig' },
    { temp: '1965/66', equipo: 'TSV 1860 Munich' },
    { temp: '1964/65', equipo: 'Werder Bremen' },
    { temp: '1963/64', equipo: 'Cologne' },
  ],
  61: [
    { temp: '2024/25', equipo: 'PSG' },
    { temp: '2023/24', equipo: 'PSG' },
    { temp: '2022/23', equipo: 'PSG' },
    { temp: '2021/22', equipo: 'PSG' },
    { temp: '2020/21', equipo: 'Lille' },
    { temp: '2019/20', equipo: 'PSG' },
    { temp: '2018/19', equipo: 'PSG' },
    { temp: '2017/18', equipo: 'PSG' },
    { temp: '2016/17', equipo: 'Monaco' },
    { temp: '2015/16', equipo: 'PSG' },
    { temp: '2014/15', equipo: 'PSG' },
    { temp: '2013/14', equipo: 'PSG' },
    { temp: '2012/13', equipo: 'PSG' },
    { temp: '2011/12', equipo: 'Montpellier' },
    { temp: '2010/11', equipo: 'Lille' },
    { temp: '2009/10', equipo: 'Marseille' },
    { temp: '2008/09', equipo: 'Bordeaux' },
    { temp: '2007/08', equipo: 'Lyon' },
    { temp: '2006/07', equipo: 'Lyon' },
    { temp: '2005/06', equipo: 'Lyon' },
    { temp: '2004/05', equipo: 'Lyon' },
    { temp: '2003/04', equipo: 'Lyon' },
    { temp: '2002/03', equipo: 'Lyon' },
    { temp: '2001/02', equipo: 'Lyon' },
    { temp: '2000/01', equipo: 'Nantes' },
    { temp: '1999/00', equipo: 'Monaco' },
    { temp: '1998/99', equipo: 'Bordeaux' },
    { temp: '1997/98', equipo: 'Lens' },
    { temp: '1996/97', equipo: 'Monaco' },
    { temp: '1995/96', equipo: 'Auxerre' },
    { temp: '1994/95', equipo: 'Nantes' },
    { temp: '1993/94', equipo: 'PSG' },
    { temp: '1992/93', equipo: '— (no otorgado)' },
    { temp: '1991/92', equipo: 'Marseille' },
    { temp: '1990/91', equipo: 'Marseille' },
    { temp: '1989/90', equipo: 'Marseille' },
    { temp: '1988/89', equipo: 'Marseille' },
    { temp: '1987/88', equipo: 'Monaco' },
    { temp: '1986/87', equipo: 'Bordeaux' },
    { temp: '1985/86', equipo: 'Paris Saint-Germain' },
    { temp: '1984/85', equipo: 'Bordeaux' },
    { temp: '1983/84', equipo: 'Bordeaux' },
    { temp: '1982/83', equipo: 'Nantes' },
    { temp: '1981/82', equipo: 'Monaco' },
    { temp: '1980/81', equipo: 'Metz' },
    { temp: '1979/80', equipo: 'Nantes' },
    { temp: '1978/79', equipo: 'Strasbourg' },
    { temp: '1977/78', equipo: 'Monaco' },
    { temp: '1976/77', equipo: 'Nantes' },
    { temp: '1975/76', equipo: 'Saint-Étienne' },
    { temp: '1974/75', equipo: 'Saint-Étienne' },
    { temp: '1973/74', equipo: 'Saint-Étienne' },
    { temp: '1972/73', equipo: 'Nantes' },
    { temp: '1971/72', equipo: 'Marseille' },
    { temp: '1970/71', equipo: 'Marseille' },
    { temp: '1969/70', equipo: 'Saint-Étienne' },
    { temp: '1968/69', equipo: 'Saint-Étienne' },
    { temp: '1967/68', equipo: 'Saint-Étienne' },
    { temp: '1966/67', equipo: 'Saint-Étienne' },
    { temp: '1965/66', equipo: 'Nantes' },
    { temp: '1964/65', equipo: 'Nantes' },
    { temp: '1963/64', equipo: 'Saint-Étienne' },
    { temp: '1962/63', equipo: 'Monaco' },
    { temp: '1961/62', equipo: 'Reims' },
    { temp: '1960/61', equipo: 'Monaco' },
    { temp: '1959/60', equipo: 'Stade de Reims' },
    { temp: '1958/59', equipo: 'Nice' },
    { temp: '1957/58', equipo: 'Stade de Reims' },
    { temp: '1956/57', equipo: 'Saint-Étienne' },
    { temp: '1955/56', equipo: 'Nice' },
    { temp: '1954/55', equipo: 'Stade de Reims' },
    { temp: '1953/54', equipo: 'Lille' },
    { temp: '1952/53', equipo: 'Stade de Reims' },
    { temp: '1951/52', equipo: 'Nice' },
    { temp: '1950/51', equipo: 'Nice' },
    { temp: '1949/50', equipo: 'Bordeaux' },
    { temp: '1948/49', equipo: 'Stade de Reims' },
    { temp: '1947/48', equipo: 'Marseille' },
    { temp: '1946/47', equipo: 'Roubaix-Tourcoing' },
    { temp: '1945/46', equipo: 'Lille' },
    { temp: '1944/45', equipo: 'Rouen' },
    { temp: '1942/43', equipo: 'Marseille' },
    { temp: '1941/42', equipo: 'Monaco' },
    { temp: '1940/41', equipo: 'Marseille' },
    { temp: '1938/39', equipo: 'Sète' },
    { temp: '1937/38', equipo: 'Sochaux' },
    { temp: '1936/37', equipo: 'Marseille' },
    { temp: '1935/36', equipo: 'Racing Club de Paris' },
    { temp: '1934/35', equipo: 'Sochaux' },
    { temp: '1933/34', equipo: 'Sète' },
    { temp: '1932/33', equipo: 'Lille' },
  ],
}

const palmaresPorLiga = {
  140: [
    { equipo: 'Real Madrid', titulos: 36 },
    { equipo: 'Barcelona', titulos: 27 },
    { equipo: 'Atletico Madrid', titulos: 11 },
    { equipo: 'Athletic Club', titulos: 8 },
    { equipo: 'Valencia', titulos: 6 },
    { equipo: 'Real Sociedad', titulos: 2 },
    { equipo: 'Deportivo', titulos: 1 },
    { equipo: 'Sevilla', titulos: 1 },
    { equipo: 'Real Betis', titulos: 1 },
  ],
  39: [
    { equipo: 'Liverpool', titulos: 20 },
    { equipo: 'Manchester United', titulos: 20 },
    { equipo: 'Arsenal', titulos: 14 },
    { equipo: 'Everton', titulos: 9 },
    { equipo: 'Manchester City', titulos: 10 },
    { equipo: 'Aston Villa', titulos: 7 },
    { equipo: 'Sunderland', titulos: 6 },
    { equipo: 'Chelsea', titulos: 6 },
    { equipo: 'Newcastle United', titulos: 4 },
    { equipo: 'Sheffield Wednesday', titulos: 4 },
    { equipo: 'Huddersfield Town', titulos: 3 },
    { equipo: 'Wolverhampton W.', titulos: 3 },
    { equipo: 'Leeds United', titulos: 3 },
    { equipo: 'Blackburn Rovers', titulos: 3 },
    { equipo: 'Preston North End', titulos: 2 },
    { equipo: 'Portsmouth', titulos: 2 },
    { equipo: 'Burnley', titulos: 2 },
    { equipo: 'Tottenham Hotspur', titulos: 2 },
    { equipo: 'Derby County', titulos: 2 },
    { equipo: 'West Brom', titulos: 1 },
    { equipo: 'Ipswich Town', titulos: 1 },
    { equipo: 'Nottingham Forest', titulos: 1 },
    { equipo: 'Sheffield United', titulos: 1 },
    { equipo: 'Leicester City', titulos: 1 },
  ],
  135: [
    { equipo: 'Juventus', titulos: 36 },
    { equipo: 'Inter', titulos: 19 },
    { equipo: 'AC Milan', titulos: 18 },
    { equipo: 'Genoa', titulos: 9 },
    { equipo: 'Torino', titulos: 7 },
    { equipo: 'Bologna', titulos: 7 },
    { equipo: 'Pro Vercelli', titulos: 7 },
    { equipo: 'Roma', titulos: 3 },
    { equipo: 'Napoli', titulos: 3 },
    { equipo: 'Lazio', titulos: 2 },
    { equijo: 'Fiorentina', titulos: 2 },
    { equipo: 'Sampdoria', titulos: 1 },
    { equipo: 'Cagliari', titulos: 1 },
    { equipo: 'Hellas Verona', titulos: 1 },
  ],
  78: [
    { equipo: 'Bayern Munich', titulos: 33 },
    { equipo: 'Borussia Dortmund', titulos: 8 },
    { equipo: 'Borussia Mönchengladbach', titulos: 5 },
    { equipo: 'Werder Bremen', titulos: 4 },
    { equipo: 'Schalke 04', titulos: 7 },
    { equipo: 'Hamburger SV', titulos: 6 },
    { equipo: 'VfB Stuttgart', titulos: 5 },
    { equipo: 'Kaiserslautern', titulos: 4 },
    { equipo: 'Bayer Leverkusen', titulos: 1 },
    { equipo: 'VfL Wolfsburg', titulos: 1 },
    { equipo: 'Eintracht Frankfurt', titulos: 1 },
  ],
  61: [
    { equipo: 'Saint-Étienne', titulos: 10 },
    { equipo: 'Marseille', titulos: 9 },
    { equipo: 'Monaco', titulos: 8 },
    { equipo: 'Nantes', titulos: 8 },
    { equipo: 'PSG', titulos: 12 },
    { equipo: 'Lyon', titulos: 7 },
    { equipo: 'Stade de Reims', titulos: 6 },
    { equipo: 'Bordeaux', titulos: 6 },
    { equipo: 'Nice', titulos: 4 },
    { equipo: 'Lille', titulos: 4 },
    { equipo: 'Lens', titulos: 1 },
    { equipo: 'Auxerre', titulos: 1 },
    { equipo: 'Montpellier', titulos: 1 },
    { equipo: 'Sochaux', titulos: 2 },
    { equipo: 'Sète', titulos: 2 },
  ],
}

export default function Clasificaciones({ onBack, onEquipo }) {
  const [tab, setTab] = useState('clasificacion')

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0a1740 0%, #02081f 100%)',
      paddingBottom: '80px',
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

      <div style={{ padding: '12px 16px 0' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          {[
            { key: 'clasificacion', label: '📊 25/26' },
            { key: 'campeones', label: '🏆 Campeones' },
            { key: 'palmares', label: '🥇 Palmarés' },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              fontFamily: 'Anton, sans-serif', fontSize: '0.55rem', letterSpacing: '0.8px',
              padding: '7px 10px', borderRadius: '20px', border: 'none', cursor: 'pointer',
              background: tab === t.key ? '#ffd400' : 'rgba(255,255,255,0.08)',
              color: tab === t.key ? '#0a1740' : '#fff',
              textTransform: 'uppercase', flex: 1, whiteSpace: 'nowrap',
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      {tab === 'clasificacion' && (
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {ligas.map(liga => <LigaCard key={liga.id} liga={liga} onEquipo={onEquipo} />)}
        </div>
      )}

      {tab === 'campeones' && (
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {ligas.map(liga => <CampeonesCard key={liga.id} liga={liga} />)}
        </div>
      )}

      {tab === 'palmares' && (
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {ligas.map(liga => <PalmaresCard key={liga.id} liga={liga} />)}
        </div>
      )}
    </div>
  )
}

function LigaCard({ liga, onEquipo }) {
  const [standing, setStanding] = useState(null)
  const [abierta, setAbierta] = useState(false)
  const [cargando, setCargando] = useState(false)
  const colores = colorPosicion[liga.id] || {}

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
            <div style={{ padding: '20px', textAlign: 'center', color: '#ffd400', fontFamily: 'Anton, sans-serif', fontSize: '0.8rem' }}>CARGANDO...</div>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '4px 24px 1fr 26px 26px 26px 26px 36px', gap: '4px', padding: '6px 12px', borderBottom: '1px solid rgba(255,255,255,0.04)', alignItems: 'center' }}>
                <div></div>
                <div style={{ fontSize: '0.45rem', fontWeight: 700, color: '#7a8aa8', letterSpacing: '1px', textTransform: 'uppercase' }}>#</div>
                <div style={{ fontSize: '0.45rem', fontWeight: 700, color: '#7a8aa8', letterSpacing: '1px', textTransform: 'uppercase' }}>Equipo</div>
                {['PJ', 'V', 'E', 'D', 'Pts'].map((h, i) => (
                  <div key={i} style={{ fontSize: '0.45rem', fontWeight: 700, color: '#7a8aa8', letterSpacing: '1px', textTransform: 'uppercase', textAlign: 'center' }}>{h}</div>
                ))}
              </div>
              {(standing || []).map((s, i) => {
                const color = colores[s.rank]
                return (
                  <div key={i} onClick={() => onEquipo(s.team.id, s.team.name, s.team.logo)}
                    style={{ display: 'grid', gridTemplateColumns: '4px 24px 1fr 26px 26px 26px 26px 36px', gap: '4px', padding: '7px 12px', borderBottom: i < standing.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none', cursor: 'pointer', alignItems: 'center' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{ width: '3px', height: '20px', borderRadius: '2px', background: color || 'transparent' }}></div>
                    <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.8rem', color: color || '#7a8aa8', textAlign: 'center' }}>{s.rank}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <img src={`${API_URL}/img/${s.team.logo.replace('https://media.api-sports.io/', '')}`} alt={s.team.name}
                        style={{ width: '16px', height: '16px', objectFit: 'contain', flexShrink: 0 }}
                        onError={e => { e.target.style.display = 'none' }} />
                      <div style={{ fontSize: '0.75rem', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.team.name}</div>
                    </div>
                    {[s.all?.played, s.all?.win, s.all?.draw, s.all?.lose, s.points].map((v, j) => (
                      <div key={j} style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.8rem', color: '#a8b4cc', textAlign: 'center' }}>{v}</div>
                    ))}
                  </div>
                )
              })}
              <div style={{ padding: '10px 12px', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {[
                  { color: '#ec4899', label: 'Campeón' },
                  { color: '#22c55e', label: 'Champions' },
                  { color: '#3b82f6', label: 'Europa League' },
                  { color: '#eab308', label: 'Conference' },
                  { color: '#ef4444', label: 'Descenso' },
                ].map((l, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: l.color }}></div>
                    <div style={{ fontSize: '0.5rem', color: '#7a8aa8', fontWeight: 600 }}>{l.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

function CampeonesCard({ liga }) {
  const [abierta, setAbierta] = useState(false)
  const campeones = campeonesPorLiga[liga.id] || []
  const esEngland = liga.id === 39

  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '14px', overflow: 'hidden', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)' }}>
      <div onClick={() => setAbierta(!abierta)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', cursor: 'pointer' }}>
        <div style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.95)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <img src={`${API_URL}/img/football/leagues/${liga.logoId}.png`} alt={liga.nombre}
            style={{ width: '28px', height: '28px', objectFit: 'contain' }}
            onError={e => { e.target.style.display = 'none' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.2px' }}>{liga.nombre}</div>
          {esEngland && <div style={{ fontSize: '0.5rem', color: '#7a8aa8', fontWeight: 600, marginTop: '2px' }}>Incluye First Division desde 1888</div>}
        </div>
        <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1rem', color: '#ffd400', transition: 'transform 0.2s', transform: abierta ? 'rotate(180deg)' : 'none' }}>▼</div>
      </div>
      {abierta && (
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: esEngland ? '70px 1fr 100px' : '70px 1fr', gap: '4px', padding: '6px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: '0.45rem', fontWeight: 700, color: '#7a8aa8', letterSpacing: '1px', textTransform: 'uppercase' }}>Temp.</div>
            <div style={{ fontSize: '0.45rem', fontWeight: 700, color: '#7a8aa8', letterSpacing: '1px', textTransform: 'uppercase' }}>Campeón</div>
            {esEngland && <div style={{ fontSize: '0.45rem', fontWeight: 700, color: '#7a8aa8', letterSpacing: '1px', textTransform: 'uppercase' }}>Liga</div>}
          </div>
          {campeones.map((c, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: esEngland ? '70px 1fr 100px' : '70px 1fr', gap: '4px', padding: '8px 14px', borderBottom: i < campeones.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none', alignItems: 'center', background: i === 0 ? 'rgba(255,212,0,0.05)' : 'transparent' }}>
              <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.7rem', color: i === 0 ? '#ffd400' : '#7a8aa8' }}>{c.temp}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                {i === 0 && <span style={{ fontSize: '0.8rem' }}>🏆</span>}
                <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.85rem', color: i === 0 ? '#ffd400' : '#fff', textTransform: 'uppercase' }}>{c.equipo}</div>
              </div>
              {esEngland && <div style={{ fontSize: '0.55rem', color: '#7a8aa8', fontWeight: 600 }}>{c.nota || 'Premier League'}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function PalmaresCard({ liga }) {
  const [abierta, setAbierta] = useState(false)
  const palmares = [...(palmaresPorLiga[liga.id] || [])].sort((a, b) => b.titulos - a.titulos)
  const max = palmares[0]?.titulos || 1

  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '14px', overflow: 'hidden', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)' }}>
      <div onClick={() => setAbierta(!abierta)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', cursor: 'pointer' }}>
        <div style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.95)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <img src={`${API_URL}/img/football/leagues/${liga.logoId}.png`} alt={liga.nombre}
            style={{ width: '28px', height: '28px', objectFit: 'contain' }}
            onError={e => { e.target.style.display = 'none' }} />
        </div>
        <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.2px', flex: 1 }}>{liga.nombre}</div>
        <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1rem', color: '#ffd400', transition: 'transform 0.2s', transform: abierta ? 'rotate(180deg)' : 'none' }}>▼</div>
      </div>
      {abierta && (
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {palmares.map((p, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.75rem', color: i === 0 ? '#ffd400' : '#7a8aa8', width: '20px', textAlign: 'center', flexShrink: 0 }}>{i + 1}</div>
              <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.85rem', color: '#fff', textTransform: 'uppercase', width: '140px', flexShrink: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.equipo}</div>
              <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(p.titulos / max) * 100}%`, background: i === 0 ? '#ffd400' : i === 1 ? '#a8b4cc' : i === 2 ? '#cd7f32' : 'rgba(255,255,255,0.2)', borderRadius: '3px' }}></div>
              </div>
              <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1rem', color: i === 0 ? '#ffd400' : '#fff', minWidth: '24px', textAlign: 'right' }}>{p.titulos}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}