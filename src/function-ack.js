const dados = msg.payload;

const estadoAnterior =
    context.get("estadoACK")
    || "normal";

if (dados.ack === 0) {

    if (estadoAnterior !== "alerta") {

        context.set(
            "estadoACK",
            "alerta"
        );

        msg.payload = {

            chatId:
                XXXXXXXX,

            type:
                "message",

            content:

                "ALERTA ACK\n\n" +

                "Pacote sem confirmacao.\n" +

                "Pacote: " +
                dados.pacote +
                "\n" +

                "RSSI: " +
                dados.rssi +
                " dBm\n" +

                "RTT: " +
                dados.rtt +
                " ms"
        };

        return msg;
    }

    return null;
}

if (estadoAnterior === "alerta") {

    context.set(
        "estadoACK",
        "normal"
    );

    msg.payload = {

        chatId:
            XXXXXXXX,

        type:
            "message",

        content:

            "ACK NORMALIZADO\n\n" +

            "A comunicacao voltou ao estado normal.\n" +

            "Pacote: " +
            dados.pacote
    };

    return msg;
}

context.set(
    "estadoACK",
    "normal"
);

return null;
