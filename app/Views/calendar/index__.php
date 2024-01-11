<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Calendar</title>

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js"></script>
  
</head>

<body>
  <section class="container">

    Proyectos totales:

    <div class="d-flex justify-content-between">
      <button class="btn btn-primary">
        <i class="fa fa-chevron-left"></i>
      </button>
      <h2>Enero 2024</h2>
      <button class="btn btn-primary">
        <i class="fa fa-chevron-right"></i>
      </button>
    </div>

    <table class="table">
      <thead>
        <tr>
          <?php foreach ($days as $day) : ?>
            <th scope="col"><?= $day['name'] ?></th>
          <?php endforeach; ?>
        </tr>
      </thead>
      <tbody>
        <tr>
          <?php foreach ($days as $day) : ?>
            <td>

              <?php foreach ($day["projects"] as $project) : ?>
                <div class="d-flex gap-2 align-items-center mb-2">
                  <div value=""><?= $project["name"] ?></div>
                  <div type="text" class=""><?= $project["duration"] ?></div>
                  <div class="flex-fill"></div>
                  <button class="btn btn-outline-danger">
                    <i class="fa fa-x"></i>
                  </button>
                </div>
              <?php endforeach; ?>

              <div class="w-full">
                <button id="btn-add-<?= $day["name"] ?>" class="btn btn-primary" style="width: 100%;">
                  <i class="fa fa-plus"></i>
                </button>
              </div>

              <form id="form-add-<?= $day["name"] ?>" class="d-flex gap-2 d-none">
                <select name="" id="" class="form-control">
                  <option value="">Proyecto 1</option>
                </select>
                <input type="text" class="form-control">
                <button class="btn-save-<?= $day["name"] ?> btn btn-success" type="button">
                  <i class="fa fa-check"></i>
                </button>
                <button class="btn-cancel-<?= $day["name"] ?> btn btn-danger" type="button">
                  <i class="fa fa-x"></i>
                </button>
              </form>

            </td>
          <?php endforeach; ?>
        </tr>
      </tbody>
    </table>
  </section>

  <script>
    $(document).ready(function() {
      <?php foreach ($days as $day) : ?>
        $("#btn-add-<?= $day["name"] ?>").click(function() {
          $("#form-add-<?= $day["name"] ?>").removeClass("d-none");
          $("#btn-add-<?= $day["name"] ?>").addClass("d-none");
        });

        $(".btn-cancel-<?= $day["name"] ?>").click(function() {
          $("#form-add-<?= $day["name"] ?>").addClass("d-none");
          $("#btn-add-<?= $day["name"] ?>").removeClass("d-none");
        });

        $(".btn-save-<?= $day["name"] ?>").click(function() {
          $("#form-add-<?= $day["name"] ?>").addClass("d-none");
          $("#btn-add-<?= $day["name"] ?>").removeClass("d-none");
        });
      <?php endforeach; ?>
    });
  </script>

</body>

</html>