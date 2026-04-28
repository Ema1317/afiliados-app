let modo="nombre";
document.getElementById("btnNombre").onclick=()=>{modo="nombre";setActive("btnNombre");};
document.getElementById("btnDni").onclick=()=>{modo="dni";setActive("btnDni");};

function setActive(id){
document.getElementById("btnNombre").classList.remove("active");
document.getElementById("btnDni").classList.remove("active");
document.getElementById(id).classList.add("active");
}

const data=[]; // PEGAR JSON AQUÍ

const input=document.getElementById("search");
const resultado=document.getElementById("resultado");
const contador=document.getElementById("contador");

input.addEventListener("input",buscar);

function buscar(){
const valor=input.value.toLowerCase();
let filtrados=data.filter(p=>{
if(modo==="dni"){return p.dni.includes(valor);}
return p.nombre.toLowerCase().includes(valor)||p.apellido.toLowerCase().includes(valor);
});
render(filtrados);
}

function render(lista){
resultado.innerHTML="";
contador.innerHTML=lista.length+" resultado(s)";
if(lista.length===0){resultado.innerHTML="<p>No hay resultados</p>";return;}
lista.forEach(p=>{
resultado.innerHTML+=`
<div class="card">
<h3>${p.apellido}, ${p.nombre}</h3>
<p>DNI ${p.dni}</p>
<p><b>Oficina:</b> ${p.oficina}</p>
<p><b>Dirección:</b> ${p.direccion}</p>
<p><b>Departamento:</b> ${p.departamento}</p>
<p><b>Circunscripción:</b> ${p.circunscripcion}</p>
</div>`;
});
}
