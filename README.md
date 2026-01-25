# Teste Técnico – Estágio em Desenvolvimento Fullstack

## 📌 Visão Geral

Este projeto foi desenvolvido como parte do **Teste Técnico para Estágio em Desenvolvimento Fullstack – JGP Crédito**. A aplicação é um sistema de apoio à tomada de decisão para gestores de crédito, permitindo a consulta, análise gráfica e edição de emissões de renda fixa do mercado primário.

A solução contempla **backend**, **frontend** e **persistência em banco relacional**.

---

## 🌐 Links do Projeto (Deploy)

* Frontend: [text](https://jgp-credito-teste.vercel.app)
* Backend(API): [text](https://jgp-backend.onrender.com) 

**Nota**: Como utilizo o plano gratuito do Render, o backend "dorme" após 15 minutos de inatividade. Ao acessar o site pela primeira vez, os dados podem levar de 30 a 60 segundos para carregar enquanto o servidor "acorda".

---

## 🧱 Arquitetura e Fluxo de Dados

A aplicação segue o modelo cliente-servidor desacoplado:

1. **Backend (Render)**: Gerencia as regras de negócio, persistência em SQLite e processamento de estatísticas.
2. **Frontend (Vercel)**: Interface em React que consome a API de forma assíncrona. 
3. **Comunicação**: Realizada via HTTPS com políticas de CORS configuradas para garantir a segurança entre os domínios.

---

## ⚙️ Stack Tecnológica

### Backend

* **Python 3**
* **FastAPI**
* **SQLAlchemy**: Utilizado para mapear as tabelas do banco como classes Python, facilitando manutenção.
* **SQLite**
* **Pandas / OpenPyXL**: Biblioteca robusta para ETL

### Frontend

* **React (Vite)**: framework ágil para interfaces modernas e reativas
* **JavaScript**
* **CSS**
* **Recharts**: Visualização de dados
* **Axios**: Para gerenciar as requisições assíncronas entre o navegador e a API

---

## 🗂️ Organização do Projeto (Pastas e Arquivos principais)

### Backend:

```
├── backend/
│   ├── database.py   # Configuração do SQLAlchemy       
│   ├── importar_excel.py   # Script de ETL para carga inicial    
│   ├── main.py   # Configuração da API e Middlewares              
│   ├── models.py   # Definição das tabelas            
│   └── routes/
│       ├── __pycache__/     
│       └── emissoes.py   # Endpoints da aplicação
```

### Frontend: 

```
frontend/
├─ src/
│  ├─ components/   # Listagem, Detalhes e Dashboard
│  │  ├─ TelaListagem.jsx
│  │  ├─ TelaDetalhes.jsx
│  │  └─ Dashboard.jsx  
│  ├─ services/
│  │  └─ api.js   # Configuração do Axios 
│  ├─ utils/
│  │  └─ formatters.js  # Formatadores
│  ├─ App.jsx
│  ├─ App.css
│  └─ main.jsx
```
---

### Decisões Técnicas

* **Variáveis de Ambiente**: Implementação de .env e os.getenv no backend para evitar URLs "travadas".
* **Checagem de alterações**: O sistema identifica se houve mudanças reais nos campos antes de permitir o envio (botão "Salvar"), economizando recursos do servidor.
* **Tratamento de CORS**: Configuração dinâmica para aceitar requisições tanto do ambiente de desenvolvimento (Localhost) quanto da produção (Vercel), resolvendo bloqueios de segurança do navegador.
* **Modularização**: Separação clara entre modelos de dados (models.py), conexão de banco (database.py) e rotas (routes/), facilitando a manutenção.

---

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

### Funcionalidades do Frontend

* Tabela de emissões com:

  * Filtros
  * Ordenação
  * Scroll com cabeçalho fixo
* Tela de detalhes com edição controlada
* Dashboard com:

  * Total de emissões
  * Valor total emitido
  * Gráfico de distribuição por tipo

### UI/UX

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

## Possíveis Melhorias Futuras

* **Dockerização:** Criação de imagens Docker para o backend e frontend, permitindo um deploy unificado e escalável.
* **Persistência de Dados Real:** Migração para PostgreSQL para garantir que as alterações nas emissões sejam definitivas (superando a limitação do SQLite em planos gratuitos).
* **Automação de Testes**
* **Paginação no Backend:** Otimização do endpoint de listagem para suportar grandes volumes de dados sem perda de performance.
* **Autenticação:** Implementação de login seguro para que apenas gestores autorizados possam editar as emissões.
---

## 🚀 Como Executar Localmente

1. Backend:

```
cd backend
python -m venv venv
source venv/bin/activate # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```
2. Frontend:

* Crie um .env em /frontend com: VITE_API_URL=http://localhost:8000

```
cd frontend
npm install
npm run dev
```
---
**Autor:** Leonardo Fonseca
