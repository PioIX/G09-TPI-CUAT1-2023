/*  Paquetes instalados: -g nodemon, express, express-handlebars, body-parser, mysql2
    Agregado al archivo "package.json" la línea --> "start": "nodemon index"
    
    Proyecto "Node_base"
    Desarrollo de Aplicaciones Informáticas - 5to Informática
    
    Docentes: Nicolás Facón, Martín Rivas
    
    Revisión 1 - Año 2021
*/
//Cargo librerías instaladas y necesarias
const express = require('express'); //Para el manejo del servidor Web
const exphbs  = require('express-handlebars'); //Para el manejo de los HTML
const bodyParser = require('body-parser'); //Para el manejo de los strings JSON
const MySQL = require('./modulos/mysql'); //Añado el archivo mysql.js presente en la carpeta módulos

const app = express(); //Inicializo express para el manejo de las peticiones

app.use(express.static('public')); //Expongo al lado cliente la carpeta "public"

app.use(bodyParser.urlencoded({ extended: false })); //Inicializo el parser JSON
app.use(bodyParser.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'})); //Inicializo Handlebars. Utilizo como base el layout "Main".
app.set('view engine', 'handlebars'); //Inicializo Handlebars

const Listen_Port = 3000; //Puerto por el que estoy ejecutando la página Web

app.listen(Listen_Port, function() {
    console.log('Servidor NodeJS corriendo en http://localhost:' + Listen_Port + '/');
});

/*
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
*/

let usu_log=-1
app.get('/', async function(req, res){
    console.log(req.query); 
    res.render('login', null); 
});

app.put('/login', async function(req, res){
    let consulta = await MySQL.realizarQuery(`SELECT * FROM Usuarios WHERE usuario = "${req.body.usuario}" AND contraseña = "${req.body.contraseña}"`)
    usu_log=req.body.usuario
    if (consulta.length > 0) {
        if(req.body.usuario =="a"){
            res.send({respuesta:true, admin:true})}
        else if (req.body.usuario!="a")
        res.send({respuesta: true, admin:false})}
    else{
        res.send({respuesta:false})   
    }});
    
app.get('/game', async function(req, res){
        console.log("Soy un pedido POST", req.body); 
        let preguntas=await MySQL.realizarQuery("select * FROM Questions")
        console.log(preguntas)
        res.render('game', null); 
    });
app.get('/tabladeusuarios', function(req, res){
    console.log("Soy un pedido POST", req.body); 
    res.render('tabladeusuarios', null); 
    });
app.get('/home', function(req, res){
        console.log("Soy un pedido POST", req.body); 
        res.render('home', null); 
    });

app.get('/admin', function(req, res){
    console.log(req.query); 
    res.render('admin', null);
   });
app.get('/index', function(req, res){
    console.log(req.query); 
    res.render('index', null);
   });

app.post('/registro', async function(req, res){
    let check_usuario= await (MySQL.realizarQuery(`select usuario from Usuarios WHERE usuario = "${req.body.usuario}"`))
    usu_log=req.body.usuario
    console.log(check_usuario)
    if (check_usuario.length == 0) {
        console.log(await (MySQL.realizarQuery("select * from Usuarios")))
        await MySQL.realizarQuery(`INSERT INTO Usuarios (usuario,contraseña,admin) VALUES ("${req.body.usuario}", "${req.body.contraseña}",0)`);
        await MySQL.realizarQuery(`INSERT INTO puntos (punto_global,usuario_punto) VALUES (0,"${req.body.usuario}")`);
        res.render('index', null)
       
    }else{
        console.log("Me fui")
        res.render('registro',{mensaje:"El usuario ya existe"});
    }
    
    });
app.get('/Registrar', function(req, res){
    console.log(req.query); 
    res.render('registro', null);
   });

app.put('/agregar', async function(req, res){
    let question = await MySQL.realizarQuery(`select question from Questions where question = "${req.body.question1}"`)
    let answer_1 = await MySQL.realizarQuery(`select answer_1 from Questions where answer_1 = "${req.body.question2}"`)
    let answer_2 = await MySQL.realizarQuery(`select answer_2 from Questions where answer_2 = "${req.body.question3}"`)
    let answer_3 = await MySQL.realizarQuery(`select answer_3 from Questions where answer_3 = "${req.body.question4}"`)
    console.log(question,answer_1,answer_2,answer_3)
    if (question.length > 0){
        if(answer_1.length >0){
            if(answer_2.length >0){
                if(answer_3.length >0){
                    res.send({validar:false})
                }
            }
        }
    }
    if (question.length == 0){
        await MySQL.realizarQuery(`insert into Questions (question,answer_1,answer_2,answer_3) values ("${req.body.question1}", "${req.body.question2}","${req.body.question3}","${req.body.question4}")`)
        res.send({validar:true})
        }  
});

app.get('/administrador2', function(req, res){
    console.log(req.query); 
    res.render('eliminarpreguntas', null);
   });
app.get('/administrador1', function(req, res){
    console.log(req.query); 
    res.render('agregarpregunta', null);
   });
app.put('/eliminar', async function(req, res){
let ID_pregunta = await MySQL.realizarQuery(`select ID_pregunta from Questions where ID_pregunta = "${req.body.pregunta}"`)
console.log(req.body.pregunta)
if (ID_pregunta.length > 0){
    await MySQL.realizarQuery(`delete from Questions Where ID_pregunta = "${req.body.pregunta}"`)
    res.send({validar:true})
}
if (ID_pregunta.length == 0){
    res.send({validar:false})
}
});
app.get('/agregar', function(req, res){
    console.log(req.query); 
    res.render('agregarpregunta', null);
   });
app.get('/eliminar', function(req, res){
    console.log(req.query); 
    res.render('eliminarpreguntas', null);
   });


app.get("/registro", function(req, res) {
    console.log("Soy un pedido GET del Registro");
    res.render("registro", null);   
});

app.put('/puntos', async function(req, res){
    let puntos2 = await MySQL.realizarQuery(`SELECT punto_global FROM puntos where usuario_punto = "${usu_log}"`)
    console.log("puntos",puntos2,usu_log, req.body.puntos)
    let puntos_nuevos = req.body.puntos + puntos2[0].punto_global
    puntos_actual=await MySQL.realizarQuery(`UPDATE puntos set punto_global = "${puntos_nuevos}" WHERE usuario_punto = "${usu_log}"`)
    res.send({puntos_actual:puntos_actual});
});

app.get('/preguntas', async function(req, res){
    let consulta = await MySQL.realizarQuery("SELECT * FROM Questions")
    console.log("opciones",consulta)
    res.send(consulta);
});

app.get('/tablapuntos', async function(req, res){
    traer_puntos = await MySQL.realizarQuery("select usuario_punto, punto_global from puntos order by punto_global desc")
    res.render('tablapuntos', {traer_puntos:traer_puntos}); 
});
