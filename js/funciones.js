window.addEventListener('load', inicio);

let datos = ""
let comprados = 0
let total = 0;

if (!localStorage.getItem('carrito')){
  comprados = 0
} else {
  comprados = JSON.parse(localStorage.getItem('carrito')).length;
}

function inicio(){
  carrito = new Carrito;
  document.getElementById("compras").innerHTML = comprados;
  document.getElementById("guitarra1").addEventListener("click", comprarArticuloUno);
  document.getElementById("guitarra2").addEventListener("click", comprarArticuloDos);
  document.getElementById("guitarra3").addEventListener("click", comprarArticuloTres);
  cargarDatosEnTabla(JSON.parse(localStorage.getItem('carrito')));
}

async function comprarArticuloUno(){
	const response = await fetch("js/data.json");
	datos = await response.json();
	let articulo = new Articulo(datos[0].titulo, datos[0].precio);
	carrito.agregarACarrito(articulo);
	cargarDatosEnTabla(JSON.parse(localStorage.getItem('carrito')));
	comprados = JSON.parse(localStorage.getItem('carrito')).length;
	document.getElementById("compras").innerHTML = comprados;
}

async function run() {
  await comprarArticuloUno();
  document.getElementById('carouselArticle').innerHTML = "<img src='https://shorturl.at/gtLS4' id='loadingImage'/> <p>Loading</p>";
}
// this runs first
run();

async function comprarArticuloDos(){
	const response = await fetch("js/data.json");
	datos = await response.json();
	let articulo = new Articulo(datos[1].titulo, datos[1].precio);
	carrito.agregarACarrito(articulo);
	cargarDatosEnTabla(JSON.parse(localStorage.getItem('carrito')));
	comprados = JSON.parse(localStorage.getItem('carrito')).length;
	document.getElementById("compras").innerHTML = comprados;
}

async function comprarArticuloTres(){
	const response = await fetch("js/data.json");
	datos = await response.json();
	let articulo = new Articulo(datos[2].titulo, datos[2].precio);
	carrito.agregarACarrito(articulo);
	cargarDatosEnTabla(JSON.parse(localStorage.getItem('carrito')));
	comprados = JSON.parse(localStorage.getItem('carrito')).length;
	document.getElementById("compras").innerHTML = comprados;
}

function cargarDatosEnTabla(lista){
	let html = "<table border='1|1'>";
	total = 0;
	if (lista == null){
		html = "<p> El carrito esta vacio </p>";
	} else {
		html += "<tr><td>Nombre</td><td>Precio</td></tr>"
		for (let i = 0; i < lista.length; i++) {
			html+="<tr>";
			html+="<td>"+lista[i].titulo+"</td>";
			html+="<td>"+lista[i].precio+"</td>";
			html+="</tr>";
			total += lista[i].precio;
		}
		html+="</table>";
		html+="<p>Total: USD " +total+"</p>";
	}
	document.getElementById("box").innerHTML = html;
}

function finalizar(){
	if (comprados == 0){
		Swal.fire({
			title: 'No hay articulos en el carrito',
			text: 'Clickee en un articulo para agregarlo al carrito',
			icon: 'warning',
			confirmButtonText: 'Volver'
		})        
	} else {
		let texto = ""
		if (comprados > 1){
			texto = 'Se compraron un total de '+comprados+' articulos por un valor total de USD '+total;
		} else {
			texto = 'Se compro un articulo por un valor total de USD '+total;
		}
		Swal.fire({
			title: 'Gracias por su compra!',
			text: texto,
			icon: 'success',
			confirmButtonText: 'Genial'
		})
		vaciarCarrito();
	}
}

function vaciarCarrito(){
	if (comprados > 0){
		carrito.vaciarListaCarrito();
		localStorage.clear();
		cargarDatosEnTabla(null);
		comprados = 0;
		document.getElementById("compras").innerHTML = comprados;
	} else {
		Swal.fire({
			title: 'No hay articulos en el carrito',
			text: 'Clickee en un articulo para agregarlo al carrito',
			icon: 'warning',
			confirmButtonText: 'Volver'
		})  
	}
}
