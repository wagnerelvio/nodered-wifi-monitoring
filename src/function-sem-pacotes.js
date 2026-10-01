const dados = msg.payload;

const LIMITE = 3 * 60 * 1000; // 3 minutos

const agora = Date.now();
const ultimoRegistro = new Date(dados.data).getTime();

if (!Number.isFinite(ultimoRegistro)) {
    node.warn("Data do último registro inválida.");
    return null;
}

const tempoSemDados = agora - ultimoRegistro;

const estadoAnterior =
    context.get("estadoPacote") || "normal";


// Sem novos dados por mais de 3 minutos
if (tempoSemDados >= LIMITE) {

    if (estadoAnterior !== "alerta") {

        context.set("estadoPacote", "alerta");

        const minutos =
            Math.floor(tempoSemDados / 60000);

        msg.payload = {
            chatId: XXXXXXXXX,
            type: "message",
            content:
                "ALERTA DE COMUNICAÇÃO\n\n" +
                "Nenhum novo pacote recebido há mais de 3 minutos.\n" +
                "Tempo sem dados: " + minutos + " min\n" +
                "Último pacote: " + dados.pacote
        };

        node.status({
            fill: "red",
            shape: "dot",
            text: "Sem pacotes"
        });

        return msg;
    }

    // Continua sem dados.
    // Não repete o alerta.
    return null;
}


// Comunicação voltou
if (estadoAnterior === "alerta") {

    context.set("estadoPacote", "normal");

    msg.payload = {
        chatId: XXXXXXXXX,
        type: "message",
        content:
            "COMUNICAÇÃO RESTABELECIDA\n\n" +
            "Novos pacotes voltaram a ser recebidos.\n" +
            "Pacote atual: " + dados.pacote
    };

    node.status({
        fill: "green",
        shape: "dot",
        text: "Pacotes normais"
    });

    return msg;
}

context.set("estadoPacote", "normal");

return null;
