
export type Role = "USER" | "CLIENT" | "ADMIN" | "EMPLOYEE"

export interface IUser {
    _id?: string,
    name?: string,
    lastName?: string,
    email?: string,
    phone?: number,
    businessId?: string,
    role?: Role
}