import { useQuery } from '@tanstack/react-query';
import React from 'react';
import CatagoryCard from './CatagoryCard';

const Catagory = () => {

    const {data: catagories = []} = useQuery({
        queryKey: ['catagories'],
        queryFn: async () => {
            const res = await fetch(`https://sell-zone-server.vercel.app/catagory`);
            const data = await res.json();
            return data;
        }
    })
    return (
        <section>
            <h1 className='text-2xl font-bold lg:text-left md:text-left text-center'>CATAGORIES</h1>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-6 mt-8'>
                {
                    catagories.map(catagory => <CatagoryCard key={catagory._id} catagory={catagory}/>)
                }
            </div>
        </section>
    );
};

export default Catagory;