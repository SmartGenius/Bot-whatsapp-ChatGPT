const { addKeyword } = require("@bot-whatsapp/bot")

function filterName(name) {
  let newname = name.replace(/[^a-zA-Z ]/g, "");
  return newname;
}

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


const flujoMenuOpcion3 = addKeyword("3",{
            sensitive: true,
        }).addAction( async (ctx, { flowDynamic, gotoFlow, provider}) =>{
            const respuestaBD = await consultarNombre(ctx.from)
    
            if(respuestaBD.valid_user){
                //OPCION 3 USUARIO VALIDO
                nombre_usuario = respuestaBD.nombre
                estado_suscripcion = respuestaBD.estado
                fecha_pago = respuestaBD.fecha_pago
                estado_usuario = respuestaBD.activo
                
                if (estado_usuario){
                  //await flowDynamic([{body: 'Hola, *' + nombre_usuario + '*\nTu Suscripción actualmente se encuentra: *' + estado_suscripcion + '*\nTu próxima fecha de pago es: ' + fecha_pago}])
                } else {
                  //await flowDynamic([{body: 'Tu Servicio se encuentra actualmente *DESHABILITADO*\nDebes renovar tu suscripción desde el Menu principal o contactando alguno de nuestros Agentes de Soporte.'}])
                }

            } else {
                await flowDynamic([{body: '*Prueba DEMO\n\n⏳ Consultando...'}])
                
                let nombre_ws = filterName(ctx.pushName); //filtrar nombre de usuario de whatsapp
                

            }
        })


module.exports = flujoMenuOpcion3;
