import { InjectRepository } from '@nestjs/typeorm';
import { CriarClienteDTO } from './dtos/criar-cliente.dto';
import { Cliente } from './cliente.entity';
import { Repository } from 'typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import * as bcrpty from 'bcrypt';
import { NotFoundError } from 'rxjs';

export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly repository: Repository<Cliente>,
  ) {}

  async criar(dto: CriarClienteDTO) {
    const existente = await this.repository.findOne({
      where: [{ cpf_cnpj: dto.cpf_cnpj }, { email: dto.email }],
    });

    if (existente) {
      if (dto.cpf_cnpj === existente.cpf_cnpj)
        throw new ConflictException('CPF/CNPJ já está cadastrado.');
      if (dto.email === existente.email)
        throw new ConflictException('E-mail já está cadastrado.');
    }

    const salt = await bcrpty.genSalt(13);
    const hash = await bcrpty.hash(dto.senha, salt);

    const cliente = this.repository.create({
      ...dto,
      senha: hash,
    });

    const {
      senha: _,
      email: __,
      cpf_cnpj: ___,
      ...cliente_db
    } = await this.repository.save(cliente);

    return cliente_db;
  }

  async buscarPorEmail(email: string) {
    const cliente = await this.repository.findOne({
      where: {
        email: email.toLowerCase(),
      },
      select: {
        id: true,
        senha: true,
      },
    });

    if (!cliente) throw new NotFoundException('Nenhum cliente encontrado!');

    return cliente;
  }

  async buscarPorId() {}

  async atualizar() {}

  async deletar() {}
}
