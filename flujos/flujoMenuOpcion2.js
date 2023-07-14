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


const flujoMenuOpcion2 = addKeyword("2",{
            sensitive: true,
        }).addAction( async (ctx, { flowDynamic, provider}) =>{
            const respuestaBD = await consultarNombre(ctx.from)
    
            if(respuestaBD.valid_user){

                //OPCION 2 USUARIO VALIDO
                nombre_usuario = respuestaBD.nombre
                

                if (estado_usuario){
                 //RESPUESTA SEGUN ESTADO DEL USUARIO
                } else {
                  await flowDynamic([{body: 'Tu Servicio se encuentra actualmente *DESHABILITADO*\nDebes renovar tu suscripción desde el Menu principal o contactando alguno de nuestros Agentes de Soporte.'}])
                }
                

            } else {
                //OPCION 2 USUARIO INVITADO
                nombre_usuario = "Usuario"
                await flowDynamic([{body: ' Precios y Planes del Servicio.'}])

            }
        })


module.exports = flujoMenuOpcion2;
