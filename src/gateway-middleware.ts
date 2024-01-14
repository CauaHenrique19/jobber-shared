import JWT from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "./error-handler";

const tokens: string[] = ["auth", "seller", "gig", "search", "buyer", "message", "order", "review"];

export function verifyGatewayRequest(req: Request, _res: Response, next: NextFunction): void {
  if (!req.headers.gatewaytoken) {
    throw new NotAuthorizedError(
      "Invalid Request",
      "verifyGatewayRequest() method Request not coming from api gateway",
    );
  }

  const token: string = req.headers.gatewaytoken as string;

  try {
    const payload = JWT.verify(token, "koasdkoaskdoaskdosakdosakdosakdosadsa") as { id: string; iat: number };
    if (!tokens.includes(payload.id)) {
      throw new NotAuthorizedError("Invalid Request", "verifyGatewayRequest() method Request payload is invalid");
    }
  } catch (error) {
    throw new NotAuthorizedError(
      "Invalid Request",
      "verifyGatewayRequest() method Request not coming from api gateway",
    );
  }

  next();
}
