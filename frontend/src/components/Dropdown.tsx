import { useState } from 'react';
import {Product} from "../types";
import {DropdownProps} from "../types/types.ts";

/**
 * Control the add product dropdown
 * @param items list of items to show
 * @param onSubmit function for submitting
 * @param placeholder initial value
 * @constructor
 */
export const Dropdown = ({
                      items,
                      onSubmit,
                      placeholder = "Select a product"
                  }: DropdownProps) => {
    const [selectedItem, setSelectedItem] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);

    const handleSubmit = () => {
        if (selectedItem) {
            onSubmit(selectedItem, quantity);
            setSelectedItem(null);
            setQuantity(1);
        }
    };

    return (
        <div className="flex gap-2 items-center">
            <select
                value={selectedItem ? items.indexOf(selectedItem) : ""}
                onChange={(e) => {
                    const index = parseInt(e.target.value);
                    setSelectedItem(items[index]);
                }}
                className="border border-gray-300 rounded-md p-2"
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {items.map((item, index) => (
                    <option key={item.id} value={index}>
                        {item.name}
                    </option>
                ))}
            </select>

            <input
                type="number"
                value={quantity}
                min={1}
                max={10000}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 border border-gray-300 rounded-md p-2"
            />

            <button
                onClick={handleSubmit}
                disabled={!selectedItem}
                className="flex items-center justify-center w-10 h-10 bg-blue-500
                          text-white rounded-md hover:bg-blue-600 disabled:opacity-50
                          disabled:hover:bg-blue-500"
                aria-label="Add to cart"
            >
                +
            </button>
        </div>
    );
};