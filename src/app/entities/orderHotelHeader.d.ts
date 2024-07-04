interface IOrderHotelHeader{
    id: number;
    userId: number;
    totalPrice: number;
    checkInDate: string | Date;
    checkOutDate: string | Date;
    sessionId: number;
    paymentIntentId: number;
    fullName: string;
    email:string;
    phone: string;
    process: string;
    completed: boolean;
}