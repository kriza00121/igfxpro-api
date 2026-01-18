import { Request, Response, NextFunction } from 'express';

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: 'Authorization header missing',
    });
  }

  // Non validiamo qui il token
  // JwtAuthGuard farà il vero lavoro
  req.headers.authorization = authHeader;

  next();
}
