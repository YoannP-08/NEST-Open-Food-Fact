import { userStub, userSignInStub } from "../test/stubs/user.stub";

export const UsersService = jest.fn().mockReturnValue({
    signup: jest.fn().mockResolvedValue(userStub()),
    signin: jest.fn().mockResolvedValue(userSignInStub()),
    update: jest.fn().mockResolvedValue(userStub()),
})