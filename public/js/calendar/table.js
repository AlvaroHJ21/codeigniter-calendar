import {
  getDaysOfWeekByFirstDay,
  getFirstDate,
  getFirstDayOfCurrentWeek,
  getFormatDateText,
  getMonthName,
  isEqualDate,
  saveFirstDate,
} from './helpers.js';

import { getAllProjects, getRecords, saveRecords } from './api.js';

export class Table {
  target = null;
  data = [];
  dates = [];
  totals = [];

  startDate = null;

  constructor(target) {
    this.target = document.querySelector(target);

    this.startDate = getFirstDate();

    this.dates = getDaysOfWeekByFirstDay(this.startDate);

    getAllProjects().then((projects) => {
      this.projects = projects;
    });
  }

  async loadData() {
    const records = await getRecords(this.startDate);

    saveFirstDate(this.startDate);

    this.data = [];

    const nRow = records.reduce((max, record) => {
      const include = this.dates.some((date) => isEqualDate(date, record.date));
      const row = Number(record.row);

      return Math.max(max, include ? row + 1 : 0);
    }, 0);

    Array.from({ length: nRow }).forEach((_) => {
      this.data.push(this.dates.map((_) => ({})));
    });

    records.forEach((record) => {
      const col = this.dates.findIndex((date) => isEqualDate(date, record.date));

      if (col == -1) return;

      const row = Number(record.row);

      this.data[row][col] = record;
    });

    this.calcTotals();

    this.render();
  }

  loadNext() {
    const lastCurrentDay = new Date(this.dates[this.dates.length - 1]);
    const nextFirstDay = lastCurrentDay.setDate(lastCurrentDay.getDate() + 1);

    this.dates = getDaysOfWeekByFirstDay(nextFirstDay);
    this.startDate = this.dates[0];
    this.loadData();
  }

  loadPrev() {
    const firstCurrentDay = new Date(this.dates[0]);
    const prevFirstDay = firstCurrentDay.setDate(firstCurrentDay.getDate() - 7);

    this.dates = getDaysOfWeekByFirstDay(prevFirstDay);
    this.startDate = this.dates[0];
    this.loadData();
  }

  addRow() {
    this.data.push(this.dates.map((_) => ({})));
    this.render();
  }

  save() {
    const dataToSave = [];

    this.data.forEach((row) => {
      row.forEach((cell) => {
        //validar si el objeto tiene el campo project_id
        if (!cell.hasOwnProperty('project_id')) return;

        dataToSave.push({
          id: cell.id,
          project_id: cell.project_id,
          hours: cell.hours,
          date: cell.date,
          row: cell.row,
        });
      });
    });

    saveRecords(dataToSave);
  }

  backCurrentWeek() {
    this.startDate = getFirstDayOfCurrentWeek();
    this.dates = getDaysOfWeekByFirstDay(this.startDate);
    this.loadData();
  }

  calcTotals() {
    this.totals = this.dates.map((date) => {
      const total = this.data.reduce((sum, row) => {
        const col = row.findIndex((cell) => isEqualDate(cell.date, date));

        if (col == -1) return sum;

        const hours = Number(row[col].hours);

        return sum + hours;
      }, 0);

      return total;
    });
  }

  render() {
    this.renderData();

    this.renderTotals();

    this.renderSubtitle();
  }

  renderData() {
    const head = this.target.querySelector('thead');
    const body = this.target.querySelector('tbody');

    body.innerHTML = '';

    // headers
    head.innerHTML = `
      <tr>
        ${this.dates
          .map((date) => {
            return `<th>${getFormatDateText(date)}</th>`;
          })
          .join('')}
      </tr>
    `;

    // body
    this.data.forEach((row, rowIdx) => {
      let tr = document.createElement('tr');
      row.forEach((cell, colIdx) => {
        const hours = cell.hours || '';
        const projectId = cell.project_id || 0;

        let td = document.createElement('td');
        td.innerHTML = `
         <div class="d-flex gap-1">
          <div class="">
            <select 
              class="form-control" 
              style="min-width:160px" 
              value="${projectId}" 
              data-col="${colIdx}" 
              data-row="${rowIdx}"
            >

              <option value="0">-</option>
              ${this.projects.map((project) => {
                return `<option value="${project.id}" ${
                  project.id == projectId ? 'selected' : ''
                }>${project.code}-${project.name}</option>`;
              })}

            </select>
          </div>
          <div class="">
            <input 
              class="form-control col-4" 
              style="min-width:80px" 
              type="number" 
              value="${hours}" 
              data-col="${colIdx}" 
              data-row="${rowIdx}"
              min="0"
            />
          </div>
         </div>
        `;

        tr.appendChild(td);

        this.data[rowIdx][colIdx].date = this.dates[colIdx];
        this.data[rowIdx][colIdx].row = rowIdx;
      });

      body.appendChild(tr);

      tr.querySelectorAll('input').forEach((input) => {
        input.addEventListener('change', (e) => {
          const value = e.target.value;
          const col = e.target.dataset.col;
          const row = e.target.dataset.row;

          this.data[row][col].hours = value;
        });
      });

      tr.querySelectorAll('select').forEach((select) => {
        select.addEventListener('change', (e) => {
          const value = e.target.value;
          const row = e.target.dataset.row;
          const col = e.target.dataset.col;

          this.data[row][col].project_id = value;
        });
      });
    });
  }

  renderTotals() {
    const body = this.target.querySelector('tbody');
    let tr = document.createElement('tr');
    tr.innerHTML = `
      ${this.totals
        .map((total) => {
          return `<td class="text-end fw-bold">${total} Horas</td>`;
        })
        .join('')}
    `;
    body.appendChild(tr);
  }

  renderSubtitle() {
    //subtitle
    const subtitle = document.querySelector('#subtitle');
    const firstDate = new Date(this.dates[0]);
    const lastDate = new Date(this.dates[this.dates.length - 1]);
    const month = getMonthName(lastDate);

    //Semana del 8 al 14 de Enero, 2024
    subtitle.innerHTML = `Semana del ${firstDate.getDate()} al ${lastDate.getDate()} de ${month}, ${lastDate.getFullYear()}`;
  }
}
