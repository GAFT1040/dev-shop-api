import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CriarSuporte {
  @IsString({ message: "O campo 'nome' deve ser uma string." })
  @ApiProperty({})
  nome: string;
  @IsEmail({}, { message: "O campo 'email' deve ser um email válido." })
  @ApiProperty({})
  email: string;
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
