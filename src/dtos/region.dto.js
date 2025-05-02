export const bodyToRegion = (body) => {
    return {
        name: body.name
    }
}

export const responseFromRegion = (body) => {
    const region = body.region;

    return {
        name: region.name
    }
}