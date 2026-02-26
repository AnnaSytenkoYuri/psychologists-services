export interface User {
    _id: number;
    name: string;
    email: string;
    avatar?: string;
}

export interface UserResponse {
    success: boolean;
    data: User;
}