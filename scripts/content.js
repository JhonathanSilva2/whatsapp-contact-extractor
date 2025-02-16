class WhatsAppBot {
  constructor(group_name) {
    this.group_name = group_name;
    this.intervalId = null;
  }

  // Função para encontrar um elemento pelo título
  find_element_by_title(title) {
    const element = document.querySelector(`[title="${title}"]`);
    return element;
  }

  // Função para verificar se está logado
  checkIFisLogged() {
    const voiceMessageElement = document.querySelector('[aria-label="Mensagem de voz"]');
    console.log('se está com algum chat aberto se está logado...');
    if (voiceMessageElement) {
      console.log('voiceMessageElement encontrada:', voiceMessageElement);
      clearInterval(this.intervalId); // Para a busca após encontrar a div
      this.createButton(); // Cria o botão para extrair contatos

      // Aguarde 5 segundos para garantir que o chat foi carregado
  
    } else {
      console.log('Nenhum chat aberto');
    }
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
  createButton() {
    const header = document.querySelectorAll('header')[3].childNodes[1].children[1].children[0];

    if (header) {
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
        button.style.position = 'absolute';
        button.style.top = '35px';
        button.style.left = 'calc(100% + 30px)'; // 30px à direita do título
        button.style.zIndex = '1000';
        button.style.padding = '5px 30px';
        button.style.color = 'white';
        button.style.backgroundColor = 'transparent';
        button.style.border = '1px solid white';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';

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
                const contatos = document.querySelectorAll('header')[3].childNodes[1].children[1].children[0].innerText;

                const arrayContatos = this.extractContacts(contatos);
                alert('Contatos extraídos com sucesso!');
                this.saveAsCSV(arrayContatos); // Salva os contatos extraídos como CSV

                // Restaurar o botão após a execução
                restoreButton();
            }, 10000);  // Aguardar 10 segundos (10000ms)
        });

        // Encontra o contêiner do chat e posiciona o botão dentro dele
        const parentDiv = header.closest('div');
        if (parentDiv) {
            parentDiv.style.position = 'relative'; // Torna o contêiner relativo para o posicionamento do botão
            parentDiv.appendChild(button);
            console.log(parentDiv);
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
    this.intervalId = setInterval(() => this.checkIFisLogged(), 1500);
  }

  // Para a busca
  stopSearching() {
    clearInterval(this.intervalId);
  }
}

// Cria uma instância da classe passando o nome do grupo
const bot = new WhatsAppBot('Bot wpp');
bot.startSearching();
