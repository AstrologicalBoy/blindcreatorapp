type FormFields = {
    email: string,
    password: string,
}

export const login = async(data: FormFields) => {
    const query = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const json = await query.json();
    return json;
}

export const logout = async () => {
    const query = await fetch("http://localhost:3000/api/logout");
    return query.json();
}