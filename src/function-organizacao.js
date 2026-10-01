if (typeof msg.payload === "string") {

    try {
        msg.payload =
            JSON.parse(msg.payload);

    } catch (erro) {

        node.error(
            "Erro ao converter JSON",
            msg
        );

        return null;
    }
}

const feeds =
    msg.payload.feeds;

if (
    !Array.isArray(feeds) ||
    feeds.length === 0
) {

    node.warn(
        "Nenhum registro recebido do ThingSpeak."
    );

    return null;
}

const ultimo =
    feeds[feeds.length - 1];

msg.payload = {

    temperatura:
        Number(ultimo.field1),

    umidade:
        Number(ultimo.field2),

    rssi:
        Number(ultimo.field3),

    distancia:
        Number(ultimo.field4),

    pacote:
        Number(ultimo.field5),

    tempoRecepcao:
        Number(ultimo.field6),

    rtt:
        Number(ultimo.field7),

    ack:
        Number(ultimo.field8),

    data:
        ultimo.created_at
};

msg.entryId =
    ultimo.entry_id;

return msg;
