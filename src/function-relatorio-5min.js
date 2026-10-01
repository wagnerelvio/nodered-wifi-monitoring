const dados = msg.payload;

const agora = Date.now();

const ultimoEnvio =
    context.get("ultimoRelatorio") || 0;

const INTERVALO =
    5 * 60 * 1000; // 5 minutos


if ((agora - ultimoEnvio) < INTERVALO) {
    return null;
}


context.set(
    "ultimoRelatorio",
    agora
);


msg.payload = {

    chatId: XXXXXXXXXXXXX,

    type: "message",

    content:
        "⚠️⚠️ *RELATÓRIO PERIÓDICO* ⚠️⚠️\n\n" +

        "🌡️ Temperatura: " +
        dados.temperatura +
        " °C\n" +

        "💧 Umidade: " +
        dados.umidade +
        " %\n" +

        "📶 RSSI: " +
        dados.rssi +
        " dBm\n" +

        "📏 Distância estimada: " +
        dados.distancia +
        " m\n" +

        "⏱️ RTT: " +
        dados.rtt +
        " ms\n" +

        "✅ ACK: " +
        dados.ack +
        "\n" +

        "📦 Pacote: " +
        dados.pacote
};

msg.payload.options = {
    parse_mode: "Markdown"
};

return msg;
