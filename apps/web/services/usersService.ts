const API_URL = 'http://localhost:3001';

export interface IUser {
    _id: string;
    role: string;
    name: string;
    email: string;
}

export type IUpdateUser = Pick<IUser, 'name' | 'email'>;

export const usersService = {
    login,
    getMe,
    updateMe,
    updateMyPassword
};

async function login(email: string, password: string): Promise<{ token: string; }> {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
}

async function getMe(token: string): Promise<IUser> {
    const response = await fetch(`${API_URL}/users/me`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-type": "application/json",
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
}

async function updateMe(token: string, updatedUser: IUpdateUser): Promise<IUser> {
    const response = await fetch(`${API_URL}/users/updateMe`, {
        method: "PATCH",
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-type": "application/json",
        },
        body: JSON.stringify(updatedUser)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
}

async function updateMyPassword(token: string, { currentPassword, newPassword }: { currentPassword: string; newPassword: string; }): Promise<{ token: string; }> {
    const response = await fetch(`${API_URL}/users/updateMyPassword`, {
        method: "PATCH",
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-type": "application/json",
        },
        body: JSON.stringify({ currentPassword, newPassword })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
}