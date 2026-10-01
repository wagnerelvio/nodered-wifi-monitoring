const dados = msg.payload;

const LIMITE_RSSI = -80;

const estadoAnterior =
    context.get("estadoRSSI")
    || "normal";

if (dados.rssi < LIMITE_RSSI) {

    if (estadoAnterior !== "alerta") {

        context.set(
            "estadoRSSI",
            "alerta"
        );

        msg.payload = {

            chatId:
                XXXXXXXX,

            type:
                "message",

            content:

                "ALERTA RSSI\n\n" +

                "Sinal Wi-Fi abaixo do limite.\n" +

                "RSSI: " +
                dados.rssi +
                " dBm\n" +

                "Limite: " +
                LIMITE_RSSI +
                " dBm\n" +

                "Pacote: " +
                dados.pacote +
                "\n" +

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
        "estadoRSSI",
        "normal"
    );

    msg.payload = {

        chatId:
            XXXXXXXX,

        type:
            "message",

        content:

            "RSSI NORMALIZADO\n\n" +

            "RSSI atual: " +
            dados.rssi +
            " dBm\n" +

            "Pacote: " +
            dados.pacote
    };

    return msg;
}

context.set(
    "estadoRSSI",
    "normal"
);

return null;
