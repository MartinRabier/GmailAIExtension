//CONFIGURATION
const GEMINI_API_KEY = CONFIG.GEMINI_API_KEY;

//DOM Observation
const observer = new MutationObserver(() => {
  //TOOL selection
  const toolbars = document.querySelectorAll('.gU.Up');

  toolbars.forEach(toolbar => {
    //Button not added ?
    if (!toolbar.querySelector('.btn-gemini-ai')) {
      injectAiButton(toolbar);
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });

// IA Button injection
function injectAiButton(toolbar) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn-gemini-ai';
  btn.innerHTML = '✨ IA';
  
  btn.onclick = (e) => {
    e.preventDefault();
    openPromptBox(toolbar);
  };

  //Add the button
  toolbar.appendChild(btn);
}

//Dialog Box
function openPromptBox(toolbar) {
  //Single openning assertion
  if (toolbar.querySelector('.ai-prompt-box')) return;

  const box = document.createElement('div');
  box.className = 'ai-prompt-box';
  box.innerHTML = `
    <label style="font-size:12px; font-weight:bold; color:#5f6368;">Instruction pour l'IA :</label>
    <textarea placeholder="Ex: Réponds poliment que je suis d'accord pour le RDV..."></textarea>
    <div class="ai-prompt-box-buttons">
      <button class="ai-btn-cancel">Annuler</button>
      <button class="ai-btn-submit">Générer</button>
    </div>
  `;

  //Parent writing window research
  const composeWindow = toolbar.closest('.M9') || toolbar.closest('.aD');

  //Modal buttons handling
  box.querySelector('.ai-btn-cancel').onclick = () => box.remove();
  
  box.querySelector('.ai-btn-submit').onclick = async () => {
    const userPrompt = box.querySelector('textarea').value;
    if (!userPrompt) return;

    const submitBtn = box.querySelector('.ai-btn-submit');
    submitBtn.innerText = 'Génération...';
    submitBtn.disabled = true;

    //Previous email detection
    let emailContext = "";
    if (composeWindow) {
      const emailThread = composeWindow.closest('.nH')?.querySelectorAll('.a3s.aiL');
      if (emailThread && emailThread.length > 0) {
        //Get previous email text
        emailContext = emailThread[emailThread.length - 1].innerText;
      }
    }

    //Gemini API Call
    try {
      const generatedText = await callGeminiAPI(userPrompt, emailContext);
      
      //Text injection
      const bodyBox = composeWindow ? composeWindow.querySelector('div[aria-label="Corps du message"], div[role="textbox"]') : null;
      if (bodyBox) {
        //Formatting the insertion
        bodyBox.innerText = generatedText;
      } else {
        alert("Zone de texte introuvable dans Gmail.");
      }
      box.remove();
    } catch (err) {
      alert("Erreur lors de la génération : " + err.message);
      submitBtn.innerText = 'Générer';
      submitBtn.disabled = false;
    }
  };

  toolbar.appendChild(box);
}

//Gemini 2.5 flash API call
async function callGeminiAPI(instruction, context) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  let fullPrompt = "Tu es un assistant IA professionnel spécialisé dans la rédaction d'e-mails.\n";
  
  if (context && context.trim().length > 0) {
    fullPrompt += `Voici l'e-mail auquel je réponds :\n"""\n${context.substring(0, 3000)}\n"""\n\n`;
    fullPrompt += `Instruction pour la réponse : ${instruction}\n`;
  } else {
    fullPrompt += `Rédige un e-mail basé sur l'instruction suivante : ${instruction}\n`;
  }

  fullPrompt += "\nRetourne UNIQUEMENT le texte de l'e-mail (sans formules comme 'Voici votre mail', sans objet).";

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: fullPrompt }] }]
    })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || "Erreur API Gemini");
  }

  return data.candidates[0].content.parts[0].text.trim();
}