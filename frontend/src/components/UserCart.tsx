import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {CartItem, CartProps, Product} from "../types";
import {Item} from "./Item.tsx";
import {Dropdown} from "./Dropdown.tsx";


/**
 * Display all items in cart
 * @param account account for cart
 * @param products all products
 * @constructor
 */
export const UserCart = ({ account, products }: CartProps) => {
    const queryClient = useQueryClient();

    const { data: cart, isLoading } = useQuery({
        queryKey: ['cart', account.id],
        queryFn: async () => {
            const response = await fetch(`http://localhost:8000/cart?user_id=${account.id}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            return data as CartItem[];
        },
    });

    const createProductMutation = useMutation({
        mutationFn: async ({ product, quantity }: { product: Product; quantity: number }) => {
            return axios.post('http://localhost:8000/cart/items', {
                user_id: account.id,
                product_id: product.id,
                quantity: quantity
            });
        },
        onSuccess: () => {
            // Invalidate and refetch specific query
            queryClient.invalidateQueries({ queryKey: ['cart', account.id] });
        }
    });

    const handleCreateProduct = (product: Product, quantity: number) => {
        createProductMutation.mutate({ product, quantity });
    };

    function getProductName(item: CartItem) {
        const product = products.find(product => product.id === item.product_id);
        return product ? product.name : 'Unknown Product';
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-4xl pb-4">Account Holder: {account.name}</h2>
            <div className="flex-col flex overflow-auto">
                {cart && cart.length > 0 ? (
                    <div className='flex flex-row gap-8 items-center'>
                        {cart.map((item: CartItem) => (
                            <Item
                                key={`${item.id}-${item.quantity}`}
                                item={item}
                                accountId={account.id}
                                productName={getProductName}
                            />
                        ))}
                    </div>
                ) : (
                    <p>No items</p>
                )}
            </div>
            <div className="pt-4">
                <h3 className="text-xl">Add product</h3>
                <Dropdown items={products} onSubmit={handleCreateProduct}/>
            </div>
        </div>
    );
};