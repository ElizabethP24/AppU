// variaveis globais

let nav = 0
let clicked = null
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : []


// variavel do modal:
const newEvent = document.getElementById('newEventModal')
const deleteEventModal = document.getElementById('deleteEventModal')
const backDrop = document.getElementById('modalBackDrop')
const eventTitleInput = document.getElementById('eventTitleInput')
// --------
const calendar = document.getElementById('calendar') // div calendar:
const weekdays = ['domingo','lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sábado'] //array with weekdays:

//funções

function openModal(date) {
    clicked = date;
    const eventDay = events.find((event) => event.date === clicked);
  
    if (eventDay) {
      document.getElementById('eventText').innerHTML = `
        <p><strong>Evento:</strong> ${eventDay.title}</p>
        <p><strong>Salón:</strong> ${eventDay.salon}</p>
        <p><strong>Asignatura:</strong> ${eventDay.asignatura}</p>
        <p><strong>Hora de Entrada:</strong> ${eventDay.horaEntrada}</p>
        <p><strong>Hora de Salida:</strong> ${eventDay.horaSalida}</p>
        <p><strong>Encargado:</strong> ${eventDay.encargado}</p>
      `;
      deleteEventModal.style.display = 'block';
    } else {
      newEvent.style.display = 'block';
    }
  
    backDrop.style.display = 'block';
  }

//função load() será chamada quando a pagina carregar:

function load() {
    const date = new Date();
  
    // cambiar título del mes:
    if (nav !== 0) {
        date.setMonth(new Date().getMonth() + nav);
      }
    
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();
    
      const daysMonth = new Date(year, month + 1, 0).getDate();
      const firstDayMonth = new Date(year, month, 1);
    
      const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
      ];
    
      const monthDisplay = document.getElementById('monthDisplay');
      monthDisplay.innerText = `${monthNames[month]}, ${year}`;
    
        const dateString = firstDayMonth.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const paddinDays = weekdays.indexOf(dateString.split(', ') [0])
  
  //mostrar mês e ano:
  document.getElementById('monthDisplay').innerText = `${date.toLocaleDateString('pt-br',{month: 'long'})}, ${year}`

  
  calendar.innerHTML =''

  // criando uma div com os dias:

  for (let i = 1; i <= paddinDays + daysMonth; i++) {
    const dayS = document.createElement('div')
    dayS.classList.add('day')

    const dayString = `${month + 1}/${i - paddinDays}/${year}`

    //condicional para criar os dias de um mês:
     
    if (i > paddinDays) {
      dayS.innerText = i - paddinDays
      

      const eventDay = events.find(event=>event.date === dayString)
      
      if(i - paddinDays === day && nav === 0){
        dayS.id = 'currentDay'
      }


      if(eventDay){
        const eventDiv = document.createElement('div')
        eventDiv.classList.add('event')
        eventDiv.innerText = eventDay.title
        dayS.appendChild(eventDiv)

      }

      dayS.addEventListener('click', ()=> openModal(dayString))

    } else {
      dayS.classList.add('padding')
    }

    
    calendar.appendChild(dayS)
  }
}

function closeModal(){
  eventTitleInput.classList.remove('error')
  newEvent.style.display = 'none'
  backDrop.style.display = 'none'
  deleteEventModal.style.display = 'none'

  eventTitleInput.value = ''
  clicked = null
  load()

}
function saveEvent() {
    if (eventTitleInput.value) {
      eventTitleInput.classList.remove('error');
  
      events.push({
        date: clicked,
        title: eventTitleInput.value,
        salon: 'D221',  // Ajusta con el valor correcto
        asignatura: 'Álgebra Lineal',  // Ajusta con el valor correcto
        horaEntrada: '6:00pm',  // Ajusta con el valor correcto
        horaSalida: '10:00pm',  // Ajusta con el valor correcto
        encargado: 'Felipe Antonio Gallego Lopez'  // Ajusta con el valor correcto
      });
  
      localStorage.setItem('events', JSON.stringify(events));
      closeModal();
    } else {
      eventTitleInput.classList.add('error');
    }
  }

function deleteEvent(){

  events = events.filter(event => event.date !== clicked)
  localStorage.setItem('events', JSON.stringify(events))
  closeModal()
}

// botões 

function buttons (){
  document.getElementById('backButton').addEventListener('click', ()=>{
    nav--
    load()
    
  })

  document.getElementById('nextButton').addEventListener('click',()=>{
    nav++
    load()
    
  })

  document.getElementById('saveButton').addEventListener('click',()=> saveEvent())

  document.getElementById('cancelButton').addEventListener('click',()=>closeModal())

  document.getElementById('deleteButton').addEventListener('click', ()=>deleteEvent())

  document.getElementById('closeButton').addEventListener('click', ()=>closeModal())

 
}
buttons()
load()