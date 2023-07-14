const {addKeyword, EVENTS } = require('@bot-whatsapp/bot');


const flujoComprobante = addKeyword(EVENTS.MEDIA)
    .addAction( async (ctx, { flowDynamic, provider}) =>{
        console.log("evento");
        return flowDynamic([{body: 'Gracias\nUn Agente revisara este comprobante!'}])
    })

module.exports = flujoComprobante;
