document.getElementById('btn-crear-empleado').addEventListener('click', () => {
    document.getElementById('content-area').innerHTML = `
        <h2>Crear Empleado</h2>
        <form id="crear-empleado-form">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required><br>
            <label for="puesto">Puesto:</label>
            <input type="text" id="puesto" name="puesto" required><br>
            <label for="salario">Salario:</label>
            <input type="number" id="salario" name="salario" required><br>
            <button type="submit">Crear Empleado</button>
        </form>
    `;
});

// Agrega más eventos de la misma manera para otros botones