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
  
const flujoMenuOpcion4 = addKeyword("4",{
    sensitive: true,
}).addAction( async (ctx, { flowDynamic, provider}) =>{
    const respuestaBD = await consultarNombre(ctx.from)

    if(respuestaBD.valid_user){

        //OPCION 4 USUARIO VALIDO
        let nombre_usuario = respuestaBD.nombre

        if (estado_usuario){
            //ESTADO VALIDO, NO DEBE RENOVAR
          await flowDynamic([{body: 'Hola, *' + nombre_usuario + '*'}])
          await flowDynamic([{body: 'Tu Cuenta se encuentra ACTIVA y no es necesario que realices la Renovación.'}])
        } else {
            //DESHABILITADO, ENVIAR INSTRUCCIONES PARA RENOVAR (VALOR, FORMA DE PAGO, CUENTAS)
          await flowDynamic([{body: 'Instrucciones de Renovación'}])
        }
        

    } else {
        //OPCION 4 USUARIO INVITADO
        nombre_usuario = "Usuario"
        await flowDynamic([{body: ' MENU 4 INVITADO'}])

    }
})


module.exports = flujoMenuOpcion4;