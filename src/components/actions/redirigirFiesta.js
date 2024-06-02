export function irPublishParty (history){
    history.push({
      pathname: '/publishPrty',
      state: { logged: true }
    });
  }

  export function irPublishGalery (history){
    history.push({
      pathname: '/publishGalery',
      state: { logged: true }
    });
  }