
async function consultarEstudiante(id) {
    const estudiante = await sql`
            SELECT *
            FROM estudiante
            WHERE id_persona = ${id};`;
    return usuarios[0] || null;
}

async function consultarProfesor(id) {
    const profesor = await sql`
            SELECT *
            FROM profesores
            WHERE id_persona = ${id};`;
    return profesor[0] || null;
}

export async function getUser(username) {
    const usuarios = await sql`
        SELECT *
        FROM personal_u
        WHERE usuario = ${username};`;

    return usuarios[0] || null;
}
function obtenerNombreDeUsuario() {
    return req.session.user.nombre; 
}
