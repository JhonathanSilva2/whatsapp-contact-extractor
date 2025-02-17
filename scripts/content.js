class WhatsAppBot {
  constructor(group_name) {

    this.group_name = group_name;
    this.intervalId = null;
    this.chatName = null;
  }
  
  // Função para encontrar um elemento pelo título
  find_element_by_title(title) {
    const element = document.querySelector(`[title="${title}"]`);
    return element;
  }

  find_voice_message_ref() {
    const voiceMessageElement = document.querySelector('[aria-label="Mensagem de voz"]');
    return voiceMessageElement ? true : false;
  }

  get_chat_name() {
    const header = document.querySelectorAll('header')[3];
    const chatName = header.childNodes[1].children[0].children[0].children[0].innerText;
    console.log(header.childNodes[1].children[0].children[0].children[0]);
    return chatName;
  }



  init() {
    document.addEventListener("click", () => {
      // verificar se estamos em um chat
      const isChat = this.find_voice_message_ref();
      if (isChat) {
        clearInterval(this.intervalId)
        const currentChatName = this.get_chat_name();
        if (currentChatName !== this.chatName) {
          console.log("Chat mudou", 'Chat atual:', currentChatName, 'Chat anterior:', this.chatName);
          this.chatName = currentChatName;
          this.createDownLoadButton();
        }
      } else {
        console.log("Nenhum chat aberto");
      }
    })
  }

  // Função para extrair contatos
  extractContacts(text) {

    if (text.includes(',')) {
        return text.split(',')
    } else {
        // Se não tiver vírgula, retornar a string original
        return [text];
    }
  }

  // Função para criar um botão dentro da div do grupo
  createDownLoadButton() {
    const header = document.querySelectorAll('header')[3]
    const targetNav = header.childNodes[1].children[1].children[0];

    if (targetNav) {
        const button = document.createElement('button');

        // Criar o ícone SVG (ícone de carregamento)
        const loadingIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        loadingIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        loadingIcon.setAttribute("viewBox", "0 0 200 200");
        loadingIcon.style.width = '20px'; // Ajuste o tamanho conforme necessário
        loadingIcon.style.height = '20px'; // Ajuste o tamanho conforme necessário

        // Criar o caminho do ícone de carregamento
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("fill", "#FF156D");
        path.setAttribute("stroke", "#FF156D");
        path.setAttribute("stroke-width", "15");
        path.setAttribute("transform-origin", "center");
        path.setAttribute("d", "m148 84.7 13.8-8-10-17.3-13.8 8a50 50 0 0 0-27.4-15.9v-16h-20v16A50 50 0 0 0 63 67.4l-13.8-8-10 17.3 13.8 8a50 50 0 0 0 0 31.7l-13.8 8 10 17.3 13.8-8a50 50 0 0 0 27.5 15.9v16h20v-16a50 50 0 0 0 27.4-15.9l13.8 8 10-17.3-13.8-8a50 50 0 0 0 0-31.7Zm-47.5 50.8a35 35 0 1 1 0-70 35 35 0 0 1 0 70Z");
        
        // Adiciona a animação de rotação
        const animateTransform = document.createElementNS("http://www.w3.org/2000/svg", "animateTransform");
        animateTransform.setAttribute("type", "rotate");
        animateTransform.setAttribute("attributeName", "transform");
        animateTransform.setAttribute("calcMode", "spline");
        animateTransform.setAttribute("dur", "2");
        animateTransform.setAttribute("values", "0;120");
        animateTransform.setAttribute("keyTimes", "0;1");
        animateTransform.setAttribute("keySplines", "0 0 1 1");
        animateTransform.setAttribute("repeatCount", "indefinite");
        path.appendChild(animateTransform);
        
        loadingIcon.appendChild(path);

        // Criar o ícone do SVG original (para restaurar após o loading)
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("width", "16");
        svg.setAttribute("height", "16");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.style.fill = "rgb(255, 255, 255)";  // Cor do ícone

        // Criar o caminho do ícone original
        const pathOriginal = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathOriginal.setAttribute("d", "M19 9h-4V3H9v6H5l7 8zM4 19h16v2H4z");

        // Adicionar o caminho ao SVG original
        svg.appendChild(pathOriginal);

        // Adicionar o SVG original ao botão inicialmente
        button.appendChild(svg);

        // Estilo inicial do botão
        button.style.padding = '5px 30px';
        button.style.color = 'white';
        button.style.backgroundColor = 'transparent';
        button.style.border = '1px solid white';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        
        function getContatNav() {
          return document.querySelectorAll('header')[3].childNodes[1].children[1].children[0];
        }
        // Função de loading
        function startLoading() {
            button.innerHTML = '';  // Remove o conteúdo atual do botão
            button.appendChild(loadingIcon);  // Adiciona o ícone de loading ao botão
            button.disabled = true;  // Desativa o botão enquanto estiver carregando
        }

        // Função para restaurar o botão original
        function restoreButton() {
            button.innerHTML = '';  // Limpa o conteúdo do botão
            button.appendChild(svg);  // Reaplica o ícone original
            button.disabled = false;  // Reativa o botão
        }

        button.addEventListener('click', () => {
            // Mudar para estado de loading
            startLoading();

            // Esperar 10 segundos antes de realizar a extração
            setTimeout(() => {
                const contatos = getContatNav().innerText; // Extrai os contatos do chat

                const arrayContatos = this.extractContacts(contatos);
                alert('Contatos extraídos com sucesso!');
                this.saveAsCSV(arrayContatos); // Salva os contatos extraídos como CSV

                // Restaurar o botão após a execução
                restoreButton();
            }, 10000);  // Aguardar 10 segundos (10000ms)
        });

        // Encontra o contêiner do chat e posiciona o botão dentro dele
    

        if (header) {
          header.style.position = 'relative'; // Torna o contêiner relativo para o posicionamento do botão
          header.appendChild(button);

        }
    }
}


  // Função para salvar os dados como CSV
  saveAsCSV(data) {
    console.log(data);
    // Certifica-se de que cada string no array 'data' é colocada em uma nova linha no CSV
    const csvContent = "data:text/csv;charset=utf-8," + data.map(row => row.replace(/"/g, '""')).join("\n");

    // Cria um link para download do CSV
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "contatos.csv");
    link.click(); // Simula o clique para iniciar o download
}

  // Inicia a busca contínua
  startSearching() {
    this.intervalId = setInterval(() => this.init(), 1500);
  }

  // Para a busca
  stopSearching() {
    clearInterval(this.intervalId);
  }
}

// Cria uma instância da classe passando o nome do grupo
const bot = new WhatsAppBot('Bot wpp');
bot.startSearching();
