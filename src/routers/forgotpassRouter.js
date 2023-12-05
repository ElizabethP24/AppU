import express from "express";
const forgotpass = express.Router();
import sql from '../../config/database.js';

forgotpass.post('/rcontrasena', async (req, res) => {
    try {
        const { correo, documento } = req.body;

        const usuarios = await sql`
            SELECT * FROM personal_u 
            WHERE correo = ${correo} AND documento = ${documento};
        `;

        if (usuarios.count > 0) {

            res.render('/rcontrasena', { usuario });
        } else {

            res.send("La información es incorrecta");
        }
    } catch (error) {
        console.error("Error al verificar usuario:", error.message);
        res.status(500).send("Hubo un error al verificar el usuario");
    }
});

