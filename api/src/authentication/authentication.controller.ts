import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignInDto } from './dtos/sign-in.dto';
import { Public } from 'src/decorators/public.decorator';

//Docs
import { ApiTags } from '@nestjs/swagger';
import { SingInDocs } from 'src/docs/modules/authentication/sing-in.docs';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @SingInDocs()
  @Public()
  @Post('login')
  async signIn(@Body() data: SignInDto): Promise<{ access_token: string }> {
    return await this.authService.signIn(data.email, data.password);
  }
}
