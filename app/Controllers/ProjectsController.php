<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\Project;

class ProjectsController extends BaseController
{

  public function index()
  {

    $project = new Project();
    $data = $project->findAll();

    return $this->response->setJSON(json_encode($data));
  }

}
