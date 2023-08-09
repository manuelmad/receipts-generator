/* IMPORTAR ARCHIVO EXCEL PARA CREAR TABLA EN HTML */

// GENERAR ARRAY EN JS A PARTIR DE ARCHIVO EXCEL
let result = [];

// Evento para que al tocar el input file, se quite el archivo anterior
document.querySelector("#file").addEventListener("mousedown", () => {
	document.querySelector("#file").value = "";
});

// Evento para importar el archivo excel
document.querySelector("#file").addEventListener("change", function () {
	// Obtener el array de archivos cargados
	let filesArray = document.querySelector("#file").files;
	console.log(filesArray);
	// Obtener el archivo seleccionado
	let file = document.querySelector("#file").files[0];

	// Separar el nombre del archivo por punto (.) para obtener su tipo
	let type = file.name.split('.');

	// Mostrar un alert en caso de que el archivo no sea un excel y detener la función
	if (type[type.length - 1] !== 'xlsx' && type[type.length - 1] !== 'xls') {
		alert ('Solo puede seleccionar un archivo de Excel (.xls, .xlsx) para importar');
		return false;
	}

	const reader = new FileReader();
	reader.readAsBinaryString(file);
	reader.onload = (e) => {
		const data = e.target.result;
		const zzexcel = window.XLS.read(data, {
			type: 'binary'
 		});

		// const result = []; Lo saqué de la función para usarlo luego para crear una tabla
		
		// Limpio la variable result para que no se dupliquen sus elementos cada vez que cargamos un nuevo archivo
		result = [];
		// Código para recorrer las hojas del excel e ir agregado sus contenidos en el array "result"
		for (let i = 0; i < zzexcel.SheetNames.length; i++) {
			const newData = window.XLS.utils.sheet_to_json(zzexcel.Sheets[zzexcel.SheetNames[i]]);
			result.push(...newData)
		}
		console.log('result', result);

		// Invocar función que llena el filtro de búsqueda por nombre
		createFilter();
		console.log('namesList', namesList);
	}
});

// FUNCIÓN PARA LLENAR EL FILTRO DE BÚSQUEDA POR NOMBRE
// Array para agregar nombres de propietarios y que sirve de referencia luego para no agregar nombres repetidos
let namesList = [];
function createFilter() {
	result.forEach(element => {
		const filtroNombre = document.getElementById("filtro_busqueda");
		const option = document.createElement('option');
		
		const newOwner = element['Nombre Completo'];
		const newOwnerHouse = element['Casa N°'];

		const ref = namesList.find(item => item['Nombre Completo'] === newOwner);

		if(!ref) {
			namesList.push({'Nombre Completo': newOwner, 'Casa N°': newOwnerHouse});
			option.innerText = newOwner;
			option.value = newOwner;
			filtroNombre.appendChild(option);
		}
	});
}

// FUNCIÓN PARA AGREGAR EL NÚMERO DE CASA
function addHouse() {
	const selectedOwner = document.getElementById("selected_owner").value;
	let ref = namesList.find(element => element['Nombre Completo'] === selectedOwner);
	console.log(ref);

	if(ref) {
		namesList.forEach(element => {
			if(element['Nombre Completo'] === ref['Nombre Completo']) {
				document.getElementById("apart_propietario").innerText = element['Casa N°'];
				console.log('casa', element['Casa N°']);
			}
		});
	}
}


// FUNCIÓN PARA LLENAR TABLA
function llenarTabla() {
	const selectedOwner = document.getElementById("selected_owner").value;
	console.log(selectedOwner);

	// Notificar al usuario que debe elegir propietario
	if(selectedOwner === "") {
		alert("Por favor, elija un propietario para mostrar los valores en la tabla.");
		console.error("No se eligió propietario.");
		return;
	}

	const selectedYear = Number(document.getElementById("filtro_ano").value);
	console.log(selectedYear);

	let ref = result.find(item =>
		item['Nombre Completo'] === selectedOwner && item['Año'] === selectedYear
	);

	console.log(ref);

	if(ref) {
		document.getElementById("pago_enero_propietario").innerText = ref['Pago Enero'];
		document.getElementById("deuda_enero_propietario").innerText = ref['Deuda Enero'];

		document.getElementById("pago_febrero_propietario").innerText = ref['Pago Febrero'];
		document.getElementById("deuda_febrero_propietario").innerText = ref['Deuda Febrero'];

		document.getElementById("pago_marzo_propietario").innerText = ref['Pago Marzo'];
		document.getElementById("deuda_marzo_propietario").innerText = ref['Deuda Marzo'];

		document.getElementById("pago_abril_propietario").innerText = ref['Pago Abril'];
		document.getElementById("deuda_abril_propietario").innerText = ref['Deuda Abril'];

		document.getElementById("pago_mayo_propietario").innerText = ref['Pago Mayo'];
		document.getElementById("deuda_mayo_propietario").innerText = ref['Deuda Mayo'];

		document.getElementById("pago_junio_propietario").innerText = ref['Pago Junio'];
		document.getElementById("deuda_junio_propietario").innerText = ref['Deuda Junio'];

		document.getElementById("pago_julio_propietario").innerText = ref['Pago Julio'];
		document.getElementById("deuda_julio_propietario").innerText = ref['Deuda Julio'];

		document.getElementById("pago_agosto_propietario").innerText = ref['Pago Agosto'];
		document.getElementById("deuda_agosto_propietario").innerText = ref['Deuda Agosto'];

		document.getElementById("pago_septiembre_propietario").innerText = ref['Pago Septiembre'];
		document.getElementById("deuda_septiembre_propietario").innerText = ref['Deuda Septiembre'];

		document.getElementById("pago_octubre_propietario").innerText = ref['Pago Octubre'];
		document.getElementById("deuda_octubre_propietario").innerText = ref['Deuda Octubre'];

		document.getElementById("pago_noviembre_propietario").innerText = ref['Pago Noviembre'];
		document.getElementById("deuda_noviembre_propietario").innerText = ref['Deuda Noviembre'];

		document.getElementById("pago_diciembre_propietario").innerText = ref['Pago Diciembre'];
		document.getElementById("deuda_diciembre_propietario").innerText = ref['Deuda Diciembre'];
	}
}

/* APLICAR COLOR A LAS FILAS DEL CUERPO */
// Accedo al body de la tabla de pago de condominio
let cuerpo_tabla_propietarios = document.getElementById("cuerpo_tabla_propietarios");

// Cuento las filas del cuerpo de la tabla
let conteo_filas_propietarios = cuerpo_tabla_propietarios.getElementsByTagName("tr").length;

// Aplico color de fondo a los hijos impares del cuerpo de tabla
for(let i = 0; i < conteo_filas_propietarios; i++) {
	if(i % 2 !== 0) {
		let fila_propietario = cuerpo_tabla_propietarios.children[i];
		fila_propietario.style.backgroundColor = '#f1ccbc';
	}
}

// Crear array con los boolean checked de los input checkbox
let array_meses = [
	document.getElementById("enero"),
	document.getElementById("febrero"),
	document.getElementById("marzo"),
	document.getElementById("abril"),
	document.getElementById("mayo"),
	document.getElementById("junio"),
	document.getElementById("julio"),
	document.getElementById("agosto"),
	document.getElementById("septiembre"),
	document.getElementById("octubre"),
	document.getElementById("noviembre"),
	document.getElementById("diciembre"),
];

// Crear array vacío, para los boolean true del array anterior
let array_checked = [];

// Función para agregar los boolean true del array anterior al nuevo array
function agregarCheckedTrue() {
	array_meses.forEach(element => {
		if(element.checked === true) {
			array_checked.push(element);
		}
	});
}

// Función para cambiar el año en el número de recibo
function modSpan() {
	let year = document.getElementById("filtro_ano").value;
	document.getElementById("ano_recibo").innerText = year;
}


// Imprimir recibo en .pdf
let boton_recibo = document.getElementById("boton_recibo");
boton_recibo.addEventListener("click", crearPDF);

function crearPDF() {
	let doc = new jsPDF('landscape'); // 295 x 210

	// Método .split() para crear un array a partir del string de nombre y apellido que aparece en la tabla
	let nombre_propietario = document.getElementById("selected_owner").value;

	// Notificar al usuario que debe elegir propietario
	if(nombre_propietario === "") {
		alert("Por favor, elija un propietario para generar el recibo.");
		console.error("No se eligió propietario.");
		return;
	}

	let ano = Number(document.getElementById("filtro_ano").value);
	// let mes_vencido = document.getElementById("lista_meses").value;

	// Método .find() para encontrar cuál propietario de la base de datos coincide con el que está en la tabla
	let propietario = result.find(item => item['Nombre Completo'] === nombre_propietario && item['Año'] === ano);
	console.log('propietario', propietario);

	// Marco
	doc.line(10, 10, 285, 10); // línea horizontal superior //
	doc.line(10, 10, 10, 200); // línea vertical izquierda //
	doc.line(10, 200, 285, 200); // línea horizontal inferior //
	doc.line(285, 10, 285, 200); // línea vertical derecha //

	// Cabecera
	doc.setFontSize(10);
	doc.setFontType('bold');
	doc.text(50, 20, "Asociación Civil Junta Administradora Particular del Conjunto 16 Yacambu.");
	doc.text(43, 25, "Domicilio Fiscal: ");
	doc.setFontType('normal');
	doc.text(73, 25, "Carretera Maracaibo-Concepción Conjunto Residencial Yacambú (S/N).");
	doc.text(73, 30, "Urbanización Camino de la Lagunita - Maracaibo, Edo. Zulia");
	doc.setFontType('bold');
	doc.text(52, 35, "Email: ");
	doc.setFontType('normal');
	doc.text(65, 35, "conjuntoyacambu16@hotmail.com, conjunto16.yacambu@gmail.com");
	doc.setFontType('bold');
	doc.text(90, 40, "Teléfono: ");
	doc.setFontType('normal');
	doc.text(107, 40, "(0261) 4181529");
	doc.setFontType('bold');
	doc.text(230, 20, "R.I.F.: J-404852034");
	doc.setFontType('normal');
	doc.text(230, 25,`N° de recibo: `);
	doc.setTextColor(255, 0, 0); // Rojo
	let numero_recibo = document.getElementById("numero_recibo").value;
	doc.text(253, 25,`${ano}-${numero_recibo}`);
	let fecha = new Date();
	doc.setTextColor(0, 0, 0);
	doc.text(230, 30, "Fecha de emisión: " + fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear());

	// Fila Propietario
	doc.setFillColor(255, 87, 51); // orange
	doc.rect(10, 50, 20, 10, 'f'); // 3ra coordenada: ancho, 4° coordenada: alto
	doc.rect(238, 50, 20, 10, 'f'); // 3ra coordenada: ancho, 4° coordenada: alto
	doc.line(10, 50, 285, 50); // Línea horizontal superior
	doc.setTextColor(255,255,255); // Blanco
	doc.setFontType('bold');
	doc.text(12, 56, "Recibí de: ");
	doc.setTextColor(0,0,0); // Negro
	doc.setFontType('normal');
	doc.text(35, 56, propietario['Nombre Completo']);
	doc.setTextColor(255,255,255); // Blanco
	doc.setFontType('bold');
	doc.text(240, 56, "Casa N°: ");
	doc.setFontType('normal');
	doc.setTextColor(0,0,0); // Negro
	doc.text(263, 56, propietario['Casa N°']);
	doc.line(10, 60, 285, 60); // Línea horizontal inferior
	doc.line(30, 50, 30, 60); // Línea vertical separadora
	doc.line(238, 50, 238, 60); // Línea vertical separadora
	doc.line(258, 50, 258, 60); // Línea vertical separadora

	// Fila mensualidades
	doc.setFillColor(255, 87, 51); // orange
	doc.rect(10, 70, 275, 10, 'f'); // 3ra coordenada: ancho, 4° coordenada: alto
	doc.line(10, 70, 285, 70); // Línea horizontal superior
	doc.line(10, 80, 285, 80); // Línea horizontal inferior
	doc.setTextColor(255,255,255); // Blanco
	doc.setFontType('bold');
	doc.text(147.5, 76, `CUOTAS DE CONDOMINIO ${ano}`, 'center');
	doc.setFontType('normal');
	
	doc.line(10, 90, 285, 90); // Línea horizontal
	doc.line(10, 100, 285, 100); // Línea horizontal
	doc.line(10, 110, 285, 110); // Línea horizontal
	doc.line(10, 120, 285, 120); // Línea horizontal
	doc.line(98.3, 80, 98.3, 120); // Línea vertical separadora
	doc.line(196.67, 80, 196.67, 120); // Línea vertical separadora

	doc.setTextColor(0,0,0); // Negro
	doc.text(12, 86, `Ene-${ano}: `);
	doc.text(12, 96, `Feb-${ano}: `);
	doc.text(12, 106, `Mar-${ano}: `);
	doc.text(12, 116, `Abr-${ano}: `);

	doc.line(30, 80, 30, 120); // Línea vertical separadora

	// CÓDIGO PARA ASIGNAR EL ESTATUS MENSUAL DE CADA PROPIETARIO
	// En un condominio donde se conozcan los montos de todas las coutas del año, hay que agregar el condicional para que si se hace un pago adelantado, determinar si es completo o un abono.
	let check_enero;
	if(propietario['Pago Enero'] !== 0 && propietario['Deuda Enero'] === 0) {
		check_enero = "PAGADO";
	} else if (propietario['Pago Enero'] !== 0 && propietario['Deuda Enero'] !== 0) {
		check_enero = "ABONADO";
	} else if(propietario['Pago Enero'] === 0 && propietario['Deuda Enero'] !== 0) {
		check_enero = "MES ADEUDADO";
	} else if(propietario['Pago Enero'] === 0 && propietario['Deuda Enero'] === 0) {
		check_enero = "-";
	}
	doc.text(32, 86, check_enero);

	let check_febrero;
	if(propietario['Pago Febrero'] !== 0 && propietario['Deuda Febrero'] === 0) {
		check_febrero = "PAGADO";
	} else if (propietario['Pago Febrero'] !== 0 && propietario['Deuda Febrero'] !== 0) {
		check_febrero = "ABONADO";
	} else if(propietario['Pago Febrero'] === 0 && propietario['Deuda Febrero'] !== 0) {
		check_febrero = "MES ADEUDADO";
	} else if(propietario['Pago Febrero'] === 0 && propietario['Deuda Febrero'] === 0) {
		check_febrero = "-";
	}
	doc.text(32, 96, check_febrero);

	let check_marzo;
	if(propietario['Pago Marzo'] !== 0 && propietario['Deuda Marzo'] === 0) {
		check_marzo = "PAGADO";
	} else if (propietario['Pago Marzo'] !== 0 && propietario['Deuda Marzo'] !== 0) {
		check_marzo = "ABONADO";
	} else if(propietario['Pago Marzo'] === 0 && propietario['Deuda Marzo'] !== 0) {
		check_marzo = "MES ADEUDADO";
	} else if(propietario['Pago Marzo'] === 0 && propietario['Deuda Marzo'] === 0) {
		check_marzo = "-";
	}
	doc.text(32, 106, check_marzo);

	let check_abril;
	if(propietario['Pago Abril'] !== 0 && propietario['Deuda Abril'] === 0) {
		check_abril = "PAGADO";
	} else if (propietario['Pago Abril'] !== 0 && propietario['Deuda Abril'] !== 0) {
		check_abril = "ABONADO";
	} else if(propietario['Pago Abril'] === 0 && propietario['Deuda Abril'] !== 0) {
		check_abril = "MES ADEUDADO";
	} else if(propietario['Pago Abril'] === 0 && propietario['Deuda Abril'] === 0) {
		check_abril = "-";
	}
	doc.text(32, 116, check_abril);

	doc.text(100.3, 86, `May-${ano}: `);
	doc.text(100.3, 96, `Jun-${ano}: `);
	doc.text(100.3, 106, `Jul-${ano}: `);
	doc.text(100.3, 116, `Ago-${ano}: `);

	doc.line(118.3, 80, 118.3, 120); // Línea vertical separadora

	let check_mayo;
	if(propietario['Pago Mayo'] !== 0 && propietario['Deuda Mayo'] === 0) {
		check_mayo = "PAGADO";
	} else if (propietario['Pago Mayo'] !== 0 && propietario['Deuda Mayo'] !== 0) {
		check_mayo = "ABONADO";
	} else if(propietario['Pago Mayo'] === 0 && propietario['Deuda Mayo'] !== 0) {
		check_mayo = "MES ADEUDADO";
	} else if(propietario['Pago Mayo'] === 0 && propietario['Deuda Mayo'] === 0) {
		check_mayo = "-";
	}
	doc.text(120.3, 86, check_mayo);

	let check_junio;
	if(propietario['Pago Junio'] !== 0 && propietario['Deuda Junio'] === 0) {
		check_junio = "PAGADO";
	} else if (propietario['Pago Junio'] !== 0 && propietario['Deuda Junio'] !== 0) {
		check_junio = "ABONADO";
	} else if(propietario['Pago Junio'] === 0 && propietario['Deuda Junio'] !== 0) {
		check_junio = "MES ADEUDADO";
	} else if(propietario['Pago Junio'] === 0 && propietario['Deuda Junio'] === 0) {
		check_junio = "-";
	}
	doc.text(120.3, 96, check_junio);

	let check_julio;
	if(propietario['Pago Julio'] !== 0 && propietario['Deuda Julio'] === 0) {
		check_julio = "PAGADO";
	} else if (propietario['Pago Julio'] !== 0 && propietario['Deuda Julio'] !== 0) {
		check_julio = "ABONADO";
	} else if(propietario['Pago Julio'] === 0 && propietario['Deuda Julio'] !== 0) {
		check_julio = "MES ADEUDADO";
	} else if(propietario['Pago Julio'] === 0 && propietario['Deuda Julio'] === 0) {
		check_julio = "-";
	}
	doc.text(120.3, 106, check_julio);

	let check_agosto;
	if(propietario['Pago Agosto'] !== 0 && propietario['Deuda Agosto'] === 0) {
		check_agosto = "PAGADO";
	} else if (propietario['Pago Agosto'] !== 0 && propietario['Deuda Agosto'] !== 0) {
		check_agosto = "ABONADO";
	} else if(propietario['Pago Agosto'] === 0 && propietario['Deuda Agosto'] !== 0) {
		check_agosto = "MES ADEUDADO";
	} else if(propietario['Pago Agosto'] === 0 && propietario['Deuda Agosto'] === 0) {
		check_agosto = "-";
	}
	doc.text(120.3, 116, check_agosto);

	doc.text(198.67, 86, `Sep-${ano}: `);
	doc.text(198.67, 96, `Oct-${ano}: `);
	doc.text(198.67, 106, `Nov-${ano}: `);
	doc.text(198.67, 116, `Dic-${ano}: `);

	doc.line(216.67, 80, 216.67, 120); // Línea vertical separadora

	let check_septiembre;
	if(propietario['Pago Septiembre'] !== 0 && propietario['Deuda Septiembre'] === 0) {
		check_septiembre = "PAGADO";
	} else if (propietario['Pago Septiembre'] !== 0 && propietario['Deuda Septiembre'] !== 0) {
		check_septiembre = "ABONADO";
	} else if(propietario['Pago Septiembre'] === 0 && propietario['Deuda Septiembre'] !== 0) {
		check_septiembre = "MES ADEUDADO";
	} else if(propietario['Pago Septiembre'] === 0 && propietario['Deuda Septiembre'] === 0) {
		check_septiembre = "-";
	}
	doc.text(218.67, 86, check_septiembre);

	let check_octubre;
	if(propietario['Pago Octubre'] !== 0 && propietario['Deuda Octubre'] === 0) {
		check_octubre = "PAGADO";
	} else if (propietario['Pago Octubre'] !== 0 && propietario['Deuda Octubre'] !== 0) {
		check_octubre = "ABONADO";
	} else if(propietario['Pago Octubre'] === 0 && propietario['Deuda Octubre'] !== 0) {
		check_octubre = "MES ADEUDADO";
	} else if(propietario['Pago Octubre'] === 0 && propietario['Deuda Octubre'] === 0) {
		check_octubre = "-";
	}
	doc.text(218.67, 96, check_octubre);

	let check_noviembre;
	if(propietario['Pago Noviembre'] !== 0 && propietario['Deuda Noviembre'] === 0) {
		check_noviembre = "PAGADO";
	} else if (propietario['Pago Noviembre'] !== 0 && propietario['Deuda Noviembre'] !== 0) {
		check_noviembre = "ABONADO";
	} else if(propietario['Pago Noviembre'] === 0 && propietario['Deuda Noviembre'] !== 0) {
		check_noviembre = "MES ADEUDADO";
	} else if(propietario['Pago Noviembre'] === 0 && propietario['Deuda Noviembre'] === 0) {
		check_noviembre = "-";
	}
	doc.text(218.67, 106, check_noviembre);

	let check_diciembre;
	if(propietario['Pago Diciembre'] !== 0 && propietario['Deuda Diciembre'] === 0) {
		check_diciembre = "PAGADO";
	} else if (propietario['Pago Diciembre'] !== 0 && propietario['Deuda Diciembre'] !== 0) {
		check_diciembre = "ABONADO";
	} else if(propietario['Pago Diciembre'] === 0 && propietario['Deuda Diciembre'] !== 0) {
		check_diciembre = "MES ADEUDADO";
	} else if(propietario['Pago Diciembre'] === 0 && propietario['Deuda Diciembre'] === 0) {
		check_diciembre = "-";
	}
	doc.text(218.67, 116, check_diciembre);


	// Fila cuotas especiales
	doc.setFillColor(255, 87, 51); // Orange
	doc.rect(10, 130, 275, 10, 'f'); // 3ra coordenada: ancho, 4° coordenada: alto
	doc.line(10, 130, 285, 130); // Línea horizontal superior
	doc.line(10, 140, 285, 140); // Línea horizontal inferior
	doc.setTextColor(255,255,255); // Blanco
	doc.setFontType('bold');
	doc.text(147.5, 136, "DETALLES DE PAGO", 'center');
	doc.setFontType('normal');

	doc.line(10, 150, 285, 150); // Línea horizontal
	doc.line(33, 140, 33, 150); // Línea vertical separadora
	doc.line(33, 150, 33, 160); // Línea vertical separadora
	doc.setTextColor(0,0,0); // Blanco
	doc.text(43.5, 146, "N° de Ref.:");
	doc.text(140, 146, "Banco:");
	doc.text(43.5, 156, "N° de Ref.:");
	doc.text(140, 156, "Banco:");
	doc.line(10, 160, 285, 160); // Línea horizontal

	array_checked = []; // Limpiar array de inputs checked
	agregarCheckedTrue(); // Invocar función para crear array de checkbox true

	doc.setTextColor(0,0,0); // Negro
	if(array_checked[0]) {
		doc.text(12, 146, `${array_checked[0].value}:`); // Primer mes seleccionado

		// Código para asignar número de referencia, banco y monto del primer mes seleccionado
		let ref_mes_1;
		let banco_mes_1;
		let monto_mes_1;
		let moneda_mes_1;

		if(array_checked[0].value == "Enero") {
			ref_mes_1 = propietario['N° Ref. Enero'];
			banco_mes_1 = propietario['Banco Enero'];
			monto_mes_1 = propietario['Pago Enero'];
			if(propietario['N° Ref. Enero'] == "EFECTIVO") {
				moneda_mes_1 = "($)";
			} else {
				moneda_mes_1 = "(Bs.)";
			}
		}
		else if(array_checked[0].value == "Febrero") {
			ref_mes_1 = propietario['N° Ref. Febrero'];
			banco_mes_1 = propietario['Banco Febrero'];
			monto_mes_1 = propietario['Pago Febrero'];
			if(propietario['N° Ref. Febrero'] == "EFECTIVO") {
				moneda_mes_1 = "($)";
			} else {
				moneda_mes_1 = "(Bs.)";
			}
		}
		else if(array_checked[0].value == "Marzo") {
			ref_mes_1 = propietario['N° Ref. Marzo'];
			banco_mes_1 = propietario['Banco Marzo'];
			monto_mes_1 = propietario['Pago Marzo'];
			if(propietario['N° Ref. Marzo'] == "EFECTIVO") {
				moneda_mes_1 = "($)";
			} else {
				moneda_mes_1 = "(Bs.)";
			}
		}
		else if(array_checked[0].value == "Abril") {
			ref_mes_1 = propietario['N° Ref. Abril'];
			banco_mes_1 = propietario['Banco Abril'];
			monto_mes_1 = propietario['Pago Abril'];
			if(propietario['N° Ref. Abril'] == "EFECTIVO") {
				moneda_mes_1 = "($)";
			} else {
				moneda_mes_1 = "(Bs.)";
			}
		}
		else if(array_checked[0].value == "Mayo") {
			ref_mes_1 = propietario['N° Ref. Mayo'];
			banco_mes_1 = propietario['Banco Mayo'];
			monto_mes_1 = propietario['Pago Mayo'];
			if(propietario['N° Ref. Mayo'] == "EFECTIVO") {
				moneda_mes_1 = "($)";
			} else {
				moneda_mes_1 = "(Bs.)";
			}
		}
		else if(array_checked[0].value == "Junio") {
			ref_mes_1 = propietario['N° Ref. Junio'];
			banco_mes_1 = propietario['Banco Junio'];
			monto_mes_1 = propietario['Pago Junio'];
			if(propietario['N° Ref. Junio'] == "EFECTIVO") {
				moneda_mes_1 = "($)";
			} else {
				moneda_mes_1 = "(Bs.)";
			}
		}
		else if(array_checked[0].value == "Julio") {
			ref_mes_1 = propietario['N° Ref. Julio'];
			banco_mes_1 = propietario['Banco Julio'];
			monto_mes_1 = propietario['Pago Julio'];
			if(propietario['N° Ref. Julio'] == "EFECTIVO") {
				moneda_mes_1 = "($)";
			} else {
				moneda_mes_1 = "(Bs.)";
			}
		}
		else if(array_checked[0].value == "Agosto") {
			ref_mes_1 = propietario['N° Ref. Agosto'];
			banco_mes_1 = propietario['Banco Agosto'];
			monto_mes_1 = propietario['Pago Agosto'];
			if(propietario['N° Ref. Agosto'] == "EFECTIVO") {
				moneda_mes_1 = "($)";
			} else {
				moneda_mes_1 = "(Bs.)";
			}
		}
		else if(array_checked[0].value == "Septiembre") {
			ref_mes_1 = propietario['N° Ref. Septiembre'];
			banco_mes_1 = propietario['Banco Septiembre'];
			monto_mes_1 = propietario['Pago Septiembre'];
			if(propietario['N° Ref. Septiembre'] == "EFECTIVO") {
				moneda_mes_1 = "($)";
			} else {
				moneda_mes_1 = "(Bs.)";
			}
		}
		else if(array_checked[0].value == "Octubre") {
			ref_mes_1 = propietario['N° Ref. Octubre'];
			banco_mes_1 = propietario['Banco Octubre'];
			monto_mes_1 = propietario['Pago Octubre'];
			if(propietario['N° Ref. Octubre'] == "EFECTIVO") {
				moneda_mes_1 = "($)";
			} else {
				moneda_mes_1 = "(Bs.)";
			}
		}
		else if(array_checked[0].value == "Noviembre") {
			ref_mes_1 = propietario['N° Ref. Noviembre'];
			banco_mes_1 = propietario['Banco Noviembre'];
			monto_mes_1 = propietario['Pago Noviembre'];
			if(propietario['N° Ref. Noviembre'] == "EFECTIVO") {
				moneda_mes_1 = "($)";
			} else {
				moneda_mes_1 = "(Bs.)";
			}
		}
		else if(array_checked[0].value == "Diciembre") {
			ref_mes_1 = propietario['N° Ref. Diciembre'];
			banco_mes_1 = propietario['Banco Diciembre'];
			monto_mes_1 = propietario['Pago Diciembre'];
			if(propietario['N° Ref. Diciembre'] == "EFECTIVO") {
				moneda_mes_1 = "($)";
			} else {
				moneda_mes_1 = "(Bs.)";
			}
		}
		doc.text(70, 146, `${ref_mes_1}`);
		doc.text(160, 146, `${banco_mes_1}`);
		doc.text(245, 146, `${monto_mes_1}`);
		doc.text(220, 146, `Monto ${moneda_mes_1}:`);
	}

	if(array_checked[1]) {
		doc.text(12, 156, `${array_checked[1].value}:`); // Segundo mes seleccionado

		// Código para asignar número de referencia, banco y monto del segundo mes seleccionado
		let ref_mes_2;
		let banco_mes_2;
		let monto_mes_2;
		let moneda_mes_2;

		if(array_checked[1].value == "Enero") {
			ref_mes_2 = propietario['N° Ref. Enero'];
			banco_mes_2 = propietario['Banco Enero'];
			monto_mes_2 = propietario['Pago Enero'];
			if(propietario['N° Ref. Enero'] == "EFECTIVO") {
				moneda_mes_2 = "($)";
			} else {
				moneda_mes_2 = "(Bs.)";
			}
		}
		else if(array_checked[1].value == "Febrero") {
			ref_mes_2 = propietario['N° Ref. Febrero'];
			banco_mes_2 = propietario['Banco Febrero'];
			monto_mes_2 = propietario['Pago Febrero'];
			if(propietario['N° Ref. Febrero'] == "EFECTIVO") {
				moneda_mes_2 = "($)";
			} else {
				moneda_mes_2 = "(Bs.)";
			}
		}
		else if(array_checked[1].value == "Marzo") {
			ref_mes_2 = propietario['N° Ref. Marzo'];
			banco_mes_2 = propietario['Banco Marzo'];
			monto_mes_2 = propietario['Pago Marzo'];
			if(propietario['N° Ref. Marzo'] == "EFECTIVO") {
				moneda_mes_2 = "($)";
			} else {
				moneda_mes_2 = "(Bs.)";
			}
		}
		else if(array_checked[1].value == "Abril") {
			ref_mes_2 = propietario['N° Ref. Abril'];
			banco_mes_2 = propietario['Banco Abril'];
			monto_mes_2 = propietario['Pago Abril'];
			if(propietario['N° Ref. Abril'] == "EFECTIVO") {
				moneda_mes_2 = "($)";
			} else {
				moneda_mes_2 = "(Bs.)";
			}
		}
		else if(array_checked[1].value == "Mayo") {
			ref_mes_2 = propietario['N° Ref. Mayo'];
			banco_mes_2 = propietario['Banco Mayo'];
			monto_mes_2 = propietario['Pago Mayo'];
			if(propietario['N° Ref. Mayo'] == "EFECTIVO") {
				moneda_mes_2 = "($)";
			} else {
				moneda_mes_2 = "(Bs.)";
			}
		}
		else if(array_checked[1].value == "Junio") {
			ref_mes_2 = propietario['N° Ref. Junio'];
			banco_mes_2 = propietario['Banco Junio'];
			monto_mes_2 = propietario['Pago Junio'];
			if(propietario['N° Ref. Junio'] == "EFECTIVO") {
				moneda_mes_2 = "($)";
			} else {
				moneda_mes_2 = "(Bs.)";
			}
		}
		else if(array_checked[1].value == "Julio") {
			ref_mes_2 = propietario['N° Ref. Julio'];
			banco_mes_2 = propietario['Banco Julio'];
			monto_mes_2 = propietario['Pago Julio'];
			if(propietario['N° Ref. Julio'] == "EFECTIVO") {
				moneda_mes_2 = "($)";
			} else {
				moneda_mes_2 = "(Bs.)";
			}
		}
		else if(array_checked[1].value == "Agosto") {
			ref_mes_2 = propietario['N° Ref. Agosto'];
			banco_mes_2 = propietario['Banco Agosto'];
			monto_mes_2 = propietario['Pago Agosto'];
			if(propietario['N° Ref. Agosto'] == "EFECTIVO") {
				moneda_mes_2 = "($)";
			} else {
				moneda_mes_2 = "(Bs.)";
			}
		}
		else if(array_checked[1].value == "Septiembre") {
			ref_mes_2 = propietario['N° Ref. Septiembre'];
			banco_mes_2 = propietario['Banco Septiembre'];
			monto_mes_2 = propietario['Pago Septiembre'];
			if(propietario['N° Ref. Septiembre'] == "EFECTIVO") {
				moneda_mes_2 = "($)";
			} else {
				moneda_mes_2 = "(Bs.)";
			}
		}
		else if(array_checked[1].value == "Octubre") {
			ref_mes_2 = propietario['N° Ref. Octubre'];
			banco_mes_2 = propietario['Banco Octubre'];
			monto_mes_2 = propietario['Pago Octubre'];
			if(propietario['N° Ref. Octubre'] == "EFECTIVO") {
				moneda_mes_2 = "($)";
			} else {
				moneda_mes_2 = "(Bs.)";
			}
		}
		else if(array_checked[1].value == "Noviembre") {
			ref_mes_2 = propietario['N° Ref. Noviembre'];
			banco_mes_2 = propietario['Banco Noviembre'];
			monto_mes_2 = propietario['Pago Noviembre'];
			if(propietario['N° Ref. Noviembre'] == "EFECTIVO") {
				moneda_mes_2 = "($)";
			} else {
				moneda_mes_2 = "(Bs.)";
			}
		}
		else if(array_checked[1].value == "Diciembre") {
			ref_mes_2 = propietario['N° Ref. Diciembre'];
			banco_mes_2 = propietario['Banco Diciembre'];
			monto_mes_2 = propietario['Pago Diciembre'];
			if(propietario['N° Ref. Diciembre'] == "EFECTIVO") {
				moneda_mes_2 = "($)";
			} else {
				moneda_mes_2 = "(Bs.)";
			}
		}

		doc.text(70, 156, `${ref_mes_2}`);
		doc.text(160, 156, `${banco_mes_2}`);
		doc.text(245, 156, `${monto_mes_2}`);
		doc.text(220, 156, `Monto ${moneda_mes_2}:`);
	}
	
	// Firma
	let administrador = "Richard Luzardo"
	doc.line(117.5, 185, 177.5, 185); // Línea horizontal
	doc.text(147.5, 190, `Aprobado por: ${administrador}`, 'center');
	doc.text(147.5, 195, `Administrador(a) del Condominio`, 'center');

	// Logo
	let img = new Image();
	img.src = "./img/logo-yacambu.png";
	doc.addImage(img, 15, 165, 90, 30);

	
	window.open(doc.output('bloburl'), '_blank'); // Para que el .pdf aparezca en una nueva ventana //
}