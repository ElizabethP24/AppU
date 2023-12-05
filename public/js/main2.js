document.addEventListener('DOMContentLoaded', function() {
  const eventos = [
    {
      "eventTitle": "Conferencia de Innovación Tecnológica",
      "eventStartDate": "10/15/2023",
      "eventEndDate": "10/15/2023",
      "eventStartTime": "09:00 AM",
      "eventEndTime": "06:00 PM",
      "eventLocation": "Centro de Convenciones XYZ","eventUrl": "https://fullcalendar.io/"
    },
    {
      "eventTitle": "Taller de Desarrollo de Aplicaciones Móviles",
      "eventStartDate": "10/20/2023",
      "eventEndDate": "10/20/2023",
      "eventStartTime": "10:30 AM",
      "eventEndTime": "04:30 PM",
      "eventLocation": "Sala de Conferencias ABC","eventUrl": "https://fullcalendar.io/"
    },
    {
      "eventTitle": "Feria de Emprendimiento Local",
      "eventStartDate": "09/10/2023",
      "eventEndDate": "09/10/2023",
      "eventStartTime": "11:00 AM",
      "eventEndTime": "07:00 PM",
      "eventLocation": "Plaza del Pueblo",
      "eventUrl": "https://fullcalendar.io/"    
    },
    {
      "eventTitle": "Seminario de Marketing Digital",
      "eventStartDate": "09/09/2023",
      "eventEndDate": "09/09/2023",
      "eventStartTime": "10:00 AM",
      "eventEndTime": "04:00 PM",
      "eventLocation": "Salón de Eventos Zeta",
      "eventUrl": "https://fullcalendar.io/"
    },
    {
      "eventTitle": "Expo de Tecnología e Innovación",
      "eventStartDate": "09/28/2023",
      "eventEndDate": "09/28/2023",
      "eventStartTime": "08:30 AM",
      "eventEndTime": "05:30 PM",
      "eventLocation": "Pabellón de Exposiciones Gamma",
      "eventUrl": "https://fullcalendar.io/"
    },
    {
      "eventTitle": "Taller de Diseño Gráfico Avanzado",
      "eventStartDate": "09/29/2023",
      "eventEndDate": "09/29/2023",
      "eventStartTime": "11:00 AM",
      "eventEndTime": "04:00 PM",
      "eventLocation": "Aula Creativa Epsilon",
      "eventUrl": "https://fullcalendar.io/"    },
    {
      "eventTitle": "Foro de Emprendedores",
      "eventStartDate": "09/25/2023",
      "eventEndDate": "09/25/2023",
      "eventStartTime": "09:30 AM",
      "eventEndTime": "06:30 PM",
      "eventLocation": "Centro de Emprendimiento Beta",
      "eventUrl": "https://fullcalendar.io/"
    },
    {
      "eventTitle": "Charla sobre Inteligencia Artificial",
      "eventStartDate": "10/04/2023",
      "eventEndDate": "10/04/2023",
      "eventStartTime": "02:00 PM",
      "eventEndTime": "07:00 PM",
      "eventLocation": "Sala de Conferencias Delta",
      "eventUrl": "https://fullcalendar.io/"
    },
    {
      "eventTitle": "Curso de Desarrollo Web Frontend",
      "eventStartDate": "10/09/2023",
      "eventEndDate": "10/09/2023",
      "eventStartTime": "10:00 AM",
      "eventEndTime": "05:00 PM",
      "eventLocation": "Aula de Desarrollo Web",
      "eventUrl": "https://fullcalendar.io/"
    },
    {
      "eventTitle": "Expo de Arte Contemporáneo",
      "eventStartDate": "10/16/2023",
      "eventEndDate": "10/16/2023",
      "eventStartTime": "12:00 PM",
      "eventEndTime": "08:00 PM",
      "eventLocation": "Galería de Arte Omega",
      "eventUrl": "https://fullcalendar.io/"
    },
    {
      "eventTitle": "Conferencia de Energías Renovables",
      "eventStartDate": "10/05/2023",
      "eventEndDate": "10/05/2023",
      "eventStartTime": "09:00 AM",
      "eventEndTime": "06:00 PM",
      "eventLocation": "Auditorio de Sostenibilidad Iota",
      "eventUrl": "https://fullcalendar.io/"
    },
    {
      "eventTitle": "Taller de Fotografía Profesional",
      "eventStartDate": "10/13/2023",
      "eventEndDate": "10/13/2023",
      "eventStartTime": "11:30 AM",
      "eventEndTime": "05:30 PM",
      "eventLocation": "Estudio Fotográfico Kappa",
      "eventUrl": "https://fullcalendar.io/"    
    },
    {
      "eventTitle": "Feria de Gastronomía Local",
      "eventStartDate": "09/22/2023",
      "eventEndDate": "09/22/2023",
      "eventStartTime": "11:00 AM",
      "eventEndTime": "07:00 PM",
      "eventLocation": "Plaza de la Ciudad",
      "eventUrl": "https://fullcalendar.io/"
    },
    {
      "eventTitle": "Seminario de Ciberseguridad",
      "eventStartDate": "10/02/2023",
      "eventEndDate": "10/02/2023",
      "eventStartTime": "10:00 AM",
      "eventEndTime": "04:00 PM",
      "eventLocation": "Sala de Seguridad Digital",
      "eventUrl": "https://fullcalendar.io/"
    },
    {
      "eventTitle": "Taller de Escritura Creativa",
      "eventStartDate": "10/10/2023",
      "eventEndDate": "10/10/2023",
      "eventStartTime": "12:00 PM",
      "eventEndTime": "05:00 PM",
      "eventLocation": "Biblioteca Municipal Mu",
      "eventUrl": "https://fullcalendar.io/"   
    },
    {
      "eventTitle": "Expo de Moda y Diseño",
      "eventStartDate": "09/17/2023",
      "eventEndDate": "09/17/2023",
      "eventStartTime": "10:30 AM",
      "eventEndTime": "06:30 PM",
      "eventLocation": "Centro de Diseño Nu",
      "eventUrl": "https://fullcalendar.io/"
    },
    {
      "eventTitle": "Foro de Educación y Tecnología",
      "eventStartDate": "09/30/2023",
      "eventEndDate": "09/30/2023",
      "eventStartTime": "09:30 AM",
      "eventEndTime": "05:30 PM",
      "eventLocation": "Auditorio Educativo Xi",
      "eventUrl": "https://fullcalendar.io/"    
    },
    {
      "eventTitle": "Feria de Artesanías Locales",
      "eventStartDate": "10/12/2023",
      "eventEndDate": "10/12/2023",
      "eventStartTime": "11:00 AM",
      "eventEndTime": "07:00 PM",
      "eventLocation": "Plaza Artesanal Sigma",
      "eventUrl": "https://fullcalendar.io/"    
    },
    {
      "eventTitle": "Conferencia de Salud y Bienestar",
      "eventStartDate": "09/28/2023",
      "eventEndDate": "09/30/2023",
      "eventStartTime": "09:00 AM",
      "eventEndTime": "06:00 PM",
      "eventLocation": "Centro de Salud Theta",
      "eventUrl": "https://fullcalendar.io/"
    },
    {
      "eventTitle": "Taller de Cocina Internacional",
      "eventStartDate": "10/07/2023",
      "eventEndDate": "10/07/2023",
      "eventStartTime": "11:30 AM",
      "eventEndTime": "05:30 PM",
      "eventLocation": "Cocina Gourmet Mu",
      "eventUrl": "https://fullcalendar.io/"    
    }
  
  ];

  var calendarEl = document.getElementById('calendar');
  var calendar = new calendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    events: eventos,
    eventContent: function(info) {
      return {
        html: `
          <div style="overflow: hidden; font-size: 12px; position: relative; cursor: pointer; font-family: 'Inter', sans-serif;">
            <div><strong>${info.event.extendedProps.eventTitle}</strong></div>
            <div>Location: ${info.event.extendedProps.eventLocation}</div>
            <div>Date: ${info.event.start.toLocaleDateString(
                "es-ES",
                {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                }
            )}</div>
            <div>Time: ${info.event.start.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })} - ${info.event.end.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}</div>
            <div>Docente: ${info.event.extendedProps.docente}</div>
          </div>
        `
      };
    },
    eventMouseEnter: function(mouseEnterInfo) {
      let el = mouseEnterInfo.el
      el.classList.add("relative")

      let newEl = document.createElement("div")
      let newElTitle = mouseEnterInfo.event.extendedProps.eventTitle
      let newElLocation = mouseEnterInfo.event.extendedProps.eventLocation
      let newElDocente = mouseEnterInfo.event.extendedProps.docente
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

  calendar.render();
});
