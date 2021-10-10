import { UserSignIn } from "../../entities/user.entity";
import { User } from "../../schemas/user.schema";

export const userStub = (): User => {
    return {
        email: 'yoann@test.com',
        password: 'qwertyuiop',
        isAdmin: false,
        firstname: "Yoann",
        lastname: "Pons",
        username: "Yop",
    }
}

export const userSignInStub = (): UserSignIn => {
    return {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QzQHRlc3QuY29tIiwic3ViIjoiNjE2MDEzNzdlZDA4OWViZTlkMTBlY2RhIiwiaWF0IjoxNjMzNjg2NTQ3LCJleHAiOjE2MzM2OTAxNDd9.S8CgcIvBwYJNQUBPJ9ViaLsIrDjuUFpDj3vHJ9yN_QE'
    }
}