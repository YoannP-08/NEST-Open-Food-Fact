import { Controller, Post, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { 
    ApiBadRequestResponse, 
    ApiBearerAuth, 
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';

import { UserSigninDto } from './dto/signin.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { UsersService } from './users.service';
import { UserSignIn, UserSignUp } from './entities/user.entity';

import { User } from './schemas/user.schema'

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}   

    @ApiOperation({ summary: 'Create a user' })
    @ApiCreatedResponse({ description: 'Created a user successfully in the DB', type: UserSignUp })
    @ApiBadRequestResponse({ description: 'Email must be an email - Email must not be empty - Password must not be empty'})
    @ApiUnauthorizedResponse({ description: 'Cannot sign up with: ${email}. The email address is already being used.' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @Post('signup')
    createUser(@Body() createUserDto: CreateUserDto): Promise<UserSignUp> {
        return this.usersService.signup(createUserDto);
    }

    @ApiOperation({ summary: 'Authenticate a user via email/password' })
    @ApiNotFoundResponse({ description: 'Could not found any user with the email: ${email}' })
    @ApiUnauthorizedResponse({ description: 'Invalid password' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiCreatedResponse({ type: UserSignIn })
    @Post('signin')
    async signin(@Body() user: UserSigninDto): Promise<UserSignIn> {
        return await this.usersService.signin(user)
    }

    @ApiOperation({ summary: 'Update a user' })
    @ApiParam({ 
        name: 'id',
        required: true,
        description: "String '_id' from the DB",
        type: 'string'
    })
    @ApiBearerAuth('Token')
    @ApiOkResponse({ description: 'Updated a user successfully in the DB', type: User })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    updateUser(@Body() updateUserDto: UpdateUserDto, @Param('id') id): Promise<User> {
        //  @Request() req
        return this.usersService.update(id, updateUserDto)
    }
}
