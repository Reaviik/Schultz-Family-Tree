// Conteúdo de exemplo para o cartão
const cardData = {
  projeto: "Árvore Genealógica Schultz",
  autor: "David Herbert Schultz",
  funcao: "Desenvolvedor e Programador",
  qrAcesso: "https://drive.google.com/thumbnail?id=1zjf1nssnFJP8zHqNsr93fVpR9aV0Nr3J",
  qrPix: "https://drive.google.com/thumbnail?id=1LO-WBbDiKvKWfcS4gDio8icLLpkDiiai",
  contato: "davidherbertschultz95@hotmail.com",
  link: "https://bit.ly/Schultz-Family-Tree",
  endereco: "Capanema - PR, Brasil",
  descricao: "Projeto colaborativo para preservar e compartilhar a história da família Schultz. Contribua, compartilhe e ajude a manter viva nossa memória!"
};

const cardContainer = document.getElementById('card-container');

cardContainer.innerHTML = `
  <div class="flip-card" id="flipCard" style="width:340px;height:200px;border-radius:13px;">
    <div class="flip-card-inner w-full h-full relative">
      <!-- Frente -->
      <div class="flip-card-front absolute w-full h-full flex flex-row items-center justify-between p-0" style="border-radius:13px;background: linear-gradient(135deg, #111 60%, #444 100%); border: 2px solid#292929;">
        <!-- QR à esquerda -->
        <div class="flex flex-col justify-center items-center w-2/5 ml-1 h-full">
          <div style="border:2px solidrgb(51, 51, 51); padding:1px; border-radius:8px; background:#222;">
            <img src="${cardData.qrAcesso}" alt="QR Acesso" class="bg-white" style="width:92px; height:92px; image-rendering: pixelated; image-rendering: crisp-edges; border-radius:4px; object-fit:contain; display:block;">
          </div>
        </div>
        <!-- Infos à direita -->
        <div class="flex-1 flex flex-col justify-center h-full px-3">
          <span class="text-white font-bold" style="font-size:12px; letter-spacing:1px;">${cardData.autor}</span>
          <span class="text-white mb-3" style="font-size:12px;">${cardData.funcao}</span>
          <div class="flex flex-col gap-1 text-white" style="font-size:10px;">
            <div class="flex items-center gap-2"><span class="inline-block w-5 text-center">📞</span> +55 46 99978-4542</div>
            <div class="flex items-center gap-2"><span class="inline-block w-5 text-center">✉️</span> ${cardData.contato}</div>
            <div class="flex items-center gap-2"><span class="inline-block w-5 text-center">🌐</span> ${cardData.link}</div>
            <div class="flex items-center gap-2"><span class="inline-block w-5 text-center">🏠</span> ${cardData.endereco}</div>
          </div>
        </div>
      </div>
      <!-- Verso -->
      <div class="flip-card-back absolute w-full h-full flex flex-col justify-center items-center" style="border-radius:13px;background: linear-gradient(135deg, #222 60%, #555 100%); border: 2px solid#292929;">
        <div class="w-full h-full flex flex-col justify-center items-center relative">
          <!-- Quadrado decorativo -->
          <div class="absolute top-6 left-6" style="width:60px;height:60px;border-top:2px solid#777777;border-left:2px solid#777777;"></div>
          <span class="text-white font-bold tracking-wide mt-8" style="font-size:15px;">${cardData.autor}</span>
          <span class="text-white" style="font-size:11px;">${cardData.funcao}</span>
        </div>
        <div class="mt-2 m-2 text-white opacity-70 text-center" style="font-size:9px;">${cardData.descricao}</div>
      </div>
    </div>
  </div>
`;

// Flip ao clicar
const flipCard = document.getElementById('flipCard');
flipCard.addEventListener('click', function() {
  this.classList.toggle('flipped');
}); 

// Baixar cartão como imagem
const btnBaixar = document.getElementById('baixar-card');
if (btnBaixar && window.html2canvas) {
  btnBaixar.onclick = function() {
    const card = document.getElementById('flipCard');
    const front = card.querySelector('.flip-card-front');
    const back = card.querySelector('.flip-card-back');
    const isFlipped = card.classList.contains('flipped');

    // Esconde a face não visível
    if (isFlipped) {
      front.classList.add('invisible-card-face');
    } else {
      back.classList.add('invisible-card-face');
    }

    html2canvas(document.getElementById('card-container')).then(function(canvas) {
      // Mostra tudo de novo
      front.classList.remove('invisible-card-face');
      back.classList.remove('invisible-card-face');
      const link = document.createElement('a');
      link.download = isFlipped ? 'cartao-verso.png' : 'cartao-frente.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };
} 