/*----- Nico'S CODE -----*/

const fs = require('fs');
const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
const express = require("express")
const multer = require("multer")
const upload = multer({ dest: "/tmp" })
const cors = require("cors")
const path = require("path")
var app = express()

const bodyParser = require("body-parser")

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(bodyParser.json())
app.use(cors({ origin: true, credentials: true }))

app.use(express.static(path.join(__dirname, "/public")))

app.set("views", path.join(__dirname, "/html"))

app.set("view engine", "ejs")
app.engine("html", require("ejs").renderFile)

app.post("/", upload.single("image"), (req, res) => {
  
  visualRecognition.classify({
    imagesFile: fs.createReadStream(req.file.path),
    classifierIds: ["Visualrecetas_924946167"],
    threshold: 0.75
  })
    .then(response => {
      let classes =response.result.images[0].classifiers[0].classes;
      let resultado
      if(classes.length>0){

       
        resultado = classes.reduce(maximo);
        resultado.success = true

        switch (resultado.class) {

          //---YOGURISIMO
          case "yogurisimo":
            resultado.plato = 'Budín de yogurt';
            resultado.ingredientes= `
                                    <li> 1 taza de yogurt</li>
                                    <li> 1 taza de harina</li>
                                    <li> 500 gramos de azucar</li>
                                    <li> 3 huevos</li>
                                    <li> 100g de manteca</li>
                                    <li> 1 cda esencia de vainilla (opcional)</li>
                                    `;

            resultado.porciones='<b>Rinde 10 porciones</b>';

            resultado.receta = `
                                <li>Precalentar el horno 15 minutos a 180º</li>
                                <li>Mezclar todos los ingredientes</li>
                                <li>Meter al horno por 1 hora</li>
                                <li>¡Listo! Sacar del horno y dejar enfriar</li>
                                `;

            resultado.img = '<img src="./images/modal/budin_de_yogurt.jpg" alt="Budín de yogurt" class="w3-image img-receta w3-margin">';
            
            resultado.imgSrc = 'https://recetapp.mybluemix.net/images/modal/budin_de_yogurt.jpg'
            resultado.url='https://recetapp.mybluemix.net/recetas/receta-yogurisimo.html'
          
            break;


            //---CASANCREM
            case "casancrem":
              resultado.plato = 'Sopa de calabaza';
              resultado.ingredientes= `
                                      <li> 500 gr. de calabaza ya cocida</li>
                                      <li> 300 gr. de CasanCrem</li>
                                      <li> c/n de caldo de verduras</li>
                                      <li> Sal y pimienta a gusto</li>
                                      `;
              resultado.porciones='<b>Rinde 4 porciones</b>';
              
              resultado.receta = `
                                  <li>Mezclar y procesar todos los ingredientes</li>
                                  <li>Colocá en una olla y calentá.</li>
                                  <li>¡Listo! Dejá enfriar 2 minutos y disfrutá de tu sopa</li><br>
                                  <h4> <span style="text-decoration: underline;">Tip:</span> Si querés que quede más líquida, agregale más caldo.</h4>
                                  `;

              resultado.img = '<img src="./images/modal/sopa_de_calabaza.jpg " alt="Sopa de calabaza" class="w3-image img-receta w3-margin">';

              resultado.imgSrc = 'https://recetapp.mybluemix.net/images/modal/sopa_de_calabaza.jpg'
              resultado.url='https://recetapp.mybluemix.net/recetas/receta-casancrem.html'

            break;


            //---CINDOR
            case "cindor":
              resultado.plato = 'Postre Cindor';
              resultado.ingredientes= `
                                      <li> 1 litro chocolatada Cindor</li>
                                      <li> 5 a 6 cucharadas de Maicena (fécula de maíz)</li>
                                      <li> Esencia de vainilla a gusto</li>
                                      <li> 2 cucharadas soperas azúcar (opcional)</li>
                                      `;
              resultado.porciones='<b>Rinde 6 porciones</b>';
              
              resultado.receta = `
                                  <li>En una olla, calentar la chocolatada, agregarle la esencia de vainilla y el azúcar. Revolver.</li>
                                  <li>En una taza diluir la maicena con un poco de leche fría.</li>
                                  <li>Cuando la leche llega al punto del hervor agregar la maicena diluida y revolver sin parar para evitar los grumos. Apagar el fuego una vez alcanzada la consistencia deseada.</li>
                                  <li> Servir en compoteras individuales y llevar a la heladera una vez que alcanzaron la temperatura ambiente</li>
                                  `;

              resultado.img = '<img src="./images/modal/postre_cindor.jpg " alt="Postre Cindor" class="w3-image img-receta w3-margin">';


              resultado.imgSrc = 'https://recetapp.mybluemix.net/images/modal/postre_cindor.jpg'
              resultado.url='https://recetapp.mybluemix.net/recetas/receta-cindor.html'

              break;


            //---DANONINO
            case "danonino":
              resultado.plato = 'Helado de Danonino';
              resultado.ingredientes= `
                                      <li> 4 potes de Danonino</li>
                                      <li> Palitos de helado o cucharas de plástico</li>
                                      
                                      `;
              resultado.porciones='<b>Rinde 4 porciones</b>';
              
              resultado.receta = `
                                  <li>Quitá la tapa de los Danonino e inserta un palito o cuchara en el centro de cada uno.</li>
                                  <li>Colocalos en el freezer y dejalos ahí durante cuatro horas</li>
                                  <li> ¡Listo! Saca los Danonino del freezer. </li><br>
                                  <li> Servir en compoteras individuales y llevar a la heladera una vez que alcanzaron la temperatura ambiente</li><br>
                                  <h4> <span style="text-decoration: underline;">Tip:</span> Podés cortar trocitos de frutas y mezclarlos dentro del Danonino, antes de meterlos en el freezer.</h4>
                                  `;

              resultado.img = '<img src="./images/modal/helado_de_danonino.jpg " alt="Helados de Danonino" class="w3-image img-receta w3-margin">';


              resultado.imgSrc = 'https://recetapp.mybluemix.net/images/modal/helado_de_danonino.jpg'
              resultado.url='https://recetapp.mybluemix.net/recetas/receta-danonino.html'

              break;


            //---LEVITÉ
            case "levite":
              resultado.plato = 'Long iced tea de Levité';
              resultado.ingredientes= `
                                      <li> 250ml de Levité (sabor a elección)</li>
                                      <li> 200ml de agua</li>
                                      <li> 1 saquito de té (sabor a elección) </li>
                                      <li> 2 cucharadas de azúcar</li>
                                      <li> Hielo picado</li>

                                      `;
              resultado.porciones='<b>Rinde 1 vaso (largo)</b>';
              
              resultado.receta = `
                                  <li>Vertí el agua en una taza y calentala en el microondas por 2 minutos</li>
                                  <li>Poné el azúcar en la taza con agua y revolvé hasta disolver</li>
                                  <li>Colocá el saquito de té en el agua, dejalo por 3 minutos y retirá</li>
                                  <li>Vertí la levité en un vaso largo y agregá el hielo picado</li><br>
                                  <li>Agregá el té al vaso con levité y revolvé</li><br>
                                  <h4> <span style="text-decoration: underline;">Tip:</span> Podés decorar el vaso con una rodaja de limón o naranja.</h4>
                                  `;

              resultado.img = '<img src="./images/modal/long_iced_tea.jpg " alt="Té helado" class="w3-image img-receta w3-margin">';

              resultado.imgSrc = 'https://recetapp.mybluemix.net/images/modal/long_iced_tea.jpg'
              resultado.url='https://recetapp.mybluemix.net/recetas/receta-levite.html'

              break;

            //---VILLAVICENCIO
            case "villavicencio":
              resultado.plato = 'Agua de ananá y vainilla';
              resultado.ingredientes= `
                                      <li> 3 rodajas de ananá</li>
                                      <li> 300ml de agua</li>
                                      <li> 3 cucharadas de azúcar</li>
                                      <li> 1 cucharadita de esencia de vainilla </li>
                                      <li> Hielo picado</li>

                                      `;
              resultado.porciones='<b>Rinde 1 vaso (grande)</b>';
              
              resultado.receta = `
                                  <li>Colocá el ananá, el agua, el azúcar y la esencia de vainilla en la licuadora</li>
                                  <li>Vertí la mezcla en un vaso, colando los sólidos</li>
                                  <li>Agregá el hielo picado</li>
                                  <h4> <span style="text-decoration: underline;">Tip:</span> Si lo querés más espeso utilizá la mitad del agua.</h4>
                                  `;

              resultado.img = '<img src="./images/modal/agua_de_anana.jpeg " alt="Agua de Ananá" class="w3-image img-receta w3-margin">';


              resultado.imgSrc = 'https://recetapp.mybluemix.net/images/modal/agua_de_anana.jpeg'
              resultado.url='https://recetapp.mybluemix.net/recetas/receta-villavicencio.html'

              break;

              //---HUEVO
            case "huevo":
              resultado.plato = 'Huevos Napoleón';
              resultado.ingredientes= `
                                      <li> 2 huevos</li>
                                      <li> 2 rebanadas de pan</li>
                                      <li> 100gr de mozzarella</li>
                                      <li> 6 cdas de CasanCrem</li>
                                      <li> 1 cebolla </li>
                                      <li> 1 pimiento verde</li>
                                      <li> 1/2 diente de ajo picado</li>

                                      `;
              resultado.porciones='<b>Rinde 2 porciones</b>';
              
              resultado.receta = `
                                  <li>Hornear el pan cortado en dados a 200º hasta que se dore. Mientras, en una sartén con aceite de oliva, sofreir la cebolla, el pimiento y el ajo. Añadir sal y pimienta a gusto.</li>
                                  <li>Repartir el sofrito en dos cazuelas de barro, agregar el CasanCrem y mezclar.</li>
                                  <li>Agregar por encima, el pan tostado y la mozzarella, dejando un pequeño hueco en el centro y y añadir allí el huevo.</li>
                                  <li>Introducir en el horno y cocinar a 180º hasta que el huevo esté hecho.</li>

                                  <h4> <span style="text-decoration: underline;">Tip:</span> Si lo querés más espeso utilizá la mitad del agua.</h4>
                                  `;

              resultado.img = '<img src="./images/modal/huevos_napoleon.png " alt="Huevos Napoleón" class="w3-image img-receta w3-margin">';


              break;

              //---DEFAULT
              default:
                resultado.plato = "No tenemos recetas aún con este ingrediente";
                resultado.ingredientes="";
                resultado.porciones="";
                resultado.receta="";
                resultado.img=""

        };
        
      }else{
        resultado = {
          success: false
        }
      }

      res.json(resultado)

    })
    .catch(err => {
      console.log(err);
    })
})

app.get("/", (req, res) => {
  res.render("index.html")
})


const visualRecognition = new VisualRecognitionV3({
  url: 'url-visual-recognition',
  version: '2018-03-19',
  authenticator: new IamAuthenticator({
    apikey: 'apikey-model'
  }),
})



function maximo(prev, current) {
  return (prev.score > current.score) ? prev : current
}

app.listen(process.env.PORT||3000, () => console.log("Se levanto el server"))
