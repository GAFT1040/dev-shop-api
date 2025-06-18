import { ETipoAcesso } from './tipo-acesso.enum';

export interface ILogin {
  tipo: ETipoAcesso;
  identificador: string;
  senha: string;
}
