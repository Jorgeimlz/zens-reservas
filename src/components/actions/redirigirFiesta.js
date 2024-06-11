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

  export function irPublishAbout (history){
    history.push({
      pathname: '/publishAbout',
      state: { logged: true }
    });
  }

  export function irPublishPolitic (history){
    history.push({
      pathname: '/publishPolitics',
      state: { logged: true }
    });
  }

  
  export function irPublishContact (history){
    history.push({
      pathname: '/publishContact',
      state: { logged: true }
    });
  }
   
  export function irdeletePic(history){
    history.push({
      pathname: '/deletePic',
      state: { logged: true }
    });
  }