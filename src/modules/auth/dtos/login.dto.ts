import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ILogin } from 'src/types/auth/auth.interface';
import { ETipoAcesso } from 'src/types/auth/tipo-acesso.enum';

export class LoginDto implements ILogin {
  @IsEnum(ETipoAcesso, {
    message: `O campo tipo 'tipo' deve ser: ${Object.keys(ETipoAcesso).join(',')}.`,
  })
  @IsNotEmpty({ message: "O campo 'tipo' é de preenchimento obrigatório!" })
  @ApiProperty({ description: 'Define qual será o tipo de acesso utilizado.' })
  tipo: ETipoAcesso;

  @IsString({
    message: "O campo 'identificador' é de preenchimento obrigatório!",
  })
  @IsNotEmpty({
    message: "O campo 'identificador' é de preenchimento obrigatório!",
  })
  @ApiProperty({ description: 'O identificador do usuário/cliente.' })
  identificador: string;

  @IsString({ message: "O campo 'senha' é de preenchimento obrigatório!" })
  @IsNotEmpty({ message: "O campo 'senha' é de preenchimento obrigatório!" })
  @ApiProperty({ description: 'Senha do usuário/cliente.' })
  senha: string;
}
