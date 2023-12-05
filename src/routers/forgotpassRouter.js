
import sql from '../../config/database.js';
import express from "express";
const forgotpassRouter = express.Router();
// Cambia el nombre del enrutador

// Agrega la ruta para verificar correo y documento en el enrutador forgotpassRouter
forgotpassRouter.post('/verificar-correo-documento', async (req, res) => {
    const { correo, documento } = req.body;
    try {
        const result = await sql`
            SELECT * FROM personal_u 
            WHERE correo = ${correo} AND documento = ${documento};
        `;

        if (result.count > 0) {
            // Si se encuentra el correo y el documento en la base de datos, redirige a '/rcontrasena'
            res.redirect('/rcontrasena');
        } else {
            // Si no se encuentran, envía un mensaje de error o redirige a otra página
            res.send("Correo o documento no encontrados");
        }
    } catch (error) {
        console.error("Error al verificar el correo y documento:", error.message);
        res.status(500).send("Error al verificar el correo y documento");
    }
});



export default forgotpassRouter;






