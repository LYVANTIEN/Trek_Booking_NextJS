interface IUser{
    userId: number;
    userName: string;
    email: string;
    phone: string;
    address: string;
    password: string;
    status: boolean;
    isVerify: boolean;
    roleId: number;
    role:{a
        roleId: number;
        roleName: string;
        roleDescription: string
    }
}