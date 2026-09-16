/* =========================================
   IA AGENT
   Application JavaScript
========================================= */


/* -----------------------------------------
   NAVIGATION
----------------------------------------- */

const navItems = document.querySelectorAll(".nav-item[data-page]");

const pages = document.querySelectorAll(".page");

navItems.forEach((item) => {

  item.addEventListener("click", () => {

    const pageId = item.dataset.page;

    showPage(pageId);

  });

});


function showPage(pageId) {

  pages.forEach((page) => {

    page.classList.remove("active-page");

  });


  const targetPage =
    document.getElementById(pageId);


  if (targetPage) {

    targetPage.classList.add("active-page");

  }


  navItems.forEach((item) => {

    item.classList.remove("active");

  });


  const activeButton =
    document.querySelector(
      `[data-page="${pageId}"]`
    );


  if (activeButton) {

    activeButton.classList.add("active");

  }

}


/* -----------------------------------------
   OPEN ASSISTANT
----------------------------------------- */

function openAssistant() {

  showPage("assistant");

}


/* -----------------------------------------
   OPEN MARKETING
----------------------------------------- */

function openMarketing() {

  showPage("marketing");

}


/* -----------------------------------------
   NOTIFICATIONS
----------------------------------------- */

function showMessage(message) {

  const notification =
    document.getElementById("notification");


  notification.textContent = message;

  notification.classList.add("show");


  setTimeout(() => {

    notification.classList.remove("show");

  }, 2500);

}


/* -----------------------------------------
   DASHBOARD PROMPT
----------------------------------------- */

function askAI() {

  const input =
    document.getElementById("prompt");


  const message =
    input.value.trim();


  if (!message) {

    showMessage(
      "Écrivez d'abord votre demande."
    );

    return;

  }


  input.value = "";


  showPage("assistant");


  addUserMessage(message);


  setTimeout(() => {

    addAIMessage(
      generateDemoResponse(message)
    );

  }, 600);

}


/* -----------------------------------------
   ASSISTANT MESSAGE
----------------------------------------- */

function sendAssistantMessage() {

  const input =
    document.getElementById(
      "assistantInput"
    );


  const message =
    input.value.trim();


  if (!message) {

    return;

  }


  input.value = "";


  addUserMessage(message);


  setTimeout(() => {

    addAIMessage(
      generateDemoResponse(message)
    );

  }, 600);

}


/* -----------------------------------------
   ADD USER MESSAGE
----------------------------------------- */

function addUserMessage(message) {

  const container =
    document.getElementById(
      "chatMessages"
    );


  const element =
    document.createElement("div");


  element.className =
    "message";


  element.style.justifyContent =
    "flex-end";


  element.innerHTML = `

    <div
      class="message-content"
      style="
        background:#15171c;
        color:white;
        border-radius:15px 5px 15px 15px;
      "
    >

      <strong>
        Vous
      </strong>

      <p
        style="color:#d5d8de;"
      >
        ${escapeHTML(message)}
      </p>

    </div>

  `;


  container.appendChild(element);


  scrollChat();

}


/* -----------------------------------------
   ADD AI MESSAGE
----------------------------------------- */

function addAIMessage(message) {

  const container =
    document.getElementById(
      "chatMessages"
    );


  const element =
    document.createElement("div");


  element.className =
    "message ai-message";


  element.innerHTML = `

    <div class="message-avatar">
      ✦
    </div>

    <div class="message-content">

      <strong>
        IA Agent
      </strong>

      <p>
        ${escapeHTML(message)}
      </p>

    </div>

  `;


  container.appendChild(element);


  scrollChat();

}


/* -----------------------------------------
   DEMO AI
----------------------------------------- */

function generateDemoResponse(message) {

  const text =
    message.toLowerCase();


  if (
    text.includes("vente") ||
    text.includes("ventes") ||
    text.includes("chiffre")
  ) {

    return `
      Pour analyser vos ventes correctement,
      j'aurai besoin de vos données de commandes.
      Une fois votre base de données connectée,
      je pourrai identifier vos produits les plus
      vendus, votre chiffre d'affaires et les tendances.
    `;

  }


  if (
    text.includes("facebook") ||
    text.includes("publication") ||
    text.includes("marketing")
  ) {

    return `
      Je peux préparer une publication marketing
      adaptée à votre activité. Donnez-moi simplement
      le produit, le prix et l'objectif de la publication.
    `;

  }


  if (
    text.includes("client") ||
    text.includes("clients")
  ) {

    return `
      Je pourrai analyser vos clients afin d'identifier
      vos meilleurs clients, les clients inactifs et
      les opportunités de fidélisation.
    `;

  }


  if (
    text.includes("produit") ||
    text.includes("produits") ||
    text.includes("stock")
  ) {

    return `
      Je pourrai surveiller votre catalogue et votre
      stock pour détecter les produits qui se vendent
      rapidement et ceux qui nécessitent une action.
    `;

  }


  return `
    J'ai bien reçu votre demande.
    Dans la prochaine version, je serai connecté
    à votre véritable moteur IA et à vos données
    business pour vous donner une réponse personnalisée.
  `;

}


/* -----------------------------------------
   SECURITY
----------------------------------------- */

function escapeHTML(text) {

  const div =
    document.createElement("div");

  div.textContent = text;

  return div.innerHTML;

}


/* -----------------------------------------
   CHAT SCROLL
----------------------------------------- */

function scrollChat() {

  const container =
    document.getElementById(
      "chatMessages"
    );


  container.scrollTop =
    container.scrollHeight;

}


/* -----------------------------------------
   ENTER KEY
----------------------------------------- */

const assistantInput =
  document.getElementById(
    "assistantInput"
  );


if (assistantInput) {

  assistantInput.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Enter"
      ) {

        sendAssistantMessage();

      }

    }
  );

}


const dashboardPrompt =
  document.getElementById(
    "prompt"
  );


if (dashboardPrompt) {

  dashboardPrompt.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Enter"
      ) {

        askAI();

      }

    }
  );

}


/* -----------------------------------------
   INITIAL DATA
----------------------------------------- */

const businessData = {

  revenue: 0,

  orders: 0,

  clients: 0,

  products: 0

};


function updateDashboard() {

  document.getElementById(
    "revenue"
  ).textContent =
    businessData.revenue + " HTG";


  document.getElementById(
    "ordersCount"
  ).textContent =
    businessData.orders;


  document.getElementById(
    "clientsCount"
  ).textContent =
    businessData.clients;


  document.getElementById(
    "productsCount"
  ).textContent =
    businessData.products;

}


updateDashboard();