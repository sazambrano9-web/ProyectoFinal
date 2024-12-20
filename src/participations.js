// participations.js

// Obtener participaciones desde localStorage o inicializar con un array vacío
let participaciones = JSON.parse(localStorage.getItem('participaciones')) || [];

// Función para agregar una participación
export function agregarParticipacion(id_empleado, id_proyecto, rol) {
    const nuevaParticipacion = { id_empleado, id_proyecto, rol };
    participaciones.push(nuevaParticipacion);
    localStorage.setItem('participaciones', JSON.stringify(participaciones));
}

// Función para obtener todas las participaciones
export function obtenerParticipaciones() {
    return participaciones;
}

// Función para eliminar una participación
export function eliminarParticipacion(id_empleado, id_proyecto) {
    participaciones = participaciones.filter(participacion => participacion.id_empleado !== id_empleado || participacion.id_proyecto !== id_proyecto);
    localStorage.setItem('participaciones', JSON.stringify(participaciones));
}

// Función para obtener proyectos asignados a un empleado
export function obtenerProyectosPorEmpleado(id_empleado) {
    return participaciones.filter(participacion => participacion.id_empleado === id_empleado);
}

// Función para obtener empleados asignados a un proyecto
export function obtenerEmpleadosPorProyecto(id_proyecto) {
    return participaciones.filter(participacion => participacion.id_proyecto === id_proyecto);
}