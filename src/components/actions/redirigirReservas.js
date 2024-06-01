export function irReserva (history){
    history.push({
        pathname: '/verReservas',
        state: { logged: true }
      });
}

