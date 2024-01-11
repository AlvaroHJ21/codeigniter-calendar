export function getFirstDayOfCurrentWeek() {
  const today = new Date();

  const day = today.getDay();

  const firstDay = new Date(today.setDate(today.getDate() + 1));

  firstDay.setDate(today.getDate() - day);

  // Formatear la fecha en el formato deseado
  const formatedDate = firstDay.toISOString().split('T')[0] + ' 00:00:00';

  return formatedDate;
}

export function getLastDayOfWeekByFirstDay(firstDay) {
  const date = new Date(firstDay);
  date.setDate(date.getDate() + 6);
  const endDate = date.toISOString().split('T')[0] + ' 00:00:00';
  return endDate;
}

export function getDaysOfWeekByFirstDay(firstDay) {
  const firstDate = new Date(firstDay);

  const dates = [];

  for (let i = 0; i < 7; i++) {
    const newDate = new Date(firstDate);

    newDate.setDate(firstDate.getDate() + i);
    // Formatear la fecha en el formato deseado
    const formatedDate = newDate.toISOString().split('T')[0] + ' 00:00:00';

    dates.push(formatedDate);
  }

  return dates;
}

export function getFormatDateText(date) {
  // Crear un objeto de fecha
  const newDate = new Date(date);

  // console.log(fecha);

  // Días de la semana en español
  const weekDays = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  // Obtener el nombre del día
  const dayName = weekDays[newDate.getDay()];

  // Obtener el día del mes
  const day = newDate.getDate();

  // Meses del año en español
  const meses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  // Obtener el nombre del mes
  const monthName = meses[newDate.getMonth()];

  // Obtener el año
  // const anio = fecha.getFullYear();

  // Formatear la cadena final
  const result = `${dayName} ${day} ${monthName}`;

  return result;
}

export function isEqualDate(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  return (
    d1.getFullYear() == d2.getFullYear() &&
    d1.getMonth() == d2.getMonth() &&
    d1.getDate() == d2.getDate()
  );
}

export function getFirstDate() {
  const startDate = localStorage.getItem('startDate');
  if (startDate) {
    return startDate;
  } else {
    return getFirstDayOfCurrentWeek();
  }
}

export function saveFirstDate(firstDate) {
  localStorage.setItem('startDate', firstDate);
}
