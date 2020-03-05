export interface Order {
    id?: string,
    itemId?: string,
    userId: string,
    date: string,
    imageUrl: string,
    name: string,
    orderNo: number,
    price: number,
    amount: number,
    status: string,
}