export type mapDataType = {
    email: string,
    nickname: string,
    id: number,
    storeName: string,
    tel: string | null,
    address: string,
    coordinate: mapDataCoordinateType,
    openHour: number | null,
    closeHour: number | null,
    menu: mapDataMenuType[],
    state: boolean
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