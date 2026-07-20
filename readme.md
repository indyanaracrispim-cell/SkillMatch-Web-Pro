# SkillMatch Web Pro 🚀   DeV´agas

> Plataforma web de triagem e alinhamento que compara perfis técnicos com requisitos de vagas em tecnologia e saúde digital.

Este projeto é a evolução do mini-projeto prático desenvolvido no curso de Front-End da *SCTEC* (Blumenau, SC). O cérebro lógico original em JavaScript puro foi integrado a uma interface web semântica, moderna e responsiva.

---

## 📋 Sobre o Projeto

O sistema permite que o usuário crie e salve seu perfil profissional. A aplicação consome uma base de dados externa de vagas e realiza um cruzamento de dados em tempo real, gerando:

- *Percentual de Compatibilidade:* Calculado dinamicamente por vaga.
- *Mapeamento de Competências:* Exibição clara de Match (habilidades atendidas) e Gap (habilidades faltantes).
- *Classificação por Tags:* Categorização visual em HIGH (Alta), MEDIUM (Média) ou LOW (Baixa) compatibilidade.
- *Melhor Match:* Destaque automático da vaga ideal para o perfil.
- *Plano de Desenvolvimento:* Recomendação inteligente de estudos baseada nos gaps identificados.
- *Persistência de Dados:* O perfil do usuário fica salvo no navegador, tratando cenários de primeira visita.

---

## 🛠️ Tecnologias e Conceitos Aplicados

- *HTML5 Semântico:* Estruturação limpa e acessível, priorizando tags semânticas para melhor estruturação do conteúdo.
- *CSS3 Moderno:* Layout responsivo construído exclusivamente com *Flexbox* (sem uso de Grid).
- *JavaScript Avançado (ES6+):*
  - Programação Orientada a Objetos (POO) com classes e herança.
  - Métodos avançados de array (map, filter, reduce, every, forEach).
  - Tratamento assíncrono de APIs usando Fetch, Promises e async/await.
  - Controle de estado e escopo com Closures.
  - Modularização de código através de Módulos ES (import/export).
  - Gerenciamento de estado com LocalStorage.

## 🚀 Como Executar

1. Clone este repositório para sua máquina local:
   `git clone [URL-DO-SEU-REPOSITORIO]`
2. Abra a pasta do projeto no VS Code.
3. Utilize a extensão **Live Server** para abrir o arquivo `index.html` no seu navegador e visualizar o sistema em funcionamento.

---

## 📋 Trello / Kanban do Projeto
Acompanhe o planejamento, as tarefas realizadas e o progresso do desenvolvimento através do nosso quadro público:
(https://trello.com/b/5tmKN9Ip/meu-quadro-do-trello)

---

## 🎥 Demonstração em Vídeo
Assista à apresentação do projeto, onde explico o objetivo do sistema e demonstro o fluxo de funcionamento:
[Link para o vídeo no Google Drive aqui]

---

## 💡 Melhorias Futuras
Visando a evolução contínua do SkillMatch Web Pro, as próximas implementações planejadas são:
* Implementar busca por palavras-chave nas vagas em tempo real.
* Adicionar funcionalidade de exportação do plano de estudos em formato PDF.
* Integração com uma API externa real de listagem de vagas.
---

## 🗂️ Estrutura de Pastas do Projeto

```text
skillmatch-web/
├── assets/
│   └── dados/
│       └── vagas.json      # Base de dados em formato JSON
├── css/
│   └── estilo.css          # Estilização baseada 100% em Flexbox
├── js/
├── dados.js                # Camada de requisição (Fetch da API de vagas)
│   ├── main.js             # Ponto de entrada (Inicialização e Eventos)
│   ├── motor.js            # O cérebro lógico (Algoritmo de Match e POO)
│   └── ui.js               # Manipulação do DOM e renderização de tela
├── index.html              # Estrutura semântica da aplicação
└── readme.md               # Documentação do projeto.
```
---

## 👩‍💻 Autora

*Indyanara Crispim*
Projeto desenvolvido durante o curso de Front-End SCTEC — Blumenau, SC. Em: 21/05/2026. [LinkedIn] (https://www.linkedin.com/in/indyanara-crispim-0625a2183/)