import { getLastDayOfWeekByFirstDay } from './helpers.js';

export async function getRecords(startDate) {
  const endDate = getLastDayOfWeekByFirstDay(startDate);

  const resp = await fetch(`/records?startDate=${startDate}&endDate=${endDate}`);
  const data = await resp.json();

  return data;

  return [
    {
      id: '1',
      project_id: '1',
      hours: '8',
      date: '2024-01-08 15:00:00',
      row: '0',
    },
    {
      id: '2',
      project_id: '1',
      hours: '4.4',
      date: '2024-01-08 00:00:00',
      row: '1',
    },
    {
      id: '3',
      project_id: '1',
      hours: '2.2',
      date: '2024-01-10 00:00:00',
      row: '1',
    },
    {
      id: '4',
      project_id: '1',
      hours: '2.2',
      date: '2024-01-16 00:00:00',
      row: '0',
    },
  ];
}

export async function saveRecords(records) {
  console.log(records);

  const resp = await fetch('/records', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(records),
  });

  await resp.json();

  //reload
  window.location.reload();
}

export async function getAllProjects() {
  const resp = await fetch('/projects');
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
