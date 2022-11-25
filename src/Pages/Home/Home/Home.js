import React from 'react';
import Catagory from '../Catagory/Catagory';
import Hero from '../Hero/Hero';

const Home = () => {
    return (
        <div>
            <section className='mb-10'>
                <Hero/>
            </section>
            <section className='mb-10 pl-20 pr-20'>
                <Catagory/>
            </section>
        </div>
    );
};

export default Home;