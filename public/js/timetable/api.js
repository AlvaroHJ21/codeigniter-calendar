// import { projects, records } from './data.js';
import { getLastDayOfWeekByFirstDay } from './helpers.js';

export async function getRecords(startDate) {
  const endDate = getLastDayOfWeekByFirstDay(startDate);

  const resp = await fetch(`/records?startDate=${startDate}&endDate=${endDate}`);
  const data = await resp.json();

  return data;
  // return records
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
  // return projects;
}
