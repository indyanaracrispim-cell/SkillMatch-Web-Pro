# SkillMatch Web Pro 🚀

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

- *HTML5 Semântico:* Estruturação limpa e acessível, construída totalmente sem o uso de tags <div>.
- *CSS3 Moderno:* Layout responsivo construído exclusivamente com *Flexbox* (sem uso de Grid).
- *JavaScript Avançado (ES6+):*
  - Programação Orientada a Objetos (POO) com classes e herança.
  - Métodos avançados de array (map, filter, reduce, every, forEach).
  - Tratamento assíncrono de APIs usando Fetch, Promises e async/await.
  - Controle de estado e escopo com Closures.
  - Modularização de código através de Módulos ES (import/export).
  - Gerenciamento de estado com LocalStorage.

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

## 📅 Organização e Metodologia

​O desenvolvimento deste projeto seguiu boas práticas de engenharia de software, utilizando Git Flow e gerenciamento ágil:
​Quadro Kanban: [ACESSAR O QUADRO PÚBLICO DO TRELLO](https://trello.com/b/5tmKN9Ip/meu-quadro-do-trello)
​Histórico de Commits: Commits semânticos e organizados diretamente na branch develop antes do merge final.

---

## 👩‍💻 Autora

*Indyanara Crispim*
Projeto desenvolvido durante o curso de Front-End SCTEC — Blumenau, SC. Em: 21/05/2026. [LinkedIn] (https://www.linkedin.com/in/indyanara-crispim-0625a2183/)