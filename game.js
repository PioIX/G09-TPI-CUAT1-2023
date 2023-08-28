async function login(data){
  try {
    const response = await fetch("/login", {
      method: "PUT", // or 'POST'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    //En result obtengo la respuesta
    const result = await response.json();
    console.log("Success:", result)
    
      if (result.respuesta == false) {
        alert("datos incorrectos")
      } 
      else if (result.respuesta == true) {
        if(result.admin == true){
          location.href ='/admin';
        }
        else {
          location.href ='/index';
      }}
  } catch (error) {
    console.error("Error:", error);
  }}
//Esta funcion la llama el boton Ingresar que tiene que ser type button para ejecutar el onclick
function login2() {
  //Leo los datos del input
  let usuario = document.getElementById("usuarioId").value
  let contraseña = document.getElementById("passwordId").value

  //Creo un objeto de forma instantanea
  let data = {
      usuario: usuario,
      contraseña: contraseña
  }

  //data es el objeto que le paso al back
  if(data.usuario != "" && data.contraseña != ""){
    login(data)
  }
  else{
    alert("no ha ingresado nada")
    };
  }
async function agregarPregunta(data){
  try {
      const response = await fetch("/agregar", {
          method: "PUT", // or 'POST'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        //En result obtengo la respuesta
        const result = await response.json();
        console.log("Success:", result)
        
      if (result.validar == false) {
          alert("La pregunta ya existe")
        } 
      else if (result.validar == true) {
          alert("La pregunta se ingreso correctamente")
          }
    } catch (error) {
      console.error("Error:", error);
    }}
function admin() {
      //Leo los datos del input
      let question1 = document.getElementById("question").value   
      let question2 = document.getElementById("answer1").value  
      let question3 = document.getElementById("answer2").value  
      let question4 = document.getElementById("answer3").value  
      //Creo un objeto de forma instantanea
      let data = {
          question1: question1,
          question2: question2,
          question3: question3,
          question4: question4
      }
      console.log(data)
      if(data.question1 != "" ){
          if(data.question2 != "" ){
              if(data.question3 != "" ){
                  if(data.question4 != "" ){
                      agregarPregunta(data)
                  }
                  else{
                      alert("no ha ingresado nada en el campo 4")
                  }
              }
              else{
                  alert("no ha ingresado nada en el campo 3")
              }
          }
          else{
              alert("no ha ingresado nada en el campo 2")
          }
      }
      else{
          alert("no ha ingresado nada en el campo 1")
      }
      }
async function eliminarPregunta(data){
try {
  const response = await fetch("/eliminar", {
  method: "PUT", // or 'POST'
  headers: {
  "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
});
const result = await response.json();
console.log("Success:", result)                        
if (result.validar == false) {
  alert("La pregunta no existe")
}             
else if (result.validar == true) {
  alert("La pregunta se elimino correctamente")
}
} catch (error) {
  console.error("Error:", error);
}}
function admin2() {
let pregunta = document.getElementById("id").value             
let data = {
pregunta:pregunta
}
if(data.pregunta!=""){
  eliminarPregunta(data)
}
else if(data.pregunta==""){
alert("No ingreso ningun ID")
}
}


function irGame(){
location.href ='/game'
}
function irRanking(){
location.href ='/tablapuntos'
}
function irIndex(){
location.href ='/index'
}

async function mandarPuntos(data) {
    try {
        const response = await fetch("/puntos", {
          method: "PUT", // or 'POST'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        console.log("Success:", result.puntos_actual)
        
        } 
    catch (error) {
    console.error("Error:", error);
      }
        
}

function enviarPuntos(){
    let data = {
        puntos: puntos
    }
    console.log(data)
    mandarPuntos(data)
}

let preguntas = []

async function selectPreguntas() {
  try {
      const response = await fetch("/preguntas", {
        method: "GET", 
        headers: {
        "Content-Type": "application/json",
        },
      });
      //En result obtengo la respuesta
      const result = await response.json();
      console.log("Success:", result);

      if (result.length == 0) {
        console.log("No se encontraron elementos.");
        return -1
      } 
      else{
        return result
      }
    }
catch (error) {
console.error("Error:", error);
}
  
}

async function llenarVector() {
    preguntas = await selectPreguntas()    
};


let preguntaActual = 0
async function mostrarPregunta() {
    for (let i = 0; i < 1; i++) {
        
        
    
    await llenarVector()
    const preguntaElement = document.getElementById("pregunta");
    const opcionesElement = document.getElementById("opciones");
    const resultadoElement = document.getElementById("resultado");
    console.log(llenarVector());
    const pregunta = preguntas[preguntaActual];
    console.log(pregunta);
    preguntaElement.textContent = pregunta.question;
    opcionesElement.innerHTML = "";

    const botonOpcion1 = document.createElement("opciones");
    botonOpcion1.textContent = preguntas[preguntaActual].answer_1;
    botonOpcion1.addEventListener("click", () => verificarRespuesta(1));
    opcionesElement.appendChild(document.createElement("li")).appendChild(botonOpcion1);
    console.log(opcionesElement);    

    

    const botonOpcion2 = document.createElement("opciones");
    const botonOpcion3 = document.createElement("opciones");
    botonOpcion2.textContent = preguntas[preguntaActual].answer_2;
    botonOpcion3.textContent =  preguntas[preguntaActual].answer_3;
    botonOpcion2.addEventListener("click", () => verificarRespuesta(2));
    botonOpcion3.addEventListener("click", () => verificarRespuesta(3));
    opcionesElement.appendChild(document.createElement("li")).appendChild(botonOpcion2);
    opcionesElement.appendChild(document.createElement("li")).appendChild(botonOpcion3);
    
    resultadoElement.textContent = "";
}}
let puntos = 0
function verificarRespuesta(respuestaSeleccionada) {
    console.log("nashe",respuestaSeleccionada);
    const preguntaElement = document.getElementById("pregunta");
    const opcionesElement = document.getElementById("opciones");
    const resultadoElement = document.getElementById("resultado");
    const respuestaseleccionada = preguntas[respuestaSeleccionada][4]
    if (respuestaSeleccionada==1) {
        puntos+=1
        preguntaElement.textContent = "";
        opcionesElement.innerHTML = "";
        resultadoElement.textContent = "¡Respuesta correcta! Obtienes 1 punto.";
          
    } 
    else {
        preguntaElement.textContent = "";
        opcionesElement.innerHTML = "";
        resultadoElement.textContent = "Respuesta incorrecta. No obtienes puntos.";  
         
    }
    preguntaActual+=1;
    if (preguntaActual >= preguntas.length) {
        const preguntaElement = document.getElementById("pregunta");
        preguntaElement.textContent = "FIN DEL JUEGO";
        enviarPuntos()
        const opcionesElement = document.getElementById("opciones");
        opcionesElement.innerHTML = "";

        const resultadoElement = document.getElementById("resultado");
        resultadoElement.textContent = "Puntaje obtenido: " + puntos;
        return;
    }
    setTimeout(() => {
        mostrarPregunta();
      }, 1500); 
    
}

