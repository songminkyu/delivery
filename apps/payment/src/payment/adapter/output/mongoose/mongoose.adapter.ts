import { DatabaseOutputPort } from '../../../port/output/database.output-port';
import { Model, Promise } from 'mongoose';
import { PaymentDocument } from './document/payment.document';
import { PaymentModel } from '../../../domain/payment.domain';
import { InjectModel } from '@nestjs/mongoose';
import { PaymentDocumentMapper } from './mapper/payment-document.mapper';

export class MongooseAdapter implements DatabaseOutputPort {
  constructor(
    @InjectModel(PaymentDocument.name)
    private readonly paymentModel: Model<PaymentDocument>,
  ) {}
  async savePayment(payment: PaymentModel): Promise<PaymentModel> {
    const model = await this.paymentModel.create(payment);
    return new PaymentDocumentMapper(model).toDomain();
  }

  async updatePayment(payment: PaymentModel): Promise<PaymentModel> {
    const model = await this.paymentModel.findByIdAndUpdate(
      payment.id,
      payment,
      {
        new: true,
      },
    );
    return new PaymentDocumentMapper(model).toDomain();
  }
}
