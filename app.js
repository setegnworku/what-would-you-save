const breeds = [
  {
    id: "sahiwal",
    number: 1,
    trait: "Heat tolerance",
    name: "SAHIWAL",
    tagline: "Thrives where heat challenges productivity",
    image: "images/sahiwal.jpg",
    alt: "Sahiwal cow with a calf in a dry yard",
    color: "#b42318",
    traitWhy:
      "Heat stress reduces fertility, growth, milk yield and survival. Heat-tolerant cattle provide an important genetic resource as temperatures rise. Heat tolerance is an insurance trait for the future.",
    bioWhy:
      "A highly productive temperate breed may outperform Sahiwal under cool, well-managed conditions, BUT its performance can deteriorate under severe heat."
  },
  {
    id: "ndama",
    number: 2,
    trait: "Disease resistance",
    name: "N’DAMA",
    tagline: "Survives where disease limits cattle production",
    image: "images/ndama.jpg",
    alt: "N’Dama cattle",
    color: "#7a271a",
    traitWhy:
      "N’Dama cattle are renowned for their trypanotolerance, allowing cattle production in environments where African animal trypanosomiasis constrains susceptible breeds.",
    bioWhy:
      "Selecting only for production can remove valuable disease-resistance genes. BUT a lower-output animal carrying resistance may be more valuable when disease pressure changes."
  },
  {
    id: "boran",
    number: 3,
    trait: "Drought adaptation",
    name: "BORAN",
    tagline: "Produces under water and feed scarcity",
    image: "images/boran.jpg",
    alt: "Boran cattle",
    color: "#175cd3",
    traitWhy:
      "Boran cattle are adapted to hot, dry environments and can maintain production and reproduction under limited water and forage availability.",
    bioWhy:
      "Under favourable conditions, high-producing cattle may produce more. During drought, HOWEVER, survival and reproduction can become more important than maximum output. Adaptation provides resilience when conditions deteriorate."
  },
  {
    id: "jersey",
    number: 4,
    trait: "Feed efficiency",
    name: "JERSEY",
    tagline: "More milk solids from a smaller feed requirement",
    image: "images/jersey.jpg",
    alt: "Jersey cow",
    color: "#b54708",
    traitWhy:
      "Jersey cattle produce milk with high concentrations of milk solids relative to their body size and can be efficient where feed resources are limited.",
    bioWhy:
      "Maximizing litres of milk alone can favour larger animals with greater maintenance requirements. HOWEVER, efficiency is a different production strategy from maximum volume."
  },
  {
    id: "holstein",
    number: 5,
    trait: "Productivity",
    name: "HOLSTEIN-FRIESIAN",
    tagline: "High-output specialized production",
    image: "images/holstein.jpg",
    alt: "Holstein-Friesian cow",
    color: "#1849a9",
    traitWhy:
      "Holsteins demonstrate the enormous gains possible through sustained selection for milk production in suitable production environments.",
    bioWhy:
      "High productivity is extremely valuable, BUT it is only one component of fitness. A portfolio should contain high-output genetics alongside animals adapted to stresses that high-production systems may not tolerate."
  },
  {
    id: "fulani",
    number: 6,
    trait: "Cultural value",
    name: "WHITE FULANI (BUNAJI)",
    tagline: "Livestock as heritage, livelihood and identity",
    image: "images/fulani.jpg",
    alt: "White Fulani cattle",
    color: "#b42318",
    traitWhy:
      "Cattle are not merely biological production units. White Fulani cattle are embedded in livelihoods, pastoral systems, traditions, wealth and cultural identity across West Africa.",
    bioWhy:
      "Biodiversity includes the relationship between genetic resources and the societies that maintain them. IF conservation focuses exclusively on economic productivity, culturally important populations can disappear."
  },
  {
    id: "nguni",
    number: 7,
    trait: "Ecosystem adaptation",
    name: "NGUNI",
    tagline: "Adapted to African landscapes and variable resources",
    image: "images/nguni.jpg",
    alt: "Nguni cow",
    color: "#087443",
    traitWhy:
      "Nguni cattle have evolved within Southern African environments and are valued for resilience, hardiness and adaptation to local production conditions.",
    bioWhy:
      "There is no single optimal cattle phenotype for every ecosystem. Local adaptation is itself genetic capital."
  },
  {
    id: "ankole",
    number: 8,
    trait: "Ornamental value",
    name: "ANKOLE-WATUSI",
    tagline: "Living genetic heritage with extraordinary horns",
    image: "images/ankole.jpg",
    alt: "Ankole-Watusi cow with large horns",
    color: "#6941c6",
    traitWhy:
      "Its exceptionally large horns and distinctive appearance represent a remarkable component of cattle genetic and cultural heritage.",
    bioWhy:
      "Traits that have little immediate production value may nevertheless carry cultural, historical and genetic significance. Once a unique population disappears, its evolutionary history cannot simply be recreated."
  }
];

const herd = document.querySelector("#herd");
const detail = document.querySelector("#detail");
const choice = document.querySelector("#choice");

let openId = null;
let savedId = null;
const cards = new Map();

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[character]));
}

function emphasize(value) {
  return escapeHtml(value).replace(/\b(BUT|HOWEVER|IF)\b/g, "<strong>$1</strong>");
}

function columnCount() {
  return getComputedStyle(herd).gridTemplateColumns.split(" ").filter(Boolean).length;
}

function placeDetail(index) {
  const columns = columnCount();
  const rowEnd = Math.min(breeds.length - 1, Math.floor(index / columns) * columns + (columns - 1));
  cards.forEach((card, id) => {
    const breedIndex = breeds.findIndex((breed) => breed.id === id);
    card.style.order = String(breedIndex);
  });
  detail.style.order = String(rowEnd);
}

function renderChoice() {
  if (!savedId) {
    choice.hidden = true;
    choice.innerHTML = "";
    return;
  }
  const breed = breeds.find((item) => item.id === savedId);
  choice.hidden = false;
  choice.innerHTML = `
    <p class="choice-kicker">Your choice</p>
    <h2>You would save ${escapeHtml(breed.name)}</h2>
    <p>${escapeHtml(breed.trait)} — ${escapeHtml(breed.tagline)}</p>
  `;
}

function renderDetail(breed) {
  detail.hidden = false;
  detail.style.setProperty("--accent", breed.color);
  detail.innerHTML = `
    <div class="detail-photo">
      <img src="${breed.image}" alt="${escapeHtml(breed.alt)}">
    </div>
    <div class="detail-copy">
      <p class="detail-trait">${escapeHtml(breed.trait)}</p>
      <h2>${escapeHtml(breed.name)}</h2>
      <p class="detail-tagline">${escapeHtml(breed.tagline)}</p>
      <h3>Why the trait matters</h3>
      <p>${escapeHtml(breed.traitWhy)}</p>
      <h3>Why biodiversity matters</h3>
      <p>${emphasize(breed.bioWhy)}</p>
      <div class="detail-actions">
        <button type="button" class="save" id="save-breed">
          ${savedId === breed.id ? "This is the one you would save" : "I would save this one"}
        </button>
        <button type="button" class="close" id="close-detail">Close</button>
      </div>
    </div>
  `;

  detail.querySelector("#save-breed").addEventListener("click", () => {
    savedId = breed.id;
    cards.forEach((card, id) => card.classList.toggle("is-saved", id === savedId));
    renderChoice();
    renderDetail(breed);
  });

  detail.querySelector("#close-detail").addEventListener("click", () => closeDetail());
}

function closeDetail() {
  openId = null;
  detail.hidden = true;
  detail.innerHTML = "";
  cards.forEach((card) => {
    card.classList.remove("is-open");
    card.setAttribute("aria-expanded", "false");
  });
}

function openBreed(breed) {
  if (openId === breed.id) {
    closeDetail();
    return;
  }

  openId = breed.id;
  cards.forEach((card, id) => {
    const isOpen = id === breed.id;
    card.classList.toggle("is-open", isOpen);
    card.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  const index = breeds.findIndex((item) => item.id === breed.id);
  placeDetail(index);
  renderDetail(breed);
  detail.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

breeds.forEach((breed) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "card";
  button.style.setProperty("--accent", breed.color);
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-controls", "detail");
  button.innerHTML = `
    <span class="card-photo">
      <img src="${breed.image}" alt="">
      <span class="card-num">${breed.number}</span>
    </span>
    <span class="card-copy">
      <span class="card-trait">${escapeHtml(breed.trait)}</span>
      <span class="card-name">${escapeHtml(breed.name)}</span>
      <span class="card-tagline">${escapeHtml(breed.tagline)}</span>
    </span>
  `;
  button.addEventListener("click", () => openBreed(breed));
  herd.insertBefore(button, detail);
  cards.set(breed.id, button);
});

window.addEventListener("resize", () => {
  if (!openId) return;
  const index = breeds.findIndex((breed) => breed.id === openId);
  placeDetail(index);
});
