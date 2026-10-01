/*
    ==========================================
    CONFIGURAÇÕES
    ==========================================
*/


// Número do Gustavo no WhatsApp
const WHATSAPP_NUMBER = "5521979096386";


// Elemento da música
const backgroundMusic =
    document.getElementById("backgroundMusic");


// Botão da música
const musicButton =
    document.getElementById("musicButton");


// Texto do botão
const musicStatus =
    document.getElementById("musicStatus");


// Estado da música
let musicPlaying = false;


// Volume da música
// 0.25 = 25%
backgroundMusic.volume = 0.25;



/*
    ==========================================
    TROCAR DE TELA
    ==========================================
*/


function goTo(id) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove("active");

        });


    document
        .getElementById(id)
        .classList.add("active");


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}



/*
    ==========================================
    COMEÇAR MÚSICA E CONTINUAR
    ==========================================
*/


function startMusicAndContinue() {

    /*
        Como essa função é chamada
        através de um clique da usuária,
        o navegador normalmente permite
        iniciar a música.
    */

    backgroundMusic
        .play()
        .then(() => {

            musicPlaying = true;

            updateMusicButton();

        })
        .catch(() => {

            /*
                Caso o navegador bloqueie
                a reprodução, o site continua
                funcionando normalmente.
            */

            musicPlaying = false;

            updateMusicButton();

        });


    /*
        Vai para a segunda tela.
    */

    goTo("choice");

}



/*
    ==========================================
    LIGAR / DESLIGAR MÚSICA
    ==========================================
*/


function toggleMusic() {


    /*
        Se estiver tocando,
        pausa.
    */

    if (musicPlaying) {

        backgroundMusic.pause();

        musicPlaying = false;

        updateMusicButton();

        return;

    }


    /*
        Se estiver pausada,
        tenta tocar.
    */

    backgroundMusic
        .play()
        .then(() => {

            musicPlaying = true;

            updateMusicButton();

        })
        .catch(() => {

            musicPlaying = false;

            updateMusicButton();

        });

}



/*
    ==========================================
    ATUALIZAR BOTÃO DA MÚSICA
    ==========================================
*/


function updateMusicButton() {


    if (musicPlaying) {


        musicButton.classList.add("playing");


        musicButton.innerHTML =
            `
            🎵
            <span id="musicStatus">
                Música: ON
            </span>
            `;


    } else {


        musicButton.classList.remove("playing");


        musicButton.innerHTML =
            `
            🔇
            <span id="musicStatus">
                Música: OFF
            </span>
            `;

    }

}



/*
    ==========================================
    QUANDO ELA ACEITA
    ==========================================
*/


function acceptInvite() {


    goTo("schedule");


    /*
        Pega o campo da data.
    */

    const date =
        document.getElementById("date");


    /*
        Pega a data atual.
    */

    const today =
        new Date();


    /*
        Ano atual.
    */

    const yyyy =
        today.getFullYear();


    /*
        Mês atual.
    */

    const mm =
        String(
            today.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    /*
        Dia atual.
    */

    const dd =
        String(
            today.getDate()
        ).padStart(
            2,
            "0"
        );


    /*
        Define a data mínima.
    */

    date.min =
        `${yyyy}-${mm}-${dd}`;

}



/*
    ==========================================
    BOTÃO "VOU PENSAR..."
    ==========================================
*/


function makeMeWait() {


    const messages = [

        "Tudo bem... mas eu vou fingir que não fiquei nervoso. 😂",

        "Pode pensar. Eu tenho fé. 👀",

        "Essa opção era só para testar se você ia clicar. 😌",

        "Ok... mas a opção 'SIM' continua ali, viu? 💘"

    ];


    /*
        Escolhe uma mensagem aleatória.
    */

    const randomMessage =
        messages[
            Math.floor(
                Math.random() *
                messages.length
            )
        ];


    /*
        Mostra a mensagem.
    */

    document
        .getElementById("tease")
        .textContent =
        randomMessage;

}



/*
    ==========================================
    FORMATAR DATA
    ==========================================

    Exemplo:

    2026-10-18

    vira:

    18/10/2026
    ==========================================
*/


function formatDate(dateValue) {


    const [
        year,
        month,
        day
    ] =
        dateValue.split("-");


    return `${day}/${month}/${year}`;

}



/*
    ==========================================
    MOSTRAR CONFIRMAÇÃO
    ==========================================
*/


function showConfirmation() {


    /*
        Pega a data.
    */

    const dateValue =
        document
            .getElementById("date")
            .value;


    /*
        Pega o horário.
    */

    const timeValue =
        document
            .getElementById("time")
            .value;


    /*
        Campo de erro.
    */

    const error =
        document
            .getElementById("error");



    /*
        Verifica se os dois campos
        foram preenchidos.
    */

    if (!dateValue || !timeValue) {

        error.textContent =
            "Escolhe uma data e um horário primeiro, Samia 😌";

        return;

    }



    /*
        Cria a data selecionada.
    */

    const selected =
        new Date(
            `${dateValue}T${timeValue}:00`
        );


    /*
        Data e hora atuais.
    */

    const now =
        new Date();



    /*
        Não permite escolher
        uma data/hora que já passou.
    */

    if (selected < now) {

        error.textContent =
            "Essa data já passou! Escolhe um momento no futuro 💗";

        return;

    }



    /*
        Limpa qualquer erro.
    */

    error.textContent = "";



    /*
        Mostra a data escolhida.
    */

    document
        .getElementById("chosenDate")
        .textContent =
        formatDate(dateValue);



    /*
        Mostra o horário escolhido.
    */

    document
        .getElementById("chosenTime")
        .textContent =
        timeValue;



    /*
        Vai para a confirmação.
    */

    goTo("confirmation");

}



/*
    ==========================================
    CONFIRMAR + WHATSAPP
    ==========================================
*/


function confirmAndOpenWhatsApp() {


    /*
        Pega a data escolhida.
    */

    const dateValue =
        document
            .getElementById("date")
            .value;


    /*
        Pega o horário escolhido.
    */

    const timeValue =
        document
            .getElementById("time")
            .value;


    /*
        Formata a data.
    */

    const date =
        formatDate(dateValue);



    /*
        Mensagem que será enviada
        para o WhatsApp.
    */

    const message =
        `Oi, Gustavo! 💌\n\n` +
        `Eu aceitei seu convite! 😍\n` +
        `Quero sair com você no dia ${date}, às ${timeValue}.\n\n` +
        `Agora quero descobrir qual é essa surpresa 👀❤️`;



    /*
        Codifica a mensagem.
    */

    const encodedMessage =
        encodeURIComponent(message);



    /*
        Monta o link do WhatsApp.
    */

    const url =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;



    /*
        Abre o WhatsApp.
    */

    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );



    /*
        Mostra a tela final.
    */

    goTo("success");

}
