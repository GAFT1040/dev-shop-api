import { ICriarCliente } from 'src/types/cliente/cliente.interface';

export class CriarClienteDTO implements ICriarCliente {
  nome: string;
  email: string;
  senha: string;
  cpf_cnpj: string;
}
