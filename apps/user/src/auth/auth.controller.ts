import {
  Body,
  Controller,
  Post,
  UsePipes,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register-dto';
import { Authorization } from './decorator/authorization.decorator';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ParseBearerTokenDto } from './dto/parse-bearer-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(ValidationPipe)
  registerUser(
    @Authorization() token: string,
    @Body() registerDto: RegisterDto,
  ) {
    if (token === null) {
      throw new UnauthorizedException('토큰을 입력 해주세요!!.');
    }
    return this.authService.register(token, registerDto);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  loginUser(@Authorization() token: string) {
    if (token === null) {
      throw new UnauthorizedException('토큰을 입력 해주세요!!.');
    }

    return this.authService.login(token);
  }

  //@MessagePattern 요청/응답 처리하고,
  //@EventPattern은 요청만 처리한다.
  @MessagePattern({
    cmd: 'parse_bearer_token',
  })
  @UsePipes(ValidationPipe)
  parseBearerToken(@Payload() payload: ParseBearerTokenDto) {
    console.log('Request reactive');
    return this.authService.parseBearerToken(payload.token, false);
  }
}
