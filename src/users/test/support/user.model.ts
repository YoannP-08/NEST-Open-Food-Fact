
import { User } from "../../schemas/user.schema";
import { userStub } from "../stubs/user.stub";

export class UserModel {
    protected entityStub = userStub()

    findOne(): { exec: () => User } {
        return {
            exec: (): User => this.entityStub
        }
    }
    
    async save(): Promise<User> {
        return this.entityStub;
    }
    
    async findByIdAndUpdate(): Promise<User> {
        return this.entityStub;
    }
}