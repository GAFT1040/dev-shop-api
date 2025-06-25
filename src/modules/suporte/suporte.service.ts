import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Suporte } from './suporte.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { NotFoundError } from 'rxjs';

@Injectable()
export class SuporteService implements OnModuleInit {
  private readonly logger = new Logger(SuporteService.name);

  constructor(
    private readonly config: ConfigService,
    @InjectRepository(Suporte)
    private readonly repository: Repository<Suporte>,
  ) {}

  private async hash(data: string) {
    const salt = await bcrypt.genSalt(14);
    return await bcrypt.hash(data, salt);
  }

  async onModuleInit() {
    const email = this.config.get<string>('SUPORTE_EMAIL');
    const senha = this.config.get<string>('SUPORTE_SENHA');

    if (!email || !senha) {
      this.logger.error(
        "Verifique as variáveis de ambiente 'SUPORTE_EMAIL' e 'SUPORTE_SENHA'!",
      );

      process.exit(1);
    }

    const qtd = await this.repository.count();

    if (qtd === 0) {
      const suporte = this.repository.create({
        nome: 'suporte',
        email,
        senha: await this.hash(senha),
      });

      await this.repository.save(suporte);

      this.logger.log('Usuário suporte criado com sucesso!');
    }
  }

  async buscarPorEmail(email: string) {
    const suporte = await this.repository.findOne({
      where: { email },
      select: { id: true, senha: true, ativo: true },
    });

    if (!suporte) throw new NotFoundException('USuário não encontrado!');

    return suporte;
  }

  async buscarPorId(id: number) {}

  async criar(dto: any) {}

  async atualizar(id: number, dto: any) {}

  async deletar(id: number) {}
}
