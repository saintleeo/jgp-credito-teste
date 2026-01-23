# Teste Técnico – Estágio em Desenvolvimento Fullstack

## 📌 Visão Geral

Este projeto foi desenvolvido como parte do **Teste Técnico para Estágio em Desenvolvimento Fullstack – JGP Crédito**. A aplicação simula um **sistema interno de apoio à tomada de decisão para gestores de crédito**, permitindo a consulta, análise e edição controlada de emissões do mercado primário de renda fixa.

A solução contempla **backend**, **frontend** e **persistência em banco relacional**.

---

## 🧱 Arquitetura Geral

```
repo/
├─ backend/            # API REST (FastAPI) + Banco SQLite
├─ frontend/           # Interface Web (React)
├─ data/               # Banco e Arquivo de importação
└─ README.md           # Documentação principal do projeto
```

A aplicação segue uma arquitetura **cliente-servidor**, onde:

* O **backend** é responsável pela importação, persistência, validação e exposição dos dados.
* O **frontend** consome a API REST, exibindo informações em formato de tabela, dashboards e telas de edição.

---

## ⚙️ Stack Tecnológica

### Backend

* Python 3
* FastAPI
* SQLAlchemy
* SQLite
* Pandas / OpenPyXL (para importação de Excel)

### Frontend

* React (Vite)
* JavaScript (ES6+)
* CSS puro
* Recharts (visualização de dados)
* Axios (requisições HTTP)

### Outros

* Git e GitHub

---

## 🗂️ Backend

### Funcionalidades

* Importação de dados a partir de arquivo Excel (.xlsx)
* Persistência em banco SQLite
* API REST para consulta, edição e estatísticas
* Validações de dados no backend

### Organização do Backend:

```
├── backend/
│   ├── __pycache__/         
│   ├── database.py          
│   ├── importar_excel.py    
│   ├── main.py              
│   ├── models.py            
│   └── routes/
│       ├── __pycache__/     
│       └── emissoes.py 
```
### Principais Endpoints

| Método | Rota              | Descrição                             |
| ------ | ----------------- | ------------------------------------- |
| GET    | `/emissoes`       | Lista emissões com filtros            |
| GET    | `/emissoes/{id}`  | Detalhe de uma emissão                |
| PUT    | `/emissoes/{id}`  | Edição controlada de uma emissão      |
| GET    | `/emissoes/stats` | Estatísticas agregadas para dashboard |

### Observações de Validação

* Datas são validadas no formato `YYYY-MM-DD`
* O campo **valor** aceita números **maiores ou iguais a zero**
* Campos textuais passam por normalização e limpeza

---

## 🎨 Frontend

### Funcionalidades

* Tabela de emissões com:

  * Filtros
  * Ordenação
  * Scroll com cabeçalho fixo
* Tela de detalhes com edição controlada
* Dashboard com:

  * Total de emissões
  * Valor total emitido
  * Gráfico de distribuição por tipo

### Organização do Frontend

```
frontend/
├─ src/
│  ├─ components/
│  │  ├─ TelaListagem.jsx
│  │  ├─ TelaDetalhes.jsx
│  │  └─ Dashboard.jsx  
│  ├─ services/
│  │  └─ api.js
│  ├─ utils/
│  │  └─ formatters.js
│  ├─ App.jsx
│  ├─ App.css
│  └─ main.jsx
```

### Decisões de UI/UX

* Dashboard integrado à listagem (contexto único de análise)
* Feedback visual para campos alterados
* Botão de salvar habilitado apenas quando há modificações
* Paleta de cores consistente com os tipos de emissão
* Responsividade

---

## 📊 Dashboard

O Dashboard foi pensado como **componente analítico complementar à tabela**.

Ele apresenta:

* Cards de resumo
* Gráfico de pizza com cores alinhadas às tags da listagem
* Valores formatados em moeda brasileira

---

## 🧪 Validações Implementadas

### Frontend

* Bloqueio de envio quando não há alterações
* Controle de campos alterados
* Formatação visual de valores

### Backend

* Validação de tipo e formato de dados
* Tratamento de exceções
* Respostas HTTP semânticas

---

## 🚀 Possíveis Melhorias Futuras

* Autenticação e controle de acesso
* Histórico de alterações por campo
* Paginação no backend
* Testes automatizados
* Dockerização
* Dashboard com filtagem

---

## ▶️ Como Executar o Projeto

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

A aplicação estará disponível em:

* Backend: `http://localhost:8000`
* Frontend: `http://localhost:5173`

---



## 📄 Considerações Finais

O projeto foi desenvolvido com foco em **clareza, organização e aderência aos requisitos do teste**, simulando um sistema interno real de apoio à decisão. As escolhas técnicas priorizaram legibilidade, manutenibilidade e evolução futura.

---

**Autor:** Leonardo Fonseca
