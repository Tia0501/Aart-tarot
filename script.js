// ============= PATHS =============
const BACK = "images/rw/back.jpg";
const CARD_PATH = "images/rw/";
const EXT = ".jpg";

// ============= GLOBALS =============
let deckOrder = [...Array(78).keys()];
let nextSlot = 0;
let currentSpread = "one";

// ============= MEANINGS =============


const meanings = {
  // MAJOR ARCANA
  0:  {name: "The Fool", upright: "Upright: New beginnings, spontaneity, free spirit, taking a leap of faith", reversed: "Reversed: Recklessness, hesitation, risk-taking without thought"},
  1:  {name: "The Magician", upright: "Upright: Manifestation, resourcefulness, inspired action, skill", reversed: "Reversed: Manipulation, poor planning, untapped potential"},
  2:  {name: "The High Priestess", upright: "Upright: Intuition, sacred knowledge, divine feminine, mystery", reversed: "Reversed: Secrets, hidden agendas, blocked intuition"},
  3:  {name: "The Empress", upright: "Upright: Femininity, beauty, nature, nurturing, abundance", reversed: "Reversed: Dependence, smothering, creative block"},
  4:  {name: "The Emperor", upright: "Upright: Authority, structure, control, father figure, stability", reversed: "Reversed: Domination, rigidity, excessive control"},
  5:  {name: "The Hierophant", upright: "Upright: Tradition, spiritual guidance, conformity, learning", reversed: "Reversed: Rebellion, challenging tradition, unconventional thinking"},
  6:  {name: "The Lovers", upright: "Upright: Love, harmony, partnership, choices", reversed: "Reversed: Disharmony, imbalance, misalignment of values"},
  7:  {name: "The Chariot", upright: "Upright: Control, willpower, victory, determination", reversed: "Reversed: Lack of control, aggression, obstacles"},
  8:  {name: "Strength", upright: "Upright: Courage, persuasion, influence, compassion", reversed: "Reversed: Self-doubt, weakness, impatience"},
  9:  {name: "The Hermit", upright: "Upright: Soul-searching, introspection, solitude", reversed: "Reversed: Isolation, loneliness, withdrawal"},
  10: {name: "Wheel of Fortune", upright: "Upright: Good luck, karma, life cycles, destiny", reversed: "Reversed: Bad luck, resistance to change, delays"},
  11: {name: "Justice", upright: "Upright: Fairness, truth, law, cause and effect", reversed: "Reversed: Dishonesty, unfairness, imbalance"},
  12: {name: "The Hanged Man", upright: "Upright: Pause, surrender, letting go, new perspective", reversed: "Reversed: Delays, indecision, resistance to change"},
  13: {name: "Death", upright: "Upright: Transformation, endings, rebirth, renewal", reversed: "Reversed: Resistance to change, stagnation, fear of endings"},
  14: {name: "Temperance", upright: "Upright: Balance, moderation, patience, purpose", reversed: "Reversed: Imbalance, excess, conflict"},
  15: {name: "The Devil", upright: "Upright: Bondage, materialism, temptation, limitation", reversed: "Reversed: Breaking free, detachment, overcoming fear"},
  16: {name: "The Tower", upright: "Upright: Sudden change, upheaval, revelation, awakening", reversed: "Reversed: Avoidance of disaster, fear of change"},
  17: {name: "The Star", upright: "Upright: Hope, inspiration, renewal, serenity", reversed: "Reversed: Lack of faith, discouragement, despair"},
  18: {name: "The Moon", upright: "Upright: Illusion, intuition, dreams, subconscious", reversed: "Reversed: Confusion, deception, fear"},
  19: {name: "The Sun", upright: "Upright: Joy, success, celebration, positivity", reversed: "Reversed: Delays, temporary setbacks, lack of clarity"},
  20: {name: "Judgement", upright: "Upright: Rebirth, inner calling, absolution, evaluation", reversed: "Reversed: Self-doubt, failure to learn lessons"},
  21: {name: "The World", upright: "Upright: Completion, achievement, fulfillment, travel", reversed: "Reversed: Lack of closure, delays, incomplete goals"},

  // WANDS (22–35)
  22: {name: "Ace of Wands", upright: "Upright: Inspiration, new ideas, growth, potential", reversed: "Reversed: Delays, lack of motivation, false starts"},
  23: {name: "Two of Wands", upright: "Upright: Planning, progress, decisions, future direction", reversed: "Reversed: Fear of change, indecision, lack of planning"},
  24: {name: "Three of Wands", upright: "Upright: Expansion, foresight, leadership, opportunities", reversed: "Reversed: Obstacles, delays, frustration"},
  25: {name: "Four of Wands", upright: "Upright: Celebration, harmony, home, community", reversed: "Reversed: Instability, lack of support, home conflicts"},
  26: {name: "Five of Wands", upright: "Upright: Competition, conflict, challenges, disagreement", reversed: "Reversed: Avoiding conflict, compromise, reconciliation"},
  27: {name: "Six of Wands", upright: "Upright: Victory, recognition, success, achievement", reversed: "Reversed: Egotism, fall from grace, lack of recognition"},
  28: {name: "Seven of Wands", upright: "Upright: Defense, perseverance, maintaining position", reversed: "Reversed: Giving up, overwhelmed, insecurity"},
  29: {name: "Eight of Wands", upright: "Upright: Speed, action, swift progress, movement", reversed: "Reversed: Delays, frustration, miscommunication"},
  30: {name: "Nine of Wands", upright: "Upright: Resilience, persistence, stamina, courage", reversed: "Reversed: Exhaustion, defensiveness, paranoia"},
  31: {name: "Ten of Wands", upright: "Upright: Burden, responsibility, hard work, stress", reversed: "Reversed: Release, avoiding responsibility, burnout"},
  32: {name: "Page of Wands", upright: "Upright: Exploration, enthusiasm, curiosity, discovery", reversed: "Reversed: Lack of direction, procrastination, setbacks"},
  33: {name: "Knight of Wands", upright: "Upright: Action, adventure, impulsiveness, passion", reversed: "Reversed: Recklessness, haste, frustration"},
  34: {name: "Queen of Wands", upright: "Upright: Confidence, independence, determination, charisma", reversed: "Reversed: Jealousy, aggression, insecurity"},
  35: {name: "King of Wands", upright: "Upright: Leadership, vision, entrepreneurship, honor", reversed: "Reversed: Impulsiveness, overbearing, poor leadership"},

  // CUPS (36–49)
  36: {name: "Ace of Cups", upright: "Upright: New emotions, love, intuition, compassion", reversed: "Reversed: Emotional blockage, emptiness, repressed feelings"},
  37: {name: "Two of Cups", upright: "Upright: Partnership, love, connection, mutual attraction", reversed: "Reversed: Breakup, imbalance, tension"},
  38: {name: "Three of Cups", upright: "Upright: Celebration, friendship, community, joy", reversed: "Reversed: Gossip, overindulgence, lack of support"},
  39: {name: "Four of Cups", upright: "Upright: Contemplation, meditation, reevaluation, apathy", reversed: "Reversed: New opportunities, awareness, acceptance"},
  40: {name: "Five of Cups", upright: "Upright: Loss, grief, disappointment, regret", reversed: "Reversed: Acceptance, moving on, forgiveness"},
  41: {name: "Six of Cups", upright: "Upright: Nostalgia, memories, reunion, childhood", reversed: "Reversed: Stuck in past, naivety, unrealistic"},
  42: {name: "Seven of Cups", upright: "Upright: Choices, fantasy, imagination, illusion", reversed: "Reversed: Clarity, decisiveness, avoiding illusions"},
  43: {name: "Eight of Cups", upright: "Upright: Walking away, seeking truth, introspection", reversed: "Reversed: Fear of change, stagnation, avoidance"},
  44: {name: "Nine of Cups", upright: "Upright: Contentment, satisfaction, gratitude, wishes fulfilled", reversed: "Reversed: Dissatisfaction, greed, materialism"},
  45: {name: "Ten of Cups", upright: "Upright: Happiness, alignment, family, harmony", reversed: "Reversed: Broken relationships, misalignment, disappointment"},
  46: {name: "Page of Cups", upright: "Upright: Imagination, curiosity, emotional messages, inspiration", reversed: "Reversed: Immaturity, insecurity, emotional naivety"},
  47: {name: "Knight of Cups", upright: "Upright: Romance, charm, adventure, idealism", reversed: "Reversed: Moodiness, unreliability, disappointment"},
  48: {name: "Queen of Cups", upright: "Upright: Compassion, caring, emotional stability, intuition", reversed: "Reversed: Overwhelm, dependence, emotional insecurity"},
  49: {name: "King of Cups", upright: "Upright: Emotional balance, diplomacy, control, generosity", reversed: "Reversed: Manipulation, volatility, emotional coldness"},

  // SWORDS (50–63)
  50: {name: "Ace of Swords", upright: "Upright: Clarity, breakthroughs, sharp mind, truth", reversed: "Reversed: Confusion, chaos, miscommunication"},
  51: {name: "Two of Swords", upright: "Upright: Indecision, stalemate, choices, compromise", reversed: "Reversed: Confusion, avoidance, impasse"},
  52: {name: "Three of Swords", upright: "Upright: Heartbreak, sorrow, grief, emotional pain", reversed: "Reversed: Recovery, forgiveness, moving on"},
  53: {name: "Four of Swords", upright: "Upright: Rest, recovery, contemplation, meditation", reversed: "Reversed: Burnout, restlessness, isolation"},
  54: {name: "Five of Swords", upright: "Upright: Conflict, tension, loss, betrayal", reversed: "Reversed: Resolution, reconciliation, moving forward"},
  55: {name: "Six of Swords", upright: "Upright: Transition, moving on, rite of passage", reversed: "Reversed: Resistance, unresolved issues, stagnation"},
  56: {name: "Seven of Swords", upright: "Upright: Strategy, deception, stealth, planning", reversed: "Reversed: Exposure, accountability, facing consequences"},
  57: {name: "Eight of Swords", upright: "Upright: Restriction, limitation, fear, self-imposed boundaries", reversed: "Reversed: Freedom, release, overcoming fear"},
  58: {name: "Nine of Swords", upright: "Upright: Anxiety, worry, nightmares, despair", reversed: "Reversed: Hope, relief, facing fears"},
  59: {name: "Ten of Swords", upright: "Upright: Endings, betrayal, loss, crisis", reversed: "Reversed: Recovery, regeneration, resilience"},
  60: {name: "Page of Swords", upright: "Upright: Curiosity, vigilance, mental energy, communication", reversed: "Reversed: Gossip, deception, lack of clarity"},
  61: {name: "Knight of Swords", upright: "Upright: Ambition, action, drive, intellect", reversed: "Reversed: Impulsiveness, recklessness, aggression"},
  62: {name: "Queen of Swords", upright: "Upright: Independence, perception, clear boundaries, intellect", reversed: "Reversed: Coldness, bitterness, manipulation"},
  63: {name: "King of Swords", upright: "Upright: Authority, truth, intellectual power, clarity", reversed: "Reversed: Cruelty, misuse of power, rigidity"},

  // PENTACLES (64–77)
  64: {name: "Ace of Pentacles", upright: "Upright: Opportunity, prosperity, manifestation, new beginnings", reversed: "Reversed: Lost opportunity, missed chance, delays"},
  65: {name: "Two of Pentacles", upright: "Upright: Balance, adaptability, multitasking, time management", reversed: "Reversed: Imbalance, disorganization, overwhelm"},
  66: {name: "Three of Pentacles", upright: "Upright: Teamwork, skill, collaboration, recognition", reversed: "Reversed: Lack of teamwork, disorganization, mediocrity"},
  67: {name: "Four of Pentacles", upright: "Upright: Saving, security, control, stability", reversed: "Reversed: Greed, possessiveness, financial insecurity"},
  68: {name: "Five of Pentacles", upright: "Upright: Hardship, struggle, financial loss, isolation", reversed: "Reversed: Recovery, improvement, support"},
  69: {name: "Six of Pentacles", upright: "Upright: Generosity, charity, sharing, balance", reversed: "Reversed: Selfishness, debt, strings attached"},
  70: {name: "Seven of Pentacles", upright: "Upright: Patience, investment, long-term planning", reversed: "Reversed: Setbacks, impatience, lack of reward"},
  71: {name: "Eight of Pentacles", upright: "Upright: Skill, apprenticeship, dedication, craftsmanship", reversed: "Reversed: Lack of focus, poor quality, laziness"},
  72: {name: "Nine of Pentacles", upright: "Upright: Abundance, luxury, self-sufficiency, financial independence", reversed: "Reversed: Financial setbacks, overindulgence, dependency"},
  73: {name: "Ten of Pentacles", upright: "Upright: Wealth, family, legacy, long-term success", reversed: "Reversed: Instability, loss, family disputes"},
  74: {name: "Page of Pentacles", upright: "Upright: Study, ambition, diligence, manifestation", reversed: "Reversed: Lack of progress, procrastination, immaturity"},
  75: {name: "Knight of Pentacles", upright: "Upright: Hard work, routine, responsibility, patience", reversed: "Reversed: Laziness, stagnation, stubbornness"},
  76: {name: "Queen of Pentacles", upright: "Upright: Nurturing, practicality, prosperity, security", reversed: "Reversed: Smothering, greed, imbalance"},
  77: {name: "King of Pentacles", upright: "Upright: Wealth, leadership, stability, abundance", reversed: "Reversed: Materialism, greed, misuse of power"}
};



// ============= CREATE DECK =============
function createDeck() {
    const deck = document.getElementById("deck");
    deck.innerHTML = "";

    deckOrder.forEach(i => {
        const c = document.createElement("img");
        c.src = BACK;
        c.className = "card";
        c.dataset.index = i;
        c.addEventListener("click", () => placeCard( c));
        deck.appendChild(c);
    });
}

// ============= CREATE SPREAD =============
function createSpread() {
    const spread = document.getElementById("spread");
    spread.innerHTML = "";
    nextSlot = 0;

    let p = [];

    if (currentSpread === "one") {
        p = [{ left: 220, top: 180 }];
    }

    if (currentSpread === "three") {
        p = [
            { left: 120, top: 180 },
            { left: 260, top: 180 },
            { left: 400, top: 180 }
        ];
    }

    // --- FIXED EXACT HORSESHOE (YOUR DIAGRAM) ---
    if (currentSpread === "horseshoe") {
        p = [
            { left: 40, top: 300 },    // 1
            { left: 110, top: 220 },   // 2
            { left: 180, top: 160 },   // 3
            { left: 260, top: 100 },   // 4
            { left: 340, top: 160 },   // 5
            { left: 410, top: 220 },   // 6
            { left: 480, top: 300 }    // 7
        ];
    }

    // --- FIXED CELTIC CROSS (CARD 2 horizontal) ---
    if (currentSpread === "celtic") {
        p = [
            { left: 250, top: 180 },                 // 1
            { left: 250, top: 180, rotate: 90 },     // 2 across 1
            { left: 250, top:  40 },                 // 3
            { left: 250, top: 320 },                 // 4
            { left: 250, top: 460 },                 // 5
            { left: 110, top: 180 },                 // 6
            { left: 390, top: 180 },                 // 7
            { left: 520, top: 80 },                  // 8
            { left: 520, top: 200 },                 // 9
            { left: 520, top: 320 }                  // 10
        ];
    }

    p.forEach((pos, i) => {
        const s = document.createElement("div");
        s.className = "slot";
        s.id = "slot-" + i;
        s.style.left = pos.left + "px";
        s.style.top = pos.top + "px";
        if (pos.rotate) s.style.transform = `rotate(${pos.rotate}deg)`;
        spread.appendChild(s);
    });
}

// ============= PLACE CARD =============
function placeCard(cardElement) {
    if (nextSlot >= document.querySelectorAll(".slot").length) return;

    const index = parseInt(cardElement.dataset.index);
    const slot = document.getElementById("slot-" + nextSlot);

    const img = document.createElement("img");
    img.src = `${CARD_PATH}${index + 1}${EXT}`;
    img.style.width = "80px";
    img.style.height = "135px";

    const isReversed = Math.random() < 0.5;
    if (isReversed) img.style.transform = "rotate(180deg)";

    slot.innerHTML = "";
    slot.appendChild(img);

    cardElement.style.opacity = 0.2;
    cardElement.style.pointerEvents = "none";

    showMeaning(index, isReversed);
    nextSlot++;
}


function showMeaning(index, reversed) {
    const card = meanings[index];
    const box = document.getElementById("meaning-content");

    const text = `• ${card.name} — ${reversed ? card.reversed : card.upright}\n`;
    box.textContent += text;
}



// ============= CONTROLS =============
function shuffleDeck() {
    deckOrder.sort(() => Math.random() - 0.5);
    createDeck();
}
function clearSpread() {
    document.getElementById("meaning-content").textContent = "";

    createDeck();
    createSpread();
}
function changeSpread(type) {
    currentSpread = type;
    clearSpread();
}

// ============= INIT =============
shuffleDeck();
createSpread();
