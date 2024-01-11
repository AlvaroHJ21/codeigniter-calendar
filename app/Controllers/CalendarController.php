<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\Project;
use DateTime;

class CalendarController extends BaseController
{
    public function index()
    {
        //

        $proyect = new Project();

        $fecha = new DateTime();

        // $records = $this->obtenerRegistrosPorSemana($fecha->format('Y-m-d'));

        $days = [
            [
                "id" => 1,
                "name" => "Lunes",
                "date" => "2021-08-02",
                "projects" => [
                    [
                        "id" => "1",
                        "name" => "Proyecto de prueba",
                        "duration" => "5"
                    ]
                ]
            ],
            [
                "id" => 2,
                "name" => "Martes",
                "date" => "2021-08-02",
                "projects" => []
            ],
            [
                "id" => 3,
                "name" => "Miercoles",
                "date" => "2021-08-02",
                "projects" => []
            ],
            [
                "id" => 4,
                "name" => "Jueves",
                "date" => "2021-08-02",
                "projects" => []
            ],
            [
                "id" => 5,
                "name" => "Viernes",
                "date" => "2021-08-02",
                "projects" => []
            ],
            [
                "id" => 6,
                "name" => "Sabado",
                "date" => "2021-08-02",
                "projects" => []
            ],
            [
                "id" => 0,
                "name" => "Domingo",
                "date" => "2021-08-02",
                "projects" => []
            ],
        ];

        return view("calendar/index", compact("days"));
    }

    public function find($numeroSemana)
    {

        $jsonArray = array();

        for ($i = 1; $i <= 7; $i++) {
            $fecha = date('Y-m-d', strtotime("2019-W$numeroSemana-$i"));
            $diaSemana = date('w', strtotime($fecha));

            $jsonArray[$diaSemana] = array(
                'date' => $fecha,
                'records' => array(),
            );
        }

        return json_encode($jsonArray);
    }

    function obtenerRegistrosPorSemana($fechaDada)
    {
        // Convierte la fecha dada en un objeto DateTime
        $fecha = new DateTime($fechaDada);

        // Obtiene el día de la semana (0 para domingo, 1 para lunes, ..., 6 para sábado)
        $diaDeLaSemana = $fecha->format('w');

        // Calcula la fecha del lunes de la semana actual
        $lunesDeEstaSemana = clone $fecha;
        $lunesDeEstaSemana->modify('-' . $diaDeLaSemana . ' days');

        // Array para almacenar los registros por día de la semana
        $registrosPorSemana = array_fill(0, 7, []);

        // Itera sobre los registros y los asigna al array correspondiente según el día de la semana
        for ($i = 0; $i < 7; $i++) {
            $diaActual = clone $lunesDeEstaSemana;
            $diaActual->modify('+' . $i . ' days');

            // Aquí deberías obtener tus registros de la base de datos o de donde sea que los tengas
            // Reemplaza la siguiente línea con la lógica para obtener los registros de la fecha actual
            $registros = $this->obtenerRegistrosDeBaseDeDatos($diaActual->format('Y-m-d'));

            // Asigna los registros al array correspondiente
            $registrosPorSemana[$i] = $registros;
        }

        return $registrosPorSemana;
    }

    // Función de ejemplo para obtener registros de la base de datos (sustituye esto con tu lógica real)
    function obtenerRegistrosDeBaseDeDatos($fecha)
    {
        // Aquí debes implementar la lógica para obtener los registros de la base de datos
        // Retorna un array con los registros de la fecha dada (simulado en este ejemplo)
        return ["Registro 1", "Registro 2", "Registro 3"];
    }
}
