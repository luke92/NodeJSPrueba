var express = require("express");
var router = express.Router();
let multer  = require('multer');
let upload  = multer({ storage: multer.memoryStorage() });
var fs = require("fs");

function createFile(filename) {
  fs.open(filename,'r',function(err, fd){
    if (err) {
      fs.writeFile(filename, '', function(err) {
          if(err) {
              console.log(err);
          }
          console.log("The file was saved!");
      });
    } else {
      console.log("The file exists!");
    }
  });
}

let operaciones = [];

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "administrador", operaciones });
});

/* GET operaciones page.*/
router.get("/operaciones", function (req, res, next) {
  res.render("operaciones", { title: "administrador" });
});
// guardar datos del formulario
router.post("/", upload.single('somefile'), (req, res, next) => {
  let nuevaOperacion = {
    // recibo los datos del formulario y los asigno para guardarlos en la base de datos
    Concepto: req.body.Concepto,
    Monto: req.body.Monto,
    Fecha: req.body.Fecha,
    Tipo: req.body.Tipo,
  };
  console.log(req.body);
  console.log(nuevaOperacion);
  // agrego a la base de datos  el nuevo ingreso
  operaciones.push(nuevaOperacion);
  // lectura y escritura de la nueva base de datos en json
  const json_operaciones = JSON.stringify(operaciones);
  createFile("./database.json");
  fs.writeFileSync("./database.json", json_operaciones, "utf-8");

  // trate de ver que manda el formulario pero no renderisa nada solo un objeto vacio
  res.send(req.body);
});

module.exports = router;
