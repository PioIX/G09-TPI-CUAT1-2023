# G09-TPI-CUAT1-2023
PREGUNTADOS ODS

En este proyecto se combinan preguntas relacionadas a los objetivos de desarrollo sostenible, con la rpogramacion completa de un juego de preguntas. 
Programacion: 
 Login/registro.
 Base de Datos con usuarios.
 Ranking de los mejores (quienes mas puntos obtienen).
 Agregar y eliminar preguntas con el usuario administrador.

 BASE DE DATOS: 
 tabla puntos(
 punto_global (varchar) : donde guardamos los puntos del usuario
 usuario_punto (varchar) : donde guardamos el usuario 
 )
 tabla Usuarios (
ID int not null auto_increment PK,
usuario varchar(255): donde se guarda al usuario cuando se loguea
contraseña varchar(255) : guardamos la contraseña tambien
admin boolean : determinamos con true or false si es admin o no
 )
 tabla Questions(
ID_pregunta int not null auto_increment PK,
question varchar(255) : pregunta mostrada en pantalla
answer_1 varchar(255): respuesta 1 y siempre la correcta
answer_2 varchar(255): respuesta 2
answer_3 varchar(255): respuesta 3
 )

 Estas son las tablas usadas para combinar con la programacion en Visual Studio Code, donde utilizaremos los conocimientos sobre: JavaScript,handlebars, node (Back-end del juego) y HTML, css, js(Front-end del juego)

