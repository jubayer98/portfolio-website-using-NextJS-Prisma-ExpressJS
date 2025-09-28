import jwt, { Secret, SignOptions, JwtPayload } from "jsonwebtoken";
import { env } from "../env";

type JwtUserPayload = { sub: string; email: string } & JwtPayload;

export function signAccessToken(payload: JwtUserPayload, expiresIn: string = "15m"): string {
    return jwt.sign(payload, env.JWT_ACCESS_SECRET as Secret, { expiresIn } as SignOptions);
}

export function signRefreshToken(payload: JwtUserPayload, expiresIn: string = "7d"): string {
    return jwt.sign(payload, env.JWT_REFRESH_SECRET as Secret, { expiresIn } as SignOptions);
}

export function verifyAccessToken(token: string): JwtUserPayload {
    return jwt.verify(token, env.JWT_ACCESS_SECRET as Secret) as JwtUserPayload;
}

export function verifyRefreshToken(token: string): JwtUserPayload {
    return jwt.verify(token, env.JWT_REFRESH_SECRET as Secret) as JwtUserPayload;
}
