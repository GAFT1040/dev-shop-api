export interface ICliente {
  id: number;
  nome: string;
  email: string;
  cpf_cnpj: string;
  senha: string;
  criado_em: Date;
  atualizado_em: Date;
}

export type ICriarCliente = Pick<
  ICliente,
  'nome' | 'email' | 'cpf_cnpj' | 'senha'
>;

export type IAtuazliarCliente = Partial<
  Omit<ICliente, 'id' | 'criado_em' | 'atualizado_em'>
>;
