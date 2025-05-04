export const bodyToStore = (body) => {
    return {
        region_id: body.region_id,
        name: body.name,
        address: body.address,
    };
}

export const bodyToStore_2 = (body) => {
    return {
        id: body.id,
    }
}
export const responseFromStore = (body) => {
    return {
        message: body.message,
    }
}

export const responseFromStore_2 = (body) => {
    const store = body.store;

    return {
        region_id: store.region_id,
        name: store.name,
        address: store.address,
        score: store.score,
    }
}
