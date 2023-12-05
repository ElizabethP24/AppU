import express from "express";
const estudianteRouter = express.Router();
import sql from '../../config/database.js';


estudianteRouter.get('/', async (req, res) => {
    try {
        // Obtener los datos de la base de datos (aquí se asume el uso de SQL)
        const datosEstudiante = await sql`
            SELECT nombre, documento, direccion, telefono, correo, rol, facultad, semestre, programa 
            FROM personal_u
          
        `;

        // Renderizar la vista 'estudiante.ejs' y pasar los datos recuperados como contexto
        res.render('vista_administrador', { datosEstudiante });
    } catch (error) {
        console.error('Error al obtener datos de estudiantes:', error);
        res.status(500).send('Error al obtener datos de estudiantes');
    }
});
