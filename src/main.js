import { agregarEmpleado, obtenerEmpleados, editarEmpleado, eliminarEmpleado } from './employees.js';
import { agregarProyecto, obtenerProyectos, editarProyecto, eliminarProyecto } from './projects.js';
import { agregarParticipacion, obtenerParticipaciones, eliminarParticipacion } from './participations.js';

//----------------------------
//Definimos las fuciones que tienen que ver con empleado:
// Funcion de editar empleado

// Función para generar el formulario de edición de empleado
const generarFormularioEditarEmpleado = (empleado) => {
    const formulario = `
        <h2>Editar Empleado</h2>
        <form id="formEditarEmpleado">
            <label for="idEmpleado">ID del Empleado:</label>
            <input type="number" id="idEmpleado" value="${empleado.id_empleado}" disabled>

            <label for="nuevoNombre">Nuevo Nombre:</label>
            <input type="text" id="nuevoNombre" value="${empleado.nombre}">

            <label for="nuevoPuesto">Nuevo Puesto:</label>
            <input type="text" id="nuevoPuesto" value="${empleado.puesto}">

            <label for="nuevoSalario">Nuevo Salario:</label>
            <input type="number" id="nuevoSalario" value="${empleado.salario}">

            <button type="submit">Guardar Cambios</button>
        </form>
    `;
    
    document.getElementById('formularioEditarEmpleado').innerHTML = formulario;

    // Asignar evento para guardar cambios
    document.getElementById('formEditarEmpleado').addEventListener('submit', (event) => {
        event.preventDefault();

        const id_empleado = empleado.id_empleado;
        const nuevoNombre = document.getElementById('nuevoNombre').value;
        const nuevoPuesto = document.getElementById('nuevoPuesto').value;
        const nuevoSalario = parseFloat(document.getElementById('nuevoSalario').value);

        // Llamar a la función editada que ya está importada desde employees.js
        editarEmpleado(id_empleado, nuevoNombre, nuevoPuesto, nuevoSalario);

        // Limpiar el formulario después de guardar
        document.getElementById('formularioEditarEmpleado').innerHTML = '';
    });
};

// Función para cargar el formulario de un empleado a editar
const cargarFormularioEditarEmpleado = () => {
    const empleados = obtenerEmpleados();
    const id_empleado = prompt("Ingrese el ID del empleado a editar:");

    const empleado = empleados.find(emp => emp.id_empleado === parseInt(id_empleado));

    if (empleado) {
        generarFormularioEditarEmpleado(empleado);
    } else {
        alert('Empleado no encontrado');
    }
};

// Evento para el botón de "Editar Empleado"
document.getElementById('editarEmpleado').addEventListener('click', cargarFormularioEditarEmpleado);


agregarEmpleado('Jose', 'gerente', 5600);