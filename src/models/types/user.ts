import { UserRole } from './userRole';

export type User = {
    id: string;
    name: string;
    email: string;
    roles: UserRole[];
    approved?: boolean;
}
