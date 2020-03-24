export interface Item {
  id?: string,
  categoryId: string,
  name: string,
  imageUrl: string,
  category: string,
  price: number,
  description: string,
  status?: boolean,
  amount: number,
  units: string,
  about: string,
}
