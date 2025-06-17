import { ICliente } from 'src/types/cliente/cliente.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Cliente implements ICliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  cpf_cnpj: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @CreateDateColumn({ type: 'timestamptz' })
  criado_em: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  atualizado_em: Date;
}
