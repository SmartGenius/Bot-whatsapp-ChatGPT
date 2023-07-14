const { addKeyword } = require("@bot-whatsapp/bot")

const consultarNombre = async (phone) => {
    const url = ''; //URL DE CONSULTA DE USUARIOS
    try {
      const postData = new FormData()
      postData.append('key', 'value'); //EJEMPLO DE POST DATA

      const response = await fetch(url, {
        method: 'POST',
        body: postData
      });
      const data = await response.json()
      return data;
    } catch (error) {
      throw new Error(`Error al enviar la petición: ${error.message}`);
    }
  }

  
const flujoMenuOpcion1 = addKeyword("1",{
            sensitive: true,
        }).addAction( async (ctx, { flowDynamic, provider}) =>{
            const respuestaBD = await consultarNombre(ctx.from)
    
            if(respuestaBD.valid_user){

                //OPCION 1 USUARIO VALIDO
                let nombre_usuario = respuestaBD.nombre
                await flowDynamic([{body: 'Hola, *' + nombre_usuario }])

            } else {
                //OPCION 1 USUARIO INVITADO
                nombre_usuario = "Usuario"

            }
        })


module.exports = flujoMenuOpcion1;
