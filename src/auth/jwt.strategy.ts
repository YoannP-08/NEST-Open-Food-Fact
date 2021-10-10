
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from './auth.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey: process.env.JWT_SECRET
        });
    }

    async validate(payload: any){
        // Find user from the payload
        const userExist = await this.authService.validateUserByJwt(payload);
        if(!userExist) {
            throw new UnauthorizedException()
        }
        return { 
            email: payload.email,
        }
    }
}
