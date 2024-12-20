// participations.js

// Función para obtener las participaciones desde localStorage
export const obtenerParticipaciones = () => JSON.parse(localStorage.getItem('participaciones')) || [];

// Función para agregar una nueva participación
export const agregarParticipacion = (id_empleado, id_proyecto, rol) => {
    // Obtener las participaciones actuales
    let participaciones = obtenerParticipaciones();

    // Crear la nueva participación
    const nuevaParticipacion = { id_empleado, id_proyecto, rol };

    // Agregar la nueva participación al array
    participaciones.push(nuevaParticipacion);

    // Guardar el array actualizado de participaciones en localStorage
    localStorage.setItem('participaciones', JSON.stringify(participaciones));
};