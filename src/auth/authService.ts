import { sign, verify } from "jsonwebtoken";
import { HttpException } from "../exceptions/httpException";

const EXPIRES_IN = 300

export class AuthService {
    private secret: string;    

    constructor() {
        if (!process.env.SECRET) {
            throw new Error("secret undefined")
        }

        this.secret = process.env.SECRET
    }

    generateToken() {
        const token = sign({},this.secret, {
            expiresIn: EXPIRES_IN
        })

        return {
            token,
            expiresIn: EXPIRES_IN
        }
    }

    validate(token: string) {
        try {
            verify(token, this.secret)
        } catch {
            throw new HttpException(403, "not authorized")
        }
    }
}