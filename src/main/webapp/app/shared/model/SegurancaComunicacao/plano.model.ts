export interface IPlano {
  id?: number;
  nome?: string;
  descricao?: string;
}

export class Plano implements IPlano {
  constructor(public id?: number, public nome?: string, public descricao?: string) {}
}
