export const bodyToUser = (body) => {
    const birth = new Date(body.birth);

    return {
        email: body.email,
        name: body.name,
        gender: body.gender,
        birth,
        address: body.address || "",
        detailAddress: body.detailAddress || "",
        phoneNumber: body.phoneNumber,
        preferences: body.preferences,
    };
};

export const responseFromUser = (body) => {
    const user = body.user[0];
    const preferences = body.preferences;

    return {
        email: user.email,
        name: user.name,
        preferCategory: preferences.map(pref => pref.name)
    }
};