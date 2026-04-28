let data = [];

fetch("./data.json")
  .then(res => res.json())
  .then(json => {

    const filas = json.PRIMERA;

    // ignoramos la primera fila (encabezados)
    data = filas.slice(1).map(p => {

      const nombreCompleto = p["Column3"] || "";
      const partes = nombreCompleto.split(" ");

      return {
        nombre: partes.slice(1).join(" "),
        apellido: partes[0] || "",
        dni: p["PRIMERA CIRCUNSCRIPCION"] || "",
        oficina: p["Column4"] || "",
        direccion: p["Column5"] || "",
        departamento: p["Column6"] || "",
        circunscripcion: "PRIMERA"
      };
    });

    console.log("Datos cargados:", data);
  });

let modo = "nombre";

document.getElementById("btnNombre").onclick = () => {
  modo = "nombre";
};

document.getElementById("btnDni").onclick = () => {
  modo = "dni";
};

const input = document.getElementById("search");
const resultado = document.getElementById("resultado");

input.addEventListener("input", () => {
  const valor = input.value.toLowerCase();

  const filtrados = data.filter(p => {
    if (modo === "dni") {
      return (p.dni || "").includes(valor);
    }
    return (
      (p.nombre || "").toLowerCase().includes(valor) ||
      (p.apellido || "").toLowerCase().includes(valor)
    );
  });

  render(filtrados);
});

function render(lista) {
  resultado.innerHTML = "";

  if (lista.length === 0) {
    resultado.innerHTML = "<p>No hay resultados</p>";
    return;
  }

  lista.forEach(p => {
    resultado.innerHTML += `
      <div class="card">
        <h3>${p.apellido}, ${p.nombre}</h3>
        <p>DNI ${p.dni}</p>
        <p><b>Oficina:</b> ${p.oficina}</p>
        <p><b>Dirección:</b> ${p.direccion}</p>
        <p><b>Departamento:</b> ${p.departamento}</p>
        <p><b>Circunscripción:</b> ${p.circunscripcion}</p>
      </div>
    `;
  });
}
