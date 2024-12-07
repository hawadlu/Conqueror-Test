import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import {updateCartItem} from "../api";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCar, faDog,
    faFireBurner,
    faHeadphones,
    faHome,
    faLaptop,
    faSnowflake,
    faStopwatch20
} from "@fortawesome/free-solid-svg-icons";
import { Quantity } from ".";
import {ItemProps} from "../types";
import {useState} from "react";

/**
 * Display a single item
 * @param item item to display
 * @param accountId account that the item belons to
 * @param productName name of the product
 */
export const Item = ({
                         item,
                         accountId,
                         productName
                     }: ItemProps) => {
    const queryClient = useQueryClient();

    const updateItemMutation = useMutation({
        mutationFn: async (quantity: number) => {
            await updateCartItem({cartId: item.id, quantity: quantity});
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['cart', accountId]);
        }
    });

    const deleteItemMutation = useMutation({
        mutationFn: async () => {
            return axios.delete(`http://localhost:8000/cart/items/?id=${item.id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['cart', accountId]);
        }
    });

    const [quantity, setQuantity] = useState(item.quantity);


    // In normal cases an enum would probably be better here
    function getIcon() {
        switch(productName(item)) {
            case "Gaming Laptop": return faLaptop;
            case "Wireless Headphones": return faHeadphones;
            case "Smart Watch": return faStopwatch20;
            case "Smart Fridge": return faSnowflake;
            case "Smart Home": return faHome;
            case "Smart Oven": return faFireBurner;
            case "Smart Car": return faCar;
            default: return faDog;
        }
    }

    return (
        <div className="border-gray-300 border-2 rounded-lg">
            <div className="flex-col flex gap-2 p-4 items-center">
                <p>{productName(item)}</p>
                <FontAwesomeIcon icon={getIcon()} size="6x"/>
                <Quantity
                    value={quantity}
                    setValue={setQuantity}
                    onRemove={() => deleteItemMutation.mutate()}
                    onSubmit={(quantity) => {
                        if (quantity !== item.quantity) {
                            updateItemMutation.mutate(quantity);
                        }
                    }}
                />
            </div>
        </div>
    );
};