const { addKeyword, addAction, EVENTS} = require('@bot-whatsapp/bot');

const consultarNombre = async (phone) => {
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

const flujoPrincipal = addKeyword(EVENTS.WELCOME)
    .addAction( async (ctx, { flowDynamic, provider}) =>{
        const respuestaBD = await consultarNombre(ctx.from)

        if(respuestaBD.valid_user){
            nombre_usuario = respuestaBD.nombre
            await flowDynamic([{body: 'Hola *' + nombre_usuario + '*             Bienvenido a ...'}])
            await flowDynamic([{body: '*Que desea consultar?*      \n*1*. Fecha de Pago\n*2*. Llaves de Acceso \n*3*. Estado de Suscripción \n*4*. Renovar Servicio \n*5*. Soporte Técnico'}])
            await flowDynamic([{body: 'Digita la opción que necesitas del Menu.\nDigita la palabra *AGENTE* para ser atendido por un Agente de Soporte.'}])
        
        } else {
            nombre_usuario = "Usuario"
            await flowDynamic([{body: 'Hola, Bienvenido a ...'}])
            await flowDynamic([{body: '*Que desea realizar?* \n*1*. Adquirir el Servicio\n*2*. Ver Precios y Planes \n*3*. Probar el Servicio \n*4*. Estado del Servicio \n*5*. Soporte Técnico'}])
            await flowDynamic([{body: 'Digita la opción que necesitas del Menu.\nDigita la palabra *AGENTE* para ser atendido por un Agente de Soporte.'}])
        }

})

module.exports = flujoPrincipal;