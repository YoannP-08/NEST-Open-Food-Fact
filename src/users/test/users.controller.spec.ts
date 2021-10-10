import { Test, TestingModule } from '@nestjs/testing';

import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';

import { userSignInStub, userStub } from "./stubs/user.stub";

import { CreateUserDto } from '../dto/create-user.dto';
import { UserSigninDto } from '../dto/signin.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

import { User } from '../schemas/user.schema'
import { UserSignIn, UserSignUp } from '../entities/user.entity';

jest.mock('../users.service.ts')

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers:[UsersService]
    }).compile()

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('createUser', () => {
    describe('when createUser is called', () => {
      let user: UserSignUp;
      let createUserDto: CreateUserDto

      beforeEach(async () => {
        createUserDto = {
          email: userStub().email,
          password: userStub().password
        }
        user = await usersController.createUser(createUserDto);
      })

      it('then it should call usersService', () => {
        expect(usersService.signup).toHaveBeenCalledWith(createUserDto);
      })

      it('then it should return a user', () => {
        expect(user).toEqual(userStub())
      })

      // it('then it should return a bad request if email is not a valid email', async () => {
      //   await expect(wrongUserEmail).rejects.toEqual({
      //     "statusCode": 400,
      //     "message": [
      //       "email must be an email"
      //     ],
      //     "error": "Bad Request"
      //   })
      // })
    })
  })

  describe('signIn', () => {
    describe('when signIn is called', () => {
      let user: UserSignIn;
      let signInUserDto: UserSigninDto

      beforeEach(async () => {
        signInUserDto = {
          email: userStub().email,
          password: userStub().password
        }
        user = await usersController.signin(signInUserDto);
      })

      it('then it should call usersService', () => {
        expect(usersService.signin).toHaveBeenCalledWith(signInUserDto);
      })

      it('then it should return a JWT token', () => {
        expect(user).toEqual(userSignInStub())
      })
    })
  })

  describe('updateUser', () => {
    describe('when updateUser is called', () => {
      let user: User;
      let updateUserDto: UpdateUserDto;

      beforeEach(async () => {
        updateUserDto = {
          lastname: 'Durand',
          username: 'Yop08'
        }
        user = await usersController.updateUser(updateUserDto, {id: 1});
      })

      it('then it should call usersService', () => {
        expect(usersService.update).toHaveBeenCalledWith({id: 1}, updateUserDto);
      })

      it('then it should return a user updated', () => {
        expect(user).toEqual(userStub())
      })
    })
  })
});
