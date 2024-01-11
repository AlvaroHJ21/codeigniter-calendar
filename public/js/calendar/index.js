import { Table } from './table.js';

$(document).ready(function () {
  const btnAddRow = $('#btn-add-row');
  const btnSave = $('#btn-save');
  const btnNext = $('#btn-next');
  const btnPrev = $('#btn-prev');

  const table = new Table('#table-records');

  table.load();

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
});
