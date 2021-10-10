import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
        ) {}
    
    /**
     * Verify that the JWT payload associated with a JWT is valid by making sure the user exists
     *
     * @param {User} payload
     * @returns {(Promise<User>)} throw an unauthorized exception if there is no user
     */
    async validateUserByJwt(payload: User) {
        // Find user from the payload
        const userExist = await this.usersService.findByEmail(payload.email);
        if(!userExist){
            throw new UnauthorizedException();
        }
        return {
            expiresIn: 3600,
            access_token: this.jwtService.sign({ email: payload.email }),
        };
    }
}
