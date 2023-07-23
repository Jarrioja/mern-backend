export default class Order {
  constructor(
    public id: string,
    public purchaser: string,
    public code: string,
    public amount: number,
    public createdAt: Date
  ) {}
}
