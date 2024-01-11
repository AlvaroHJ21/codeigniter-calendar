export async function getRecords(startDate, endDate) {

  const resp = await fetch(`/records?startDate=${startDate}&endDate=${endDate}`);
  const data = await resp.json();

  return data;

  return [
    {
      id: '1',
      project_id: '1',
      hours: '8',
      date: '2024-01-08 15:00:00',
      row: "0",
    },
    {
      id: '2',
      project_id: '1',
      hours: '4.4',
      date: '2024-01-08 00:00:00',
      row: "1",
    },
    {
      id: '3',
      project_id: '1',
      hours: '2.2',
      date: '2024-01-10 00:00:00',
      row: "1",
    },
    {
      id: '4',
      project_id: '1',
      hours: '2.2',
      date: '2024-01-16 00:00:00',
      row: "0",
    },
  ];
}

export async function getAllProjects() {

  const resp = await fetch("/projects");
  const data = await resp.json();

  return data;

  return [
    {
      id: 1,
      code: 'P1',
      name: 'Proyecto 1',
    },
    {
      id: 2,
      code: 'P2',
      name: 'Proyecto 2',
    },
  ];
}

export function getNextDays(endDate) {
  const lastDate = new Date(endDate);

  const dates = [];

  for (let i = 0; i < 7; i++) {
    const newDate = new Date(lastDate);

    newDate.setDate(lastDate.getDate() + i + 1);
    // Formatear la fecha en el formato deseado
    const formatedDate = `${newDate.getFullYear()}-${(newDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${newDate.getDate().toString().padStart(2, '0')} 00:00:00`;

    dates.push(formatedDate);
  }

  return dates;
}

export function getPrevDays(startDate) {
  const firstDate = new Date(startDate);

  const dates = [];

  for (let i = 0; i < 7; i++) {
    const newDate = new Date(firstDate);

    newDate.setDate(firstDate.getDate() - i - 1);
    // Formatear la fecha en el formato deseado
    const formatedDate = `${newDate.getFullYear()}-${(newDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${newDate.getDate().toString().padStart(2, '0')} 00:00:00`;

    dates.unshift(formatedDate);
  }

  return dates;
}

export function getDaysOfCurrentWeek() {
  const today = new Date();

  const day = today.getDay();

  const firstDay = new Date(today.setDate(today.getDate() + 1));

  firstDay.setDate(today.getDate() - day);

  const dates = [];

  for (let i = 0; i < 7; i++) {
    const newDate = new Date(firstDay);

    newDate.setDate(firstDay.getDate() + i);
    // Formatear la fecha en el formato deseado
    const formatedDate = `${newDate.getFullYear()}-${(newDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${newDate.getDate().toString().padStart(2, '0')} 00:00:00`;

    dates.push(formatedDate);
  }

  return dates;
}

export function getFormatDate(date) {
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