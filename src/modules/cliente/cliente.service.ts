import { InjectRepository } from '@nestjs/typeorm';
import { CriarClienteDTO } from './dtos/criar-cliente.dto';
import { Cliente } from './cliente.entity';
import { Repository } from 'typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import * as bcrpty from 'bcrypt';
import { NotFoundError } from 'rxjs';
import { IdDTO } from 'src/common/decorators/dtos/id.dto';
import { AtualizarClienteDto } from './dtos/atualizar-cliente.dto';

export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly repository: Repository<Cliente>,
  ) {}

  private async hash(data: string) {
    const salt = await bcrpty.genSalt(13);
    return await bcrpty.hash(data, salt);
  }

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

    const hash = await this.hash(dto.senha);

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

  async buscarPorId(id: number) {
    const cliente = await this.repository.findOne({ where: { id } });

    if (!cliente) throw new NotFoundException('Clinte nào encontrado!s');

    return cliente;
  }

  async atualizar(id: number, dto: AtualizarClienteDto) {
    const cliente = await this.buscarPorId(id);

    if (
      (cliente.cpf_cnpj && dto.cpf_cnpj !== cliente.cpf_cnpj) ||
      (dto.email && dto.email !== cliente.email)
    ) {
      const existente = await this.repository.findOne({
        where: [{ cpf_cnpj: dto.cpf_cnpj }, { email: dto.email }],
      });

      if (existente) {
        if (existente.cpf_cnpj === existente.cpf_cnpj)
          throw new ConflictException(
            'Já existe um cadastro com esse CPF/CNPJ!',
          );
        if (existente.email === existente.email)
          throw new ConflictException('Já existe um cadastro com esse E-mail!');
      }
    }

    if (dto.senha) {
      dto.senha = await this.hash(dto.senha);
    }

    await this.repository.update(
      { id: cliente.id },
      {
        ...dto,
      },
    );
    return await this.buscarPorId(cliente.id);
  }

  async deletar() {}
}
