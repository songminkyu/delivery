import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { USER_SERVICE } from '@app/common';

@Injectable()
export class OrderService {
  constructor(
    @Inject(USER_SERVICE)
    private readonly userService: ClientProxy,
  ) {}
  async createOrder(createOrderDto: CreateOrderDto, token: string) {
    // 1) 사용자 정보 가져오기
    const user = await this.getUserFromToken(token);
    // 2) 상품정보 가져오기
    // 3) 총금액 계산하기
    // 4) 금액 검증하기 - total 이 맞는지(프론트에서 보내준 데이터랑)
    // 5) 주문 하기
    // 6) 결제 시도하기
    // 7) 주문 상태 업데이트하기
    // 8) 결과 반환하기
  }

  private async getUserFromToken(token: string) {
    // 1) Ucser Microservice에서 JWT 토큰 검증
    const reponse = await lastValueFrom(
      this.userService.send({ cmd: 'parse_bearer_token' }, { token }),
    );
    console.log('-----------------------------------------');
    console.log(reponse);
    // 2) User Microservice에서 사용자 정보 가져오기
  }
}
