import { useQuery } from '@tanstack/react-query';
import React from 'react';
import ProductCard from './ProductCard';

const OurProducts = () => {
    const {data: phones = []} = useQuery({
        queryKey: ['phones'],
        queryFn: async () => {
            const res = await fetch(`https://sell-zone-server.vercel.app/all/phones`);
            const data = await res.json();
            return data;
        }
    })
    return (
        <div>
            <h1 className='text-2xl font-bold lg:text-left md:text-left text-center'>OUR PRODUCTS</h1>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-6'>
                {
                    phones.slice(0,3).map(phone => <ProductCard key={phone._id} phone={phone}/>)
                }
            </div>
        </div>
    );
};

export default OurProducts;