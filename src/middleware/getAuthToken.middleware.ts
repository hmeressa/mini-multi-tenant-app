import { UnauthorizedException } from '@nestjs/common';

export const getAuthToken = (req: any, res: any, next: any) => {

  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return next(
        new UnauthorizedException({
          message: 'Something bad happened',
          error: 'Please login',
        }),
      );
    }
    return token;
  } else {
    return new UnauthorizedException({
      message: 'Something bad happened',
      error: 'Please login',
    });
  }
};
