import express from "express";
const estudianteRouter = express.Router();
import sql from '../../config/database.js';


estudianteRouter.route('/').get(async (req, res) => {
    const estudiante = await sql`
select 
id_estudiante,
edad,
programa,
semestre,
id_persona,
qr
from estudiante`
    res.render('vista_estudiante', { estudiante});
});

estudianteRouter.route('/crear').post(async (req, res) => {
    const body = req.body;
    try {
        const nombreDeUsuario = obtenerNombreDeUsuario(req);

        if (!nombreDeUsuario) {
            // Manejar el caso de usuario no autenticado
            res.status(401).send('Usuario no autenticado');
            return;
        }

        // Asignar el nombre de usuario a id_persona y pasar a la función crear
        body.id_persona = nombreDeUsuario;

        const resultado = await crear(body, nombreDeUsuario);
        console.log('Estudiante creado');
        res.redirect('/perfil');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar usuario');
    }
});


export async function crear(body, idPersona) {
    const estudiante = await sql`
        insert into estudiante ${sql(body,
            'edad',
            'programa',
            'semestre',
            'id_persona',
            'qr')};`;
    console.log("Estudiante ingresado");
    return estudiante;
}
     
export default estudianteRouter;