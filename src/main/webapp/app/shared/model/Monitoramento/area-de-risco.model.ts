export interface IAreaDeRisco {
  id?: number;
  nome?: string;
  local?: string;
  tamanho?: string;
}

export class AreaDeRisco implements IAreaDeRisco {
  constructor(public id?: number, public nome?: string, public local?: string, public tamanho?: string) {}
}
