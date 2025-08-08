// builtin

// external

// internal


interface Account {
    username: string;
    password: string;
}

const accounts: Account[] = [
    { username: "this_is", password: "awful" },
    { username: "do_not", password: "copy_this" }
]

export async function validateCredentials(username: string, password: string): Promise<string | null> {
    for (const account of accounts) {
        if (account.username === username && account.password === password) {
            return account.username;
        }
    }

    return null;
}