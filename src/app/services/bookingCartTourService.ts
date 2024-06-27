import Cookies from 'js-cookie';

export async function addToBookingCartTour(data:any) {
    const response = await fetch('https://localhost:7132/createCartTour', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${localStorage.getItem("token")}`, // Retrieve token from localStorage
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const errorDetail = await response.text(); // Lấy text thay vì JSON
        console.error('Error adding to cart:', errorDetail);
        throw new Error('Failed to add to cart');
    }
}
// bookingCartTourService.ts
export async function getCartTourByUserId() {
    try {
      const response = await fetch('https://localhost:7132/getCartTourByUserId', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get("tokenUser")}`
        }
      });
  
      if (!response.ok) {
        // Nếu lỗi 500 thì trả về mảng rỗng
        if (response.status === 500) {
          return [];
        }
        throw new Error('Failed to fetch booking cart');
      }
  
      return await response.json();
    } catch (error:any) {
      console.error('Error fetching cart tours:', error);
      // Nếu lỗi 500 thì trả về mảng rỗng
      if (error.message === 'Failed to fetch booking cart') {
        return [];
      }
      throw error;
    }
  }


export async function deleteCartTour(cartTourId:number) {
    const response = await fetch(`https://localhost:7132/deleteCartTour/${cartTourId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get("tokenUser")}`
        }
    });

    if (!response.ok) {
        const errorDetail = await response.text();
        console.error('Error deleting cart tour:', errorDetail);
        throw new Error('Failed to delete cart tour: ' + errorDetail);
    }

    return await response.text(); // Lấy text thay vì JSON
}