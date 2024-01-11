import {
  getAllProjects,
  getDaysOfCurrentWeek,
  getFormatDate,
  getNextDays,
  getPrevDays,
  getRecords,
  isEqualDate,
} from './helpers.js';

export class Table {
  target = null;
  data = [];
  dates = [];
  year = 2024;
  week = 1;

  constructor(target) {
    this.target = document.querySelector(target);
    this.dates = getDaysOfCurrentWeek();

    getAllProjects().then((projects) => {
      this.projects = projects;
    });
  }

  async load() {

    const records = await getRecords(this.dates[0], this.dates[this.dates.length - 1]);

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

    this.render();
  }

  loadDates(dates) {
    this.dates = dates;
  }

  loadNext() {
    this.dates = getNextDays(this.dates[this.dates.length - 1]);
    this.load();
  }

  loadPrev() {
    this.dates = getPrevDays(this.dates[0]);
    this.load();
  }

  addRow() {
    this.data.push(this.dates.map((_) => ({})));
    this.render();
  }

  save() {
    console.log(this.data);
  }

  onChange() {}

  render() {
    const head = this.target.querySelector('thead');
    const body = this.target.querySelector('tbody');

    body.innerHTML = '';

    // headers

    head.innerHTML = `
      <tr>
        ${this.dates
          .map((date) => {
            return `<th>${getFormatDate(date)}</th>`;
          })
          .join('')}
      </tr>
    `;

    // data

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
              style="min-width:120px" 
              value="${projectId}" 
              data-col="${colIdx}" 
              data-row="${rowIdx}"
            >

              <option value="0">-</option>
              ${this.projects.map((project) => {
                return `<option value="${project.id}" ${
                  project.id == projectId ? 'selected' : ''
                }>${project.name}</option>`;
              })}

            </select>
          </div>
          <div class="">
            <input 
              class="form-control col-4" 
              style="min-width:60px" 
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

          console.log(this.data);
        });
      });

      tr.querySelectorAll('select').forEach((select) => {
        select.addEventListener('change', (e) => {
          const value = e.target.value;
          const row = e.target.dataset.row;
          const col = e.target.dataset.col;

          this.data[row][col].projectId = value;

          console.log(this.data);
        });
      });
    });
  }
}
