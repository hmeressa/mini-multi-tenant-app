const jwt = require('jsonwebtoken')
import { UnauthorizedException } from "@nestjs/common";

export const verifyToken = async (token : string) => {
    const verifyToken = await jwt.verify(token, "12345678910");
    if (!verifyToken) {
        return new UnauthorizedException({
            message : "Something bad happened",
            error: "Please login",
        });
    }
    return await verifyToken;
}
