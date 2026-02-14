import { Role } from "@prisma/client"

export function allowRole(userRole: Role, allowed: Role[]) {
  return allowed.includes(userRole)
}
