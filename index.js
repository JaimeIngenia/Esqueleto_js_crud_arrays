
// *************************
// Objeto Principal*********
// *************************

const newProduct = {
    id:'',
    nombre:"",
    categoria:'',
    precio:"",
    cantidad:"",
    marca:"",
};

//Variables y constantes

let listDataBase= [];

let editando = false;

const formularioJs = document.querySelector('#formulario_html')
const nombreProductoJs = document.querySelector('#id_nombre_producto_html')
const categoriaProductoJs = document.querySelector('#id_categoria_producto_html')
const precioProductoJs = document.querySelector('#id_precio_producto_html')
const cantidadProductoJs = document.querySelector('#id_cantidad_producto_html')
const marcaProductoJs = document.querySelector('#id_marca_producto_html')
//Boton
const botonFormularioJs = document.querySelector('#btn_agregar_html')
//*************************
//Evento Principal*********
//*************************

formularioJs.addEventListener('submit', eventoPrincipalProducto)


//*************************
//lISTA DE FUNCIONES*******
//*************************

function eventoPrincipalProducto (e){
    
    e.preventDefault();
    //Verificación
    if( nombreProductoJs.value === '' ||
        categoriaProductoJs.value === ''  ||
        precioProductoJs.value === ''   ||
        cantidadProductoJs.value === '' ||
        marcaProductoJs.value === ''     
        )
    {
        alert('Todos los campos son obligatorios');
        return;
    }

    // Funcion ya principal

    if(editando){
        editandoProducto()
        editando = false;
    }
    else{
        newProduct.id        = Date.now();//202312101478
        newProduct.nombre    = nombreProductoJs.value;
        newProduct.categoria = categoriaProductoJs.value;
        newProduct.precio    = precioProductoJs.value;
        newProduct.cantidad  = cantidadProductoJs.value;
        newProduct.marca     = marcaProductoJs.value;
        // alert(JSON.stringify(newProduct, null, 2));
        
        agregarProduct() 
    }
}

//*************************
//lISTA DE FUNCIONES*******
//*************************


function agregarProduct( ){
    listDataBase.push({...newProduct})
    
    mostrarProductos();

    //limpiar los inputs
    formularioJs.reset();

    //Limpiar objeto
    limpiarObjeto();
}

function limpiarObjeto(){
    newProduct.id = '';
    newProduct.nombre = '';
    newProduct.categoria = '';
    newProduct.precio = '';
    newProduct.cantidad = '';
    newProduct.marca = '';
}


//*************************
//lISTA DE FUNCIONES*******
//*************************


function mostrarProductos(){

    limpiarHTML()
    // Div
    const divResultadoJs = document.getElementById('id_container_html')
    divResultadoJs.classList.add('div__padre');
    //recorrer
    listDataBase.forEach( _producto => {
        const {    
            id,
            nombre,
            categoria,
            precio,
            cantidad,
            marca, } = _producto

        //parrafo

        const parrafo = document.createElement('p');
        parrafo.textContent = `
            ${id} -
            ${nombre} -
            ${categoria} -
            ${precio} -
            ${cantidad} -
            ${marca} -
        `;
        parrafo.dataset.id = id;
        parrafo.classList.add('parrafo__hijo');
        //boton editar
        const btnEditarJs = document.createElement('button');
        btnEditarJs.textContent = 'Editar'
        btnEditarJs.classList.add('btn','btn-primary','col12');

        btnEditarJs.onclick = () => cargarProducto(_producto);

        //boton eliminar
        const btnEliminarJs = document.createElement('button');
        btnEliminarJs.textContent = 'Eliminar';
        btnEliminarJs.classList.add('btn', 'btn-danger');

        btnEliminarJs.onclick = () => elimianrProducto(id);

        const linea = document.createElement('hr');

        // ¿donde ponerlos? R:
        parrafo.appendChild(btnEditarJs)
        parrafo.appendChild(btnEliminarJs)
        divResultadoJs.appendChild(linea)
        divResultadoJs.appendChild(parrafo)
    } )

    
}

//*************************
//lISTA DE FUNCIONES*******
//*************************

function cargarProducto(producto) {
    const {    
        id,
        nombre,
        categoria,
        precio,
        cantidad,
        marca, } = producto;

    newProduct.id = id;
    
    nombreProductoJs.value = nombre;
    categoriaProductoJs.value = categoria;
    precioProductoJs.value = precio;
    cantidadProductoJs.value = cantidad;
    marcaProductoJs.value = marca;
    //cambiar el nombre del boton de guardar a actualizar
    formularioJs.querySelector('button[type="submit"]').textContent = 'Actualizar';

    editando = true;
}


//*************************
//lISTA DE FUNCIONES*******
//*************************

function editandoProducto(){
    newProduct.nombre = nombreProductoJs.value;
    newProduct.categoria = categoriaProductoJs.value;
    newProduct.precio = precioProductoJs.value;
    newProduct.cantidad = cantidadProductoJs.value;
    newProduct.marca = marcaProductoJs.value;


    listDataBase.map( _producto => {
        if(_producto.id ===  newProduct.id  ){
            _producto.id = newProduct.id;
            _producto.nombre = newProduct.nombre;
            _producto.categoria = newProduct.categoria;
            _producto.precio = newProduct.precio;
            _producto.cantidad = newProduct.cantidad;
            _producto.marca = newProduct.marca ;
        }
    }) 
    limpiarHTML();
    mostrarProductos();

    formularioJs.reset();

    formularioJs.querySelector('button[type="submit"]').textContent = 'Agregar';

    editando = false;
}


//*************************
//lISTA DE FUNCIONES*******
//*************************
function elimianrProducto(id){

    listDataBase = listDataBase.filter( producto => producto.id !== id)

    limpiarHTML();
    mostrarProductos();

}



//*************************
//lISTA DE FUNCIONES*******
//*************************

function limpiarHTML (){

    const divResultadoJs = document.getElementById('id_container_html')

    while(divResultadoJs.firstChild){
        divResultadoJs.removeChild(divResultadoJs.firstChild)
    }

}

