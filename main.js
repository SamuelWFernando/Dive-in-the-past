// ============================================================================
// VIAGGIO NEL TEMPO - UN GIOCO DI AVVENTURA
// ============================================================================
// Autore: [Il tuo nome]
// Descrizione: Gioco di avventura dove Alberto viaggia nel tempo nell'antica Roma
// Compatibile con PC (mouse) e dispositivi touch (telefono/tablet)
// ============================================================================

// --------------------------------------------
// CONFIGURAZIONE STATO DEL GIOCO
// --------------------------------------------

// Variabile che tiene traccia dello stato corrente del gioco
// Può essere: "lobby", "story", "mg_talk", "mg_play", "mg_post_talk", 
// "mg_win", "circle_game" (minigioco cerchi), "circle_game_lose" (perso), 
// "circle_game_win" (vinto)
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

// Flag per evitare click multipli (debounce) - utile per touch screen
var touchCooldown = false;

// Timer per il cooldown del touch (evita click accidentali ripetuti)
var touchCooldownTimer = 0;

// Pulsante AVANTI (->) per la navigazione nella storia - posizionato a destra
var nextButton;

// --------------------------------------------
// VARIABILI MINIGIOCO INGRANAGGI (originale)
// --------------------------------------------

// Indice del dialogo corrente nel minigioco (0 = primo dialogo)
var mgTalkIndex = 0;

// Punteggio del minigioco (numero di ingranaggi raccolti, massimo 10)
var mgScore = 0;

// Messaggio temporaneo che appare quando si raccoglie/perde un ingranaggio
var mgMessage = "";

// Timer per far scomparire il messaggio dopo 30 frame (0.5 secondi)
var mgMessageTimer = 0;

// Gruppo di sprite che contiene tutti gli ingranaggi che cadono nel minigioco
var gearsGroup;

// --------------------------------------------
// VARIABILI MINIGIOCO CERCHI BLU (nuovo)
// --------------------------------------------

// Array che contiene tutti i cerchi blu (sprite)
var circles = [];

// Indice del cerchio diverso (quello con colore differente)
var differentCircleIndex = -1;

// Round corrente del minigioco cerchi (1, 2, 3, 4)
var circleRound = 1;

// Numero di cerchi da mostrare nel round corrente (4, 6, 8, 10, 12, 14, 16)
var circleCount = 4;

// Tempo rimanente per indovinare il cerchio diverso (in frame)
var circleTimeLeft = 180;  // 180 frame = 3 secondi a 60fps

// Timer per il conto alla rovescia del minigioco cerchi
var circleTimer = 0;

// Flag che indica se il minigioco cerchi è in fase di conteggio (attivo)
var circleGameActive = false;

// Messaggio di errore/tempo scaduto per il minigioco cerchi
var circleMessage = "";

// Timer per il messaggio di errore (dura 60 frame = 1 secondo)
var circleMessageTimer = 0;

// --------------------------------------------
// VARIABILI ANIMAZIONE E TIMER
// --------------------------------------------

// Timer per le attese automatiche (es. nella scena della voragine)
var storyTimer = 0;

// Contatore di frame globale, si incrementa ad ogni ciclo di draw
var frameCounter = 0;

// --------------------------------------------
// FLAG PER INIZIALIZZAZIONE
// --------------------------------------------

// Booleano che indica se il gioco è già stato inizializzato
var isInitialized = false;

// --------------------------------------------
// SPRITE PERSONAGGI E BOTTONI
// --------------------------------------------

// Sprite che contiene l'immagine di sfondo della scena corrente
var backgroundSprite;

// Bottone per avviare la modalità storia
var storyButton;

// Bottone per avviare il minigioco
var minigameButton;

// Bottone per mettere in pausa il gioco
var pauseButton;

// Personaggio principale Alberto
var albertoSprite;

// Personaggio Michele
var micheleSprite;

// Personaggio collaboratore
var collabSprite;

// Personaggio extra (romano/passante 1)
var extraSprite;

// Secondo sprite extra (romano/passante 2)
var extraSprite2;

// Personaggio del giocatore durante il minigioco ingranaggi
var playerMgSprite;

// --------------------------------------------
// VARIABILI PER GESTIONE ROMANI
// --------------------------------------------

// Indica se i romani hanno raggiunto la loro posizione
var romansArrived = false;

// Indica se i romani devono scomparire
var romansDeparting = false;

// ============================================================================
// VARIABILI AGGIUNTIVE PER ANIMAZIONI
// ============================================================================

// Posizione X personalizzata per Alberto durante il lift
var risucchioLiftX = null;

// Posizione X personalizzata per Michele durante il lift
var risucchioLiftXMichele = null;

// Velocità di spostamento laterale durante lo SPIN
var risucchioSpinVelocita = 2;

// Limite massimo di spostamento verso destra
var risucchioSpinLimite = 350;

// Velocità di salita durante lo SPIN
var risucchioSpinAlzata = 2;

// Velocità di rimpicciolimento durante lo SPIN
var risucchioSpinRimpicciolimento = 0.006;

// Altezza a cui scompare durante lo SPIN
var risucchioSpinAltezzaScomparsa = 100;

// Scala a cui scompare durante lo SPIN
var risucchioSpinScalaScomparsa = 0.03;

// Velocità di rotazione (gradi per frame)
var risucchioSpinRotazione = 25;

// Velocità di risalita nell'EMERGENCE
var emergenceVelocita = 1.2;

// Velocità di crescita della scala nell'EMERGENCE
var emergenceCrescitaScala = 0.01;

// Velocità di riduzione della rotazione nell'EMERGENCE
var emergenceRiduzioneRotazione = 10;

// Velocità di crescita della scala nell'ARRIVAL
var arrivalCrescitaScala = 0.03;

// Velocità di risalita di Michele nell'emergence
var micheleEmergenceVelocita = 2;

// Velocità di crescita della scala di Michele
var micheleEmergenceCrescitaScala = 0.005;

// Velocità di rotazione di Michele
var micheleEmergenceRotazione = 20;

// Velocità di cammino dei romani durante lo spawn
var romaniSpawnVelocita = 2;

// Velocità di movimento normale dei personaggi
var movimentoVelocita = 5;

// Tolleranza di distanza per fermare il movimento
var movimentoTolleranza = 5;

// Intensità dello spostamento orizzontale durante il tremore
var tremoloIntensitaX = 3;

// Intensità dello spostamento verticale durante il tremore
var tremoloIntensitaY = 2;

// ============================================================================
// DATI DELLA STORIA
// ============================================================================

var storyData = [

  // SCENA 1: Il Disastro - Laboratorio
  {
    bg: "macchinatempo in fumo_11zon.png_1",
    bgScale: 0.87,
    personaggiX: [150, 80, 250, 450, 450],
    personaggioY: 330,
    risucchioLiftX: null,
    risucchioLiftXMichele: null,
    dialogues: [
      { name: "Narratore", text: "Agosto 2023. Il laboratorio è invaso dal fumo. La macchina emette un ronzio sinistro.", chars: [], special: null },
      { name: "Michele", text: "Alberto, i livelli del nucleo sono fuori scala! Il sistema di contenimento non regge!", chars: ["michele-removebg-preview_11zon.png_1", "alberto-sci-removebg-preview_11zon.png_1", "sci1-removebg-preview.png_1"], special: null },
      { name: "Alberto", text: "Non ha senso... i calcoli sulla fusione erano perfetti. Dovrebbe curare le cellule, non distruggerle!", chars: ["alberto-sci-removebg-preview_11zon.png_1", "michele-removebg-preview_11zon.png_1", "sci1-removebg-preview.png_1"], special: null },
      { name: "Collaboratore", text: "Sta implodendo! Allontanatevi tutti!", chars: ["alberto-sci-removebg-preview_11zon.png_1", "michele-removebg-preview_11zon.png_1", "sci1-removebg-preview.png_1"], special: null },
      { name: "Alberto", text: "Aspettate, devo spegnere il...", chars: ["alberto-sci-removebg-preview_11zon.png_1"], special: null }
    ]
  },
  
  // SCENA 2: VORAGINE E RISUCCHIO
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
  
  // SCENA 3: Riemersione dallo squarcio
  {
    bg: "Gemini_Generated_Image_hiyw72hiyw72hiyw-1375x768.jpg_1",
    bgScale: 0.6,
    personaggiX: [200, 80, 250, 450, 450],
    personaggioY: 300,
    dialogues: [
      { name: "Narratore", text: "Alberto riaffiora attraverso lo squarcio temporale...", chars: ["alberto-sci-removebg-preview_11zon.png_1"], special: "emergence", centraAlberto: true }
    ]
  },
  
  // SCENA 4: Arrivo nel Passato
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
  
  // SCENA 5: Il Rifugio - QUI INIZIA IL MINIGIOCO DEI CERCHI
  {
    bg: "WhatsApp Image 2026-04-23 at 22.04.46_11zon.jpeg_1",
    bgScale: 0.70,
    personaggiX: [190, 80, 250, 450, 450],
    personaggioY: 300,
    dialogues: [
      { name: "Narratore", text: "Qualche settimana dopo. Alberto nel suo rifugio, maneggia il cellulare collegato a cavi di fortuna.", chars: ["Gemini_Generated_Image_ve08rxve08rxve08-removebg-preview_11zon.png_1"], special: null },
      { name: "Alberto", text: "(Tra sé e sé) Se la memoria non mi inganna... le declinazioni... il lessico... Il compilatore sta caricando il database linguistico.", chars: ["Gemini_Generated_Image_ve08rxve08rxve08-removebg-preview_11zon.png_1"], special: null },
      // DIALOGO CHE ATTIVA IL MINIGIOCO DEI CERCHI
      { name: "Narratore", text: "Ora tocca a te! Aiuta Alberto a creare il programma in base alle sue conoscenze.", chars: ["Gemini_Generated_Image_ve08rxve08rxve08-removebg-preview_11zon.png_1"], special: "start_circle_game" }
    ]
  }
];

// Nota: il resto della storia (scena 6,7,8,9) verrà caricato dopo il minigioco cerchi

// SCENA 6: Banchetto con i Romani (dopo il minigioco cerchi)
var scena6 = {
  bg: "Gemini_Generated_Image_wbj1c5wbj1c5wbj1_11zon (1).png_1",
  bgScale: 1.0,
  personaggiX: [70, 80, 250, 180, 220],
  personaggioY: 280,
  dialogues: [
    { name: "Narratore", text: "Il giorno seguente, Alberto va in una città e trova alcune persone che banchettano.", chars: ["alberto-sci-removebg-preview_11zon.png_1", "rom2-removebg-preview.png_1", "rom5-removebg-preview.png_1"], special: null },
    { name: "Alberto", text: "(Parla nel telefono) Salve, cittadini. Non voglio farvi del male.", chars: ["Gemini_Generated_Image_ve08rxve08rxve08-removebg-preview_11zon.png_1", "rom2-removebg-preview.png_1", "rom5-removebg-preview.png_1"], special: null },
    { name: "Telefono", text: "[Voce Metallica]: Ave, cives. Nolo vobis nocere.", chars: ["Gemini_Generated_Image_ve08rxve08rxve08-removebg-preview_11zon.png_1", "rom2-removebg-preview.png_1", "rom5-removebg-preview.png_1"], special: null },
    { name: "Romano 1", text: "Per deos! La tavoletta di metallo parla!", chars: ["Gemini_Generated_Image_ve08rxve08rxve08-removebg-preview_11zon.png_1", "rom2-removebg-preview.png_1", "rom5-removebg-preview.png_1"], special: null },
    { name: "Romano 2", text: "È un prodigio... Chi sei tu, straniero?", chars: ["alberto-sci-removebg-preview_11zon.png_1", "rom2-removebg-preview.png_1", "rom5-removebg-preview.png_1"], special: null },
    { name: "Romano 1", text: "Se la tua magia ti permette di parlare, sei un ospite degli dei. Mangia con noi.", chars: ["alberto-sci-removebg-preview_11zon.png_1", "rom2-removebg-preview.png_1", "rom5-removebg-preview.png_1"], special: null },
    { name: "Narratore", text: "Alberto accetta e comincia a fare amicizia con i romani.", chars: ["alberto-sci-removebg-preview_11zon.png_1", "rom2-removebg-preview.png_1", "rom5-removebg-preview.png_1"], special: null },
    { name: "Narratore", text: "Dopo il pranzo i romani gli danno un vestito.", chars: ["alberto-rom-removebg-preview.png_1", "rom2-removebg-preview.png_1", "rom5-removebg-preview.png_1"], special: null },
    { name: "Narratore", text: "I romani salutano Alberto e se ne vanno...", chars: ["alberto-rom-removebg-preview.png_1", "rom2-removebg-preview.png_1", "rom5-removebg-preview.png_1"], special: null, hideRomans: true },
    { name: "Narratore", text: "Alberto rimane solo, in attesa...", chars: [], special: null, hideAlberto: true }
  ]
};

// SCENA 7: Michele parte per salvare Alberto
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
    { name: "Narratore", text: "Michele viene sputato fuori dal portale temporale!", chars: ["alberto-rom-removebg-preview.png_1", "micheleavv-removebg-preview.png_1"], special: "emergence_portale_destra", showAlberto: true }
  ]
};

var scena7_4 = {
  bg: "WhatsApp Image 2026-04-23 at 22.04.46_11zon.jpeg_1",
  bgScale: 0.7,
  bgX: 240,
  bgY: 200,
  personaggiX: [150, 250, 250, 450, 450],
  personaggioY: 340,
  dialogues: [
    { name: "Michele", text: "Alberto! Abbiamo ricostruito la macchina!", chars: ["alberto-rom-removebg-preview.png_1", "micheleavv-removebg-preview.png_1"], special: null },
    { name: "Alberto", text: "Andiamo, il mio telefono mi ha salvato!", chars: ["alberto-rom-removebg-preview.png_1", "micheleavv-removebg-preview.png_1"], special: null }
  ]
};

// SCENA 8: Ritorno al 2023
var scena8_1 = {
  bg: "Gemini_Generated_Image_mrzk42mrzk42mrzk_11zon.png_1",
  bgScale: 0.90,
  personaggiX: [150, 250, 250, 450, 450],
  personaggioY: 330,
  dialogues: [
    { name: "Narratore", text: "All'improvviso, il portale si riapre vicino a loro!", chars: ["alberto-rom-removebg-preview.png_1", "micheleavv-removebg-preview.png_1"], special: null, tremble: true }
  ]
};

var scena8_2 = {
  bg: "Gemini_Generated_Image_mrzk42mrzk42mrzk_11zon.png_1",
  bgScale: 0.90,
  personaggiX: [150, 250, 250, 450, 450],
  personaggioY: 330,
  dialogues: [
    { name: "Michele", text: "Tieniti forte Alberto! Torniamo!", chars: ["alberto-rom-removebg-preview.png_1", "micheleavv-removebg-preview.png_1"], special: "verso_destra", tremble: true }
  ]
};

var scena8_3 = {
  bg: "Gemini_Generated_Image_mrzk42mrzk42mrzk_11zon.png_1",
  bgScale: 0.90,
  personaggiX: [150, 250, 250, 450, 450],
  personaggioY: 330,
  dialogues: [
    { name: "Narratore", text: "I due scienziati vengono risucchiati nel vortice viola!", chars: ["alberto-rom-removebg-preview.png_1", "micheleavv-removebg-preview.png_1"], special: "verso_destra", tremble: true }
  ]
};

// SCENA 9: Epilogo - Ritorno in laboratorio
var scena9_1 = {
  bg: "Gemini_Generated_Image_nkjkrvnkjkrvnkjk_11zon.png_1",
  bgScale: 0.95,
  personaggiX: [140, 260, 250, 450, 450],
  personaggioY: 330,
  dialogues: [
    { name: "Narratore", text: "Viaggiano alla velocità della luce e ripiombano nel laboratorio del 2023!", chars: ["alberto-rom-removebg-preview.png_1", "micheleavv-removebg-preview.png_1", "sci1-removebg-preview.png_1"], special: "emergence", centraAlberto: false }
  ]
};

var scena9_2 = {
  bg: "Gemini_Generated_Image_6u87bg6u87bg6u87_11zon.png_1",
  bgScale: 0.95,
  personaggiX: [200, 80, 250, 450, 450],
  personaggioY: 330,
  dialogues: [
    { name: "Narratore", text: "Si chiude il portale", chars: ["alberto-rom-removebg-preview.png_1", "micheleavv-removebg-preview.png_1", "sci1-removebg-preview.png_1"], special: "emergence", centraAlberto: true },
    { name: "Alberto", text: "Ce l'abbiamo fatta... Abbiamo scoperto come viaggiare nel tempo!", chars: ["alberto-sci-removebg-preview_11zon.png_1", "michele-removebg-preview_11zon.png_1", "sci1-removebg-preview.png_1"], special: null }
  ]
};

// Array completo della storia (verrà popolato dinamicamente)
var completeStoryData = [];

// ============================================================================
// FUNZIONE PER AGGIUNGERE LA STORIA COMPLETA
// ============================================================================

function buildCompleteStory() {
  // Aggiungi scene 1-5
  for (var i = 0; i < 5; i++) {
    completeStoryData.push(storyData[i]);
  }
  // Aggiungi scene 6-9
  completeStoryData.push(scena6);
  completeStoryData.push(scena7_1);
  completeStoryData.push(scena7_2);
  completeStoryData.push(scena7_3);
  completeStoryData.push(scena7_4);
  completeStoryData.push(scena8_1);
  completeStoryData.push(scena8_2);
  completeStoryData.push(scena8_3);
  completeStoryData.push(scena9_1);
  completeStoryData.push(scena9_2);
}

// Chiama la funzione per costruire la storia completa
buildCompleteStory();

// --------------------------------------------
// DIALOGHI MINIGIOCO INGRANAGGI
// --------------------------------------------

var talkData = [
  { name: "Alberto", text: "Scusate! Sapete dove mi trovo? Ho perso la mia macchina del... ehm, il mio carretto." },
  { name: "Romano", text: "Quid loqueris, barbare? Quis es tu? Veste mira indutus es!" },
  { name: "Alberto", text: "Mi chiamo Alberto! Sono uno... mercante! Un mercante di strane invenzioni!" },
  { name: "Romano", text: "Ah! Mercator! Caupone meo mecum veni! Sed... quid sunt hae rotae ferrariaeque tuae?" },
  { name: "Alberto", text: "(tra sé: parlano latino! Capisco quasi niente... ma sembrano curiosi degli ingranaggi!) Sì, sì! Rotae! Dal cielo! Cadono dal cielo! Devo raccoglierle!" },
  { name: "Romano", text: "A diis missum! Strenuus esto, mercator! Collige eas omnes!" }
];

var postTalkData = [
  { name: "Entità misteriosa", text: "Complimenti! Hai fatto un buon lavoro!" }
];

// ============================================================================
// FUNZIONI PER IL MINIGIOCO DEI CERCHI BLU
// ============================================================================

// Inizializza il minigioco dei cerchi
function initCircleGame() {
  // Distrugge tutti i cerchi esistenti
  for (var i = 0; i < circles.length; i++) {
    if (circles[i]) circles[i].remove();
  }
  circles = [];
  
  // Calcola la disposizione dei cerchi in griglia
  var cols = Math.ceil(Math.sqrt(circleCount));  // Numero di colonne
  var rows = Math.ceil(circleCount / cols);      // Numero di righe
  
  // Calcola spaziatura
  var startX = 400 / 2 - (cols * 45) / 2;  // Posizione X iniziale (centrata)
  var startY = 100;                         // Posizione Y iniziale
  var spacing = 50;                         // Spaziatura tra i cerchi
  
  // Crea i cerchi
  for (var i = 0; i < circleCount; i++) {
    var col = i % cols;                     // Colonna corrente
    var row = Math.floor(i / cols);         // Riga corrente
    
    var x = startX + col * spacing;         // Posizione X del cerchio
    var y = startY + row * spacing;         // Posizione Y del cerchio
    
    // Crea lo sprite del cerchio
    var circle = createSprite(x, y, 40, 40);
    circle.shapeColor = "blue";              // Colore blu di default
    circles.push(circle);
  }
  
  // Sceglie un cerchio casuale da colorare diversamente
  differentCircleIndex = Math.floor(Math.random() * circleCount);
  
  // Colora il cerchio diverso in modo differente (blu chiaro o azzurro)
  circles[differentCircleIndex].shapeColor = "#33AAFF";  // Azzurro più chiaro
  
  // Imposta il timer in base al round (meno secondi man mano che si avanza)
  // Round 1: 180 frame (3 secondi), Round 2: 120 frame (2 secondi), 
  // Round 3: 90 frame (1.5 secondi), Round 4: 60 frame (1 secondo)
  var timeLimit = 180 - (circleRound - 1) * 40;
  if (timeLimit < 60) timeLimit = 60;
  circleTimeLeft = timeLimit;
  
  // Attiva il gioco
  circleGameActive = true;
  circleMessage = "";
  circleMessageTimer = 0;
}

// Gestisce il click su un cerchio
function handleCircleClick(index) {
  if (!circleGameActive) return;  // Se il gioco non è attivo, esci
  
  if (index === differentCircleIndex) {
    // RISPOSTA CORRETTA
    circleRound++;  // Passa al round successivo
    
    if (circleRound > 4) {
      // VITTORIA - completati tutti i 4 round
      circleGameActive = false;
      gameState = "circle_game_win";
    } else {
      // Passa al round successivo
      circleCount += 2;  // Aumenta di 2 cerchi ogni round
      initCircleGame();  // Reinizializza il gioco con nuovi cerchi
    }
  } else {
    // RISPOSTA SBAGLIATA - GAME OVER
    circleGameActive = false;
    gameState = "circle_game_lose";
  }
}

// ============================================================================
// FUNZIONE PER VERIFICARE SE IL MOUSE/TOUCH È SOPRA UNO SPRITE
// ============================================================================

function isMouseOver(sprite) {
  if (!sprite) return false;
  var halfW = sprite.width / 2;
  var halfH = sprite.height / 2;
  return mouseX > sprite.x - halfW && mouseX < sprite.x + halfW &&
         mouseY > sprite.y - halfH && mouseY < sprite.y + halfH;
}

// ============================================================================
// INIZIALIZZAZIONE DEL GIOCO
// ============================================================================

function initializeGame() {
  if (isInitialized) return;
  
  backgroundSprite = createSprite(200, 200);
  
  // BOTTONI DEL MENU
  storyButton = createSprite(200, 290, 180, 45);
  storyButton.shapeColor = "#8B7500";
  
  minigameButton = createSprite(200, 340, 180, 45);
  minigameButton.shapeColor = "#2E8B57";
  
  // Pulsante PAUSA
  pauseButton = createSprite(35, 375, 50, 25);
  pauseButton.shapeColor = "#D11A2A";
  
  // Pulsante AVANTI (->) per touch - posizionato a destra
  nextButton = createSprite(350, 370, 50, 50);
  nextButton.shapeColor = "#2E8B57";
  nextButton.visible = false;
  
  // PERSONAGGI
  albertoSprite = createSprite(200, 300);
  albertoSprite.scale = 0.43;
  
  micheleSprite = createSprite(100, 300);
  micheleSprite.scale = 0.27;
  
  collabSprite = createSprite(300, 300);
  collabSprite.scale = 0.27;
  
  extraSprite = createSprite(450, 300);
  extraSprite.scale = 0.27;
  
  extraSprite2 = createSprite(450, 300);
  extraSprite2.scale = 0.27;
  
  playerMgSprite = createSprite(200, 300);
  playerMgSprite.setAnimation("alberto-sci-removebg-preview_11zon.png_1");
  playerMgSprite.scale = 0.43;
  playerMgSprite.visible = false;
  
  gearsGroup = new Group();
  
  isInitialized = true;
  romansArrived = false;
  romansDeparting = false;
}

// ============================================================================
// DISEGNA IL MINIGIOCO DEI CERCHI BLU
// ============================================================================

function drawCircleGame() {
  background("#1a2a15");  // Sfondo verde scuro
  
  // Aggiorna il timer se il gioco è attivo
  if (circleGameActive && circleTimeLeft > 0) {
    circleTimeLeft--;
  }
  
  // Se il tempo è scaduto, passa alla schermata di sconfitta
  if (circleGameActive && circleTimeLeft <= 0) {
    circleGameActive = false;
    gameState = "circle_game_lose";
    circleMessage = "TEMPO SCADUTO!";
    circleMessageTimer = 60;
  }
  
  // Disegna il titolo del minigioco
  fill("white");
  textSize(20);
  textAlign(CENTER, TOP);
  text("TROVA IL CERCHIO DIVERSO", 200, 10);
  
  // Disegna il round corrente
  fill("#f5c842");
  textSize(16);
  text("ROUND: " + circleRound + " / 4", 200, 40);
  
  // Disegna il numero di cerchi
  text("CERCHI: " + circleCount, 200, 65);
  
  // Disegna il tempo rimanente (barra e numero)
  fill("#D11A2A");
  rect(50, 85, 300, 15);
  
  var timePercent = circleTimeLeft / (180 - (circleRound - 1) * 40);
  if (timePercent < 0) timePercent = 0;
  
  fill("#7fe09a");
  rect(50, 85, 300 * timePercent, 15);
  
  fill("white");
  textSize(12);
  text("TEMPO RIMASTO: " + Math.ceil(circleTimeLeft / 6) + "s", 200, 115);
  
  // Disegna tutti i cerchi
  for (var i = 0; i < circles.length; i++) {
    if (circles[i]) {
      drawSprite(circles[i]);
    }
  }
  
  // Disegna il messaggio di errore se presente
  if (circleMessageTimer > 0) {
    fill("#D11A2A");
    textSize(18);
    textAlign(CENTER, CENTER);
    text(circleMessage, 200, 250);
    circleMessageTimer--;
  }
  
  // Gestione click sui cerchi (per touch e mouse)
  if (mouseIsPressed && !touchCooldown) {
    for (var i = 0; i < circles.length; i++) {
      if (circles[i] && isMouseOver(circles[i])) {
        handleCircleClick(i);
        touchCooldown = true;
        touchCooldownTimer = 15;
        break;
      }
    }
  }
}

// ============================================================================
// DISEGNA LA SCHERMATA DI VITTORIA DEL MINIGIOCO CERCHI
// ============================================================================

function drawCircleGameWin() {
  background("rgba(17, 8, 24, 0.95)");
  
  fill("#110818");
  stroke("#f5c842");
  strokeWeight(4);
  rect(50, 100, 300, 180, 15);
  
  noStroke();
  fill("#f5c842");
  textAlign(CENTER, CENTER);
  textSize(24);
  text("🎉 COMPLIMENTI! 🎉", 200, 140);
  
  fill("#c8a060");
  textSize(14);
  text("Hai aiutato Alberto a creare il programma!\nLa traduzione può iniziare!", 200, 190);
  
  stroke("#8b6400");
  strokeWeight(2);
  fill("rgba(139,100,0,0.4)");
  rect(120, 230, 160, 35, 5);
  
  noStroke();
  fill("#f5c842");
  textSize(12);
  text("CONTINUA", 200, 248);
  
  if (mouseIsPressed && mouseX > 120 && mouseX < 280 && mouseY > 230 && mouseY < 265 && !touchCooldown) {
    // Torna alla storia (scena 6)
    gameState = "story";
    // Svuota i cerchi
    for (var i = 0; i < circles.length; i++) {
      if (circles[i]) circles[i].remove();
    }
    circles = [];
    touchCooldown = true;
    touchCooldownTimer = 15;
  }
}

// ============================================================================
// DISEGNA LA SCHERMATA DI SCONFITTA DEL MINIGIOCO CERCHI
// ============================================================================

function drawCircleGameLose() {
  background("rgba(17, 8, 24, 0.95)");
  
  fill("#110818");
  stroke("#D11A2A");
  strokeWeight(4);
  rect(50, 100, 300, 180, 15);
  
  noStroke();
  fill("#D11A2A");
  textAlign(CENTER, CENTER);
  textSize(28);
  text("❌ HAI PERSO! ❌", 200, 140);
  
  fill("#c8a060");
  textSize(14);
  text("Non sei riuscito ad aiutare Alberto...\nIl programma non funzionerà.", 200, 185);
  
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
  
  if (mouseIsPressed && !touchCooldown) {
    // Bottone RIPROVA
    if (mouseX > 80 && mouseX < 190 && mouseY > 220 && mouseY < 255) {
      // Reset del minigioco cerchi
      circleRound = 1;
      circleCount = 4;
      circleGameActive = false;
      for (var i = 0; i < circles.length; i++) {
        if (circles[i]) circles[i].remove();
      }
      circles = [];
      gameState = "lobby";
      touchCooldown = true;
      touchCooldownTimer = 15;
    }
    // Bottone TORNA ALLA LOBBY
    else if (mouseX > 210 && mouseX < 320 && mouseY > 220 && mouseY < 255) {
      for (var i = 0; i < circles.length; i++) {
        if (circles[i]) circles[i].remove();
      }
      circles = [];
      gameState = "lobby";
      touchCooldown = true;
      touchCooldownTimer = 15;
    }
  }
}

// ============================================================================
// CICLO PRINCIPALE
// ============================================================================

function draw() {
  initializeGame();
  frameCounter++;
  background("black");
  
  // Gestione cooldown per touch
  if (touchCooldownTimer > 0) {
    touchCooldownTimer--;
    if (touchCooldownTimer <= 0) {
      touchCooldown = false;
    }
  }
  
  if (!isPaused) {
    if (gameState === "lobby") {
      drawLobby();
    } else if (gameState === "story") {
      drawStory();
    } else if (gameState === "circle_game") {
      drawCircleGame();
    } else if (gameState === "circle_game_win") {
      drawCircleGameWin();
    } else if (gameState === "circle_game_lose") {
      drawCircleGameLose();
    } else if (gameState === "mg_talk") {
      drawMgTalk();
    } else if (gameState === "mg_play") {
      drawMgPlay();
    } else if (gameState === "mg_post_talk") {
      drawMgPostTalk();
    } else if (gameState === "mg_win") {
      drawMgWin();
    }
  } else {
    drawPauseMenu();
  }
}

// ============================================================================
// MENU PRINCIPALE (LOBBY)
// ============================================================================

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
  
  hideAllChars();
  drawSprites();
  
  stroke("black");
  strokeWeight(4);
  noFill();
  rect(storyButton.x - 90, storyButton.y - 22, 180, 45, 5);
  rect(minigameButton.x - 90, minigameButton.y - 22, 180, 45, 5);
  
  noStroke();
  fill("white");
  textAlign(CENTER, CENTER);
  textSize(14);
  text("MODALITÀ STORIA", storyButton.x, storyButton.y);
  text("MINIGIOCO", minigameButton.x, minigameButton.y);
  
  if (mouseIsPressed && isMouseOver(storyButton) && !touchCooldown) {
    gameState = "story";
    storyScene = 0;
    dialogueIndex = 0;
    charCount = 0;
    // Usa la storia completa
    storyData = completeStoryData;
    storyButton.visible = false;
    minigameButton.visible = false;
    romansArrived = false;
    romansDeparting = false;
    touchCooldown = true;
    touchCooldownTimer = 15;
  }
  
  if (mouseIsPressed && isMouseOver(minigameButton) && !touchCooldown) {
    gameState = "mg_talk";
    mgTalkIndex = 0;
    charCount = 0;
    mgScore = 0;
    storyButton.visible = false;
    minigameButton.visible = false;
    if(gearsGroup) gearsGroup.destroyEach();
    touchCooldown = true;
    touchCooldownTimer = 15;
  }
}

// ============================================================================
// MODALITÀ STORIA
// ============================================================================

function drawStory() {
  var scene = storyData[storyScene];
  var dial = scene.dialogues[dialogueIndex];
  
  // CONTROLLO PER AVVIARE IL MINIGIOCO DEI CERCHI
  if (dial.special === "start_circle_game") {
    // Inizializza il minigioco dei cerchi
    circleRound = 1;
    circleCount = 4;
    circleGameActive = true;
    initCircleGame();
    gameState = "circle_game";
    return;
  }
  
  // GESTIONE SCOMPARSA/RICOMPARSA
  if (dial.hideRomans) {
    extraSprite.visible = false;
    extraSprite2.visible = false;
  }
  if (dial.hideAlberto) {
    albertoSprite.visible = false;
  }
  if (dial.showAlberto) {
    albertoSprite.visible = true;
  }
  if (dial.showMichele) {
    micheleSprite.visible = true;
  }
  if (dial.romansDisappear) {
    extraSprite.visible = false;
    extraSprite2.visible = false;
  }
  
  if (storyScene > 3 && (romansArrived || romansDeparting)) {
    romansArrived = false;
    romansDeparting = false;
  }
  
  // SFONDO
  backgroundSprite.setAnimation(scene.bg);
  backgroundSprite.scale = scene.bgScale || 0.87;
  backgroundSprite.x = scene.bgX || 200;
  backgroundSprite.y = scene.bgY || 200;
  
  if (dial.tremble) {
    backgroundSprite.x += random(-tremoloIntensitaX, tremoloIntensitaX);
    backgroundSprite.y += random(-tremoloIntensitaY, tremoloIntensitaY);
  }
  
  // COORDINATE
  var currentY = scene.personaggioY || 300;
  var currentX = scene.personaggiX || [150, 80, 250, 280, 350];
  var risucchioX = scene.risucchioLiftX || null;
  var risucchioXMichele = scene.risucchioLiftXMichele || null;
  
  handleCharacterWalking(dial.chars, dial.special, currentY, currentX, dial.romansSpawn, dial.centraAlberto, risucchioX, risucchioXMichele);
  
  drawSprites();
  
  // PULSANTE AVANTI (->) PER TOUCH
  nextButton.visible = true;
  stroke("black");
  strokeWeight(2);
  fill("#2E8B57");
  rect(nextButton.x - 25, nextButton.y - 25, 50, 50, 10);
  fill("white");
  textSize(24);
  textAlign(CENTER, CENTER);
  text("→", nextButton.x, nextButton.y);
  
  // LOGICA CLICK PULSANTE AVANTI
  if (mouseIsPressed && isMouseOver(nextButton) && !touchCooldown) {
    if (charCount < dial.text.length) {
      charCount = dial.text.length;
    } else {
      nextDialogue();
    }
    touchCooldown = true;
    touchCooldownTimer = 15;
  }
  
  // FINESTRA DIALOGO
  var boxH = (dial.name === "Narratore") ? 70 : 100;
  drawDialogueBox(dial.name, dial.text, boxH);
  
  // BOTTONE PAUSA
  drawPauseUI();
}

// ============================================================================
// DIALOGHI PRE-MINIGIOCO INGRANAGGI
// ============================================================================

function drawMgTalk() {
  backgroundSprite.setAnimation("WhatsApp Image 2026-04-23 at 16.42.40_11zon.jpeg_1");
  backgroundSprite.x = 200;
  backgroundSprite.y = 200;
  backgroundSprite.scale = 1;
  backgroundSprite.visible = true;
  
  nextButton.visible = false;
  
  albertoSprite.setAnimation("alberto-sci-removebg-preview_11zon.png_1");
  albertoSprite.visible = true;
  albertoSprite.x = 100;
  albertoSprite.y = 300;
  
  extraSprite.setAnimation("rom4-removebg-preview.png_1");
  extraSprite.visible = true;
  extraSprite.x = 300;
  extraSprite.y = 300;
  
  drawSprites();
  
  var dial = talkData[mgTalkIndex];
  drawDialogueBox(dial.name, dial.text, 100);
  drawPauseUI();
  
  if (mouseIsPressed && !touchCooldown) {
    if (charCount < dial.text.length) {
      charCount = dial.text.length;
    } else {
      nextDialogue();
    }
    touchCooldown = true;
    touchCooldownTimer = 15;
  }
}

// ============================================================================
// MINIGIOCO INGRANAGGI
// ============================================================================

function drawMgPlay(isPausedRender) {
  background("#1a2a15");
  backgroundSprite.visible = false;
  hideAllChars();
  nextButton.visible = false;
  
  playerMgSprite.visible = true;
  playerMgSprite.y = 300;
  
  if (!isPausedRender) {
    if ((keyDown("left") || keyDown("A")) && playerMgSprite.x > 30) {
      playerMgSprite.x -= 6;
    }
    if ((keyDown("right") || keyDown("D")) && playerMgSprite.x < 370) {
      playerMgSprite.x += 6;
    }
    
    if (mouseIsPressed && mouseX > 0 && mouseX < 400 && !touchCooldown) {
      playerMgSprite.x = constrain(mouseX, 30, 370);
    }
    
    if (frameCounter % 50 === 0) {
      var gear = createSprite(randomNumber(30, 370), -20);
      gear.setAnimation("ingranaggio-removebg-preview.png_1");
      gear.scale = 0.2;
      gear.velocityY = randomNumber(3, 6);
      gear.rotationSpeed = randomNumber(-5, 5);
      gearsGroup.add(gear);
    }
    
    for (var i = 0; i < gearsGroup.length; i++) {
      var g = gearsGroup.get(i);
      if (g.isTouching(playerMgSprite)) {
        mgScore = min(mgScore + 1, 10);
        mgMessage = "+1 ⚙️";
        mgMessageTimer = 30;
        g.destroy();
      } else if (g.y > 420) {
        mgScore = max(mgScore - 1, 0);
        mgMessage = "-1 ⚙️";
        mgMessageTimer = 30;
        g.destroy();
      }
    }
  }
  
  drawSprites();
  
  fill("rgba(0,0,0,0.7)");
  noStroke();
  rect(0, 0, 400, 40);
  fill("#f5c842");
  textSize(16);
  textAlign(LEFT, CENTER);
  text("⚙️ Ingranaggi: " + mgScore + " / 10", 10, 20);
  
  if (mgMessageTimer > 0) {
    fill(mgMessage.includes("+") ? "#7fe09a" : "#D11A2A");
    textAlign(CENTER, CENTER);
    textSize(18);
    text(mgMessage, 200, 20);
    if (!isPausedRender) mgMessageTimer--;
  }
  
  drawPauseUI();
  
  if (mgScore >= 10) {
    gameState = "mg_post_talk";
    mgTalkIndex = 0;
    charCount = 0;
    if(gearsGroup) gearsGroup.destroyEach();
    playerMgSprite.visible = false;
  }
}

// ============================================================================
// DIALOGHI POST-MINIGIOCO INGRANAGGI
// ============================================================================

function drawMgPostTalk() {
  backgroundSprite.setAnimation("WhatsApp Image 2026-04-23 at 16.42.40_11zon.jpeg_1");
  backgroundSprite.visible = true;
  backgroundSprite.x = 200;
  backgroundSprite.y = 200;
  
  nextButton.visible = false;
  
  albertoSprite.setAnimation("alberto-sci-removebg-preview_11zon.png_1");
  albertoSprite.visible = true;
  albertoSprite.x = 100;
  albertoSprite.y = 300;
  
  extraSprite.setAnimation("rom4-removebg-preview.png_1");
  extraSprite.visible = true;
  extraSprite.x = 300;
  extraSprite.y = 300;
  
  drawSprites();
  
  var dial = postTalkData[mgTalkIndex];
  drawDialogueBox(dial.name, dial.text, 100);
  drawPauseUI();
  
  if (mouseIsPressed && !touchCooldown) {
    if (charCount < dial.text.length) {
      charCount = dial.text.length;
    } else {
      nextDialogue();
    }
    touchCooldown = true;
    touchCooldownTimer = 15;
  }
}

// ============================================================================
// SCHERMATA VITTORIA INGRANAGGI
// ============================================================================

function drawMgWin() {
  background("rgba(17, 8, 24, 0.9)");
  
  nextButton.visible = false;
  pauseButton.visible = false;
  
  fill("#110818");
  stroke("#f5c842");
  strokeWeight(4);
  rect(50, 100, 300, 180, 15);
  
  noStroke();
  fill("#f5c842");
  textAlign(CENTER, CENTER);
  textSize(24);
  text("🎉 VITTORIA!", 200, 140);
  
  fill("#c8a060");
  textSize(14);
  text("Hai raccolto 10 ingranaggi!\nLa macchina può essere riparata!", 200, 190);
  
  stroke("#8b6400");
  strokeWeight(2);
  fill("rgba(139,100,0,0.4)");
  rect(120, 230, 160, 35, 5);
  
  noStroke();
  fill("#f5c842");
  textSize(12);
  text("TORNA ALLA LOBBY", 200, 248);
  
  if (mouseIsPressed && mouseX > 120 && mouseX < 280 && mouseY > 230 && mouseY < 265 && !touchCooldown) {
    if(gearsGroup) gearsGroup.destroyEach();
    playerMgSprite.visible = false;
    gameState = "lobby";
    touchCooldown = true;
    touchCooldownTimer = 15;
  }
}

// ============================================================================
// FINESTRA DI DIALOGO
// ============================================================================

function drawDialogueBox(name, textContent, boxH) {
  stroke("black");
  strokeWeight(4);
  fill("rgba(255, 255, 255, 0.95)");
  rect(10, 10, 380, boxH, 10);
  
  if (charCount < textContent.length) {
    charCount += 0.5;
  }
  
  var currentText = textContent.substring(0, Math.floor(charCount));
  
  noStroke();
  textAlign(LEFT, TOP);
  
  if (name !== "Narratore" && name !== "") {
    if (name === "Alberto") {
      fill("#8B7500");
    } else if (name === "Entità misteriosa") {
      fill("#B8860B");
    } else if (name.includes("Roman") || name.includes("Passante") || name.includes("Michele")) {
      fill("#D11A2A");
    } else {
      fill("#2E8B57");
    }
    
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

// ============================================================================
// BOTTONE PAUSA
// ============================================================================

function drawPauseUI() {
  if (isPaused || gameState === "lobby" || gameState === "mg_win" || 
      gameState === "circle_game" || gameState === "circle_game_win" || gameState === "circle_game_lose") {
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

// ============================================================================
// MENU DI PAUSA
// ============================================================================

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
  
  if (mouseIsPressed && mouseX > 270 && mouseX < 295 && mouseY > 155 && mouseY < 180 && !touchCooldown) {
    isPaused = false;
    touchCooldown = true;
    touchCooldownTimer = 15;
  }
  
  if (mouseIsPressed && mouseX > 120 && mouseX < 280 && mouseY > 215 && mouseY < 245 && !touchCooldown) {
    isPaused = false;
    playerMgSprite.visible = false;
    gameState = "lobby";
    if(gearsGroup) gearsGroup.destroyEach();
    touchCooldown = true;
    touchCooldownTimer = 15;
  }
}

// ============================================================================
// GESTIONE MOVIMENTI E ANIMAZIONI PERSONAGGI
// ============================================================================

function handleCharacterWalking(activeChars, special, currentY, currentX, romansSpawn, centraAlberto, risucchioX, risucchioXMichele) {
  var allS = [albertoSprite, micheleSprite, collabSprite, extraSprite, extraSprite2];
  
  // SPAWN ROMANI
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
      
      // ANIMAZIONE LIFT
      if (special === "lift" && (i === 0 || i === 1)) {
        if (s.y > currentY) s.y -= 1;
        else if (s.y < currentY) s.y += 1;
        if (storyTimer > 30) s.y -= 1.5;
        if (i === 0) s.x = risucchioX !== null ? risucchioX : (currentX[0] || 150);
        if (i === 1) s.x = risucchioXMichele !== null ? risucchioXMichele : (currentX[1] || 250);
        s.rotation = 0;
      }
      
      // ANIMAZIONE SPIN
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
      
      // ANIMAZIONE MICH_ENTRATA_DESTRA
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
      
      // ANIMAZIONE SPIN_DESTRA
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
      
      // ANIMAZIONE VERSO_DESTRA
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
      
      // ANIMAZIONE EMERGENCE
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
      
      // ANIMAZIONE EMERGENCE_PORTALE_DESTRA
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
      
      // ANIMAZIONE ARRIVAL
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

// ============================================================================
// AVANZAMENTO DIALOGHI
// ============================================================================

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
  } else if (gameState === "mg_talk") {
    mgTalkIndex++;
    charCount = 0;
    if (mgTalkIndex >= talkData.length) {
      gameState = "mg_play";
      albertoSprite.visible = false;
      extraSprite.visible = false;
    }
  } else if (gameState === "mg_post_talk") {
    mgTalkIndex++;
    charCount = 0;
    if (mgTalkIndex >= postTalkData.length) {
      gameState = "mg_win";
      albertoSprite.visible = false;
      extraSprite.visible = false;
    }
  }
}

// ============================================================================
// CLICK DEL MOUSE / TOUCH
// ============================================================================

function mouseReleased() {
  if (isPaused) return;
  
  if (gameState === "mg_talk") {
    if (charCount < talkData[mgTalkIndex].text.length) {
      charCount = talkData[mgTalkIndex].text.length;
    } else {
      nextDialogue();
    }
  } else if (gameState === "mg_post_talk") {
    if (charCount < postTalkData[mgTalkIndex].text.length) {
      charCount = postTalkData[mgTalkIndex].text.length;
    } else {
      nextDialogue();
    }
  }
}

// ============================================================================
// NASCONDI TUTTI I PERSONAGGI
// ============================================================================

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
