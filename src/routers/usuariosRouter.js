import express from "express";
const usuariosRouter = express.Router();
import sql from '../../config/database.js';


usuariosRouter.route('/lista').get(async (req, res) => {
    try {
        // Realiza la consulta SQL a la base de datos
        const usuarios = await sql`
            SELECT nombre, documento, direccion, telefono, correo, rol, facultad, semestre, programa
            FROM personal_u;
        `;

        res.render('vistaUsuarios', { usuarios }); // Asegúrate de pasar { usuarios }
    } catch (error) {
        console.error("Error al obtener usuarios:", error.message);
        res.status(500).send("Hubo un error al obtener la información de usuarios");
    }
});


usuariosRouter.route('/crear').post(async (req, res) => {
    const body = req.body;
    try {
        const resultado = await crear(body);
        console.log('Usuario creado');
        res.redirect('/registro');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar usuario');
    }
});

  export async function crear(body) {
    const usuarios= await sql`
    insert into personal_u ${sql(body,
        'nombre',
        'documento',
        'direccion',
        'telefono',
        'correo',
        'usuario',
        'contrasena',
        'rol',
        'facultad',
        'semestre',
        'programa')};`;
    console.log("usuario ingresado");
    return usuarios;
   
}
export async function getUser(username) {
    const usuarios= await sql`
      SELECT *
      FROM personal_u
      WHERE usuario = ${username};`;
  
    return usuarios[0] || null;
  }

  export async function checkUserPassword(username, password) {
    try {
        const usuario= await getUser(username);

        if (usuario) {
            const passwordMatch = (usuario.contrasena === password);

            return passwordMatch;
        } else {
            return false; // El usuario no existe
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error al verificar la contraseña del usuario');
    }
}

usuariosRouter.route('/dashboard').get((req, res) => {
    // Verificar manualmente si el usuario está autenticado
    if (req.session.user) {
        console.log(req.session.user);
        const user = req.session.user;  // Aquí puedes acceder a la información del usuario

        // Lógica de redirección basada en el tipo de usuario
        switch (user.rol) {
            case 'estudiante':
                console.log("Redirigiendo estudiante a /perfilEstudiante");
                res.redirect('/estudiante');
                break;
            case 'profesor':
                console.log("Redirigiendo profesor a /perfilProfesor");
                res.redirect('/profesor');
                break;
            case 'administrador':
                console.log("Redirigiendo administrador a /perfilAdministrador");
                res.redirect('/administrador');
                break;
            default:
                console.log("Redirigiendo a /login por defecto");
                // Redirigir a una página por defecto en caso de un rol no reconocido
                res.redirect('/login');
        }
    } else {
        // Redirigir al usuario no autenticado a una página de inicio de sesión
        res.redirect('/login');
    }
});

  usuariosRouter.route('/login').post(async (req, res) => {
    const { username, password } = req.body;

    try {
        const passwordMatch = await checkUserPassword(username, password);
        if (passwordMatch) {
            const usuario = await getUser(username);
            req.session.user = { username, rol: usuario.rol };
            res.redirect('/usuarios/dashboard');
             } else {
            // Credenciales incorrectas
            res.status(401).send('Usuario o contraseña incorrectos');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al autenticar al usuario');
    }
});

usuariosRouter.route('/logout').get((req, res) => {
    // Cerrar sesión
    req.session.destroy();
    res.redirect('/');
});  

usuariosRouter.route('/lista').get(async (req, res) => {
    const usuario = await sql`
select 
nombre,
documento,
direccion,
telefono,
correo,
rol,
facultad,
semestre,
programa
from personal_u`
    res.render('vistaUsuarios', { usuario });
    console.log(usuario);
});

    
export default usuariosRouter;
