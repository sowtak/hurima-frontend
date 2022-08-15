export interface ItemResponse {
    id: number;
    name: string;
    seller: string;
    price: number;
    filename: string;
    comment_count: number;
}

export interface ItemDetailResponse {
    file: any;
    description: string;
    condition: string;
}

export interface ItemSearchRequest {
    searchType: SearchItem;
    text: string;
    currentPage: number;
}

export interface ItemErrors {
    nameError: string;
    sellerError: string;
    priceError: string;
}

export interface CommentRequest {
    itemId: number | string;
    author: string;
    content: string;
}

export interface CommentError {
    authorError: string;
    contentError: string;
}

export interface CommentResponse {
    id: number;
    author: string;
    content: string;
    date: any;
}


export interface HeaderResponse<T> {
    items: Array<T>
    pagesCount: number;
    totalElements: number;

}

export enum SearchItem {
    Manufacturer = "MANUFACTURER",
    ITEM_TITLE = "ITEM_TITLE",
}

export enum UserRoles {
    USER = "USER",
    ADMIN = "ADMIN"
}

export enum LoadingStatus {
    LOADED = "LOADED",
    LOADING = "LOADING",
    ERROR = "ERROR",
    NEVER = "NEVER",
    SUCCESS = "SUCCESSFAILUR"
}

export interface UserData {
    email: string;
    password: string;
}

export interface UserRegistration {
    email: string;
    username: string;
    password: string;
    password2: string;
}

export interface UserResetPasswordRequest {
    email?: string;
    password: string;
    password2: string;
}

export interface AuthErrors {
    emailError: string;
    usernameError: string;
    passwordError: string;
    passwordError2: string;
}