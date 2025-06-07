import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentDto } from './payment.dto';
import { AddressDto } from './address.dto';

export class CreateOrderDto {
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  productIds: string[];

  @ValidateNested()
  @Type(() => AddressDto)
  @IsNotEmpty()
  address: AddressDto;

  @ValidateNested()
  @Type(() => PaymentDto)
  @IsNotEmpty()
  payment: PaymentDto;
}
