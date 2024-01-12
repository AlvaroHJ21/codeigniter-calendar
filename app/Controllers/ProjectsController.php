<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\Project;

class ProjectsController extends BaseController
{

  public function index()
  {

    $project = new Project();
    $projects = $project->findAll();
    $data = [];

    foreach ($projects as $project) {
      $data[] = [
        'id' => $project['id'],
        'name' => $project['Nom_Proyecto'],
        'code' => $project['id_formato'],
      ];
    }



    return $this->response->setJSON(json_encode($data));
  }

}
