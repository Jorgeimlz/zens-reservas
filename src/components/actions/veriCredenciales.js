export function ingresar(history) {
  var nombre = document.getElementById("user").value;
  var pswd = document.getElementById("pswd").value;
  if (nombre === "zensAdmin" && pswd === "admin") {
    alert('Ingreso exitoso, bienvenido ' + nombre);
    history.push({
      pathname: '/AdminPage',
      state: { logged: true }
    });
  } else if (nombre === "zensSeguridad" && pswd === "security") {
    alert('Ingreso exitoso, bienvenido ' + nombre);
    history.push({
      pathname: '/seguridadPage',
      state: { logged: true }
    });
  } else {
    alert('Verifique sus credenciales');
  }
}

export function generarVoucher(){
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let voucher = '';
  for (let i = 0; i < 4; i++) {
    voucher += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return voucher;
}
