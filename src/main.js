import { agregarEmpleado, obtenerEmpleados, editarEmpleado, eliminarEmpleado } from './employees.js';
import { agregarProyecto, obtenerProyectos, editarProyecto, eliminarProyecto } from './projects.js';
import { agregarParticipacion, obtenerParticipaciones} from './participations.js';
// Función para limpiar el contenido de <main>
const limpiarMain = () => {
    document.querySelector('main').innerHTML = '';
};
//------------------------------------------------------------------------------------------------------
//----------------------------
//Definimos las fuciones que tienen que ver con empleado:
//Funcion Crear Empleado:
// Función para generar el formulario de crear empleado
// Función para generar el formulario de crear empleado
const generarFormularioCrearEmpleado = () => {
    limpiarMain(); // Limpiar el contenido de <main> antes de mostrar el formulario

    // Crear los elementos del formulario dinámicamente
    const formulario = document.createElement('form');
    formulario.id = 'formCrearEmpleado';

    const titulo = document.createElement('h2');
    titulo.textContent = 'Crear Empleado';
    formulario.appendChild(titulo);

    const labelNombre = document.createElement('label');
    labelNombre.setAttribute('for', 'nuevoNombre');
    labelNombre.textContent = 'Nombre:';
    formulario.appendChild(labelNombre);

    const inputNombre = document.createElement('input');
    inputNombre.type = 'text';
    inputNombre.id = 'nuevoNombre';
    inputNombre.required = true;
    formulario.appendChild(inputNombre);

    const labelPuesto = document.createElement('label');
    labelPuesto.setAttribute('for', 'nuevoPuesto');
    labelPuesto.textContent = 'Puesto:';
    formulario.appendChild(labelPuesto);

    const inputPuesto = document.createElement('input');
    inputPuesto.type = 'text';
    inputPuesto.id = 'nuevoPuesto';
    inputPuesto.required = true;
    formulario.appendChild(inputPuesto);

    const labelSalario = document.createElement('label');
    labelSalario.setAttribute('for', 'nuevoSalario');
    labelSalario.textContent = 'Salario:';
    formulario.appendChild(labelSalario);

    const inputSalario = document.createElement('input');
    inputSalario.type = 'number';
    inputSalario.id = 'nuevoSalario';
    inputSalario.required = true;
    formulario.appendChild(inputSalario);

    const buttonCrearEmpleado = document.createElement('button');
    buttonCrearEmpleado.type = 'submit';
    buttonCrearEmpleado.textContent = 'Crear Empleado';
    formulario.appendChild(buttonCrearEmpleado);

    // Agregar el formulario al <main>
    document.querySelector('main').appendChild(formulario);

    // Asignar evento para crear el empleado
    formulario.addEventListener('submit', (event) => {
        event.preventDefault();

        const nombre = inputNombre.value;
        const puesto = inputPuesto.value;
        const salario = parseFloat(inputSalario.value);

        if (nombre && puesto && salario) {
            // Llamar a la función para agregar un empleado (deberías tenerla importada)
            agregarEmpleado(nombre, puesto, salario);

            // Mostrar mensaje de éxito
            alert("Empleado creado correctamente.");

            // Reseteamos los campos sin eliminar el formulario
            formulario.reset();  // Esto resetea todos los campos del formulario
        } else {
            alert("Por favor, completa todos los campos.");
        }
    });
};
// Evento para el botón de "Crear Empleado"
document.getElementById('crearEmpleado').addEventListener('click', generarFormularioCrearEmpleado);
//------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------
//Funcion de mostrar empleado
// Función para mostrar los empleados en la interfaz

const mostrarEmpleados = () => {
    limpiarMain(); // Limpiar el contenido de main antes de mostrar los empleados

    const empleados = obtenerEmpleados();

    // Crear contenedor principal
    const contenedorEmpleados = document.createElement('div');
    contenedorEmpleados.classList.add('contenedor-tabla-empleados'); // Clase para estilos

    // Crear título
    const titulo = document.createElement('h2');
    titulo.textContent = 'Lista de Empleados Registrados';
    contenedorEmpleados.appendChild(titulo);

    if (empleados.length === 0) {
        const mensaje = document.createElement('p');
        mensaje.textContent = 'No hay empleados registrados.';
        contenedorEmpleados.appendChild(mensaje);
    } else {
        // Crear la tabla
        const tabla = document.createElement('table');
        tabla.classList.add('tabla-empleados'); // Clase para estilos

        // Crear la cabecera de la tabla
        const cabecera = document.createElement('thead');
        const filaCabecera = document.createElement('tr');

        // Encabezados de la tabla
        const encabezados = ['ID', 'Nombre', 'Puesto', 'Salario'];
        encabezados.forEach(encabezado => {
            const th = document.createElement('th');
            th.textContent = encabezado;
            filaCabecera.appendChild(th);
        });

        cabecera.appendChild(filaCabecera);
        tabla.appendChild(cabecera);

        // Crear el cuerpo de la tabla
        const cuerpo = document.createElement('tbody');

        empleados.forEach(empleado => {
            const fila = document.createElement('tr');

            // Datos del empleado en cada fila
            const columnas = ['id_empleado', 'nombre', 'puesto', 'salario'];
            columnas.forEach(campo => {
                const td = document.createElement('td');
                td.textContent = empleado[campo];
                fila.appendChild(td);
            });

            cuerpo.appendChild(fila);
        });

        tabla.appendChild(cuerpo);
        contenedorEmpleados.appendChild(tabla);
    }

    // Insertar contenedor en el main
    document.querySelector('main').appendChild(contenedorEmpleados);
};
// Asignar evento directamente
document.getElementById('verEmpleados').addEventListener('click', mostrarEmpleados);
//------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------

// Función para generar el formulario de eliminación de empleado
const generarFormularioEliminarEmpleado = () => {
    limpiarMain(); // Limpiar todo el contenido de main antes de generar el formulario

    // Crear el contenedor principal del formulario
    const contenedorFormulario = document.createElement('div');
    contenedorFormulario.id = 'formularioEliminarEmpleado';

    // Crear el título
    const titulo = document.createElement('h2');
    titulo.textContent = 'Eliminar Empleado';
    contenedorFormulario.appendChild(titulo);

    // Crear el label para el ID del empleado
    const labelID = document.createElement('label');
    labelID.setAttribute('for', 'idEmpleadoEliminar');
    labelID.textContent = 'ID del Empleado:';
    contenedorFormulario.appendChild(labelID);

    // Crear el input para el ID del empleado
    const inputID = document.createElement('input');
    inputID.setAttribute('type', 'number');
    inputID.id = 'idEmpleadoEliminar';
    inputID.setAttribute('placeholder', 'Ingrese el ID del empleado a eliminar');
    contenedorFormulario.appendChild(inputID);

    // Crear el botón para validar y eliminar
    const botonEliminar = document.createElement('button');
    botonEliminar.setAttribute('type', 'button');
    botonEliminar.id = 'validarEliminarEmpleado';
    botonEliminar.textContent = 'Validar y Eliminar';
    contenedorFormulario.appendChild(botonEliminar);

    // Crear el párrafo para mostrar mensajes
    const mensajeEliminar = document.createElement('p');
    mensajeEliminar.id = 'mensajeEliminarEmpleado';
    contenedorFormulario.appendChild(mensajeEliminar);

    // Insertar el formulario en el <main>
    document.querySelector('main').appendChild(contenedorFormulario);

    // Evento para validar y eliminar el empleado
    botonEliminar.addEventListener('click', () => {
        const idEmpleado = parseInt(inputID.value); // Obtenemos el ID ingresado
        const empleados = obtenerEmpleados(); // Obtenemos todos los empleados

        // Validar si el empleado existe
        const empleado = empleados.find(emp => emp.id_empleado === idEmpleado);

        if (empleado) {
            // Preguntar al usuario si está seguro de eliminar
            const confirmarEliminacion = confirm(`¿Está seguro de que desea eliminar al empleado con ID: ${idEmpleado}?`);

            if (confirmarEliminacion) {
                // Llamar a la función para eliminar el empleado
                eliminarEmpleado(idEmpleado);

                // Mostrar mensaje de éxito
                mensajeEliminar.textContent = 'Empleado eliminado correctamente.';

                // Limpiar el formulario o ocultarlo después de eliminar
                setTimeout(() => {
                    limpiarMain(); // Limpiamos todo el main después de 2 segundos
                }, 2000); // Esperamos 2 segundos para mostrar el mensaje antes de limpiar el formulario
            } else {
                mensajeEliminar.textContent = 'Eliminación cancelada.';
            }
        } else {
            mensajeEliminar.textContent = 'Empleado no encontrado.';
        }
    });
};
// Evento para el botón de "Eliminar Empleado"
document.getElementById('eliminarEmpleado').addEventListener('click', generarFormularioEliminarEmpleado);
//------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------

// Funcion de editar empleado

// Generar el formulario para editar empleado
const generarFormularioEditarEmpleado = () => {
    limpiarMain(); // Limpiar todo el contenido de main antes de generar el formulario

    // Crear el contenedor principal del formulario
    const contenedorFormulario = document.createElement('div');
    contenedorFormulario.id = 'formularioEditarEmpleado';

    // Crear el título
    const titulo = document.createElement('h2');
    titulo.textContent = 'Editar Empleado';
    contenedorFormulario.appendChild(titulo);

    // Crear el formulario
    const form = document.createElement('form');
    form.id = 'formEditarEmpleado';

    // Campo para el ID del empleado
    const labelID = document.createElement('label');
    labelID.setAttribute('for', 'idEmpleado');
    labelID.textContent = 'ID del Empleado:';
    form.appendChild(labelID);

    const inputID = document.createElement('input');
    inputID.setAttribute('type', 'number');
    inputID.id = 'idEmpleado';
    inputID.setAttribute('placeholder', 'Ingrese el ID del empleado');
    inputID.required = true;
    form.appendChild(inputID);

    // Botón para validar el empleado
    const botonValidar = document.createElement('button');
    botonValidar.setAttribute('type', 'button');
    botonValidar.id = 'validarEmpleado';
    botonValidar.textContent = 'Validar';
    form.appendChild(botonValidar);

    // Div para los campos de edición
    const divFormularioEmpleado = document.createElement('div');
    divFormularioEmpleado.id = 'formularioEmpleado';
    divFormularioEmpleado.style.display = 'none';

    const labelNombre = document.createElement('label');
    labelNombre.setAttribute('for', 'nuevoNombre');
    labelNombre.textContent = 'Nuevo Nombre:';
    divFormularioEmpleado.appendChild(labelNombre);

    const inputNombre = document.createElement('input');
    inputNombre.setAttribute('type', 'text');
    inputNombre.id = 'nuevoNombre';
    divFormularioEmpleado.appendChild(inputNombre);

    const labelPuesto = document.createElement('label');
    labelPuesto.setAttribute('for', 'nuevoPuesto');
    labelPuesto.textContent = 'Nuevo Puesto:';
    divFormularioEmpleado.appendChild(labelPuesto);

    const inputPuesto = document.createElement('input');
    inputPuesto.setAttribute('type', 'text');
    inputPuesto.id = 'nuevoPuesto';
    divFormularioEmpleado.appendChild(inputPuesto);

    const labelSalario = document.createElement('label');
    labelSalario.setAttribute('for', 'nuevoSalario');
    labelSalario.textContent = 'Nuevo Salario:';
    divFormularioEmpleado.appendChild(labelSalario);

    const inputSalario = document.createElement('input');
    inputSalario.setAttribute('type', 'number');
    inputSalario.id = 'nuevoSalario';
    divFormularioEmpleado.appendChild(inputSalario);

    const botonGuardar = document.createElement('button');
    botonGuardar.setAttribute('type', 'submit');
    botonGuardar.textContent = 'Guardar Cambios';
    divFormularioEmpleado.appendChild(botonGuardar);

    form.appendChild(divFormularioEmpleado);

    // Mensaje de éxito
    const mensajeExito = document.createElement('div');
    mensajeExito.id = 'mensajeExito';
    mensajeExito.style.display = 'none';
    mensajeExito.style.color = 'green';
    mensajeExito.innerHTML = '<p>Empleado editado correctamente</p>';
    form.appendChild(mensajeExito);

    // Agregar el formulario al contenedor
    contenedorFormulario.appendChild(form);

    // Insertar el contenedor en el main
    document.querySelector('main').appendChild(contenedorFormulario);

    // Asignar evento al botón de validar
    botonValidar.addEventListener('click', () => {
        const id_empleado = parseInt(inputID.value);
        const empleados = obtenerEmpleados();
        const empleado = empleados.find(emp => emp.id_empleado === id_empleado);

        if (empleado) {
            // Si el empleado existe, mostrar el resto del formulario
            divFormularioEmpleado.style.display = 'block';
            inputNombre.value = empleado.nombre;
            inputPuesto.value = empleado.puesto;
            inputSalario.value = empleado.salario;
            form.setAttribute('data-id-empleado', id_empleado);
        } else {
            alert('Empleado no encontrado');
            divFormularioEmpleado.style.display = 'none';
        }
    });

    // Asignar evento al formulario para guardar cambios
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const id_empleado = parseInt(form.getAttribute('data-id-empleado'));
        const nuevoNombre = inputNombre.value;
        const nuevoPuesto = inputPuesto.value;
        const nuevoSalario = parseFloat(inputSalario.value);

        // Llamar a la función para editar el empleado
        editarEmpleado(id_empleado, nuevoNombre, nuevoPuesto, nuevoSalario);

        // Mostrar mensaje de éxito
        mensajeExito.style.display = 'block';

        // Limpiar el formulario después de guardar, pero mantener el campo de ID para validación
        divFormularioEmpleado.style.display = 'none';
    });
};

// Evento para el botón de "Editar Empleado"
document.getElementById('editarEmpleado').addEventListener('click', generarFormularioEditarEmpleado);

//------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------
//FUNCIONES DE PROYECTOS
// Función para generar el formulario de Crear Proyecto
const generarFormularioCrearProyecto = () => {
    limpiarMain(); // Limpiar todo el contenido de main antes de generar el formulario

    // Crear el contenedor principal
    const contenedorFormulario = document.createElement('div');
    contenedorFormulario.id = 'formularioCrearProyecto';

    // Crear el título
    const titulo = document.createElement('h2');
    titulo.textContent = 'Crear Proyecto';
    contenedorFormulario.appendChild(titulo);

    // Crear el formulario
    const form = document.createElement('form');
    form.id = 'formCrearProyecto';

    // Campo: Nombre del Proyecto
    const labelNombre = document.createElement('label');
    labelNombre.setAttribute('for', 'nombreProyecto');
    labelNombre.textContent = 'Nombre del Proyecto:';
    form.appendChild(labelNombre);

    const inputNombre = document.createElement('input');
    inputNombre.setAttribute('type', 'text');
    inputNombre.id = 'nombreProyecto';
    inputNombre.required = true;
    form.appendChild(inputNombre);

    // Campo: Fecha de Inicio
    const labelFechaInicio = document.createElement('label');
    labelFechaInicio.setAttribute('for', 'fechaInicio');
    labelFechaInicio.textContent = 'Fecha de Inicio:';
    form.appendChild(labelFechaInicio);

    const inputFechaInicio = document.createElement('input');
    inputFechaInicio.setAttribute('type', 'date');
    inputFechaInicio.id = 'fechaInicio';
    inputFechaInicio.required = true;
    form.appendChild(inputFechaInicio);

    // Campo: Fecha de Fin
    const labelFechaFin = document.createElement('label');
    labelFechaFin.setAttribute('for', 'fechaFin');
    labelFechaFin.textContent = 'Fecha de Fin:';
    form.appendChild(labelFechaFin);

    const inputFechaFin = document.createElement('input');
    inputFechaFin.setAttribute('type', 'date');
    inputFechaFin.id = 'fechaFin';
    inputFechaFin.required = true;
    form.appendChild(inputFechaFin);

    // Botón de envío
    const botonSubmit = document.createElement('button');
    botonSubmit.setAttribute('type', 'submit');
    botonSubmit.textContent = 'Crear Proyecto';
    form.appendChild(botonSubmit);

    // Agregar el formulario al contenedor principal
    contenedorFormulario.appendChild(form);

    // Insertar el contenedor en el main
    document.querySelector('main').appendChild(contenedorFormulario);

    // Asignar el evento de submit al formulario
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const nombreProyecto = inputNombre.value;
        const fechaInicio = inputFechaInicio.value;
        const fechaFin = inputFechaFin.value;

        if (nombreProyecto && fechaInicio && fechaFin) {
            // Llamar a la función para agregar un proyecto
            agregarProyecto(nombreProyecto, fechaInicio, fechaFin);

            // Mostrar mensaje de éxito
            alert('Proyecto creado correctamente.');

            // Limpiar los campos del formulario pero mantener el formulario visible
            inputNombre.value = '';
            inputFechaInicio.value = '';
            inputFechaFin.value = '';
        } else {
            alert('Por favor, completa todos los campos.');
        }
    });
};

// Evento para el botón de "Crear Proyecto"
document.getElementById('crearProyecto').addEventListener('click', generarFormularioCrearProyecto);
//------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------
//Funcion de Ver Proyectos
const mostrarProyectos = () => {
    limpiarMain(); // Limpiar el contenido de main antes de mostrar los proyectos

    const proyectos = obtenerProyectos(); // Obtener todos los proyectos

    // Crear el contenedor principal
    const contenedorProyectos = document.createElement('div');
    contenedorProyectos.classList.add('contenedor-tabla-proyectos');

    // Crear el título
    const titulo = document.createElement('h2');
    titulo.textContent = 'Lista de Proyectos Registrados';
    contenedorProyectos.appendChild(titulo);

    // Verificar si hay proyectos registrados
    if (proyectos.length === 0) {
        const mensaje = document.createElement('p');
        mensaje.textContent = 'No hay proyectos registrados.';
        contenedorProyectos.appendChild(mensaje);
    } else {
        // Crear la tabla
        const tabla = document.createElement('table');
        tabla.classList.add('tabla-proyectos');

        // Crear la cabecera de la tabla
        const cabecera = document.createElement('thead');
        const filaCabecera = document.createElement('tr');

        ['ID', 'Nombre del Proyecto', 'Fecha de Inicio', 'Fecha de Fin'].forEach(texto => {
            const th = document.createElement('th');
            th.textContent = texto;
            filaCabecera.appendChild(th);
        });

        cabecera.appendChild(filaCabecera);
        tabla.appendChild(cabecera);

        // Crear el cuerpo de la tabla
        const cuerpo = document.createElement('tbody');

        proyectos.forEach(proyecto => {
            const fila = document.createElement('tr');

            ['id_proyecto', 'nombre_proyecto', 'fecha_inicio', 'fecha_fin'].forEach(campo => {
                const td = document.createElement('td');
                td.textContent = proyecto[campo];
                fila.appendChild(td);
            });

            cuerpo.appendChild(fila);
        });

        tabla.appendChild(cuerpo);
        contenedorProyectos.appendChild(tabla);
    }

    // Insertar el contenedor de proyectos en el main
    document.querySelector('main').appendChild(contenedorProyectos);
};

// Evento para mostrar los proyectos cuando se haga clic en "Ver Proyectos"
document.getElementById('verProyectos').addEventListener('click', mostrarProyectos);
//------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------
//Funcion editar Proyecto
const generarFormularioEditarProyecto = () => {
    limpiarMain(); // Limpiar el contenido del main antes de mostrar el formulario de edición

    // Crear contenedor principal
    const contenedorFormulario = document.createElement('div');
    contenedorFormulario.id = 'formEditarProyectoContainer';

    // Crear título
    const titulo = document.createElement('h2');
    titulo.textContent = 'Editar Proyecto';
    contenedorFormulario.appendChild(titulo);

    // Crear formulario
    const formulario = document.createElement('form');
    formulario.id = 'formEditarProyecto';

    // Campo de ID del proyecto
    const labelId = document.createElement('label');
    labelId.setAttribute('for', 'idProyecto');
    labelId.textContent = 'ID del Proyecto:';
    formulario.appendChild(labelId);

    const inputId = document.createElement('input');
    inputId.type = 'number';
    inputId.id = 'idProyecto';
    inputId.required = true;
    inputId.placeholder = 'Ingrese el ID del proyecto a editar';
    formulario.appendChild(inputId);

    // Botón de validación
    const botonValidar = document.createElement('button');
    botonValidar.type = 'button';
    botonValidar.id = 'validarProyecto';
    botonValidar.textContent = 'Validar';
    formulario.appendChild(botonValidar);

    // Contenedor oculto para los campos de edición
    const contenedorEdicion = document.createElement('div');
    contenedorEdicion.id = 'formularioProyecto';
    contenedorEdicion.style.display = 'none';

    // Nuevo nombre del proyecto
    const labelNombre = document.createElement('label');
    labelNombre.setAttribute('for', 'nuevoNombreProyecto');
    labelNombre.textContent = 'Nuevo Nombre del Proyecto:';
    contenedorEdicion.appendChild(labelNombre);

    const inputNombre = document.createElement('input');
    inputNombre.type = 'text';
    inputNombre.id = 'nuevoNombreProyecto';
    contenedorEdicion.appendChild(inputNombre);

    // Nueva fecha de inicio
    const labelFechaInicio = document.createElement('label');
    labelFechaInicio.setAttribute('for', 'nuevaFechaInicio');
    labelFechaInicio.textContent = 'Nueva Fecha de Inicio:';
    contenedorEdicion.appendChild(labelFechaInicio);

    const inputFechaInicio = document.createElement('input');
    inputFechaInicio.type = 'date';
    inputFechaInicio.id = 'nuevaFechaInicio';
    contenedorEdicion.appendChild(inputFechaInicio);

    // Nueva fecha de fin
    const labelFechaFin = document.createElement('label');
    labelFechaFin.setAttribute('for', 'nuevaFechaFin');
    labelFechaFin.textContent = 'Nueva Fecha de Fin:';
    contenedorEdicion.appendChild(labelFechaFin);

    const inputFechaFin = document.createElement('input');
    inputFechaFin.type = 'date';
    inputFechaFin.id = 'nuevaFechaFin';
    contenedorEdicion.appendChild(inputFechaFin);

    // Botón de guardar cambios
    const botonGuardar = document.createElement('button');
    botonGuardar.type = 'submit';
    botonGuardar.textContent = 'Guardar Cambios';
    contenedorEdicion.appendChild(botonGuardar);

    formulario.appendChild(contenedorEdicion);

    // Mensaje de éxito
    const mensajeExito = document.createElement('div');
    mensajeExito.id = 'mensajeExito';
    mensajeExito.style.display = 'none';
    mensajeExito.style.color = 'green';
    mensajeExito.textContent = 'Proyecto editado correctamente';
    formulario.appendChild(mensajeExito);

    contenedorFormulario.appendChild(formulario);

    // Insertar el contenedor en el main
    document.querySelector('main').appendChild(contenedorFormulario);

    // Asignar evento al botón de validación
    botonValidar.addEventListener('click', () => {
        const id_proyecto = parseInt(inputId.value);
        const proyectos = obtenerProyectos();
        const proyecto = proyectos.find(proyecto => proyecto.id_proyecto === id_proyecto);

        if (proyecto) {
            contenedorEdicion.style.display = 'block';
            inputNombre.value = proyecto.nombre_proyecto;
            inputFechaInicio.value = proyecto.fecha_inicio;
            inputFechaFin.value = proyecto.fecha_fin;

            formulario.setAttribute('data-id-proyecto', id_proyecto);
        } else {
            alert('Proyecto no encontrado');
            contenedorEdicion.style.display = 'none';
        }
    });

    // Asignar evento para guardar los cambios
    formulario.addEventListener('submit', (event) => {
        event.preventDefault();

        const id_proyecto = parseInt(formulario.getAttribute('data-id-proyecto'));
        const nuevoNombreProyecto = inputNombre.value;
        const nuevaFechaInicio = inputFechaInicio.value;
        const nuevaFechaFin = inputFechaFin.value;

        editarProyecto(id_proyecto, nuevoNombreProyecto, nuevaFechaInicio, nuevaFechaFin);

        mensajeExito.style.display = 'block';
        contenedorEdicion.style.display = 'none';
    });
};
// Evento para el botón de "Editar Proyecto"
document.getElementById('editarProyecto').addEventListener('click', generarFormularioEditarProyecto);
//------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------
//Funcion elilminar Proyecto
const generarFormularioEliminarProyecto = () => {
    limpiarMain(); // Limpiar el contenido del main antes de mostrar el formulario de eliminación

    // Crear contenedor principal
    const contenedorFormulario = document.createElement('div');
    contenedorFormulario.id = 'formEliminarProyectoContainer';

    // Crear título
    const titulo = document.createElement('h2');
    titulo.textContent = 'Eliminar Proyecto';
    contenedorFormulario.appendChild(titulo);

    // Crear formulario
    const formulario = document.createElement('form');
    formulario.id = 'formEliminarProyecto';

    // Campo para ID del proyecto a eliminar
    const labelId = document.createElement('label');
    labelId.setAttribute('for', 'idProyectoEliminar');
    labelId.textContent = 'ID del Proyecto a Eliminar:';
    formulario.appendChild(labelId);

    const inputId = document.createElement('input');
    inputId.type = 'number';
    inputId.id = 'idProyectoEliminar';
    inputId.required = true;
    inputId.placeholder = 'Ingrese el ID del proyecto a eliminar';
    formulario.appendChild(inputId);

    // Botón de eliminación
    const botonEliminar = document.createElement('button');
    botonEliminar.type = 'submit';
    botonEliminar.textContent = 'Eliminar Proyecto';
    formulario.appendChild(botonEliminar);

    contenedorFormulario.appendChild(formulario);

    // Mensaje de éxito
    const mensajeExito = document.createElement('div');
    mensajeExito.id = 'mensajeExitoEliminar';
    mensajeExito.style.display = 'none';
    mensajeExito.style.color = 'green';
    mensajeExito.textContent = 'Proyecto eliminado correctamente';
    contenedorFormulario.appendChild(mensajeExito);

    // Mensaje de error
    const mensajeError = document.createElement('div');
    mensajeError.id = 'mensajeErrorEliminar';
    mensajeError.style.display = 'none';
    mensajeError.style.color = 'red';
    mensajeError.textContent = 'Proyecto no encontrado';
    contenedorFormulario.appendChild(mensajeError);

    // Insertar el contenedor en el main
    document.querySelector('main').appendChild(contenedorFormulario);

    // Asignar evento al formulario de eliminación
    formulario.addEventListener('submit', (event) => {
        event.preventDefault();

        const id_proyectoEliminar = parseInt(inputId.value);
        const proyectos = obtenerProyectos();
        const proyectoExistente = proyectos.find(proyecto => proyecto.id_proyecto === id_proyectoEliminar);

        if (proyectoExistente) {
            // Llamar a la función para eliminar el proyecto
            eliminarProyecto(id_proyectoEliminar);

            // Mostrar mensaje de éxito y ocultar mensaje de error
            mensajeExito.style.display = 'block';
            mensajeError.style.display = 'none';
        } else {
            // Si el proyecto no existe, mostrar mensaje de error
            mensajeError.style.display = 'block';
            mensajeExito.style.display = 'none';
        }
    });
};

// Evento para el botón de "Eliminar Proyecto"
document.getElementById('eliminarProyecto').addEventListener('click', generarFormularioEliminarProyecto);
//--------------------------------------------------
//Funciones de AsignarProyecto
const generarFormularioAsignarProyecto = () => {
    // Limpiar el contenido del main antes de mostrar el formulario
    limpiarMain();

    const formulario = `
        <h2>Asignar Proyecto a Empleado</h2>
        
        <!-- Parte de búsqueda de empleado -->
        <div>
            <h3>Buscar Empleado</h3>
            <label for="idEmpleado">ID Empleado:</label>
            <input type="number" id="idEmpleado" required>
            <button id="buscarEmpleado">Buscar Empleado</button>
            <div id="infoEmpleado"></div>
        </div>
        
        <!-- Parte de búsqueda de proyecto -->
        <div>
            <h3>Buscar Proyecto</h3>
            <label for="idProyecto">ID Proyecto:</label>
            <input type="number" id="idProyecto" required>
            <button id="buscarProyecto">Buscar Proyecto</button>
            <div id="infoProyecto"></div>
        </div>
        
        <!-- Asignar el proyecto con el rol -->
        <div>
            <h3>Asignar Rol</h3>
            <label for="rol">Rol:</label>
            <input type="text" id="rol" required>
            <button id="asignarRol" disabled>Asignar Proyecto</button>
        </div>
    `;

    // Insertar el formulario dentro del main
    document.querySelector('main').innerHTML = formulario;

    // Función para obtener empleado por ID desde el localStorage
    const obtenerEmpleadoPorId = (idEmpleado) => {
        const empleados = JSON.parse(localStorage.getItem('empleados')) || [];
        return empleados.find(empleado => empleado.id_empleado === parseInt(idEmpleado));
    };

    // Función para obtener proyecto por ID desde el localStorage
    const obtenerProyectoPorId = (idProyecto) => {
        const proyectos = JSON.parse(localStorage.getItem('proyectos')) || [];
        return proyectos.find(proyecto => proyecto.id_proyecto === parseInt(idProyecto));
    };

    // Evento para buscar al empleado por ID
    document.getElementById('buscarEmpleado').addEventListener('click', () => {
        const idEmpleado = document.getElementById('idEmpleado').value;
        if (idEmpleado) {
            const empleado = obtenerEmpleadoPorId(idEmpleado);
            const infoEmpleado = document.getElementById('infoEmpleado');
            if (empleado) {
                infoEmpleado.innerHTML = `
                    <p>Nombre: ${empleado.nombre}</p>
                    <p>Puesto: ${empleado.puesto}</p>
                    <p>Salario: $${empleado.salario}</p>
                `;
            } else {
                infoEmpleado.innerHTML = '<p>Empleado no encontrado.</p>';
            }
        } else {
            alert("Por favor ingresa un ID de empleado.");
        }
    });

    // Evento para buscar el proyecto por ID
    document.getElementById('buscarProyecto').addEventListener('click', () => {
        const idProyecto = document.getElementById('idProyecto').value;
        if (idProyecto) {
            const proyecto = obtenerProyectoPorId(idProyecto);
            const infoProyecto = document.getElementById('infoProyecto');
            if (proyecto) {
                infoProyecto.innerHTML = `
                    <p>Nombre del Proyecto: ${proyecto.nombre_proyecto}</p>
                    <p>Fecha de Inicio: ${proyecto.fecha_inicio}</p>
                    <p>Fecha de Fin: ${proyecto.fecha_fin}</p>
                `;
                document.getElementById('asignarRol').disabled = false; // Habilitar botón de asignar
            } else {
                infoProyecto.innerHTML = '<p>Proyecto no encontrado.</p>';
            }
        } else {
            alert("Por favor ingresa un ID de proyecto.");
        }
    });

    // Evento para asignar el proyecto al empleado
    document.getElementById('asignarRol').addEventListener('click', () => {
        const idEmpleado = document.getElementById('idEmpleado').value;
        const idProyecto = document.getElementById('idProyecto').value;
        const rol = document.getElementById('rol').value;

        if (idEmpleado && idProyecto && rol) {
            // Llamamos a la función para agregar la participación
            agregarParticipacion(idEmpleado, idProyecto, rol);

            // Mostrar mensaje de éxito
            alert("Empleado asignado al proyecto correctamente.");

            // Limpiar campos
            document.getElementById('idEmpleado').value = '';
            document.getElementById('idProyecto').value = '';
            document.getElementById('rol').value = '';
            document.getElementById('infoEmpleado').innerHTML = '';
            document.getElementById('infoProyecto').innerHTML = '';
            document.getElementById('asignarRol').disabled = true;
        } else {
            alert("Por favor, completa todos los campos.");
        }
    });
};


// Llamamos a la función para generar el formulario cuando el botón de asignar se haga clic


//--------------------------------------------------------
const mostrarInformacionGrupo = () => {
    limpiarMain(); // Limpiar el contenido del main antes de mostrar la información

    const contenedorInformacion = document.createElement('div');
    const titulo = document.createElement('h2');
    titulo.textContent = 'Información de Participaciones';
    contenedorInformacion.appendChild(titulo);

    // Obtener las participaciones del localStorage
    const participaciones = JSON.parse(localStorage.getItem('participaciones')) || [];

    if (participaciones.length === 0) {
        const mensaje = document.createElement('p');
        mensaje.textContent = 'No hay participaciones registradas.';
        contenedorInformacion.appendChild(mensaje);
    } else {
        // Crear tabla para mostrar las participaciones
        const tabla = document.createElement('table');
        tabla.classList.add('tabla-participaciones');

        // Crear encabezado de la tabla
        const thead = document.createElement('thead');
        const encabezadoFila = document.createElement('tr');
        const columnas = ['ID Empleado', 'ID Proyecto', 'Rol'];
        columnas.forEach(columna => {
            const th = document.createElement('th');
            th.textContent = columna;
            encabezadoFila.appendChild(th);
        });
        thead.appendChild(encabezadoFila);
        tabla.appendChild(thead);

        // Crear cuerpo de la tabla
        const tbody = document.createElement('tbody');
        participaciones.forEach(participacion => {
            const fila = document.createElement('tr');
            const celdaEmpleado = document.createElement('td');
            celdaEmpleado.textContent = participacion.id_empleado;

            const celdaProyecto = document.createElement('td');
            celdaProyecto.textContent = participacion.id_proyecto;

            const celdaRol = document.createElement('td');
            celdaRol.textContent = participacion.rol;

            fila.appendChild(celdaEmpleado);
            fila.appendChild(celdaProyecto);
            fila.appendChild(celdaRol);
            tbody.appendChild(fila);
        });

        tabla.appendChild(tbody);
        contenedorInformacion.appendChild(tabla);
    }

    // Insertar la información en el main
    document.querySelector('main').appendChild(contenedorInformacion);
};

// Evento para mostrar la información de las participaciones cuando se haga clic en el botón de mostrar
document.getElementById('informacion').addEventListener('click', mostrarInformacionGrupo);

//---------------------------------------
//Manejo de animacion dle aside
// Función para manejar el clic en Empleados y Proyectos
const toggleMenu = (menuId, iconId) => {
    const subMenu = document.getElementById(menuId);
    const icon = document.getElementById(iconId);
    
    // Si el submenú está oculto, lo mostramos
    if (subMenu.classList.contains('open')) {
        subMenu.classList.remove('open'); // Ocultar
        icon.classList.remove('open'); // Cambiar el icono
    } else {
        subMenu.classList.add('open'); // Mostrar
        icon.classList.add('open'); // Cambiar el icono
    }
};

// Asignar eventos de clic a los menús
document.getElementById('empleados').addEventListener('click', () => {
    toggleMenu('subEmpleados', 'iconEmpleados');
});

document.getElementById('proyectos').addEventListener('click', () => {
    toggleMenu('subProyectos', 'iconProyectos');
});

//-------------
//Mostrar Pagina Princiapl aplastando en el titulo

document.getElementById('titleAS').addEventListener('click', () => {
    // Ocultar el aside y mostrar el main
    location.reload(); // Recarga la página
});
