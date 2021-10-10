import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';

import { UserSigninDto } from './dto/signin.dto';

import { UserSignUp, UserSignIn } from './entities/user.entity' 
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './schemas/user.schema'

const SALT_OR_ROUNDS = 10;

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private readonly userModel:Model<User>,
        private readonly jwtService: JwtService,
        ) {}

    /**
     * Create a user in the database.
     *
     * @param {User} user email and password. Username and email must be
     *                    unique, will throw an unauthorized error with a description if it is a duplicate.
     * @returns {Promise<UserSignUp>} or throws an error
     */
    async signup(user: CreateUserDto): Promise<UserSignUp> {
        const { email, password } = user;

        // Check if user already exists in DB
        const userExist = await this.userModel.findOne({email});
        if (userExist) {
            throw new UnauthorizedException(`Cannot sign up with: ${email}. The email address is already being used.`);
        }

        // Encrypt password before saving in DB
        const hashPassword = await bcrypt.hash(password, SALT_OR_ROUNDS);

        const newUser = new this.userModel({email, password: hashPassword});
        await newUser.save();
        // Do not return password from newUser for security, only email
        return { userId: newUser._id, email: newUser.email };
    }

    /**
     * Check if a user exists in a DB and its password is valid.
     *
     * @param {UserSigninDto} user Email and Password must be provided.
     * @returns {(Promise<UserSignIn>)} returns a JWT token if successful, an unauthorized exception if not
     */
    async signin(user: UserSigninDto): Promise<UserSignIn> {
        const { email, password: hashPassword } = user

        // Check if user exists
        const userExist = await this.userModel.findOne({email});
        if (!userExist) {
            throw new UnauthorizedException(`Could not found any user with this email ${email}`);
        }

        // Verify user password
        const passwordMatch = await bcrypt.compare(hashPassword, userExist.password)
        if(passwordMatch) {
            // Generate JWT Token
            const token = await this.jwtService.signAsync(
                { email, sub: userExist._id },
                {expiresIn: 3600}
                )
            return { token }
        } else {
            throw new UnauthorizedException('Invalid password')
        }
    }

    /**
     * Update a user in the database. If any value is invalid, it will still update the other
     * fields of the user.
     *
     * @param {string} id of the user to update
     * @param {User} user fields the user can update (firstname, lastname, username, email, password)
     * @returns {(Promise<User>)} Returns an unauthorized exception if the user cannot be found
    */
    async update(id: string, user: UpdateUserDto): Promise<User> { 
        // req:any Param
        const { email, password: newPassword } = user;

        // ## Hack to verify if token belongs to logged user.
        // If not, throw an unauthorized error.
        // PB: double decode the token.
        // interface Token {
        //     email: string;
        //     id: string;
        // };
        // const decodedToken = this.jwtService.decode(req.headers.authorization.replace('Bearer ', ''));
        // const { email: emailFromDecodedToken } = (decodedToken as Token);
        // if (emailFromDecodedToken !== email) {
        //     throw new UnauthorizedException('It is not your account.')
        // }


        // Check if email address is not already being used in DB,
        // before updating profile with new email address
        const emailExist = await this.userModel.findOne({email})
        if (emailExist) {
            throw new UnauthorizedException(`Cannot update profile with: ${email}. The email address is already being used.`)
        }

        // Hash new password
        if (newPassword) {
            const hashPassword = await bcrypt.hash(newPassword, SALT_OR_ROUNDS);
            user.password = hashPassword
        }

        const userUpd = await this.userModel.findByIdAndUpdate(
                id,
                user,
                { new: true } // return new user info after update was applied
            );

        userUpd.password = undefined // ##TODO: might lead to errors further done
        return userUpd
    }

    /**
     * Find a user by its email address.
     *
     * @param {string} email address of user, not case sensitive
     * @returns {(Promise<User | undefined>)}
     */
    async findByEmail(email: string): Promise<User | undefined> {
        return await this.userModel.findOne({email})
    }
}
