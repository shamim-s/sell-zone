import React from 'react';
import { Link } from 'react-router-dom';
import Catagory from '../Catagory/Catagory';
import Hero from '../Hero/Hero';
import OurProducts from '../OurProducts/OurProducts';
import Testimonali from '../Testimonali/Testimonali';

const Home = () => {
    return (
        <div>
            <section className='mb-16'>
                <Hero/>
            </section>
            <section className='mb-16 lg:pl-20 lg:pr-20'>
                <Catagory/>
            </section>
            <section className='mb-16 lg:pl-20 lg:pr-20'>
                <OurProducts/>
            </section>
            <p className='text-center'>
                <Link to={'/all_phones'} className='btn btn-outline'>SEE MORE</Link>
            </p>
            <section className='mt-16 mb-10'>
                <Testimonali/>
            </section>
        </div>
    );
};

export default Home;