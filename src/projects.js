// projects.js

// Obtener proyectos desde localStorage o inicializar con un array vacío
let proyectos = JSON.parse(localStorage.getItem('proyectos')) || [];

// Función para agregar un proyecto
export const agregarProyecto = (nombre_proyecto, fecha_inicio, fecha_fin) => {
    const id_proyecto = proyectos.length > 0 ? proyectos[proyectos.length - 1].id_proyecto + 1 : 1; // ID auto-incremental
    const nuevoProyecto = { id_proyecto, nombre_proyecto, fecha_inicio, fecha_fin };
    proyectos.push(nuevoProyecto);
    localStorage.setItem('proyectos', JSON.stringify(proyectos));
}

// Función para obtener todos los proyectos
export const obtenerProyectos = () => proyectos;

// Función para editar un proyecto
export const editarProyecto = (id_proyecto, nuevoNombre, nuevaFechaInicio, nuevaFechaFin) => {
    const proyectoIndex = proyectos.findIndex(proyecto => proyecto.id_proyecto === id_proyecto);
    if (proyectoIndex !== -1) {
        proyectos[proyectoIndex] = { ...proyectos[proyectoIndex], nombre_proyecto: nuevoNombre, fecha_inicio: nuevaFechaInicio, fecha_fin: nuevaFechaFin };
        localStorage.setItem('proyectos', JSON.stringify(proyectos));
    }
}

// Función para eliminar un proyecto
export const eliminarProyecto = (id_proyecto) => {
    proyectos = proyectos.filter(proyecto => proyecto.id_proyecto !== id_proyecto);
    localStorage.setItem('proyectos', JSON.stringify(proyectos));
}
