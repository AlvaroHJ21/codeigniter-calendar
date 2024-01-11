<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\Record;
use DateTime;

class RecordsController extends BaseController
{

  public function index()
  {
    //obtener query params

    $startDate = $this->request->getGet('startDate');
    $endDate = $this->request->getGet('endDate');


    if(!$startDate || !$endDate){
      return $this->response->setJSON(json_encode(array(
        'error' => 'startDate and endDate are required'
      )));
    }

    $record = new Record();
    $data = $record->getRecords($startDate, $endDate);

    return $this->response->setJSON(json_encode($data));
  }

  public function get($year, $weekNumber)
  {
    // Crear un objeto DateTime para la primera fecha del año y ajustarlo a la semana proporcionada
    $startDate = new DateTime();
    $startDate->setISODate($year, $weekNumber);

    // Inicializar el array para almacenar los registros por día de la semana
    $weekRecords = array();

    // Iterar sobre los 7 días de la semana
    for ($i = 1; $i <= 7; $i++) {
      // Obtener la fecha para el día actual de la semana
      $currentDate = $startDate->format('Y-m-d');

      // Crear el formato de registro para el día actual
      $record = array(
        'date' => $currentDate,
        'records' => array(),
      );

      // Agregar el registro al array de registros de la semana
      $weekRecords[$i] = $record;

      // Mover la fecha al siguiente día
      $startDate->modify('+1 day');
    }

    return $this->response->setJSON(json_encode($weekRecords));
  }
}
