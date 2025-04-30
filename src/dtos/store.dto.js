export const bodyToStore = (body) => {
    return {
        region_id: body.region_id,
        name: body.name,
        address: body.address,
        score: body.score
    };
}

export const responseFromStore = (body) => {
    const store = body.store;

    return {
        region_id: store.region_id,
        name: store.name,
        address: store.address,
        score: store.score,
    }
}
