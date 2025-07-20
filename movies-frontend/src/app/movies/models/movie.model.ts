export interface Movie {
    id: number;
    nome: string;          // antes: title
    anoLancamento: number; // antes: (opcional) year
    descricao: string;     // antes: description
    genero: string;        // antes: genre
  }