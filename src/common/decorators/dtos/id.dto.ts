import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { IId } from 'src/types/common/id.interface';

export class IdDTO implements IId {
  @Type(() => Number)
  @IsNumber({}, { message: "O campo 'id' deve ser um número!" })
  id: number;
}
