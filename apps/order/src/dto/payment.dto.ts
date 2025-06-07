import { PaymentMethod } from '../entity/payment.entity';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PaymentDto {
  @IsString()
  @IsNotEmpty()
  paymentMehod: PaymentMethod;

  @IsString()
  @IsNotEmpty()
  paymentName: string;

  @IsString()
  @IsNotEmpty()
  cardNumber: string;

  @IsString()
  @IsNotEmpty()
  expiryYear: string;

  @IsString()
  @IsNotEmpty()
  expiryMonth: string;

  @IsString()
  @IsNotEmpty()
  birthOrRegistration: string;

  @IsString()
  @IsNotEmpty()
  passwordTwoDigits: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
