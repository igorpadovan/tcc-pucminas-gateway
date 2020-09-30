export interface IAtivo {
  id?: number;
  nome?: string;
  descricao?: string;
  quantidade?: string;
}

export class Ativo implements IAtivo {
  constructor(public id?: number, public nome?: string, public descricao?: string, public quantidade?: string) {}
}
