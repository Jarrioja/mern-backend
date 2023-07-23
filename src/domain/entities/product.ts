export default class Product {
  constructor(
    public id: string,
    public code: string,
    public title: string,
    public description: string,
    public price: number,
    public status: boolean,
    public stock: number,
    public category: string,
    public thumbnails: string[]
  ) {}
}
