import sql from './database.js';

document.addEventListener('DOMContentLoaded', async function() {
  try {
    // Ejecutar la consulta SQL
    const horario = await sql`
      SELECT
        id_aula,
        asignatura,
        hora_inicio,
        hora_fin,
        docente
      FROM clases
    `;

    // Mapear los resultados de la consulta a eventos del calendario
    const eventos = horario.map(row => ({
      title: row.asignatura,
      start: new Date(`${row.fecha} ${row.hora_inicio}`), // Ajustar según la estructura de tu base de datos
      end: new Date(`${row.fecha} ${row.hora_fin}`),     // Ajustar según la estructura de tu base de datos
      location: row.id_aula,
      timeStart: row.hora_inicio,
      timeEnd: row.hora_fin,
      docente: row.docente,
      backgroundColor: 'green', // Puedes personalizar el color de fondo
    }));

    // Configurar el calendario
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      events: eventos, // Cargar directamente los eventos mapeados desde la consulta SQL

      eventContent: function(info) {
        return {
          html: `
            <div style="overflow: hidden; font-size: 12px; position: relative; cursor: pointer; font-family: 'Inter', sans-serif;">
              <div><strong>${info.event.title}</strong></div>
              <div>Location: ${info.event.extendedProps.location}</div>
              <div>Date: ${info.event.start.toLocaleDateString(
                  "es-US",
                  {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                  }
              )}</div>
              <div>Time: ${info.event.extendedProps.timeStart} - ${info.event.extendedProps.timeEnd}</div>
              <div>Docente: ${info.event.extendedProps.docente}</div>
            </div>
          `
        }
      },

      eventMouseEnter: function(mouseEnterInfo) {
        let el = mouseEnterInfo.el;
        el.classList.add("relative");

        let newEl = document.createElement("div");
        let newElTitle = mouseEnterInfo.event.title;
        let newElLocation = mouseEnterInfo.event.extendedProps.location;
        let newElDocente = mouseEnterInfo.event.extendedProps.docente;
        newEl.innerHTML = `
          <div class="fc-hoverable-event"
            style="position: absolute; bottom: 100%; left: 0; width: 300px; height: auto; background-color: white; z-index: 50; border: 1px solid #e2e8f0; border-radius: 0.375rem; padding: 0.75rem; font-size: 14px; font-family: 'Inter', sans-serif; cursor: pointer;"
          >
            <strong>${newElTitle}</strong>
            <div>Location: ${newElLocation}</div>
            <div>Docente: ${newElDocente}</div>
          </div>
        `;
        el.after(newEl);
      },

      eventMouseLeave: function() {
        document.querySelector(".fc-hoverable-event").remove();
      }
    });

    // Renderizar el calendario
    calendar.render();
  } catch (error) {
    console.error('Error al ejecutar la consulta SQL:', error.message);
  }
});
