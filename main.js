// --------------------------------------------
// CONFIGURAZIONE STATO DEL GIOCO
// --------------------------------------------

// Variabile che tiene traccia dello stato corrente del gioco
// Può essere: "lobby" (menu principale), "story" (modalità storia),
// "choose_game" (selezione minigioco), "memory_game" (minigioco memory),
// "memory_game_win" (vittoria memory), "memory_game_lose" (sconfitta memory),
// "guess_game" (indovina il numero), "guess_game_win" (vittoria guess),
// "guess_game_lose" (sconfitta guess), "mg_play" (raccogli ingranaggi),
// "mg_win" (vittoria ingranaggi)
var gameState = "lobby";

// Indice della scena corrente nella storia (0 = prima scena)
var storyScene = 0;

// Indice del dialogo corrente all'interno della scena
var dialogueIndex = 0;

// Contatore per l'animazione di scrittura del testo (lettera per lettera)
var charCount = 0;

// Booleano che indica se il gioco è in pausa (true) o no (false)
var isPaused = false;

// --------------------------------------------
// VARIABILI PER TOUCH / TELEFONO
// --------------------------------------------

// Flag per evitare click multipli (debounce - utile per touch screen)
var touchCooldown = false;

// Timer per il cooldown del touch (evita click accidentali ripetuti)
var touchCooldownTimer = 0;

// Pulsante AVANTI (->) per la navigazione nella storia - posizionato a destra
var nextButton;

// Pulsanti per il minigioco ingranaggi (touch) - movimento sinistra/destra
var mgLeftButton;
var mgRightButton;

// --------------------------------------------
// VARIABILI MINIGIOCO INGRANAGGI
// --------------------------------------------

// Punteggio del minigioco ingranaggi (da 0 a 10)
var mgScore = 0;

// Messaggio temporaneo (+1 o -1) quando si raccoglie o si perde un ingranaggio
var mgMessage = "";

// Timer per far scomparire il messaggio (30 frame = 0.5 secondi)
var mgMessageTimer = 0;

// Gruppo di sprite che contiene tutti gli ingranaggi che cadono
var gearsGroup;

// Flag che indica se il minigioco ingranaggi è attivo
var mgGameActive = false;

// --------------------------------------------
// VARIABILI MINIGIOCO MEMORY (QUADRATI)
// --------------------------------------------

// Array che contiene tutti i quadrati (sprite)
var memorySquares = [];

// Indice del quadrato diverso (quello con colore differente)
var memoryDifferentIndex = -1;

// Round corrente (1, 2, 3, 4, 5)
var memoryRound = 1;

// Numero di quadrati per round (9, 12, 16, 20, 24)
var memorySquareCount = 9;

// Timer per mostrare il colore diverso (20 frame = 0.33 secondi)
var memoryShowTime = 20;
var memoryShowTimer = 0;

// Timer per il ricordo (180, 150, 120, 90, 60 frame)
var memoryRecallTime = 180;
var memoryRecallTimer = 0;

// Fase attuale: true = mostra (colore diverso visibile), false = ricordo
var memoryIsShowing = true;

// Flag che indica se il minigioco memory è attivo
var memoryGameActive = false;

// Messaggio di errore (tempo scaduto o click sbagliato)
var memoryMessage = "";
var memoryMessageTimer = 0;

// Timer e testo per la spiegazione iniziale del gioco
var memoryExplanationTimer = 0;
var memoryExplanationText = "";

// Colori dei quadrati: normale, diverso, e dopo la fase di mostra (nascosto)
var normalColor = "#3366CC";
var differentColor = "#FFAA00";
var hiddenColor = "#3366CC";

// Flag che indica se il minigioco memory è stato completato
var memoryGameCompleted = false;

// Flag che indica se siamo in modalità storia o minigioco standalone
var isInStoryMode = false;

// --------------------------------------------
// VARIABILI MINIGIOCO INDOVINA IL NUMERO
// --------------------------------------------

// Numero casuale da indovinare (tra 1 e 100)
var guessNumber = 0;

// Tentativi effettuati dall'utente
var guessAttempts = 0;

// Massimo numero di tentativi consentiti (10)
var guessMaxAttempts = 10;

// Flag che indica se il gioco è attivo
var guessGameActive = false;

// Messaggio per l'utente (TROPPO ALTO, TROPPO BASSO, VITTORIA, ecc.)
var guessMessage = "";

// Timer per far scomparire il messaggio
var guessMessageTimer = 0;

// Stringa che contiene l'input corrente dell'utente (es. "42")
var guessCurrentInput = "";

// Flag che indica se il gioco è stato completato
var guessGameCompleted = false;

// Flag che indica se l'utente ha vinto
var guessVictory = false;

// --------------------------------------------
// VARIABILI ANIMAZIONE E TIMER
// --------------------------------------------

// Timer per le attese automatiche (usato nelle animazioni)
var storyTimer = 0;

// Contatore di frame globale (si incrementa ad ogni ciclo di draw)
var frameCounter = 0;

// Flag che impedisce di creare gli sprite più volte
var isInitialized = false;

// --------------------------------------------
// SPRITE PERSONAGGI E BOTTONI
// --------------------------------------------

// Sprite dello sfondo
var backgroundSprite;

// Bottone per avviare la modalità storia (colore marrone #8B7500)
var storyButton;

// Bottone per avviare il minigioco (colore verde #2E8B57)
var minigameButton;

// Bottone per mettere in pausa il gioco (colore rosso #D11A2A)
var pauseButton;

// Sprite del personaggio principale Alberto (scala 43%)
var albertoSprite;

// Sprite del collega scienziato Michele (scala 27%)
var micheleSprite;

// Sprite del collaboratore (scienziato secondario)
var collabSprite;

// Sprite generico per personaggi extra (es. primo romano)
var extraSprite;

// Secondo sprite generico per personaggi extra (es. secondo romano)
var extraSprite2;

// Sprite del personaggio controllato dal giocatore durante il minigioco ingranaggi
var playerMgSprite;

// --------------------------------------------
// VARIABILI PER GESTIONE ROMANI
// --------------------------------------------

// Indica se i romani hanno raggiunto la loro posizione
var romansArrived = false;

// Indica se i romani devono scomparire
var romansDeparting = false;

// ============================================================================
// VARIABILI AGGIUNTIVE PER ANIMAZIONI DELLA STORIA
// ============================================================================

// Posizione X personalizzata per Alberto durante il risucchio (LIFT)
var risucchioLiftX = null;

// Posizione X personalizzata per Michele durante il risucchio (LIFT)
var risucchioLiftXMichele = null;

// Velocità di spostamento laterale durante l'animazione SPIN
var risucchioSpinVelocita = 2;

// Limite massimo di spostamento verso destra durante lo SPIN
var risucchioSpinLimite = 350;

// Velocità di salita durante lo SPIN
var risucchioSpinAlzata = 2;

// Velocità di rimpicciolimento durante lo SPIN
var risucchioSpinRimpicciolimento = 0.006;

// Altezza a cui scompare durante lo SPIN
var risucchioSpinAltezzaScomparsa = 100;

// Scala a cui scompare durante lo SPIN
var risucchioSpinScalaScomparsa = 0.03;

// Velocità di rotazione durante lo SPIN (gradi per frame)
var risucchioSpinRotazione = 25;

// Velocità di risalita nell'animazione EMERGENCE
var emergenceVelocita = 1.2;

// Velocità di crescita della scala nell'EMERGENCE
var emergenceCrescitaScala = 0.01;

// Velocità di riduzione della rotazione nell'EMERGENCE
var emergenceRiduzioneRotazione = 10;

// Velocità di crescita della scala nell'animazione ARRIVAL
var arrivalCrescitaScala = 0.03;

// Velocità di risalita di Michele nell'animazione MICHELE_EMERGENCE
var micheleEmergenceVelocita = 2;

// Velocità di crescita della scala di Michele
var micheleEmergenceCrescitaScala = 0.005;

// Velocità di rotazione di Michele durante l'emergenza
var micheleEmergenceRotazione = 20;

// Velocità di cammino dei romani durante lo spawn
var romaniSpawnVelocita = 2;

// Velocità di movimento normale dei personaggi
var movimentoVelocita = 5;

// Tolleranza di distanza per fermare il movimento
var movimentoTolleranza = 5;

// Intensità dello spostamento orizzontale durante l'effetto tremore
var tremoloIntensitaX = 3;

// Intensità dello spostamento verticale durante l'effetto tremore
var tremoloIntensitaY = 2;

// ============================================================================
// DATI DELLA STORIA
// ============================================================================

// Array che contiene tutte le scene della storia
var storyData = [
  // SCENA 1: Il Disastro - Laboratorio (Anno 2023)
  {
    // Nome dell'immagine di sfondo
    bg: "macchinatempo in fumo_11zon.png_1",
    // Scala dello sfondo (0.87 = 87% della dimensione originale)
    bgScale: 0.87,
    // Posizioni X dei personaggi: [Alberto, Michele, Collaboratore, Romano1, Romano2]
    personaggiX: [150, 80, 250, 450, 450],
    // Altezza Y dei personaggi (330 per il laboratorio)
    personaggioY: 330,
    // Posizione X personalizzata per Alberto durante il risucchio
    risucchioLiftX: null,
    // Posizione X personalizzata per Michele durante il risucchio
    risucchioLiftXMichele: null,
    // Array dei dialoghi di questa scena
    dialogues: [
      { name: "Narratore", text: "Agosto 2023. Il laboratorio e invaso dal fumo. La macchina emette un ronzio sinistro.", chars: [], special: null },
      { name: "Michele", text: "Alberto, i livelli del nucleo sono fuori scala! Il sistema di contenimento non regge!", chars: ["michele-removebg-preview_11zon.png_1", "alberto-sci-removebg-preview_11zon.png_1", "sci1-removebg-preview.png_1"], special: null },
      { name: "Alberto", text: "Non ha senso... i calcoli sulla fusione erano perfetti. Dovrebbe curare le cellule, non distruggerle!", chars: ["alberto-sci-removebg-preview_11zon.png_1", "michele-removebg-preview_11zon.png_1", "sci1-removebg-preview.png_1"], special: null },
      { name: "Collaboratore", text: "Sta implodendo! Allontanatevi tutti!", chars: ["alberto-sci-removebg-preview_11zon.png_1", "michele-removebg-preview_11zon.png_1", "sci1-removebg-preview.png_1"], special: null },
      { name: "Alberto", text: "Aspettate, devo spegnere il...", chars: ["alberto-sci-removebg-preview_11zon.png_1"], special: null }
    ]
  },
  // SCENA 2: VORAGINE E RISUCCHIO (Andata nel tempo)
  {
    bg: "Gemini_Generated_Image_wdhwztwdhwztwdhw_11zon.png_1",
    bgScale: 0.95,
    personaggiX: [150, 80, 250, 450, 450],
    personaggioY: 330,
    risucchioLiftX: 150,
    risucchioLiftXMichele: 150,
    dialogues: [
      { name: "Narratore", text: "UN BOATO... APPARE UNA VORAGINE VIOLA!", chars: ["alberto-sci-removebg-preview_11zon.png_1"], special: null, tremble: true },
      { name: "Alberto", text: "AAAAAAHHHHHH! Cosa sta succedendo?!", chars: ["alberto-sci-removebg-preview_11zon.png_1"], special: "lift", tremble: true },
      { name: "Narratore", text: "Alberto viene risucchiato mentre grida il nome di Michele!", chars: ["alberto-sci-removebg-preview_11zon.png_1"], special: "spin", tremble: true }
    ]
  },
  // SCENA 3: Riemersione dallo squarcio temporale
  {
    bg: "Gemini_Generated_Image_hiyw72hiyw72hiyw-1375x768.jpg_1",
    bgScale: 0.6,
    personaggiX: [200, 80, 250, 450, 450],
    personaggioY: 300,
    dialogues: [
      { name: "Narratore", text: "Alberto riaffiora attraverso lo squarcio temporale...", chars: ["alberto-sci-removebg-preview_11zon.png_1"], special: "emergence", centraAlberto: true }
    ]
  },
  // SCENA 4: L'Arrivo nel Passato (Antica Roma, 472 d.C.)
  {
    bg: "WhatsApp Image 2026-04-23 at 16.42.40_11zon.jpeg_1",
    bgScale: 1.0,
    personaggiX: [150, 80, 250, 280, 350],
    personaggioY: 300,
    dialogues: [
      { name: "Narratore", text: "472 d.C. Alberto si rialza tra le rovine di un tempio e nota che la voragine viola scompare.", chars: ["alberto-sci-removebg-preview_11zon.png_1"], special: "arrival" },
      { name: "Alberto", text: "Maledizione... niente segnale. Nessun GPS. Dove diavolo sono finito?", chars: ["Gemini_Generated_Image_ve08rxve08rxve08-removebg-preview_11zon.png_1"], special: null },
      { name: "Alberto", text: "Scusate! Potete aiutarmi? Ho avuto un incidente in laboratorio, mi serve un telefono?", chars: ["alberto-sci-removebg-preview_11zon.png_1"], special: null, romansSpawn: true },
      { name: "Passante 1", text: "Quid dicit iste insanus? Quam ob rem sic vestitus est?", chars: ["alberto-sci-removebg-preview_11zon.png_1", "rom4-removebg-preview.png_1", "rom1-removebg-preview.png_1"], special: null },
      { name: "Passante 2", text: "Rideat! Videtur avis alba!", chars: ["alberto-sci-removebg-preview_11zon.png_1", "rom4-removebg-preview.png_1", "rom1-removebg-preview.png_1"], special: null },
      { name: "Alberto", text: "No, non capite... Aiutatemi!", chars: ["alberto-sci-removebg-preview_11zon.png_1", "rom4-removebg-preview.png_1", "rom1-removebg-preview.png_1"], special: null },
      { name: "Passante 1", text: "Abi hinc, barbare!", chars: ["alberto-sci-removebg-preview_11zon.png_1", "rom4-removebg-preview.png_1", "rom1-removebg-preview.png_1"], special: null, romansDisappear: true }
    ]
  },
  // SCENA 5: Il Rifugio - QUI INIZIA IL MINIGIOCO MEMORY
  {
    bg: "WhatsApp Image 2026-04-23 at 22.04.46_11zon.jpeg_1",
    bgScale: 0.70,
    personaggiX: [190, 80, 250, 450, 450],
    personaggioY: 300,
    dialogues: [
      { name: "Narratore", text: "Qualche settimana dopo. Alberto nel suo rifugio, maneggia il cellulare collegato a cavi di fortuna.", chars: ["Gemini_Generated_Image_ve08rxve08rxve08-removebg-preview_11zon.png_1"], special: null },
      { name: "Alberto", text: "(Tra se e se) Se la memoria non mi inganna... le declinazioni... il lessico... Il compilatore sta caricando il database linguistico.", chars: ["Gemini_Generated_Image_ve08rxve08rxve08-removebg-preview_11zon.png_1"], special: null },
      { name: "Narratore", text: "Ora tocca a te! Aiuta Alberto con il gioco di memoria!", chars: ["Gemini_Generated_Image_ve08rxve08rxve08-removebg-preview_11zon.png_1"], special: "start_memory_game" }
    ]
  }
];

// SCENA 6: Banchetto con i Romani (DOPO il minigioco)
var scena6 = {
  bg: "Gemini_Generated_Image_wbj1c5wbj1c5wbj1_11zon (1).png_1",
  bgScale: 1.0,
  personaggiX: [70, 80, 250, 180, 220],
  personaggioY: 280,
  dialogues: [
    { name: "Narratore", text: "Il giorno seguente, Alberto va in una citta e trova alcune persone che banchettano.", chars: ["alberto-sci-removebg-preview_11zon.png_1", "rom2-removebg-preview.png_1", "rom5-removebg-preview.png_1"], special: null },
    { name: "Alberto", text: "(Parla nel telefono) Salve, cittadini. Non voglio farvi del male.", chars: ["Gemini_Generated_Image_ve08rxve08rxve08-removebg-preview_11zon.png_1", "rom2-removebg-preview.png_1", "rom5-removebg-preview.png_1"], special: null },
    { name: "Telefono", text: "[Voce Metallica]: Ave, cives. Nolo vobis nocere.", chars: ["Gemini_Generated_Image_ve08rxve08rxve08-removebg-preview_11zon.png_1", "rom2-removebg-preview.png_1", "rom5-removebg-preview.png_1"], special: null },
    { name: "Romano 1", text: "Per deos! La tavoletta di metallo parla!", chars: ["Gemini_Generated_Image_ve08rxve08rxve08-removebg-preview_11zon.png_1", "rom2-removebg-preview.png_1", "rom5-removebg-preview.png_1"], special: null },
    { name: "Romano 2", text: "E un prodigio... Chi sei tu, straniero?", chars: ["alberto-sci-removebg-preview_11zon.png_1", "rom2-removebg-preview.png_1", "rom5-removebg-preview.png_1"], special: null },
    { name: "Romano 1", text: "Se la tua magia ti permette di parlare, sei un ospite degli dei. Mangia con noi.", chars: ["alberto-sci-removebg-preview_11zon.png_1", "rom2-removebg-preview.png_1", "rom5-removebg-preview.png_1"], special: null },
    { name: "Narratore", text: "Alberto accetta e comincia a fare amicizia con i romani.", chars: ["alberto-sci-removebg-preview_11zon.png_1", "rom2-removebg-preview.png_1", "rom5-removebg-preview.png_1"], special: null },
    { name: "Narratore", text: "Dopo il pranzo i romani gli danno un vestito.", chars: ["alberto-rom-removebg-preview.png_1", "rom2-removebg-preview.png_1", "rom5-removebg-preview.png_1"], special: null },
    { name: "Narratore", text: "I romani salutano Alberto e se ne vanno...", chars: ["alberto-rom-removebg-preview.png_1", "rom2-removebg-preview.png_1", "rom5-removebg-preview.png_1"], special: null, hideRomans: true },
    { name: "Narratore", text: "Alberto rimane solo, in attesa...", chars: [], special: null, hideAlberto: true }
  ]
};

// SCENA 7: Il Recupero - Arrivo di Michele
var scena7_1 = {
  bg: "Gemini_Generated_Image_6u87bg6u87bg6u87_11zon.png_1",
  bgScale: 0.95,
  personaggiX: [150, 250, 250, 450, 450],
  personaggioY: 340,
  dialogues: [
    { name: "Narratore", text: "Dicembre 2023, dopo mesi di tentativi Michele ha riparato la macchina, la accende e...", chars: ["michele-removebg-preview_11zon.png_1"], special: null, tremble: false, showMichele: true }
  ]
};

var scena7_2 = {
  bg: "Gemini_Generated_Image_nkjkrvnkjkrvnkjk_11zon.png_1",
  bgScale: 0.95,
  personaggiX: [150, 250, 250, 450, 450],
  personaggioY: 340,
  dialogues: [
    { name: "Narratore", text: "La macchina si accende perfettamente, appare la voragine viola.", chars: ["michele-removebg-preview_11zon.png_1"], special: null, tremble: true },
    { name: "Narratore", text: "Michele si cambia e decide di partire", chars: ["micheleavv-removebg-preview.png_1"], special: null, tremble: true },
    { name: "Michele", text: "Alberto, vengo a salvarti!", chars: ["micheleavv-removebg-preview.png_1"], special: "mich_entrata_destra", tremble: true }
  ]
};

var scena7_3 = {
  bg: "Gemini_Generated_Image_mrzk42mrzk42mrzk_11zon.png_1",
  bgScale: 0.9,
  bgX: 240,
  bgY: 200,
  personaggiX: [150, 250, 250, 450, 450],
  personaggioY: 340,
  dialogues: [
    { name: "Narratore", text: "Michele viene sputato fuori dal portale temporale!", chars: ["micheleavv-removebg-preview.png_1"], special: "emergence_portale_destra", showMichele: true }
  ]
};

var scena7_4 = {
  bg: "WhatsApp Image 2026-04-23 at 22.04.46_11zon.jpeg_1",
  bgScale: 0.7,
  bgX: 240,
  bgY: 200,
  personaggiX: [150, 200, 250, 450, 450],
  personaggioY: 340,
  dialogues: [
    { name: "Michele", text: "Alberto! Dove sei?", chars: ["micheleavv-removebg-preview.png_1"], special: null },
    { name: "Alberto", text: "Sono qui! Il mio telefono mi ha salvato!", chars: ["alberto-rom-removebg-preview.png_1", "micheleavv-removebg-preview.png_1"], special: null, showAlberto: true }
  ]
};

// SCENA 8: VORAGINE E RISUCCHIO (Il Ritorno al 2023)
var scena8_1 = {
  bg: "Gemini_Generated_Image_mrzk42mrzk42mrzk_11zon.png_1",
  bgScale: 0.90,
  personaggiX: [150, 200, 250, 450, 450],
  personaggioY: 330,
  dialogues: [
    { name: "Narratore", text: "All'improvviso, il portale si riapre vicino a loro!", chars: ["alberto-rom-removebg-preview.png_1", "micheleavv-removebg-preview.png_1"], special: null, tremble: true }
  ]
};

var scena8_2 = {
  bg: "Gemini_Generated_Image_mrzk42mrzk42mrzk_11zon.png_1",
  bgScale: 0.90,
  personaggiX: [150, 200, 250, 450, 450],
  personaggioY: 330,
  dialogues: [
    { name: "Michele", text: "Tieniti forte Alberto! Torniamo!", chars: ["alberto-rom-removebg-preview.png_1", "micheleavv-removebg-preview.png_1"], special: "verso_destra", tremble: true }
  ]
};

var scena8_3 = {
  bg: "Gemini_Generated_Image_mrzk42mrzk42mrzk_11zon.png_1",
  bgScale: 0.90,
  personaggiX: [150, 200, 250, 450, 450],
  personaggioY: 330,
  dialogues: [
    { name: "Narratore", text: "I due scienziati vengono risucchiati nel vortice viola!", chars: ["alberto-rom-removebg-preview.png_1", "micheleavv-removebg-preview.png_1"], special: "verso_destra", tremble: true }
  ]
};

// SCENA 9: Epilogo nel Laboratorio (Ritorno a casa)
var scena9_1 = {
  bg: "Gemini_Generated_Image_nkjkrvnkjkrvnkjk_11zon.png_1",
  bgScale: 0.95,
  personaggiX: [140, 200, 250, 450, 450],
  personaggioY: 330,
  dialogues: [
    { name: "Narratore", text: "Viaggiano alla velocita della luce e ripiombano nel laboratorio del 2023!", chars: ["alberto-rom-removebg-preview.png_1", "micheleavv-removebg-preview.png_1", "sci1-removebg-preview.png_1"], special: "emergence", centraAlberto: false }
  ]
};

var scena9_2 = {
  bg: "Gemini_Generated_Image_6u87bg6u87bg6u87_11zon.png_1",
  bgScale: 0.95,
  personaggiX: [150, 200, 250, 450, 450],
  personaggioY: 330,
  dialogues: [
    { name: "Narratore", text: "Si chiude il portale", chars: ["alberto-rom-removebg-preview.png_1", "micheleavv-removebg-preview.png_1", "sci1-removebg-preview.png_1"], special: "emergence", centraAlberto: true },
    { name: "Alberto", text: "Ce l'abbiamo fatta... Abbiamo scoperto come viaggiare nel tempo!", chars: ["alberto-sci-removebg-preview_11zon.png_1", "michele-removebg-preview_11zon.png_1", "sci1-removebg-preview.png_1"], special: null }
  ]
};

// Array completo della storia (viene popolato dalla funzione buildCompleteStory)
var completeStoryData = [];

// Funzione che costruisce l'array completo della storia unendo tutte le scene
function buildCompleteStory() {
  for (var i = 0; i < 5; i++) {
    completeStoryData.push(storyData[i]);  // Aggiunge scene 1-5
  }
  completeStoryData.push(scena6);     // Aggiunge scena 6
  completeStoryData.push(scena7_1);   // Aggiunge scena 7 parte 1
  completeStoryData.push(scena7_2);   // Aggiunge scena 7 parte 2
  completeStoryData.push(scena7_3);   // Aggiunge scena 7 parte 3
  completeStoryData.push(scena7_4);   // Aggiunge scena 7 parte 4
  completeStoryData.push(scena8_1);   // Aggiunge scena 8 parte 1
  completeStoryData.push(scena8_2);   // Aggiunge scena 8 parte 2
  completeStoryData.push(scena8_3);   // Aggiunge scena 8 parte 3
  completeStoryData.push(scena9_1);   // Aggiunge scena 9 parte 1
  completeStoryData.push(scena9_2);   // Aggiunge scena 9 parte 2
}

// Chiamata alla funzione per costruire la storia completa
buildCompleteStory();

// ============================================================================
// FUNZIONI MINIGIOCO INGRANAGGI
// ============================================================================

// Inizializza il minigioco degli ingranaggi
function initMgGame() {
  mgScore = 0;                          // Resetta punteggio
  mgMessage = "";                       // Resetta messaggio
  mgMessageTimer = 0;                   // Resetta timer messaggio
  mgGameActive = true;                  // Attiva il gioco
  if(gearsGroup) gearsGroup.destroyEach();  // Distrugge ingranaggi esistenti
  gearsGroup = new Group();             // Crea nuovo gruppo per gli ingranaggi
}

// ============================================================================
// FUNZIONI MINIGIOCO MEMORY
// ============================================================================

// Inizializza il minigioco memory (quadrati)
function initMemoryGame() {
  // Distrugge tutti i quadrati esistenti
  for (var i = 0; i < memorySquares.length; i++) {
    if (memorySquares[i]) memorySquares[i].remove();
  }
  memorySquares = [];  // Svuota l'array
  
  // Calcola la disposizione in griglia
  var cols = Math.ceil(Math.sqrt(memorySquareCount));  // Numero di colonne
  var rows = Math.ceil(memorySquareCount / cols);      // Numero di righe
  var squareSize = 30;        // Dimensione del quadrato
  var spacingX = 45;          // Spaziatura orizzontale
  var spacingY = 45;          // Spaziatura verticale
  var totalWidth = cols * spacingX;  // Larghezza totale della griglia
  var startX = 400 / 2 - totalWidth / 2 + squareSize / 2;  // Centra orizzontalmente
  var startY = 130;  // Posizione Y iniziale
  
  // Crea i quadrati
  for (var i = 0; i < memorySquareCount; i++) {
    var col = i % cols;                 // Colonna corrente
    var row = Math.floor(i / cols);     // Riga corrente
    var x = startX + col * spacingX;    // Posizione X
    var y = startY + row * spacingY;    // Posizione Y
    var square = createSprite(x, y, squareSize, squareSize);  // Crea lo sprite
    square.shapeColor = normalColor;    // Colore blu di default
    square.setCollider("rectangle", 0, 0, squareSize, squareSize);  // Collider rettangolare
    memorySquares.push(square);         // Aggiunge all'array
  }
  
  // Sceglie un quadrato casuale da colorare diversamente
  memoryDifferentIndex = Math.floor(Math.random() * memorySquareCount);
  memorySquares[memoryDifferentIndex].shapeColor = differentColor;  // Colore giallo/arancione
  
  // Imposta il timer per la fase di mostra
  memoryShowTimer = memoryShowTime;
  
  // Imposta il tempo di ricordo in base al round
  if (memoryRound === 1) memoryRecallTime = 180;
  else if (memoryRound === 2) memoryRecallTime = 150;
  else if (memoryRound === 3) memoryRecallTime = 120;
  else if (memoryRound === 4) memoryRecallTime = 90;
  else memoryRecallTime = 60;
  
  memoryRecallTimer = memoryRecallTime;  // Imposta il timer di ricordo
  memoryIsShowing = true;                // Fase di mostra attiva
  memoryGameActive = true;               // Gioco attivo
  memoryMessage = "";                    // Resetta messaggio
  memoryMessageTimer = 0;                // Resetta timer messaggio
  
  // Testo di spiegazione che dura 90 frame (1.5 secondi)
  memoryExplanationText = "MEMORY! Osserva il quadrato diverso, poi ricordati qual era!";
  memoryExplanationTimer = 90;
}

// Gestisce il click su un quadrato
function handleMemoryClick(index) {
  if (!memoryGameActive) return;    // Se il gioco non è attivo, esci
  if (memoryIsShowing) return;      // Durante la fase di mostra non si può cliccare
  
  if (index === memoryDifferentIndex) {
    // RISPOSTA CORRETTA
    memoryRound++;  // Passa al round successivo
    
    if (memoryRound > 5) {
      // VITTORIA - completati tutti i 5 round
      memoryGameActive = false;
      memoryGameCompleted = true;
      gameState = "memory_game_win";
    } else {
      // Passa al round successivo - aumenta il numero di quadrati
      if (memoryRound === 2) memorySquareCount = 12;
      else if (memoryRound === 3) memorySquareCount = 16;
      else if (memoryRound === 4) memorySquareCount = 20;
      else if (memoryRound === 5) memorySquareCount = 24;
      initMemoryGame();  // Reinizializza il gioco con nuovi quadrati
    }
  } else {
    // RISPOSTA SBAGLIATA - GAME OVER
    memoryGameActive = false;
    gameState = "memory_game_lose";
    memoryMessage = "SBAGLIATO! Il quadrato era il numero " + (memoryDifferentIndex + 1);
    memoryMessageTimer = 60;
  }
}

// Aggiorna la logica del minigioco memory (timer, fasi)
function updateMemoryGame() {
  if (!memoryGameActive) return;
  
  if (memoryIsShowing) {
    // FASE DI MOSTRA: il quadrato diverso è visibile
    memoryShowTimer--;
    if (memoryShowTimer <= 0) {
      // Fine fase di mostra: tutti i quadrati diventano dello stesso colore
      for (var i = 0; i < memorySquares.length; i++) {
        if (memorySquares[i]) {
          memorySquares[i].shapeColor = hiddenColor;
        }
      }
      memoryIsShowing = false;  // Passa alla fase di ricordo
    }
  } else {
    // FASE DI RICORDO: il giocatore deve ricordare quale quadrato era diverso
    if (memoryRecallTimer > 0) {
      memoryRecallTimer--;
    }
    if (memoryRecallTimer <= 0 && memoryGameActive) {
      // Tempo scaduto - GAME OVER
      memoryGameActive = false;
      gameState = "memory_game_lose";
      memoryMessage = "TEMPO SCADUTO! Il quadrato era il numero " + (memoryDifferentIndex + 1);
      memoryMessageTimer = 60;
    }
  }
}

// ============================================================================
// FUNZIONI MINIGIOCO INDOVINA IL NUMERO
// ============================================================================

// Inizializza il minigioco Indovina il Numero
function initGuessGame() {
  guessNumber = Math.floor(Math.random() * 100) + 1;  // Genera numero casuale tra 1 e 100
  guessAttempts = 0;                    // Resetta tentativi
  guessGameActive = true;               // Attiva il gioco
  guessGameCompleted = false;           // Gioco non completato
  guessVictory = false;                 // Nessuna vittoria
  guessMessage = "";                    // Resetta messaggio
  guessMessageTimer = 0;                // Resetta timer messaggio
  guessCurrentInput = "";               // Resetta input
}

// Gestisce l'invio del numero indovinato
function guessSubmit() {
  if (!guessGameActive) return;              // Se il gioco non è attivo, esci
  if (guessCurrentInput === "") return;      // Se l'input è vuoto, non fare nulla
  
  var userGuess = parseInt(guessCurrentInput);  // Converte l'input in numero
  
  // Controlla se il numero è valido (tra 1 e 100)
  if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
    guessMessage = "Numero valido tra 1 e 100!";
    guessMessageTimer = 60;
    return;
  }
  
  guessAttempts++;  // Incrementa i tentativi
  
  if (userGuess === guessNumber) {
    // VITTORIA
    guessMessage = "VITTORIA! Indovinato in " + guessAttempts + " tentativi!";
    guessMessageTimer = 90;
    guessGameActive = false;
    guessVictory = true;
    guessGameCompleted = true;
    gameState = "guess_game_win";
  } else if (userGuess > guessNumber) {
    // TROPPO ALTO
    guessMessage = "TROPPO ALTO! Tentativi rimasti: " + (guessMaxAttempts - guessAttempts);
    guessMessageTimer = 60;
    guessCurrentInput = "";  // Resetta l'input
  } else {
    // TROPPO BASSO
    guessMessage = "TROPPO BASSO! Tentativi rimasti: " + (guessMaxAttempts - guessAttempts);
    guessMessageTimer = 60;
    guessCurrentInput = "";  // Resetta l'input
  }
  
  // Controlla se ha superato i tentativi massimi
  if (guessAttempts >= guessMaxAttempts && !guessVictory) {
    guessGameActive = false;
    gameState = "guess_game_lose";
  }
}

// Cancella l'input corrente (un carattere alla volta)
function guessClear() {
  guessCurrentInput = "";
}

// Aggiunge una cifra all'input corrente
function guessAddDigit(digit) {
  if (!guessGameActive) return;                // Se il gioco non è attivo, esci
  if (guessCurrentInput.length < 3) {          // Limita a 3 cifre (max 100)
    guessCurrentInput += digit;
  }
}

// ============================================================================
// FUNZIONI DI DISEGNO DEI MINIGIOCHI
// ============================================================================

// Disegna il minigioco RACCOGLI INGRANAGGI
function drawMgPlay(isPausedRender) {
  background("#1a1a2e");  // Sfondo grigio scuro
  backgroundSprite.visible = false;  // Nasconde lo sfondo normale
  hideAllChars();                   // Nasconde tutti i personaggi
  nextButton.visible = false;       // Nasconde il pulsante avanti
  mgLeftButton.visible = true;      // Mostra pulsante sinistra
  mgRightButton.visible = true;     // Mostra pulsante destra
  playerMgSprite.visible = true;    // Mostra il personaggio del giocatore
  playerMgSprite.y = 300;           // Posizione Y fissa
  
  // Titolo del gioco
  fill("white");
  textSize(20);
  textAlign(CENTER, TOP);
  text("RACCOGLI 10 INGRANAGGI", 200, 10);
  
  // Punteggio corrente
  fill("#f5c842");
  textSize(16);
  text("Punteggio: " + mgScore + " / 10", 200, 40);
  
  // Spiegazione in basso
  fill("rgba(255,255,255,0.5)");
  textSize(10);
  textAlign(CENTER, BOTTOM);
  text("Usa i pulsanti <- e -> per muoverti", 200, 385);
  
  if (!isPausedRender && mgGameActive) {
    // Movimento con tasti (PC)
    if ((keyDown("left") || keyDown("A")) && playerMgSprite.x > 30) {
      playerMgSprite.x -= 15;  // Movimento veloce
    }
    if ((keyDown("right") || keyDown("D")) && playerMgSprite.x < 370) {
      playerMgSprite.x += 15;  // Movimento veloce
    }
    
    // Genera un nuovo ingranaggio ogni 45 frame
    if (frameCounter % 45 === 0) {
      var gear = createSprite(randomNumber(30, 370), -20);  // Posizione X casuale
      gear.setAnimation("ingranaggio-removebg-preview.png_1");
      gear.scale = 0.2;
      gear.velocityY = randomNumber(4, 8);  // Velocità di caduta casuale
      gear.rotationSpeed = randomNumber(-5, 5);  // Rotazione casuale
      gearsGroup.add(gear);
    }
    
    // Controlla collisioni per ogni ingranaggio
    for (var i = 0; i < gearsGroup.length; i++) {
      var g = gearsGroup.get(i);
      if (g.isTouching(playerMgSprite)) {
        // RACCOLTO: +1 punto
        mgScore = min(mgScore + 1, 10);
        mgMessage = "+1";
        mgMessageTimer = 30;
        g.destroy();
      } else if (g.y > 420) {
        // PERSO (caduto a terra): -1 punto
        mgScore = max(mgScore - 1, 0);
        mgMessage = "-1";
        mgMessageTimer = 30;
        g.destroy();
      }
    }
  }
  
  drawSprites();  // Disegna tutti gli sprite
  
  // Disegna pulsanti touch per il movimento
  stroke("black");
  strokeWeight(2);
  
  // Pulsante SINISTRA (<-)
  fill("#2E8B57");
  rect(100, 340, 90, 50, 10);
  fill("white");
  textSize(28);
  textAlign(CENTER, CENTER);
  text("<", 145, 365);
  
  // Pulsante DESTRA (->)
  fill("#2E8B57");
  rect(210, 340, 90, 50, 10);
  fill("white");
  textSize(28);
  textAlign(CENTER, CENTER);
  text(">", 255, 365);
  
  // Messaggio (+1/-1)
  if (mgMessageTimer > 0) {
    fill(mgMessage.includes("+") ? "#7fe09a" : "#D11A2A");
    textAlign(CENTER, CENTER);
    textSize(18);
    text(mgMessage, 200, 70);
    if (!isPausedRender) mgMessageTimer--;
  }
  
  drawPauseUI();  // Disegna pulsante pausa
  
  // Gestione click sui pulsanti touch
  if (mouseIsPressed && !touchCooldown && mgGameActive) {
    // Pulsante SINISTRA
    if (mouseX > 100 && mouseX < 190 && mouseY > 340 && mouseY < 390) {
      playerMgSprite.x = max(playerMgSprite.x - 15, 30);
      touchCooldown = true;
      touchCooldownTimer = 8;
    }
    // Pulsante DESTRA
    else if (mouseX > 210 && mouseX < 300 && mouseY > 340 && mouseY < 390) {
      playerMgSprite.x = min(playerMgSprite.x + 15, 370);
      touchCooldown = true;
      touchCooldownTimer = 8;
    }
  }
  
  // VITTORIA: raggiunti 10 punti
  if (mgScore >= 10 && mgGameActive) {
    mgGameActive = false;
    mgLeftButton.visible = false;
    mgRightButton.visible = false;
    gameState = "mg_win";
    if(gearsGroup) gearsGroup.destroyEach();
    playerMgSprite.visible = false;
  }
}

// Disegna il minigioco MEMORY
function drawMemoryGame() {
  background("#1a1a2e");  // Sfondo grigio scuro
  updateMemoryGame();      // Aggiorna la logica del gioco
  
  // Mostra spiegazione in basso
  if (memoryExplanationTimer > 0) {
    fill("rgba(0,0,0,0.8)");
    noStroke();
    rect(50, 340, 300, 40, 10);
    fill("#f5c842");
    textSize(12);
    textAlign(CENTER, CENTER);
    text(memoryExplanationText, 200, 360);
    memoryExplanationTimer--;
  }
  
  // Titolo
  fill("white");
  textSize(16);
  textAlign(CENTER, TOP);
  text("MEMORY - TROVA IL QUADRATO DIVERSO", 200, 10);
  
  // Round e numero quadrati
  fill("#f5c842");
  textSize(13);
  text("ROUND: " + memoryRound + " / 5", 200, 35);
  textSize(11);
  text("QUADRATI: " + memorySquareCount, 200, 52);
  
  // Fase corrente
  if (memoryIsShowing) {
    // Fase di mostra
    fill("#FFAA00");
    textSize(11);
    text("OSSERVA IL QUADRATO DIVERSO!", 200, 72);
    fill("#FFAA00");
    rect(60, 82, 280, 6);
    fill("#FF6600");
    rect(60, 82, 280 * (memoryShowTimer / memoryShowTime), 6);
  } else {
    // Fase di ricordo
    fill("#33AAFF");
    textSize(11);
    text("RICORDA! CLICCA SUL QUADRATO CHE ERA DIVERSO", 200, 72);
    fill("#33AAFF");
    rect(60, 82, 280, 6);
    var recallPercent = memoryRecallTimer / memoryRecallTime;
    if (recallPercent < 0) recallPercent = 0;
    fill("#FF3333");
    rect(60, 82, 280 * recallPercent, 6);
    var secondsLeft = Math.ceil(memoryRecallTimer / 60);
    fill("white");
    textSize(10);
    text("TEMPO: " + secondsLeft + "s", 200, 98);
  }
  
  // Disegna tutti i quadrati
  for (var i = 0; i < memorySquares.length; i++) {
    if (memorySquares[i]) drawSprite(memorySquares[i]);
  }
  
  // Mostra messaggio di errore se presente
  if (memoryMessageTimer > 0) {
    fill("rgba(0,0,0,0.7)");
    rect(100, 300, 200, 40, 10);
    fill("#D11A2A");
    textSize(12);
    textAlign(CENTER, CENTER);
    text(memoryMessage, 200, 320);
    memoryMessageTimer--;
  }
  
  drawPauseUI();  // Disegna pulsante pausa
  
  // Gestione click sui quadrati
  if (mouseIsPressed && !touchCooldown && !memoryIsShowing && memoryGameActive) {
    for (var i = 0; i < memorySquares.length; i++) {
      if (memorySquares[i] && isMouseOver(memorySquares[i])) {
        handleMemoryClick(i);
        touchCooldown = true;
        touchCooldownTimer = 15;
        break;
      }
    }
  }
}

// Disegna il minigioco INDOVINA IL NUMERO
function drawGuessGame() {
  background("#1a1a2e");  // Sfondo grigio scuro
  
  // Titolo
  fill("white");
  textSize(20);
  textAlign(CENTER, TOP);
  text("INDOVINA IL NUMERO", 200, 10);
  
  // Descrizione
  fill("#c8a060");
  textSize(12);
  text("Numeri da 1 a 100 (solo interi)", 200, 35);
  
  // Tentativi rimasti
  fill("#f5c842");
  textSize(14);
  text("Tentativi: " + guessAttempts + " / " + guessMaxAttempts, 200, 58);
  
  // Display del numero inserito
  fill("rgba(0,0,0,0.5)");
  noStroke();
  rect(100, 75, 200, 50, 10);
  fill("white");
  textSize(32);
  textAlign(CENTER, CENTER);
  var displayText = guessCurrentInput === "" ? "?" : guessCurrentInput;
  text(displayText, 200, 100);
  
  // Messaggio (TROPPO ALTO/BASSO/VITTORIA)
  if (guessMessageTimer > 0) {
    fill(guessMessage.includes("VITTORIA") ? "#7fe09a" : (guessMessage.includes("TROPPO") ? "#FFAA00" : "#D11A2A"));
    textSize(13);
    textAlign(CENTER, CENTER);
    text(guessMessage, 200, 140);
    guessMessageTimer--;
  }
  
  // TASTIERINO NUMERICO (3x4 con 0 accanto al 9)
  var buttonSize = 55;      // Dimensione di ogni pulsante
  var startX = 45;          // Posizione X iniziale
  var startY = 175;         // Posizione Y iniziale
  var spacing = 65;         // Spaziatura tra pulsanti
  
  // Numeri 1-9 in griglia 3x3 (prime tre righe)
  for (var i = 1; i <= 9; i++) {
    var row = Math.floor((i - 1) / 3);        // Riga (0,1,2)
    var col = (i - 1) % 3;                   // Colonna (0,1,2)
    var x = startX + col * spacing;          // Posizione X
    var y = startY + row * spacing;          // Posizione Y
    
    fill("#3366CC");                         // Blu per i numeri
    stroke("black");
    strokeWeight(2);
    rect(x, y, buttonSize, buttonSize, 10);  // Pulsante arrotondato
    fill("white");
    textSize(24);
    textAlign(CENTER, CENTER);
    text(i, x + buttonSize/2, y + buttonSize/2);  // Numero centrato
  }
  
  // Numero 0 - posizionato accanto al 9 (quarta riga, terza colonna)
  var xZero = startX + 2 * spacing;          // Stessa colonna del 9
  var yZero = startY + 3 * spacing;          // Riga sotto il 9
  fill("#3366CC");
  stroke("black");
  strokeWeight(2);
  rect(xZero, yZero, buttonSize, buttonSize, 10);
  fill("white");
  textSize(24);
  textAlign(CENTER, CENTER);
  text("0", xZero + buttonSize/2, yZero + buttonSize/2);
  
  // PULSANTI C e OK a destra
  var sideStartX = startX + 3 * spacing + 15;  // Posizione X a destra della griglia
  
  // Pulsante CANCELLA (C) - rosso (prima riga a destra)
  fill("#D11A2A");
  rect(sideStartX, startY, buttonSize, buttonSize, 10);
  fill("white");
  textSize(20);
  textAlign(CENTER, CENTER);
  text("C", sideStartX + buttonSize/2, startY + buttonSize/2);
  
  // Pulsante OK - verde (seconda riga a destra)
  fill("#2E8B57");
  rect(sideStartX, startY + spacing, buttonSize, buttonSize, 10);
  fill("white");
  textSize(20);
  textAlign(CENTER, CENTER);
  text("OK", sideStartX + buttonSize/2, startY + spacing + buttonSize/2);
  
  drawPauseUI();  // Disegna pulsante pausa
  
  // Gestione click sui pulsanti
  if (mouseIsPressed && !touchCooldown && guessGameActive) {
    // Numeri 1-9
    for (var i = 1; i <= 9; i++) {
      var row = Math.floor((i - 1) / 3);
      var col = (i - 1) % 3;
      var x = startX + col * spacing;
      var y = startY + row * spacing;
      if (mouseX > x && mouseX < x + buttonSize && mouseY > y && mouseY < y + buttonSize) {
        guessAddDigit(i.toString());
        touchCooldown = true;
        touchCooldownTimer = 10;
        break;
      }
    }
    
    // Numero 0
    if (mouseX > xZero && mouseX < xZero + buttonSize && mouseY > yZero && mouseY < yZero + buttonSize) {
      guessAddDigit("0");
      touchCooldown = true;
      touchCooldownTimer = 10;
    }
    
    // Pulsante CANCELLA (C)
    if (mouseX > sideStartX && mouseX < sideStartX + buttonSize && mouseY > startY && mouseY < startY + buttonSize) {
      guessCurrentInput = "";  // Cancella tutto l'input
      touchCooldown = true;
      touchCooldownTimer = 10;
    }
    
    // Pulsante OK
    if (mouseX > sideStartX && mouseX < sideStartX + buttonSize && mouseY > startY + spacing && mouseY < startY + spacing + buttonSize) {
      guessSubmit();  // Invia il numero
      touchCooldown = true;
      touchCooldownTimer = 10;
    }
  }
}

// Schermata di VITTORIA per Indovina il Numero
function drawGuessGameWin() {
  background("black");  // SFONDO TOTALE NERO
  
  // Riquadro principale
  fill("#110818");
  stroke("#f5c842");
  strokeWeight(4);
  rect(50, 100, 300, 180, 15);
  
  noStroke();
  fill("#f5c842");
  textAlign(CENTER, CENTER);
  textSize(24);
  text("COMPLIMENTI!", 200, 140);
  
  fill("#c8a060");
  textSize(14);
  text("Hai indovinato il numero in " + guessAttempts + " tentativi!\nOttimo lavoro!", 200, 190);
  
  // Bottone per tornare alla lobby
  stroke("#8b6400");
  strokeWeight(2);
  fill("rgba(139,100,0,0.4)");
  rect(120, 230, 160, 35, 5);
  
  noStroke();
  fill("#f5c842");
  textSize(12);
  text("TORNA ALLA LOBBY", 200, 248);
  
  drawPauseUI();  // Disegna pulsante pausa
  
  // Click sul bottone
  if (mouseIsPressed && mouseX > 120 && mouseX < 280 && mouseY > 230 && mouseY < 265 && !touchCooldown) {
    gameState = "lobby";
    touchCooldown = true;
    touchCooldownTimer = 15;
  }
}

// Schermata di SCONFITTA per Indovina il Numero
function drawGuessGameLose() {
  background("#1a1a2e");
  
  fill("#110818");
  stroke("#D11A2A");
  strokeWeight(4);
  rect(50, 100, 300, 180, 15);
  
  noStroke();
  fill("#D11A2A");
  textAlign(CENTER, CENTER);
  textSize(28);
  text("HAI PERSO!", 200, 140);
  
  fill("#c8a060");
  textSize(14);
  text("Hai esaurito i " + guessMaxAttempts + " tentativi!\nIl numero era " + guessNumber, 200, 190);
  
  stroke("#8b6400");
  strokeWeight(2);
  fill("rgba(139,100,0,0.4)");
  rect(80, 220, 110, 35, 5);
  rect(210, 220, 110, 35, 5);
  
  noStroke();
  fill("#f5c842");
  textSize(12);
  text("RIPROVA", 135, 238);
  text("TORNA ALLA LOBBY", 265, 238);
  
  drawPauseUI();
  
  if (mouseIsPressed && !touchCooldown) {
    // Bottone RIPROVA
    if (mouseX > 80 && mouseX < 190 && mouseY > 220 && mouseY < 255) {
      initGuessGame();
      gameState = "guess_game";
      touchCooldown = true;
      touchCooldownTimer = 15;
    }
    // Bottone TORNA ALLA LOBBY
    else if (mouseX > 210 && mouseX < 320 && mouseY > 220 && mouseY < 255) {
      gameState = "lobby";
      touchCooldown = true;
      touchCooldownTimer = 15;
    }
  }
}

// Schermata di VITTORIA per Memory
function drawMemoryGameWin() {
  background("black");  // SFONDO TOTALE NERO
  
  fill("#110818");
  stroke("#f5c842");
  strokeWeight(4);
  rect(50, 100, 300, 180, 15);
  
  noStroke();
  fill("#f5c842");
  textAlign(CENTER, CENTER);
  textSize(24);
  text("COMPLIMENTI!", 200, 140);
  
  fill("#c8a060");
  textSize(14);
  if (isInStoryMode) {
    text("Hai aiutato Alberto a completare il memory!\nOra la storia puo continuare!", 200, 190);
  } else {
    text("Hai completato il memory!\nOttimo lavoro!", 200, 190);
  }
  
  stroke("#8b6400");
  strokeWeight(2);
  fill("rgba(139,100,0,0.4)");
  rect(120, 230, 160, 35, 5);
  
  noStroke();
  fill("#f5c842");
  textSize(12);
  text("CONTINUA", 200, 248);
  
  drawPauseUI();
  
  if (mouseIsPressed && mouseX > 120 && mouseX < 280 && mouseY > 230 && mouseY < 265 && !touchCooldown) {
    // Pulisci i quadrati
    for (var i = 0; i < memorySquares.length; i++) {
      if (memorySquares[i]) memorySquares[i].remove();
    }
    memorySquares = [];
    memoryGameCompleted = true;
    
    if (isInStoryMode) {
      storyScene = 5;
      dialogueIndex = 0;
      charCount = 0;
      gameState = "story";
    } else {
      gameState = "lobby";
    }
    isInStoryMode = false;
    touchCooldown = true;
    touchCooldownTimer = 15;
  }
}

// Schermata di SCONFITTA per Memory
function drawMemoryGameLose() {
  background("#1a1a2e");
  
  fill("#110818");
  stroke("#D11A2A");
  strokeWeight(4);
  rect(50, 100, 300, 180, 15);
  
  noStroke();
  fill("#D11A2A");
  textAlign(CENTER, CENTER);
  textSize(28);
  text("HAI PERSO!", 200, 140);
  
  fill("#c8a060");
  textSize(14);
  text("Non sei riuscito a completare il memory...\nRiprova!", 200, 185);
  
  stroke("#8b6400");
  strokeWeight(2);
  fill("rgba(139,100,0,0.4)");
  rect(80, 220, 110, 35, 5);
  rect(210, 220, 110, 35, 5);
  
  noStroke();
  fill("#f5c842");
  textSize(12);
  text("RIPROVA", 135, 238);
  text("TORNA ALLA LOBBY", 265, 238);
  
  drawPauseUI();
  
  if (mouseIsPressed && !touchCooldown) {
    // Bottone RIPROVA
    if (mouseX > 80 && mouseX < 190 && mouseY > 220 && mouseY < 255) {
      memoryRound = 1;
      memorySquareCount = 9;
      memoryGameActive = true;
      memoryGameCompleted = false;
      for (var i = 0; i < memorySquares.length; i++) {
        if (memorySquares[i]) memorySquares[i].remove();
      }
      memorySquares = [];
      initMemoryGame();
      gameState = "memory_game";
      touchCooldown = true;
      touchCooldownTimer = 15;
    }
    // Bottone TORNA ALLA LOBBY
    else if (mouseX > 210 && mouseX < 320 && mouseY > 220 && mouseY < 255) {
      for (var i = 0; i < memorySquares.length; i++) {
        if (memorySquares[i]) memorySquares[i].remove();
      }
      memorySquares = [];
      gameState = "lobby";
      isInStoryMode = false;
      touchCooldown = true;
      touchCooldownTimer = 15;
    }
  }
}

// Schermata di VITTORIA per Raccogli Ingranggi
function drawMgWin() {
  background("black");  // SFONDO TOTALE NERO
  
  nextButton.visible = false;
  mgLeftButton.visible = false;
  mgRightButton.visible = false;
  
  fill("#110818");
  stroke("#f5c842");
  strokeWeight(4);
  rect(50, 100, 300, 180, 15);
  
  noStroke();
  fill("#f5c842");
  textAlign(CENTER, CENTER);
  textSize(24);
  text("VITTORIA!", 200, 140);
  
  fill("#c8a060");
  textSize(14);
  text("Hai raccolto 10 ingranaggi!\nOttimo lavoro!", 200, 190);
  
  stroke("#8b6400");
  strokeWeight(2);
  fill("rgba(139,100,0,0.4)");
  rect(120, 230, 160, 35, 5);
  
  noStroke();
  fill("#f5c842");
  textSize(12);
  text("TORNA ALLA LOBBY", 200, 248);
  
  drawPauseUI();
  
  if (mouseIsPressed && mouseX > 120 && mouseX < 280 && mouseY > 230 && mouseY < 265 && !touchCooldown) {
    gameState = "lobby";
    touchCooldown = true;
    touchCooldownTimer = 15;
  }
}

// ============================================================================
// SCHERMATA DI SELEZIONE MINIGIOCO (SFONDO BLU)
// ============================================================================

function drawChooseGame() {
  background("#0a2a5a");  // SFONDO BLU (colore blu scuro)
  
  // Titolo
  fill("white");
  textSize(26);
  textAlign(CENTER, TOP);
  text("SELEZIONA MINIGIOCO", 200, 20);
  
  // Linea decorativa
  stroke("#f5c842");
  strokeWeight(2);
  line(50, 50, 350, 50);
  
  fill("#c8a060");
  textSize(12);
  text("Scegli la tua sfida", 200, 70);
  
  // BOTTONI con testo nero
  stroke("black");
  strokeWeight(2);
  
  // Bottone 1 - Raccogli ingranaggi
  fill("#a8e6cf");  // Verde chiaro
  rect(40, 100, 320, 55, 15);
  fill("#000000");  // Testo nero
  textSize(18);
  text("RACCOGLI INGRANAGGI", 200, 130);
  
  // Bottone 2 - Memory
  fill("#a8e6cf");
  rect(40, 175, 320, 55, 15);
  fill("#000000");
  textSize(18);
  text("MEMORY", 200, 205);
  
  // Bottone 3 - Indovina il numero
  fill("#a8e6cf");
  rect(40, 250, 320, 55, 15);
  fill("#000000");
  textSize(18);
  text("INDOVINA IL NUMERO", 200, 280);
  
  // Descrizioni sotto ogni bottone (grigio chiaro)
  fill("#aaaaaa");
  textSize(10);
  text("Raccogli 10 ingranaggi che cadono", 200, 165);
  text("Trova il quadrato diverso in 5 round", 200, 240);
  text("Indovina il numero da 1 a 100 in 10 tentativi", 200, 315);
  
  drawPauseUI();  // Disegna pulsante pausa
  
  // Gestione click sui bottoni
  if (mouseIsPressed && !touchCooldown) {
    // Bottone RACCOGLI INGRANAGGI
    if (mouseX > 40 && mouseX < 360 && mouseY > 100 && mouseY < 155) {
      initMgGame();
      isInStoryMode = false;
      gameState = "mg_play";
      touchCooldown = true;
      touchCooldownTimer = 15;
    }
    // Bottone MEMORY
    else if (mouseX > 40 && mouseX < 360 && mouseY > 175 && mouseY < 230) {
      memoryRound = 1;
      memorySquareCount = 9;
      memoryGameActive = true;
      memoryGameCompleted = false;
      isInStoryMode = false;
      initMemoryGame();
      gameState = "memory_game";
      touchCooldown = true;
      touchCooldownTimer = 15;
    }
    // Bottone INDOVINA IL NUMERO
    else if (mouseX > 40 && mouseX < 360 && mouseY > 250 && mouseY < 305) {
      initGuessGame();
      gameState = "guess_game";
      touchCooldown = true;
      touchCooldownTimer = 15;
    }
  }
}

// ============================================================================
// FUNZIONI PRINCIPALI DEL GIOCO
// ============================================================================

// Verifica se il mouse/tocco è sopra uno sprite
function isMouseOver(sprite) {
  if (!sprite) return false;
  var halfW = sprite.width / 2;
  var halfH = sprite.height / 2;
  return mouseX > sprite.x - halfW && mouseX < sprite.x + halfW &&
         mouseY > sprite.y - halfH && mouseY < sprite.y + halfH;
}

// Inizializza tutti gli sprite del gioco
function initializeGame() {
  if (isInitialized) return;
  
  // Sprite dello sfondo
  backgroundSprite = createSprite(200, 200);
  
  // Bottone modalità storia
  storyButton = createSprite(200, 290, 180, 45);
  storyButton.shapeColor = "#8B7500";
  
  // Bottone minigioco
  minigameButton = createSprite(200, 340, 180, 45);
  minigameButton.shapeColor = "#2E8B57";
  
  // Bottone pausa
  pauseButton = createSprite(35, 375, 50, 25);
  pauseButton.shapeColor = "#D11A2A";
  
  // Pulsante AVANTI per la storia
  nextButton = createSprite(350, 370, 50, 50);
  nextButton.shapeColor = "#2E8B57";
  nextButton.visible = false;
  
  // Pulsanti per il minigioco ingranaggi
  mgLeftButton = createSprite(145, 365, 90, 50);
  mgLeftButton.visible = false;
  mgRightButton = createSprite(255, 365, 90, 50);
  mgRightButton.visible = false;
  
  // Personaggio Alberto
  albertoSprite = createSprite(200, 300);
  albertoSprite.scale = 0.43;
  
  // Personaggio Michele
  micheleSprite = createSprite(100, 300);
  micheleSprite.scale = 0.27;
  
  // Personaggio collaboratore
  collabSprite = createSprite(300, 300);
  collabSprite.scale = 0.27;
  
  // Personaggio extra (romano/passante 1)
  extraSprite = createSprite(450, 300);
  extraSprite.scale = 0.27;
  
  // Personaggio extra (romano/passante 2)
  extraSprite2 = createSprite(450, 300);
  extraSprite2.scale = 0.27;
  
  // Personaggio del minigioco ingranaggi
  playerMgSprite = createSprite(200, 300);
  playerMgSprite.setAnimation("alberto-sci-removebg-preview_11zon.png_1");
  playerMgSprite.scale = 0.43;
  playerMgSprite.visible = false;
  
  // Gruppo per gli ingranaggi
  gearsGroup = new Group();
  
  isInitialized = true;
  romansArrived = false;
  romansDeparting = false;
}

// Ciclo principale di disegno (chiamato 60 volte al secondo)
function draw() {
  initializeGame();
  frameCounter++;
  background("black");
  
  // Gestione cooldown per touch
  if (touchCooldownTimer > 0) {
    touchCooldownTimer--;
    if (touchCooldownTimer <= 0) touchCooldown = false;
  }
  
  if (!isPaused) {
    // Se non in pausa, esegui lo stato corrente
    if (gameState === "lobby") drawLobby();
    else if (gameState === "story") drawStory();
    else if (gameState === "choose_game") drawChooseGame();
    else if (gameState === "memory_game") drawMemoryGame();
    else if (gameState === "memory_game_win") drawMemoryGameWin();
    else if (gameState === "memory_game_lose") drawMemoryGameLose();
    else if (gameState === "guess_game") drawGuessGame();
    else if (gameState === "guess_game_win") drawGuessGameWin();
    else if (gameState === "guess_game_lose") drawGuessGameLose();
    else if (gameState === "mg_play") drawMgPlay();
    else if (gameState === "mg_win") drawMgWin();
  } else {
    drawPauseMenu();  // Menu di pausa
  }
}

// Disegna il menu principale (LOBBY)
function drawLobby() {
  backgroundSprite.setAnimation("backgroundmain+ (1).png_1");
  backgroundSprite.scale = 1;
  backgroundSprite.x = 200;
  backgroundSprite.y = 200;
  backgroundSprite.visible = true;
  
  storyButton.visible = true;
  minigameButton.visible = true;
  pauseButton.visible = false;
  playerMgSprite.visible = false;
  nextButton.visible = false;
  mgLeftButton.visible = false;
  mgRightButton.visible = false;
  
  // Pulisci eventuali quadrati rimasti
  if (memorySquares.length > 0) {
    for (var i = 0; i < memorySquares.length; i++) {
      if (memorySquares[i]) memorySquares[i].remove();
    }
    memorySquares = [];
  }
  
  hideAllChars();
  drawSprites();
  
  // Disegna bordi bottoni
  stroke("black");
  strokeWeight(4);
  noFill();
  rect(storyButton.x - 90, storyButton.y - 22, 180, 45, 5);
  rect(minigameButton.x - 90, minigameButton.y - 22, 180, 45, 5);
  
  // Testo bottoni
  noStroke();
  fill("white");
  textAlign(CENTER, CENTER);
  textSize(14);
  text("MODALITA STORIA", storyButton.x, storyButton.y);
  text("MINIGIOCO", minigameButton.x, minigameButton.y);
  
  // Click su MODALITA STORIA
  if (mouseIsPressed && isMouseOver(storyButton) && !touchCooldown) {
    gameState = "story";
    storyScene = 0;
    dialogueIndex = 0;
    charCount = 0;
    storyData = completeStoryData;
    storyButton.visible = false;
    minigameButton.visible = false;
    romansArrived = false;
    romansDeparting = false;
    memoryGameCompleted = false;
    touchCooldown = true;
    touchCooldownTimer = 15;
  }
  
  // Click su MINIGIOCO
  if (mouseIsPressed && isMouseOver(minigameButton) && !touchCooldown) {
    gameState = "choose_game";
    storyButton.visible = false;
    minigameButton.visible = false;
    touchCooldown = true;
    touchCooldownTimer = 15;
  }
}

// Disegna la modalità storia
function drawStory() {
  var scene = storyData[storyScene];
  var dial = scene.dialogues[dialogueIndex];
  
  // Avvia il minigioco memory (predefinito nella storia)
  if (dial.special === "start_memory_game" && !memoryGameCompleted) {
    memoryRound = 1;
    memorySquareCount = 9;
    memoryGameActive = true;
    memoryGameCompleted = false;
    isInStoryMode = true;
    initMemoryGame();
    gameState = "memory_game";
    return;
  }
  
  // Se il minigioco è già stato completato, salta il dialogo di avvio
  if (dial.special === "start_memory_game" && memoryGameCompleted) {
    nextDialogue();
    return;
  }
  
  // Gestione scomparsa/ricomparsa personaggi
  if (dial.hideRomans) {
    extraSprite.visible = false;
    extraSprite2.visible = false;
  }
  if (dial.hideAlberto) albertoSprite.visible = false;
  if (dial.showAlberto) albertoSprite.visible = true;
  if (dial.showMichele) micheleSprite.visible = true;
  if (dial.romansDisappear) {
    extraSprite.visible = false;
    extraSprite2.visible = false;
  }
  
  if (storyScene > 3 && (romansArrived || romansDeparting)) {
    romansArrived = false;
    romansDeparting = false;
  }
  
  // Imposta sfondo
  backgroundSprite.setAnimation(scene.bg);
  backgroundSprite.scale = scene.bgScale || 0.87;
  backgroundSprite.x = scene.bgX || 200;
  backgroundSprite.y = scene.bgY || 200;
  
  // Effetto tremore
  if (dial.tremble) {
    backgroundSprite.x += random(-tremoloIntensitaX, tremoloIntensitaX);
    backgroundSprite.y += random(-tremoloIntensitaY, tremoloIntensitaY);
  }
  
  // Coordinate personaggi
  var currentY = scene.personaggioY || 300;
  var currentX = scene.personaggiX || [150, 80, 250, 280, 350];
  var risucchioX = scene.risucchioLiftX || null;
  var risucchioXMichele = scene.risucchioLiftXMichele || null;
  
  handleCharacterWalking(dial.chars, dial.special, currentY, currentX, dial.romansSpawn, dial.centraAlberto, risucchioX, risucchioXMichele);
  
  drawSprites();
  
  // Pulsante AVANTI (->) per touch
  nextButton.visible = true;
  stroke("black");
  strokeWeight(2);
  fill("#2E8B57");
  rect(nextButton.x - 25, nextButton.y - 25, 50, 50, 10);
  fill("white");
  textSize(24);
  textAlign(CENTER, CENTER);
  text("->", nextButton.x, nextButton.y);
  
  // Click sul pulsante AVANTI
  if (mouseIsPressed && isMouseOver(nextButton) && !touchCooldown) {
    if (charCount < dial.text.length) charCount = dial.text.length;
    else nextDialogue();
    touchCooldown = true;
    touchCooldownTimer = 15;
  }
  
  // Finestra di dialogo
  var boxH = (dial.name === "Narratore") ? 70 : 100;
  drawDialogueBox(dial.name, dial.text, boxH);
  drawPauseUI();
}

// Disegna la finestra di dialogo
function drawDialogueBox(name, textContent, boxH) {
  stroke("black");
  strokeWeight(4);
  fill("rgba(255, 255, 255, 0.95)");
  rect(10, 10, 380, boxH, 10);
  
  if (charCount < textContent.length) charCount += 0.5;
  var currentText = textContent.substring(0, Math.floor(charCount));
  
  noStroke();
  textAlign(LEFT, TOP);
  
  if (name !== "Narratore" && name !== "") {
    // Colore del nome in base al personaggio
    if (name === "Alberto") fill("#8B7500");
    else if (name === "Entita misteriosa") fill("#B8860B");
    else if (name.includes("Roman") || name.includes("Passante") || name.includes("Michele")) fill("#D11A2A");
    else fill("#2E8B57");
    
    textSize(16);
    text(name + ":", 30, 20);
    fill("black");
    textSize(14);
    text(currentText, 30, 45, 340, boxH - 50);
  } else {
    fill("black");
    textSize(14);
    text(currentText, 30, 25, 340, boxH - 30);
  }
}

// Disegna il pulsante pausa
function drawPauseUI() {
  if (isPaused || gameState === "lobby") {
    pauseButton.visible = false;
    return;
  }
  
  pauseButton.visible = true;
  stroke("black");
  strokeWeight(2);
  fill("#D11A2A");
  rect(10, 362, 50, 25, 5);
  noStroke();
  fill("white");
  textAlign(CENTER, CENTER);
  textSize(10);
  text("PAUSA", 35, 375);
  
  if (mouseIsPressed && isMouseOver(pauseButton) && !touchCooldown) {
    isPaused = true;
    pauseButton.visible = false;
    touchCooldown = true;
    touchCooldownTimer = 15;
  }
}

// Disegna il menu di pausa
function drawPauseMenu() {
  fill("rgba(0,0,0,0.85)");
  rect(0, 0, 400, 400);
  
  stroke("black");
  strokeWeight(4);
  fill("white");
  rect(100, 150, 200, 120, 15);
  stroke("black");
  strokeWeight(2);
  fill("#D11A2A");
  rect(270, 155, 25, 25, 5);
  noStroke();
  fill("white");
  textAlign(CENTER, CENTER);
  textSize(14);
  text("X", 282, 168);
  noStroke();
  fill("black");
  textAlign(CENTER, CENTER);
  textSize(16);
  text("GIOCO IN PAUSA", 200, 185);
  stroke("black");
  strokeWeight(2);
  fill("#8B7500");
  rect(120, 215, 160, 30, 5);
  noStroke();
  fill("white");
  textSize(11);
  text("TORNA ALLA LOBBY", 200, 230);
  
  // Click sulla X -> riprende gioco
  if (mouseIsPressed && mouseX > 270 && mouseX < 295 && mouseY > 155 && mouseY < 180 && !touchCooldown) {
    isPaused = false;
    touchCooldown = true;
    touchCooldownTimer = 15;
  }
  // Click su TORNA ALLA LOBBY
  if (mouseIsPressed && mouseX > 120 && mouseX < 280 && mouseY > 215 && mouseY < 245 && !touchCooldown) {
    isPaused = false;
    playerMgSprite.visible = false;
    gameState = "lobby";
    if(gearsGroup) gearsGroup.destroyEach();
    touchCooldown = true;
    touchCooldownTimer = 15;
  }
}

// Gestisce il movimento e le animazioni dei personaggi nella storia
function handleCharacterWalking(activeChars, special, currentY, currentX, romansSpawn, centraAlberto, risucchioX, risucchioXMichele) {
  var allS = [albertoSprite, micheleSprite, collabSprite, extraSprite, extraSprite2];
  
  // Spawn romani (arrivano camminando da destra)
  if (romansSpawn && !romansArrived && (storyScene === 3 && dialogueIndex === 2)) {
    if (extraSprite.x > currentX[3]) {
      extraSprite.x -= romaniSpawnVelocita;
      extraSprite2.x -= romaniSpawnVelocita;
    } else {
      romansArrived = true;
    }
    extraSprite.visible = true;
    extraSprite2.visible = true;
  }
  
  for (var i = 0; i < allS.length; i++) {
    var s = allS[i];
    var charAnim = null;
    
    // Determina quale animazione/immagine assegnare al personaggio
    if (activeChars) {
      for (var j = 0; j < activeChars.length; j++) {
        var asset = activeChars[j].toLowerCase();
        if (i === 0 && (asset.includes("alberto") || asset.includes("ve08rx"))) charAnim = activeChars[j];
        else if (i === 1 && asset.includes("michele")) charAnim = activeChars[j];
        else if (i === 2 && asset.includes("sci1")) charAnim = activeChars[j];
        else if (i === 3 && (asset.includes("rom4") || asset.includes("rom2"))) charAnim = activeChars[j];
        else if (i === 4 && (asset.includes("rom1") || asset.includes("rom5"))) charAnim = activeChars[j];
      }
    }
    
    if (charAnim) {
      s.visible = true;
      s.setAnimation(charAnim);
      
      // ANIMAZIONE LIFT (inizio risucchio)
      if (special === "lift" && (i === 0 || i === 1)) {
        if (s.y > currentY) s.y -= 1;
        else if (s.y < currentY) s.y += 1;
        if (storyTimer > 30) s.y -= 1.5;
        if (i === 0) s.x = risucchioX !== null ? risucchioX : (currentX[0] || 150);
        if (i === 1) s.x = risucchioXMichele !== null ? risucchioXMichele : (currentX[1] || 250);
        s.rotation = 0;
      }
      // ANIMAZIONE SPIN (rotazione e scomparsa - originale)
      else if (special === "spin" && (i === 0 || i === 1)) {
        s.rotation += risucchioSpinRotazione;
        if (s.x < risucchioSpinLimite) s.x += risucchioSpinVelocita - 0.25;
        if (s.y > (currentY - risucchioSpinAltezzaScomparsa)) s.y -= risucchioSpinAlzata;
        if (s.scale > 0.02) s.scale -= risucchioSpinRimpicciolimento;
        if (s.scale <= risucchioSpinScalaScomparsa || s.y <= currentY - risucchioSpinAltezzaScomparsa) {
          s.visible = false;
          s.scale = 0.02;
        }
      }
      // ANIMAZIONE MICH_ENTRATA_DESTRA (Michele entra da destra)
      else if (special === "mich_entrata_destra" && (i === 0 || i === 1)) {
        s.visible = true;
        if (i === 1) {
          if (s.x > currentX[1]) s.x -= 4;
          if (s.scale < 0.27) s.scale += 0.005;
          if (s.y < currentY) s.y += 2;
          else if (s.y > currentY) s.y -= 1;
          if (s.x <= currentX[1] && s.scale >= 0.27) {
            s.x = currentX[1];
            s.scale = 0.27;
            s.y = currentY;
          }
        }
      }
      // ANIMAZIONE SPIN_DESTRA (va a destra veloce)
      else if (special === "spin_destra" && (i === 0 || i === 1)) {
        s.rotation += risucchioSpinRotazione;
        if (s.x < risucchioSpinLimite) s.x += risucchioSpinVelocita + 0.25;
        if (s.y > (currentY - risucchioSpinAltezzaScomparsa)) s.y -= risucchioSpinAlzata;
        if (s.scale > 0.02) s.scale -= risucchioSpinRimpicciolimento;
        if (s.scale <= risucchioSpinScalaScomparsa || s.y <= currentY - risucchioSpinAltezzaScomparsa) {
          s.visible = false;
          s.scale = 0.02;
        }
      }
      // ANIMAZIONE VERSO_DESTRA (verso destra)
      else if (special === "verso_destra" && (i === 0 || i === 1)) {
        s.rotation += risucchioSpinRotazione;
        if (s.x < 450) s.x += risucchioSpinVelocita + 0.5;
        if (s.y > (currentY - risucchioSpinAltezzaScomparsa)) s.y -= risucchioSpinAlzata;
        if (s.scale > 0.02) s.scale -= risucchioSpinRimpicciolimento;
        if (s.scale <= risucchioSpinScalaScomparsa || s.x >= 450 || s.y <= currentY - risucchioSpinAltezzaScomparsa) {
          s.visible = false;
          s.scale = 0.02;
        }
      }
      // ANIMAZIONE EMERGENCE (riemerge dal basso)
      else if (special === "emergence" && (i === 0 || i === 1)) {
        s.visible = true;
        if (centraAlberto && i === 0) s.x = 200;
        else if (i === 0) s.x = currentX[0];
        if (i === 1) s.x = currentX[1];
        if (s.y < currentY) s.y += emergenceVelocita;
        var targetScale = (i === 0) ? 0.43 : 0.27;
        if (s.scale < targetScale) {
          s.scale += emergenceCrescitaScala;
          if (s.rotation > 0) s.rotation -= emergenceRiduzioneRotazione;
        } else {
          s.scale = targetScale;
          s.rotation = 0;
          if (s.y >= currentY) s.y = currentY;
        }
      }
      // ANIMAZIONE EMERGENCE_PORTALE_DESTRA (Michele esce dal portale a destra)
      else if (special === "emergence_portale_destra" && (i === 0 || i === 1)) {
        s.visible = true;
        if (i === 1) {
          if (s.x > 380) { s.x = 380; s.y = currentY - 20; s.scale = 0.15; }
          if (s.x > currentX[1]) s.x -= 3;
          if (s.y < currentY) s.y += emergenceVelocita;
          if (s.scale < 0.27) s.scale += 0.008;
          if (s.x <= currentX[1] && s.y >= currentY) {
            s.x = currentX[1]; s.y = currentY; s.scale = 0.27; s.rotation = 0;
          }
        } else if (i === 0) {
          if (s.x > currentX[0]) s.x -= 2;
          if (s.x < currentX[0]) s.x = currentX[0];
          if (s.y < currentY) s.y += emergenceVelocita;
          if (s.y >= currentY) s.y = currentY;
          if (s.scale < 0.43) s.scale += 0.01;
          else { s.scale = 0.43; s.rotation = 0; }
        }
      }
      // ANIMAZIONE ARRIVAL (apparizione graduale)
      else if (special === "arrival" && (i === 0 || i === 1)) {
        s.y = currentY;
        s.rotation = 0;
        var arriveScale = (i === 0) ? 0.43 : 0.27;
        if (s.scale < arriveScale) s.scale += arrivalCrescitaScala;
        else s.scale = arriveScale;
      }
      // MOVIMENTO NORMALE
      else {
        if (!romansSpawn || (romansSpawn && romansArrived)) {
          if (s.x < currentX[i] - movimentoTolleranza) s.x += movimentoVelocita;
          else if (s.x > currentX[i] + movimentoTolleranza) s.x -= movimentoVelocita;
          else s.x = currentX[i];
        }
        s.y = currentY;
        s.rotation = 0;
        s.scale = (i === 0) ? 0.43 : 0.27;
      }
    } else {
      if (s.x < 450) s.x += 10;
      if (s.x >= 450) {
        s.x = 450;
        s.visible = false;
      }
    }
  }
}

// Avanza al dialogo successivo o alla scena successiva
function nextDialogue() {
  if (gameState === "story") {
    dialogueIndex++;
    charCount = 0;
    if (dialogueIndex >= storyData[storyScene].dialogues.length) {
      dialogueIndex = 0;
      storyScene++;
      if (storyScene >= storyData.length) {
        gameState = "lobby";
        storyScene = 0;
      }
    }
  }
}

// Gestisce i click del mouse/tocco (non utilizzato direttamente)
function mouseReleased() {
  if (isPaused) return;
}

// Nasconde tutti i personaggi
function hideAllChars() {
  albertoSprite.visible = false;
  micheleSprite.visible = false;
  collabSprite.visible = false;
  extraSprite.visible = false;
  extraSprite2.visible = false;
  
  albertoSprite.scale = 0.43;
  micheleSprite.scale = 0.27;
  collabSprite.scale = 0.27;
  extraSprite.scale = 0.27;
  extraSprite2.scale = 0.27;
  
  albertoSprite.x = 200;
  extraSprite.x = 450;
  extraSprite2.x = 450;
  albertoSprite.rotation = 0;
}
