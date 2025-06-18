import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { cpf, cnpj } from 'cpf-cnpj-validator';

function isValid(value: string): boolean {
  return cnpj.isValid(value) || cpf.isValid(value);
}

@ValidatorConstraint()
export class IsCpfCnpjContraint implements ValidatorConstraintInterface {
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    return isValid(value);
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'CPF/CNPJ inválido!';
  }
}

export function isCpfCnpj(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isCpfCnpj',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsCpfCnpjContraint,
    });
  };
}
