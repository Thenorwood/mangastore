export type CartItem = {
    id: number;
    selectedVolumes: number[];
};

export type Cart = {
    items: CartItem[];
};