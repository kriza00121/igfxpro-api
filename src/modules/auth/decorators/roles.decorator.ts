import { SetMetadata } from '@nestjs/common';
import { RoleName } from '@prisma/client';

// Accept either raw strings or RoleName enum values
export const Roles = (...roles: Array<string | RoleName>) =>
	SetMetadata('roles', roles.map((r) => String(r)));
