const { addKeyword, endFlow } = require("@bot-whatsapp/bot")
const { readFileSync } = require("fs");
const { join } = require("path");
const delay = (ms) => new Promise((res => setTimeout(res, ms)))

const getPrompt = async () => {
    const pathPrompt = join(process.cwd(), "prompt");
    const texto = readFileSync(join(pathPrompt, "vpn_ven.txt"), "utf-8");
    return texto;
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
  
///
module.exports = {
    flujoSoporte: (chatgptClass) => {
        return addKeyword("5",{
            sensitive: true,
        })
        .addAction( async (ctx, { endFlow, flowDynamic, provider}) =>{
            await flowDynamic("Contactando a Soporte Tecnico");
            const jid = ctx.key.remoteJid
            const refProvider = await provider.getInstance()
            
            await refProvider.presenceSubscribe(jid)
            await delay(500)
            await refProvider.sendPresenceUpdate('composing', jid)
            
            const respuestaBD = await consultarNombre(ctx.from)
            const username = respuestaBD.nombre
        
            //pasar el PROMPT a ChatGPT
            const data = await getPrompt();
            await chatgptClass.handleMsgChatGPT(data);

            await refProvider.sendPresenceUpdate('paused', jid)

            const textFromAI = await chatgptClass.handleMsgChatGPT(
                `cliente=${username}`
            )

            await flowDynamic(textFromAI.text);
        })
        .addAnswer(
            '*Tienes otra consulta?*\nDigita la palabra *AGENTE* para ser atendido por un Agente de Soporte.', 
            {capture:true},
            async (ctx, { endFlow, fallBack, provider }) => {
                const textFromAI = await chatgptClass.handleMsgChatGPT(ctx.body);

                const jid = ctx.key.remoteJid
                const refProvider = await provider.getInstance()

                if (!ctx.body.toLowerCase().includes('gracias')){
                    await refProvider.sendPresenceUpdate('composing', jid)
                    delay(200)
                    await fallBack(textFromAI.text);
                    delay(500)
                    await refProvider.sendPresenceUpdate('paused', jid)
                } else {
                    return endFlow('Gracias por utilizar nuestros servicios!')
                }
            }
        )

    }
}