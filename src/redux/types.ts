export type IComments = {
    user: string
    comment: string
    date: string
}

export type IProduct = {
    _id: string;
    title: string;
    subtitle: string
    price: number;
    imgUrl: string;
    category: string
    comments: IComments[];
    count?: number
}

export type ILoginUser = {
    email: string;
    password: string;
  };
  export type IRegisterUser = {
    email: string;
    password: string;
    fullName: string;
  };
  
  export type IOrderItem = {
    _id: string,
    title: string
    price: number
    imgUrl: string
    count: number
  }
  
  export type IOrder = {
    date: string
    status: string
    items: IOrderItem[]
  }
  
  export interface IUserData {
    _id: string;
    fullname: string;
    email: string;
    token: string;
    orders: IOrder[];
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
  }
  
  export type IUserSlice = {
    data: IUserData | null;
    isLoading: boolean;
    error: string | null;
  };

  export type ICartSlice = {
    itemsInCart: IProductCart[];
    totalPrice: number;
  };
  
  export type IProductCart = {
    _id: string;
    title: string;
    price: number;
    imgUrl: string;
    count: number;
  };