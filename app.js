import express from 'express';
import chalk from 'chalk';
import morgan from 'morgan';
import debug from 'debug'; // Asegúrate de importar debug
import path, { dirname } from 'path';
import usuariosRouter from './src/routers/usuariosRouter.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import { localStrategy } from './config/strategies/localStrategy.js';
import bodyParser from 'body-parser';
import xlsx from 'xlsx'; // Agregado para xlsx
import multer from 'multer';
import sql from './config/database.js';

// Crear la aplicación Express
const debugApp = debug('app');
const app = express();
const PORT = process.env.PORT || 3000;
const upload = multer({ dest: 'uploads/' }); // Carpeta donde se almacenarán temporalmente los archivo

// Configuración de bodyParser y otras configuraciones de Express
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurar express-session antes de passport
app.use(session({
  secret: 'tu-secreto-aqui',
  resave: false,
  saveUninitialized: false
}));

// Inicializar passport después de express-session
app.use(passport.initialize());
app.use(passport.session());

// Inicializar la estrategia local
localStrategy();

// Inicializar passport después de express-session
app.use(passport.initialize());
app.use(passport.session());

// Inicializar la estrategia local
localStrategy();

// Otros middlewares...
app.use(express.static(path.join(dirname('.'), '/public/')));
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Rutas
app.use('/usuarios', usuariosRouter);

app.set('views', './src/views');
app.set('view engine', 'ejs');

// Rutas de ejemplo
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/enviarCorreo', (req, res) => {
  res.render('enviarCorreo');
});

app.get('/TerminosyCondiciones', (req, res) => {
  res.render('terminosycondiciones');
});
app.get('/vistaUsuarios', (req, res) => {
  res.render('vistaUsuarios');
});

app.get('/validar', (req, res) => {
  res.render('validar');
});

app.get('/registro', (req, res) => {
  res.render('registro');
});

app.get('/horario', (req, res) => {
  res.render('salones');
});

app.get('/rcontrasena', (req, res) => {
  res.render('rcontrasena');
});

app.get('/administrador', (req, res) => {
  res.render('vista_administrador');
});

app.get('/profesor', (req, res) => {
  res.render('vista_profesor');
});

app.get('/estudiante', (req, res) => {
  res.render('vista_estudiante');
});

app.get('/escanerQR', (req, res) => {
  res.render('escanerQR');
});

app.get('/perfil', (req, res) => {
  res.render('perfil');
});

app.get('/Estudiante', (req, res) => {
  res.render('registroEstudiante');
});

app.get('/EscanerPrueba', (req, res) => {
  res.render('escanerPrueba');
});

app.get('/codigoQR', (req, res) => {
  res.render('codigoQR');
});

app.get('/cargarArchivo', (req, res) => {
  res.render('subirHorario');
});

app.get('/salones', (req, res) => {
  res.render('calendario');
});

app.get('/horario', (req, res) => {
  res.render('salones');
});

app.use('/public', express.static('public'));

// Primero define ensureAuthenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

// Rutas que requieren autenticación
app.get('/estudiante', ensureAuthenticated, function (req, res) {
  res.render('vista_estudiante', { user: req.user });
});




// Ruta POST para la recuperación de contraseña
app.post('/rcontrasena', async (req, res) => {
  try {
    // Desestructurar los datos del cuerpo de la solicitud
    const { correo, documento } = req.body;


    // Validar datos del lado del servidor
    const validacionExitosa = validarDatos(correo, documento);

    if (!validacionExitosa) {
      res.send("Datos no válidos");
      return;
    }
    

    const usuarios = await sql`
    SELECT * FROM personal_u 
    WHERE correo = ${correo} AND documento = ${documento};
`;

    console.log(`Resultado de la consulta:`, usuarios);

    // Verificar si se encontraron usuarios
    if (usuarios.length > 0) {
      // Renderizar la vista 'rcontrasena.ejs'
      res.render('rcontrasena', { usuarios });
    } else {
      res.send("La información es incorrecta");
    }
  } catch (error) {
    // Manejar errores durante la verificación del usuario
    console.error("Error al verificar usuario:", error.message);
    res.status(500).send("Hubo un error al verificar el usuario");
  }
});

// Función de validación del lado del servidor
function validarDatos(correo, documento) {
  const dominio = "@ucaldas.edu.co";

  // Verificar que correo y documento no estén vacíos
  if (!correo || !documento) {
    return false;
  }

  // Verificar que la longitud del documento sea menor de 11 caracteres
  if (documento.length >= 11) {
    return false;
  }

  // Verificar que el correo tenga el dominio correcto
  if (correo.indexOf(dominio) === -1) {
    return false;
  }

  // Todos los criterios de validación se cumplieron
  return true;
}

app.use('/config', express.static('config'));

app.post('/subir', upload.single('archivo'), async (req, res) => {
  try {
    // Verificar la existencia del archivo
    console.log(req.file);

    if (!req.file) {
      res.status(400).send('No se ha seleccionado ningún archivo.');
      return;
    }

    // Leer el archivo Excel
    const filePath = req.file.path;
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Iterar sobre los datos y realizar las inserciones
    for (const row of data) {
      // Corregir nombres de propiedades
      const cleanedRow = {
        Codigo: row.Codigo,
        Asignatura: row['Asignatura '],
        Semestre: row.Semestre,
        Departamento: row.Departamento,
        Salon: row['Salon '],
        Dia: row.Dia,
        Hora_Inicio: row.Hora_Inicio,
        Hora_Fin: row.Hora_Fin,
        No_Horas: row.No_Horas,
        // Formatear fecha de inicio
        Fecha_Inicio: new Date((row.Fecha_Inicio - 25569) * 86400 * 1000).toISOString().split('T')[0],
        // Formatear fecha de fin
        Fecha_Fin: new Date((row.Fecha_Fin - 25569) * 86400 * 1000).toISOString().split('T')[0],
        Sesiones: row.Sesiones,
        Docente: row['Docente '],
        Programa: row.Programa
      };

      try {
        // Validar si hay una id_clase repetida
        const existingId = await sql`
      SELECT id_clase FROM public.clases WHERE id_clase = ${cleanedRow.Codigo}
    `;

        if (existingId.length > 0) {
          // Si la id_clase ya existe, realizar una actualización (UPDATE) en lugar de inserción (INSERT)
          const updateQuery = sql`
        UPDATE public.clases
        SET asignatura = ${cleanedRow.Asignatura},
            semestre = ${cleanedRow.Semestre},
            departamento = ${cleanedRow.Departamento},
            dia = ${cleanedRow.Dia},
            horas = ${cleanedRow.No_Horas},
            sesiones = ${cleanedRow.Sesiones},
            docente = ${cleanedRow.Docente},
            fecha_inicio = ${cleanedRow.Fecha_Inicio},
            fecha_fin = ${cleanedRow.Fecha_Fin},
            hora_inicio = ${cleanedRow.Hora_Inicio},
            hora_fin = ${cleanedRow.Hora_Fin},
            id_aula = ${cleanedRow.Salon},
            programa = ${cleanedRow.Programa}
        WHERE id_clase = ${cleanedRow.Codigo}
      `;

          await updateQuery;
        } else {
          // Si la id_clase no existe, realizar una inserción (INSERT)
          const insertQuery = sql`
        INSERT INTO public.clases (id_clase, asignatura, semestre, departamento, dia, horas, 
          sesiones, docente, fecha_inicio, fecha_fin, hora_inicio, hora_fin, id_aula, programa
        ) VALUES (${cleanedRow.Codigo}, ${cleanedRow.Asignatura}, ${cleanedRow.Semestre}, 
          ${cleanedRow.Departamento}, ${cleanedRow.Dia}, ${cleanedRow.No_Horas}, 
          ${cleanedRow.Sesiones}, ${cleanedRow.Docente}, ${cleanedRow.Fecha_Inicio}, 
          ${cleanedRow.Fecha_Fin}, ${cleanedRow.Hora_Inicio}, ${cleanedRow.Hora_Fin}, 
          ${cleanedRow.Salon}, ${cleanedRow.Programa}
        )`;

          await insertQuery;
        }

        // Imprimir datos después de la inserción/actualización
        console.log('Processed data:', cleanedRow);

      } catch (error) {
        console.error(`Error al procesar el archivo: ${error.message}`);
        res.status(500).send('Error al procesar el archivo.');
        return;
      }
    }
    res.send('Archivo subido y procesado correctamente.');
  } catch (error) {
    console.error(`Error al procesar el archivo: ${error.message}`);
    res.status(500).send('Error al procesar el archivo.');
  }
});


// Iniciar el servidor
app.listen(5000, () => {
  debugApp(`Listening on port ${chalk.green(PORT)}`);
});