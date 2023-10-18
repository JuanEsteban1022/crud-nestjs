import {
  Body,
  Controller,
  Get,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from '../common/enums/rol.enum';
import { Auth } from './decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    console.log(registerDto);
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.login(loginDto);
    return user;
  }

  @Get('profile')
  @Auth(Role.USER)
  profile(@ActiveUser() user: UserActiveInterface) {
    return this.authService.profile(user);
  }
 
  // @Get('profile')
  // @Auth(Role.USER)
  // profile(@Req() req: RequestWithUser) {
  //   return this.authService.profile(req.user);
  // }
 
  // @Get('profile')
  // @Roles(Role.ADMIN)
  // @UseGuards(AuthGuard, RolesGuard)
  // profile(@Req() req: RequestWithUser) {
  //   return this.authService.profile(req.user);
  // }
}
