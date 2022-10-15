import { SetMetadata } from "@nestjs/common";
import { Role } from "../../usuario/usuario";

export const Roles = (...roles: Role[]) => SetMetadata("roles", roles);
