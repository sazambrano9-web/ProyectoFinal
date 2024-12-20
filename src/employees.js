// employees.js

// Obtener empleados desde localStorage o inicializar con un array vacío
let empleados = JSON.parse(localStorage.getItem('empleados')) || [];

// Función para agregar un empleado
export const agregarEmpleado = (nombre, puesto, salario) => {
    // Verificar si ya existe un empleado con el mismo nombre y puesto
    const existe = empleados.some(empleado => empleado.nombre === nombre && empleado.puesto === puesto);

    if (!existe) {
        const id_empleado = empleados.length > 0 ? empleados[empleados.length - 1].id_empleado + 1 : 1; // ID auto-incremental
        const nuevoEmpleado = { id_empleado, nombre, puesto, salario };
        empleados.push(nuevoEmpleado);
        localStorage.setItem('empleados', JSON.stringify(empleados));
        console.log(`Empleado agregado: ${JSON.stringify(nuevoEmpleado)}`);
    } else {
        console.warn(`El empleado con nombre "${nombre}" y puesto "${puesto}" ya existe.`);
    }
}

// Función para obtener todos los empleados
export const obtenerEmpleados = () => empleados;

// Función para editar un empleado
export const editarEmpleado = (id_empleado, nuevoNombre, nuevoPuesto, nuevoSalario) => {
    const empleadoIndex = empleados.findIndex(empleado => empleado.id_empleado === id_empleado);
    if (empleadoIndex !== -1) {
        empleados[empleadoIndex] = { ...empleados[empleadoIndex], nombre: nuevoNombre, puesto: nuevoPuesto, salario: nuevoSalario };
        localStorage.setItem('empleados', JSON.stringify(empleados));
        console.log(`Empleado editado: ${JSON.stringify(empleados[empleadoIndex])}`);
    } else {
        console.warn(`No se encontró el empleado con ID: ${id_empleado}`);
    }
}

// Función para eliminar un empleado
export const eliminarEmpleado = (id_empleado) => {
    const empleadoEliminado = empleados.find(empleado => empleado.id_empleado === id_empleado);
    if (empleadoEliminado) {
        empleados = empleados.filter(empleado => empleado.id_empleado !== id_empleado);
        localStorage.setItem('empleados', JSON.stringify(empleados));
        console.log(`Empleado eliminado: ${JSON.stringify(empleadoEliminado)}`);
    } else {
        console.warn(`No se encontró el empleado con ID: ${id_empleado}`);
    }
}

