import { Table } from './table.js';

$(document).ready(function () {
  const btnAddRow = $('#btn-add-row');
  const btnSave = $('#btn-save');
  const btnNext = $('#btn-next');
  const btnPrev = $('#btn-prev');
  const btnCurrent = $('#btn-current');

  const table = new Table('#table-records');

  table.loadData();

  btnAddRow.on('click', function () {
    table.addRow();
  });

  btnSave.on('click', function () {
    table.save();
  });

  btnNext.on('click', function () {
    table.loadNext();
  });

  btnPrev.on('click', function () {
    table.loadPrev();
  });

  btnCurrent.on('click', function () {
    table.backCurrentWeek();
  });
});
