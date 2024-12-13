import Talk from "talkjs";
const urlParams = new URLSearchParams(window.location.search);
const SessionId = urlParams.get("session_token");


window.onload = async () => {
    Talk.ready.then(async function () {
        console.log(urlParams.get("user_name"));
        const id = urlParams.get("user_id");
        const me = new Talk.User({
            name: urlParams.get("user_name"),
            id,
            photoUrl: urlParams.get("user_photo")
        });

        const bot = new Talk.User(urlParams.get("bot_id"));
        const idea = urlParams.get("idea_id");
        const talkSession = new Talk.Session({
            appId: urlParams.get("app_id"),
            me: me,
        });


        const conversation = talkSession.getOrCreateConversation(SessionId);


        conversation.setParticipant(me);
        conversation.setParticipant(bot);

        const chatbox = talkSession.createChatbox();
        chatbox.select(conversation);


        chatbox.mount(document.getElementById('talkjs-container'));
    });

};