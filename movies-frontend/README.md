# Movies Frontend

## Descrição
Aplicação Angular que consome a API de filmes (movies-api) para:
- Autenticação via JWT
- Listagem de filmes com filtros
- Favoritar/desfavoritar filmes com persistência local
- Rotas protegidas e logout por inatividade

## Tecnologias
- Angular 19 (Standalone Components)
- RxJS
- TypeScript
- Bulma/Tailwind/*(se aplicável)

## Funcionalidades
1. Login com JWT (`POST /auth/login`)
2. Listagem de filmes (`GET /movies`)
3. Favoritar filmes (persistência via `localStorage`)
4. Visualizar filmes favoritos
5. Roteamento protegido com Guards
6. Logout manual e por inatividade (1 minuto)

## Setup

### API (Movies API)
1. Clone o repositório da API:
   git clone https://github.com/TesteDevGrowth/movies-api.git
   cd movies-api

2. Instale dependências e execute:
npm install
npm start
A API ficará disponível em http://localhost:3000.

### Frontend
1. Abra outro terminal e vá para o frontend:
cd movies-frontend
Instale dependências:
npm install

2. Execute o servidor de desenvolvimento:
ng serve
Acesse http://localhost:4200 no seu navegador.

## Arquitetura e Decisões

- Standalone Components: evita a necessidade de NgModules e facilita o bootstrap via bootstrapApplication.
- Routing: configurado em src/app/app.routes.ts com provideRouter.
- AuthInterceptor: intercepta requisições HTTP para adicionar o JWT no header.

- Guards:
    - AuthGuard protege rotas internas (/movies, /favorites).
    - LoginGuard impede acesso a /login se já estiver autenticado.
- FavoritesService: usa BehaviorSubject e localStorage para persistir favoritos, sobrevivendo a recarregamentos.

- AppComponent:
    - Contém <router-outlet> e botão de Logout,
    - Implementa detecção de inatividade com eventos globais.
