import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/creat-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get ()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get (':id')
  getUserById (@Param('id', new ParseUUIDPipe()) id: string) {
    const user = this.userService.getUserById(id);
    if (!user) {
      throw new HttpException(
        `User ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  @Post()
  createUser (@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put()
  updatePassword (
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param('uuid', new ParseUUIDPipe()) id: string
  ) {
    return this.userService.updatePassword(updatePasswordDto, id);
  }
}
