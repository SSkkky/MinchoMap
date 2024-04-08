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