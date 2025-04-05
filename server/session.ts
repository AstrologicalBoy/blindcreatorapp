type FormFields = {
    email: string,
    password: string,
}

export const login = async(data: FormFields) => {
    const query = await fetch("https://blindcreatorapp.vercel.app/api/login", {
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
    const query = await fetch("https://blindcreatorapp.vercel.app/api/logout");
    return query.json();
}
