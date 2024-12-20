import { agregarEmpleado, obtenerEmpleados, editarEmpleado, eliminarEmpleado } from './employees.js';
import { agregarProyecto, obtenerProyectos, editarProyecto, eliminarProyecto } from './projects.js';
import { agregarParticipacion, obtenerParticipaciones, eliminarParticipacion } from './participations.js';
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
    
    const formulario = `
        <h2>Crear Empleado</h2>
        <form id="formCrearEmpleado">
            <label for="nuevoNombre">Nombre:</label>
            <input type="text" id="nuevoNombre" required>

            <label for="nuevoPuesto">Puesto:</label>
            <input type="text" id="nuevoPuesto" required>

            <label for="nuevoSalario">Salario:</label>
            <input type="number" id="nuevoSalario" required>

            <button type="submit">Crear Empleado</button>
        </form>
    `;
    
    // Ahora agregamos el formulario al <main> directamente
    document.querySelector('main').innerHTML = formulario;

    // Asignar evento para crear el empleado
    document.getElementById('formCrearEmpleado').addEventListener('submit', (event) => {
        event.preventDefault();

        const nombre = document.getElementById('nuevoNombre').value;
        const puesto = document.getElementById('nuevoPuesto').value;
        const salario = parseFloat(document.getElementById('nuevoSalario').value);

        if (nombre && puesto && salario) {
            // Llamar a la función para agregar un empleado (deberías tenerla importada)
            agregarEmpleado(nombre, puesto, salario);

            // Mostrar mensaje de éxito
            alert("Empleado creado correctamente.");

            // Reseteamos los campos sin eliminar el formulario
            document.getElementById('formCrearEmpleado').reset();  // Esto resetea todos los campos del formulario
        } else {
            alert("Por favor, completa todos los campos.");
        }
    });
};

// Función para cargar el formulario de crear empleado
const cargarFormularioCrearEmpleado = () => {
    generarFormularioCrearEmpleado();
};

// Evento para el botón de "Crear Empleado"
document.getElementById('crearEmpleado').addEventListener('click', cargarFormularioCrearEmpleado);
//------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------
//Funcion de mostrar empleado
// Función para mostrar los empleados en la interfaz

const mostrarEmpleados = () => {
    limpiarMain(); // Limpiar el contenido de main antes de mostrar los empleados
    
    const empleados = obtenerEmpleados();
    const contenedorEmpleados = document.createElement('div');
    
    if (empleados.length === 0) {
        contenedorEmpleados.innerHTML = '<p>No hay empleados registrados.</p>';
    } else {
        const listaEmpleados = document.createElement('ul');
        
        empleados.forEach(empleado => {
            const empleadoElemento = document.createElement('li');
            empleadoElemento.textContent = `ID: ${empleado.id_empleado}, Nombre: ${empleado.nombre}, Puesto: ${empleado.puesto}, Salario: $${empleado.salario}`;
            listaEmpleados.appendChild(empleadoElemento);
        });
        
        contenedorEmpleados.appendChild(listaEmpleados);
    }

    // Insertamos el contenedor de empleados en el main
    document.querySelector('main').appendChild(contenedorEmpleados);
};

// Evento para mostrar los empleados cuando se haga clic en "Ver Empleados"
document.getElementById('verEmpleados').addEventListener('click', mostrarEmpleados);
//------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------

// Función para generar el formulario de eliminación de empleado
const generarFormularioEliminarEmpleado = () => {
    limpiarMain(); // Limpiar todo el contenido de main antes de generar el formulario

    const formularioEliminar = `
        <h2>Eliminar Empleado</h2>
        <label for="idEmpleadoEliminar">ID del Empleado:</label>
        <input type="number" id="idEmpleadoEliminar" placeholder="Ingrese el ID del empleado a eliminar">
        <button type="button" id="validarEliminarEmpleado">Validar y Eliminar</button>
        <p id="mensajeEliminarEmpleado"></p> <!-- Para mostrar mensajes -->
    `;

    // Insertamos el formulario en el main
    const contenedorFormulario = document.createElement('div');
    contenedorFormulario.id = 'formularioEliminarEmpleado';
    contenedorFormulario.innerHTML = formularioEliminar;
    document.querySelector('main').appendChild(contenedorFormulario);

    // Evento para validar y eliminar el empleado
    document.getElementById('validarEliminarEmpleado').addEventListener('click', () => {
        const idEmpleado = parseInt(document.getElementById('idEmpleadoEliminar').value); // Obtenemos el ID ingresado
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
                document.getElementById('mensajeEliminarEmpleado').innerHTML = 'Empleado eliminado correctamente.';
                
                // Limpiar el formulario o ocultarlo después de eliminar
                setTimeout(() => {
                    limpiarMain(); // Limpiamos todo el main después de 2 segundos
                }, 2000); // Esperamos 2 segundos para mostrar el mensaje antes de limpiar el formulario
            } else {
                document.getElementById('mensajeEliminarEmpleado').innerHTML = 'Eliminación cancelada.';
            }
        } else {
            document.getElementById('mensajeEliminarEmpleado').innerHTML = 'Empleado no encontrado.';
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

    const formulario = `
        <h2>Editar Empleado</h2>
        <form id="formEditarEmpleado">
            <label for="idEmpleado">ID del Empleado:</label>
            <input type="number" id="idEmpleado" placeholder="Ingrese el ID del empleado" required>

            <button type="button" id="validarEmpleado">Validar</button>

            <div id="formularioEmpleado" style="display: none;">
                <label for="nuevoNombre">Nuevo Nombre:</label>
                <input type="text" id="nuevoNombre">

                <label for="nuevoPuesto">Nuevo Puesto:</label>
                <input type="text" id="nuevoPuesto">

                <label for="nuevoSalario">Nuevo Salario:</label>
                <input type="number" id="nuevoSalario">

                <button type="submit">Guardar Cambios</button>
            </div>

            <div id="mensajeExito" style="display: none; color: green;">
                <p>Empleado editado correctamente</p>
            </div>
        </form>
    `;

    // Insertar el formulario en el main
    const contenedorFormulario = document.createElement('div');
    contenedorFormulario.id = 'formularioEditarEmpleado';
    contenedorFormulario.innerHTML = formulario;
    document.querySelector('main').appendChild(contenedorFormulario);

    // Asignar evento para el botón de validación
    document.getElementById('validarEmpleado').addEventListener('click', () => {
        const id_empleado = parseInt(document.getElementById('idEmpleado').value);
        const empleados = obtenerEmpleados();
        const empleado = empleados.find(emp => emp.id_empleado === id_empleado);

        if (empleado) {
            // Si el empleado existe, mostrar el resto del formulario
            document.getElementById('formularioEmpleado').style.display = 'block';
            document.getElementById('nuevoNombre').value = empleado.nombre;
            document.getElementById('nuevoPuesto').value = empleado.puesto;
            document.getElementById('nuevoSalario').value = empleado.salario;
            // Guardar el ID del empleado en el formulario
            document.getElementById('formEditarEmpleado').setAttribute('data-id-empleado', id_empleado);
        } else {
            // Si no existe, mostrar un mensaje de error
            alert('Empleado no encontrado');
            document.getElementById('formularioEmpleado').style.display = 'none';
        }
    });

    // Asignar evento para guardar los cambios
    document.getElementById('formEditarEmpleado').addEventListener('submit', (event) => {
        event.preventDefault();

        const id_empleado = parseInt(document.getElementById('formEditarEmpleado').getAttribute('data-id-empleado'));
        const nuevoNombre = document.getElementById('nuevoNombre').value;
        const nuevoPuesto = document.getElementById('nuevoPuesto').value;
        const nuevoSalario = parseFloat(document.getElementById('nuevoSalario').value);

        // Llamar a la función editada que ya está importada desde employees.js
        editarEmpleado(id_empleado, nuevoNombre, nuevoPuesto, nuevoSalario);

        // Mostrar mensaje de éxito
        document.getElementById('mensajeExito').style.display = 'block';

        // Limpiar el formulario después de guardar, pero mantener el campo de ID para validación
        document.getElementById('formularioEmpleado').style.display = 'none';
    });
};

// Función para cargar el formulario de un empleado a editar
const cargarFormularioEditarEmpleado = () => {
    generarFormularioEditarEmpleado();
};

// Evento para el botón de "Editar Empleado"
document.getElementById('editarEmpleado').addEventListener('click', cargarFormularioEditarEmpleado);

//------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------

