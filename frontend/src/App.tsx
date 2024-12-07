import {QueryClient, QueryClientProvider, useQuery} from '@tanstack/react-query';
import './App.css';
import {Account, Product} from './types';
import { UserCart } from './components';

function Body() {
    const {
        data: accounts,
        isLoading: accountsLoading
    } = useQuery({
        queryKey: ['accounts'],
        queryFn: async () => {
            const response = await fetch('http://localhost:8000/accounts');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            return data as Account[];
        },
    });

    const {
        data: products,
        isLoading: productsLoading
    } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await fetch('http://localhost:8000/products');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            return data as Product[];
        },
    });

    if (accountsLoading || productsLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen p-8">
            <div className="flex-grow overflow-auto">
                {accounts && products && accounts.map((account) => (
                    <UserCart
                        key={account.id}
                        account={account}
                        products={products}
                    />
                ))}
            </div>
        </div>
    );
}

function App() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 10000,
                retry: false
            }
        }
    });

    return (
        <QueryClientProvider client={queryClient}>
            <Body />
        </QueryClientProvider>
    );
}

export default App;