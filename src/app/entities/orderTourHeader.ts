interface IOrderTourHeader{
    id: number;
    userId: number;
    supplierId: number;
    totalPrice: number;
    tourOrderDate: string | Date;
    sessionId: number;
    paymentIntentId: number;
    fullName: string;
    phone: string;
    process: string;
    completed: boolean;
}