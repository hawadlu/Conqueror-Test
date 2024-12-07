import { useState } from 'react';
import {QuantityProps} from "../types";

/**
 * Allow users to adjust teh quantity of items in their cart
 * @param value current value
 * @param setValue update function
 * @param onRemove remove function
 * @param onChange submit function
 */
export const Quantity = ({
                             value,
                                setValue,
                             onRemove,
                             onSubmit,
                         }: QuantityProps) => {

    // I'm disabling here as a debounce mechanism.
    // A better solution would be to implement an api to call one cart item at a time, but for simplicity this project does not do that
    const [isDisabled, setIsDisabled] = useState(false);

    const updateQuantity = (newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className="flex flex-col">
            <div className="flex justify-between">
                <button
                    onClick={() => updateQuantity(Number(value) - 1)}
                    disabled={value <= 0}
                    className="w-8 h-8 rounded-md border border-gray-300 bg-white
                          text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                    aria-label="Decrease quantity"
                >
                    −
                </button>

                <input
                    type="number"
                    value={value}
                    onChange={(e) => {
                        const value = e.target.valueAsNumber;
                        if (!isNaN(value)) {
                            updateQuantity(value);
                        }
                    }}
                    className="w-16 h-8 text-center border border-gray-300 rounded-md
                          focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    onClick={() => updateQuantity(Number(value) + 1)}
                    className="w-8 h-8 rounded-md border border-gray-300 bg-white
                          text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                    aria-label="Increase quantity"
                >
                    +
                </button>
            </div>
            <div className="flex items-center space-x-2 pt-2">
                <button
                    disabled={isDisabled}
                    onClick={() => {
                        onSubmit(value)
                        setIsDisabled(true);
                        setTimeout(() => {
                            setIsDisabled(false);
                        }, 1000);
                    }
                }
                    className={`px-4 py-2 rounded ${
                        isDisabled
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                >
                    Update
                </button>
                <button
                    onClick={onRemove}
                    className={`px-4 py-2 rounded ${
                        isDisabled
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-red-500 hover:bg-red-600 text-white'
                    }`}>
                    Remove
                </button>
            </div>
        </div>
    );
};

