export function ingresar(history) {
  var nombre = document.getElementById("user").value;
  var pswd = document.getElementById("pswd").value;
  if (nombre === "zensAdmin" && pswd === "admin") {
    alert('Ingreso exitoso');
    history.push('/AdminPage');
  } else {
    alert('Verifique sus credenciales');
  }
}
