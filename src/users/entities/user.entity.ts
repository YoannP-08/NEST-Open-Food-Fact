import { ApiProperty } from "@nestjs/swagger";

export class User {
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    isAdmin?: boolean;

    @ApiProperty()
    firstname?: string;

    @ApiProperty()
    lastname?: string;

    @ApiProperty()
    username?: string;
}

export class UserSignUp {
    @ApiProperty()
    userId: string
    
    @ApiProperty()
    email: string;
}

export class UserSignIn {
    @ApiProperty()
    token: string;
}
