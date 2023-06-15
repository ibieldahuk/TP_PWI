
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      locale: 'es',
      weekends: false,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,listWeek'
      },
      events: [
        {
            title: 'Curso HTML',
            start: '2023-06-01',
            end: '2023-06-15',
            color: '#FF8000'
        },
        {
            title: 'Curso php',
            start:'2023-06-15',
            end:'2023-06-30',
            color:'#BCA9F5'
        },
        {
            title: 'Curso MySQL',
            start: '2023-06-01',
            end: '2023-06-15',
            color: '#B43104'
        },
        {
            title: 'Curso CSS',
            start: '2023-07-01',
            end: '2023-07-15',
            color: '#5882FA'
        },
        {
            title: 'Curso Java',
            start: '2023-07-15',
            end: '2023-07-30',
            color: '#FF0000'
        },
        {
            title: 'Curso Javascript',
            start: '2023-07-01',
            end: '2023-07-15',
            color:'#FFFF00',
            textColor: 'black'
        }
      ]
    });

    calendar.render();
  });