import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
import { isCpfCnpj } from 'src/common/decorators/cpf-cnpj.decorator';
import { ICriarCliente } from 'src/types/cliente/cliente.interface';

export class CriarClienteDTO implements ICriarCliente {
  @IsString({ message: "O campo 'nome' deve ser uma string." })
  @ApiProperty({})
  nome: string;
  @IsEmail({}, { message: "O campo 'email' deve ser um email válido." })
  @ApiProperty({})
  email: string;
  @isCpfCnpj()
  @ApiProperty({})
  cpf_cnpj: string;
  @IsStrongPassword(
    {
      minLength: 8,
      minNumbers: 1,
      minLowercase: 1,
      minUppercase: 1,
    },
    {
      message:
        'A senha deve conter no mínimo 8 caracteres, 1 letra e 1 número!',
    },
  )
  @ApiProperty({})
  senha: string;
}
