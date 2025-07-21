# Catalogo de Filmes
## 1. Movies API

API REST para gerenciar filmes com paginação e ordenação. Inclui documentação interativa com Swagger e autenticação JWT.

### Instalação

```bash
npm install
```

### Como executar

```bash
npm start
```

A API estará disponível em `http://localhost:3000`

### Autenticação

A API utiliza autenticação JWT (JSON Web Token). Para acessar os endpoints protegidos, você deve primeiro fazer login e incluir o token nas requisições.

#### Credenciais de teste:
- **Usuário**: `teste`
- **Senha**: `teste`

#### Como autenticar:

1. **Fazer login** no endpoint `/auth/login`:
```bash
POST /auth/login
Content-Type: application/json

{
  "usuario": "teste",
  "senha": "teste"
}
```

2. **Usar o token** nas requisições subsequentes:
```bash
GET /movies
Authorization: Bearer SEU_TOKEN_AQUI
```

⚠️ **Importante**: O token expira em 30 minutos. Após expirar, você deve fazer login novamente.

### Documentação Swagger

A documentação interativa da API está disponível em:
- **Swagger UI**: `http://localhost:3000/api-docs`

A interface Swagger permite:
- Visualizar todos os endpoints disponíveis
- Testar os endpoints diretamente no navegador (incluindo autenticação)
- Ver exemplos de requisições e respostas
- Validar parâmetros de entrada

#### Como usar autenticação no Swagger:
1. Acesse `/api-docs`
2. Use o endpoint `POST /auth/login` para obter um token
3. Clique no botão "Authorize" 🔒 no topo da página
4. Cole o token no campo (não precisa digitar "Bearer")
5. Clique em "Authorize" e depois "Close"
6. Agora você pode testar os endpoints protegidos

📖 **Para exemplos detalhados de uso, consulte o arquivo [EXAMPLES.md](EXAMPLES.md)**

### Endpoints

⚠️ **Todos os endpoints abaixo requerem autenticação JWT, exceto o `/auth/login`**

#### POST /auth/login

Autentica o usuário e retorna um token JWT. **Este é o único endpoint público.**

##### Requisição:
```json
{
  "usuario": "teste",
  "senha": "teste"
}
```

##### Resposta (200):
```json
{
  "message": "Login realizado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "30 minutos",
  "tokenType": "Bearer"
}
```

Lista filmes com suporte a paginação, ordenação e filtros. **Requer autenticação.**

##### Parâmetros de Query:

- `page` (opcional): Número da página (padrão: 1)
- `limit` (opcional): Número de filmes por página (padrão: 10, máximo: 100)
- `sortBy` (opcional): Campo para ordenação - `nome`, `anoLancamento`, `genero` (padrão: `nome`)
- `order` (opcional): Ordem da classificação - `asc` ou `desc` (padrão: `asc`)
- `genero` (opcional): Filtrar por gênero

##### Exemplos:

```bash
# Listar primeiros 10 filmes ordenados por nome
GET /movies

# Página 2 com 5 filmes por página
GET /movies?page=2&limit=5

# Ordenar por ano de lançamento (mais recente primeiro)
GET /movies?sortBy=anoLancamento&order=desc

# Filtrar filmes de ficção científica
GET /movies?genero=ficção científica

# Combinar filtros: filmes de drama, página 1, ordenados por ano
GET /movies?genero=drama&sortBy=anoLancamento&order=desc&page=1&limit=3
```

##### Resposta:

```json
{
  "data": [
    {
      "id": 1,
      "nome": "O Poderoso Chefão",
      "anoLancamento": 1972,
      "descricao": "A saga de uma família de mafiosos italianos em Nova York",
      "genero": "Drama"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalMovies": 25,
    "moviesPerPage": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  },
  "filters": {
    "sortBy": "nome",
    "order": "asc",
    "genero": null
  }
}
```

#### GET /movies/filters 🔒

Retorna informações sobre os filtros disponíveis. **Requer autenticação.**

##### Resposta:

```json
{
  "availableGenres": ["Drama", "Crime", "Fantasia", "Ficção Científica", "Ação", "Animação"],
  "availableSortFields": ["nome", "anoLancamento", "genero"],
  "sortOrders": ["asc", "desc"]
}
```

#### GET /health

Health check da API. **Não requer autenticação.**

##### Resposta:

```json
{
  "status": "OK",
  "timestamp": "2025-07-10T10:30:00.000Z",
  "uptime": 1234.567
}
```

### Estrutura do Filme

Cada filme possui os seguintes campos:

- `id`: Identificador único (número)
- `nome`: Nome do filme (string)
- `anoLancamento`: Ano de lançamento (número)
- `descricao`: Descrição do filme (string)
- `genero`: Gênero do filme (string)

### Códigos de Status HTTP

- `200`: Sucesso
- `400`: Erro de validação nos parâmetros ou campos obrigatórios ausentes
- `401`: Token de acesso requerido ou credenciais inválidas
- `403`: Token inválido ou expirado
- `404`: Rota não encontrada
- `500`: Erro interno do servidor

### Validações

- `page`: Deve ser maior que 0
- `limit`: Deve ser entre 1 e 100
- `order`: Deve ser "asc" ou "desc"
- `sortBy`: Deve ser um dos campos válidos (nome, anoLancamento, genero)

### Dependências Mínimas

O projeto usa apenas as dependências essenciais:

- **express**: Framework web para Node.js
- **jsonwebtoken**: Implementação de JWT para autenticação
- **swagger-jsdoc**: Geração de especificação OpenAPI/Swagger a partir de comentários JSDoc
- **swagger-ui-express**: Interface web interativa para documentação da API

### Estrutura do Projeto

```
├── index.js          # Servidor principal com endpoints
├── swagger.js        # Configuração da documentação Swagger
├── data/
│   └── movies.js      # Base de dados com mais de 1000 filmes
├── package.json       # Configurações do projeto
├── README.md         # Documentação principal
└── EXAMPLES.md       # Exemplos práticos de uso da API
```
## 2. Movies Frontend

### Descrição
Aplicação Angular que consome a API de filmes (movies-api) para:
- Autenticação via JWT
- Listagem de filmes com filtros
- Favoritar/desfavoritar filmes com persistência local
- Rotas protegidas e logout por inatividade

### Tecnologias
- Angular 19 (Standalone Components)
- RxJS
- TypeScript
- Bulma/Tailwind/*(se aplicável)

### Funcionalidades
1. Login com JWT (`POST /auth/login`)
2. Listagem de filmes (`GET /movies`)
3. Favoritar filmes (persistência via `localStorage`)
4. Visualizar filmes favoritos
5. Roteamento protegido com Guards
6. Logout manual e por inatividade (1 minuto)

### Setup

#### API (Movies API)
1. Clone o repositório da API:
   git clone https://github.com/TesteDevGrowth/movies-api.git
   cd movies-api

2. Instale dependências e execute:
npm install
npm start
A API ficará disponível em http://localhost:3000.

#### Frontend
1. Abra outro terminal e vá para o frontend:
cd movies-frontend
Instale dependências:
npm install

2. Execute o servidor de desenvolvimento:
ng serve
Acesse http://localhost:4200 no seu navegador.

### Testes

#### Unitários
Na pasta `movies-frontend`, execute:
npm run test ou ng test

Isso vai:

-Compilar o bundle de testes
-Abrir o Karma Runner em http://localhost:9876
-Rodar todos os arquivos *.spec.ts em modo watch

##### Relatório de cobertura
Para gerar o relatório de cobertura em HTML, execute:
npm run test -- --code-coverage --watch=false

O resultado será salvo em coverage/. Abra coverage/index.html no navegador para visualizar a porcentagem de cobertura por arquivo e linha.

##### Sobre os testes
- FavoritesService
    - Verifica que inicia vazio
    - Adiciona um favorito e não duplica
    - Persiste no localStorage

##### MoviesService
- Mock de HTTP com HttpClientTestingModule
- Confirma chamada GET em ${environment.apiUrl}/movies
- Valida mapeamento de { data: Movie[] } para Movie[]

##### AuthService
- Limpa token no logout()
- isAuthenticated() reflete presença do token

##### LoginComponent
- Mock de AuthService (Jasmine Spy)
- Cenário de falha de login exibe mensagem de erro
- Cenário de sucesso chama login() e saveToken()

##### AuthInterceptor
- Recebe stub de AuthService que retorna um token dummy
- Verifica que insere o header Authorization: Bearer <token>

### Arquitetura e Decisões

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
