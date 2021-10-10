import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { UserSignIn, UserSignUp } from '../entities/user.entity';
import { User, UserDocument } from '../schemas/user.schema';
import { UsersService } from '../users.service';
import { userSignInStub, userStub } from './stubs/user.stub';

jest.mock('../users.service.ts')

describe('UsersService', () => {
  let userModel: Model<User>;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: Model
        }
      ],
    }).compile();

    userModel = module.get<Model<UserDocument>>(getModelToken('User'))
    usersService = module.get<UsersService>(UsersService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('signup', () => {
    describe('when signUp is called', () => {
      let user: UserSignUp;
      let saveSpy: jest.SpyInstance;

      beforeEach(async () => {
        saveSpy = jest.spyOn(userModel.prototype, 'save').mockResolvedValue(userStub());
        user = await usersService.signup(userStub());
      })

      test('then it should call the userModel', () => {
        expect(saveSpy).toHaveBeenCalled();
      })

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      })
    })
  })

  describe('signin', () => {
    describe('when signIn is called', () => {
      let user: UserSignIn;

      beforeEach(async () => {
        jest.spyOn(userModel, 'findOne');
        user = await usersService.signin(userStub());
      })

      test('then it should call the userModel', () => {
        expect(userModel.findOne).toHaveBeenCalled();
      })

      test('then it should return a token', () => {
        expect(user).toEqual(userSignInStub());
      })
    })
  })

  describe('findOneAndUpdate', () => {
    describe('when findOneAndUpdate is called', () => {
      let user: User;

      beforeEach(async () => {
        jest.spyOn(userModel, 'findByIdAndUpdate');
        user = await usersService.update('1', userStub());
      })

      test('then it should call the userModel', () => {
        expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith({id: '1'}, userStub(), { new: true });
      })

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      })
    })
  })

  // describe('findByEmail', () => {
  //   describe('when findByEmail is called', () => {
  //     let user: User;

  //     beforeEach(async () => {
  //       jest.spyOn(userModel, 'findOne');
  //       user = await usersService.findByEmail(userStub().email);
  //     })

  //     test('then it should call the userModel', () => {
  //       expect(userModel.findOne).toHaveBeenCalledWith(userStub().email);
  //     })

  //     test('then it should return a user', () => {
  //       expect(user).toEqual(userStub());
  //     })
  //   })
  // })
});
