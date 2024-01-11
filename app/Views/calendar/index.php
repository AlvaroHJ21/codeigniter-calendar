<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>



  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js"></script>


</head>

<body>

  <section class="container">

    <div class="d-flex justify-content-between mt-4 mb-4">
      <button id="btn-prev" class="btn">
        <i class="fa fa-chevron-left"></i>
      </button>
      <div class="text-center">
        <h2>Horarios</h2>
        <p id="subtitle"></p>
      </div>
      <button id="btn-next" class="btn">
        <i class="fa fa-chevron-right"></i>
      </button>
    </div>

    <div class="" style="overflow-y: auto;">
      <table id="table-records" class="table">
        <thead>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>

    <div class="d-flex mt-2 gap-2">
      <button id="btn-add-row" class="btn btn-primary">Agregar</button>
      <button id="btn-current" class="btn">Actual</button>
      <div class="flex-fill"></div>
      <button id="btn-save" class="btn btn-success">
        <i class="fa fa-save"></i>
        Guardar
      </button>
    </div>

  </section>


  <script src="js/calendar/index.js" type="module"></script>
</body>

</html>