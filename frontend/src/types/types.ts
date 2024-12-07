// Account type
export type Account = {
    id: number;
    name: string;
}


// Product type
export type Product = {
    id: number;
    name: string;
    price: number;
}

export type CartItem = {
    id: number;
    user_id: number;
    product_id: number;
    quantity: number;
}

export type ItemProps = {
    item: CartItem;
    accountId: number;
    productName: (item: CartItem) => string;
}

export type DropdownProps = {
    items: Product[];
    onSubmit: (item: Product, quantity: number) => void;
    placeholder?: string;
}

export type QuantityProps = {
    value: number;
    setValue: (v: number) => void;
    onRemove: () => void;
    onSubmit: (value: number) => void;
    debounceMs?: number;
}

export type CartProps = {
    account: Account;
    products: Product[]
}

