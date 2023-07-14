

const consultarNombre = async (phone) => {
    const url = 'https://vpnvenezuela.com/control/api/BotQueryUser.php';
    console.log('telefono:' + phone)
    try {
      //const response = await fetch(url, params)
      const postData = new FormData()
      postData.append('key', 'ABCDE');
      postData.append('phone', phone);

      const response = await fetch(url, {
        method: 'POST',
        body: postData
      });
      const data = await response.json()
      //const datos = JSON.parse(data)
      //console.log(data)
      //const nombre_usuario = "Usuario"
      return data;
    } catch (error) {
      throw new Error(`Error al enviar la petición: ${error.message}`);
    }
  }

  module.exports = consultarNombre;