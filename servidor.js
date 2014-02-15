var express = require("express");
var dust = require("dustjs-linkedin"); // Para habilitar el sistema de templates MVC
var cons = require("consolidate");

//Prueba de cambios GitHub 

var app = express();
app.listen(8021);

//----CONFIGURACIÓN DE CARPETAS ESTÁTICAS-----
//1er. Parámetro: Nombre Lógico Tercer Parámetro: Nombre físico (carpeta real)
app.use("/css", express.static(__dirname + "/css"));
app.use("/css", express.directory(__dirname + "/css"));

app.use("/imagenes", express.static(__dirname + "/imagenes"));
app.use("/videos", express.static(__dirname + "/videos"));

//----CONFIGURACIÓN DEL SISTEMA DE TEMPLATES-----
//Le decimes qué sistema de Templates usamos
app.engine("dust", cons.dust); 

//Indica qué carpeta contiene nuestras vistas
app.set("views", __dirname + "/vistas");

//Define cuál es la extensión por default de las vistas 
app.set("view engine","dust");


//Para habilitar recepción de parámetros de tipo Post
app.use(express.urlencoded());

//-----DEFINICIÓN DE RUTAS-----
app.get("/inicio2", function(req, res){
	res.send("Binvenido a Mi Pagina");
});

app.get("/", function(req, res){
	//Aqui de alguna forma consulto una base
	//La variable frase contiene el resultado de esa base.
	var frase = "Hola a Todos";
	
	res.render("index", {
		frase: frase,
		datos: {
			nombre: "Mariana",
			apellido: "Sánchez"
		}
	});
});

app.get("/contacto", function(req, res){
	//Abre un archivo
	res.render("contacto");
});



//req = request = Datos que envia el usuario
//res = response = Lo que le mostramos al usuario
app.post("/suscribir", function(req, res){
	console.log("El email es:" + req.body.email);
	res.send("Info Recibida");	
});

app.post("/contactar", function(req, res){
	console.log("Nombre:" + req.body.name);
	console.log("Email:" + req.body.email);
	console.log("URL:" + req.body.url);
	console.log("Edad:" + req.body.edad);
	console.log("Dudas:" + req.body.dudas);
	
	res.send("Datos Enviados");
});

console.log("Hola Mundo");
