export interface ILocalQuePodeSerAfetado {
  id?: number;
  nome?: string;
  areaDeRiscoNome?: string;
  areaDeRiscoId?: number;
}

export class LocalQuePodeSerAfetado implements ILocalQuePodeSerAfetado {
  constructor(public id?: number, public nome?: string, public areaDeRiscoNome?: string, public areaDeRiscoId?: number) {}
}
