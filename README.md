# ApiRest Users

[**Diagrama de uso disponible en AQUI**](https://excalidraw.com/#json=bsCgTC6rP63C_tdoOz5iy,wOYnpSRhsc1icWlm-GV3wg)

Esta Api fue desarrollada con NodeJs & ExpressJs, tiene conexión directa con MongoDB.

1- POST = este metodo nos permite crear usuarios en una coleccion de una base de datos MongoDb, para poderlo hacer solicita name, email, password, phones en el siguiente formato JSON:

      {
        "name":"Jhon doe",
        "email":"jhondoe@test.cl",
        "password": "jhonDoe1234.",
        "phones":[{
            "number":"59955123",
            "citycode":"9",
            "countrycode": "59"
        }],
        "isActive": true
      }

    retorna  {
        "id": "6708a2acd2d1025ab3c8e842",
        "username": "Jhon doe",
        "isActive": true,
        "created": "2024-10-11T03:59:40.851Z",
        "modified": "2024-10-11T03:59:40.851Z",
        "token":token
             }

**las siguientes rutas todas solicitan token de accesso y verifican si esta valido ó vigente.**

2- GET = Este método recibe un ID por parámetro y retorna los datos menos sensibles del usuario siempre y cuando exista la base de datos.

            fetch("api/user/id", {
            method: 'GET',
            headers: {
            "Content-Type" : "application/json",
            'Authorization': 'Bearer <tu_token_aqui>'
            }})
            
            retorna{
            "id": "67090cbc06ee3ba6fd68472c",
            "name": "Jhon doe",
            "phones": [
            {
            "number": "59955123",
            "citycode": "9",
            "countrycode": "59"
            }
            ],
            "isActive": true,
            "newToken": token
            }
            
3- PUT = Este método recibe un ID por parámetro y diferentes datos en el cuerpo de la solicitud, primero válida que el usuario exista en la base de datos y procede a actualizar el usuario.

    fetch("api/user/id", {
    method: 'PUT',
    headers: {
        "Content-Type" : "application/json",
        'Authorization': 'Bearer <tu_token_aqui>'
        },
        body: JSON.stringify({data})
        })

    retorna
    {
        "mensaje": "Usuario actualizado con exito",
        "user": {
            "id": "67090cbc06ee3ba6fd68472c",
            "name": "jane doe",
            "email": "jane_doe@test.cl",
            "phones": [
            {
                "number": "00000000",
                "citycode": "9",
                "countrycode": "56"
            }
            ],
            "isActive": true,
            "newToken": token
        }
    }

4- DELETE = Este método recibe un ID por parámetro y busca si el usuario existe en la base de datos, de ser así procede a eliminar el usuario directamente de la base de datos.

    fetch("api/user/id", {
    method: 'DELETE',
    headers: {
        "Content-Type" : "application/json",
        'Authorization': 'Bearer <token>'
        },
        body: JSON.stringify({data})
        })

    retorna {
            "mensaje": "Usuario eliminado con exito"
            }

**La Api esta funcionando en un servidor gratuito de render**

**Endpoints**

       *POST= https://apirest-pruebatecn.onrender.com/api/user
       *GET= https://apirest-pruebatecn.onrender.com/api/user/id
       *PUT= https://apirest-pruebatecn.onrender.com/api/user/id
       *DELETE= https://apirest-pruebatecn.onrender.com/api/user/id

La Api esta disponible en un servidor de **render.com**

                  
## USO EN MODO LOCAL

Clone el repositorio dentro de la carpeta de proyecto, abra una terminal y ejecute npm install para instalar todas las dependencias.

Creen un archivo .env para las variables de entorno y guardé las siguientes variables en él .env:

-MONGO_URL= (debe crear una base de datos en MongoDB/ atlas)

-PORT=5000

-JWT_KEY=(escriba una clave secreta, nos permite menjar autenticacion para los endpoints)
