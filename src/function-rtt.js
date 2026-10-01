const dados = msg.payload;

const LIMITE_RTT = 1000;

const estadoAnterior =
    context.get("estadoRTT")
    || "normal";

if (dados.rtt > LIMITE_RTT) {

    if (estadoAnterior !== "alerta") {

        context.set(
            "estadoRTT",
            "alerta"
        );

        msg.payload = {

            chatId:
                XXXXXXXXX,

            type:
                "message",

            content:

                "ALERTA RTT\n\n" +

                "Latencia elevada no enlace.\n" +

                "RTT: " +
                dados.rtt +
                " ms\n" +

                "Limite: " +
                LIMITE_RTT +
                " ms\n" +

                "RSSI: " +
                dados.rssi +
                " dBm\n" +

                "Pacote: " +
                dados.pacote
        };

        return msg;
    }

    return null;
}

if (estadoAnterior === "alerta") {

    context.set(
        "estadoRTT",
        "normal"
    );

    msg.payload = {

        chatId:
            XXXXXXXXX,

        type:
            "message",

        content:

            "RTT NORMALIZADO\n\n" +

            "RTT atual: " +
            dados.rtt +
            " ms\n" +

            "Pacote: " +
            dados.pacote
    };

    return msg;
}

context.set(
    "estadoRTT",
    "normal"
);

return null;
