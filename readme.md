WhatsApp Contact Extractor

Esta extensão para o Google Chrome permite extrair contatos do WhatsApp Web e salvá-los em um arquivo CSV.

📌 Funcionalidades

Detecta se há um chat aberto no WhatsApp Web.

Adiciona um botão no cabeçalho do chat para extrair contatos.

Salva os contatos extraídos em um arquivo CSV.

🚀 Instalação

Baixe o repositório ou clone com:

git clone https://github.com/seuusuario/whatsapp-contact-extractor.git

Acesse chrome://extensions/ no Google Chrome.

Ative o Modo do Desenvolvedor (canto superior direito).

Clique em Carregar sem compactação e selecione a pasta da extensão.

🎯 Como Usar

Acesse o WhatsApp Web.

Abra um chat de grupo.

O botão de extração será adicionado no cabeçalho do chat.

Clique no botão para extrair os contatos e salvá-los como um arquivo CSV.

🛠 Estrutura do Projeto

whatsapp-contact-extractor/
│── images/
│   ├── logo-sem-bg.png
│── scripts/
│   ├── content.js
│── manifest.json

content.js: Código principal da extensão.

manifest.json: Configuração da extensão.

images/: Ícones da extensão.

📜 Manifest.json

{
    "manifest_version": 3,
    "name": "WhatsApp Contact Extractor",
    "version": "1.0",
    "description": "Extensão para extrair contatos do WhatsApp Web.",
    "icons": {
        "16": "images/logo-sem-bg.png",
        "32": "images/logo-sem-bg.png",
        "48": "images/logo-sem-bg.png",
        "128": "images/logo-sem-bg.png"
    },
    "content_scripts": [
        {
            "js": ["scripts/content.js"],
            "matches": [
                "https://web.whatsapp.com/*"
            ]
        }
    ]
}

📂 Salvando no GitHub

Inicialize o repositório:

git init

Adicione os arquivos:

git add .

Faça um commit:

git commit -m "Primeiro commit"

Crie um repositório no GitHub e adicione o remoto:

git remote add origin https://github.com/seuusuario/whatsapp-contact-extractor.git

Envie os arquivos:

git push -u origin main

Agora sua extensão está salva no GitHub! 🎉

📢 Contribuindo

Se quiser melhorar a extensão, sinta-se à vontade para abrir um pull request ou relatar issues no repositório.

🔗 Autor: [Seu Nome]