export type mapDataType = {
    id: number,
    storeName: string,
    tel: string,
    address: string,
    coordinate: mapDataCoordinateType,
    openHour: number,
    closeHour: number,
    menu: mapDataMenuType
}

export type mapDataMenuType = {
    name: string,
    price: number
}

export type mapDataCoordinateType = {
    x: number,
    y: number
}

export type detailReviewType = {
    postId: number,
    email: string,
    date: string,
    review: string,
    rate: number,
    nickname: string,
    profile_image: string
}