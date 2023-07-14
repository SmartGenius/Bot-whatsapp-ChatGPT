//require('dotenv').config()
const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const ChatGPTClass = require('./chatgpt.class')
const chatGPT = new ChatGPTClass();

const flowRecibirMedia = addKeyword(EVENTS.MEDIA)
    .addAnswer('He recibido tu foto o video')

    
const flujoPrincipal = require("./flujos/flujoPrincipal");
const { flujoSoporte } = require("./flujos/flujoSoporte");
const flujoMenuOpcion1 = require("./flujos/flujoMenuOpcion1");
const flujoMenuOpcion2 = require("./flujos/flujoMenuOpcion2");
const flujoMenuOpcion3 = require('./flujos/flujoMenuOpcion3');
const flujoMenuOpcion4 = require('./flujos/flujoMenuOpcion4');


const flujoStatus = addKeyword("-99")
    .addAction( async (ctx, { flowDynamic}) =>{
        return flowDynamic([{body: 'STATUS: Operativo!'}])
    })

const flujoAgente = addKeyword("AGENTE")
    .addAnswer('Un Agente de Soporte se pondrá en contacto en breve!.');

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterProvider = createProvider(BaileysProvider)
    const adapterFlow = createFlow([
        flujoPrincipal,
        flujoStatus,
        flujoAgente,
        flowRecibirMedia,
        flujoMenuOpcion1,
        flujoMenuOpcion2,
        flujoMenuOpcion3,
        flujoMenuOpcion4,
        flujoSoporte(chatGPT)
    ])

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB
    })

    //createBotGPT({
    //    provider: adapterProvider,
    //    database: adapterDB,
    //})

    QRPortalWeb()
}

main()

