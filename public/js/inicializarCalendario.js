// calendar.js
import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';


export function initCalendar() {
 var calendarEl = document.getElementById('calendar');

 var calendar = new Calendar(calendarEl, {
    plugins: [interactionPlugin]
 });

 calendar.render();
}