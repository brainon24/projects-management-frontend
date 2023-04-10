
export type Role = "USER" | "CLIENT" | "ADMIN" | "ALLY"

export interface IUser {
    _id?: string;
    fullName?: string;
    email?: string;
    phone?: number;
    businessId?: string;
    role?: Role
}