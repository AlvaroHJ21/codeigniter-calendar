<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

$routes->get("/calendar", "CalendarController::index");


$routes->get("/records", "RecordsController::index");
$routes->get("/projects", "ProjectsController::index");