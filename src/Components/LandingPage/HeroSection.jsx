import React from 'react';
import { Link } from 'react-router-dom';
import LazyImage from '../../utils/LazyImage';

const HeroSection = () => {
    
    return (
        <div  className='relative overflow-y-hidden max-md:h-[calc(100vh-72px)] max-md:justify-between flex flex-col gap-16 pt-16 w-full bg-contain md:bg-cover bg-center  '>
            
            <div className='flex flex-col gap-10 items-center justify-center w-full'>
                <div className='flex flex-col  md:w-3/4 lg:w-2/3 gap-8   relative'>
                    <h1 className='font-semibold text-2xl min-[400px]:text-3xl sm:text-4xl md:text-5xl text-center'>Widen your community with <p className='text-main-color'>Social Hub.</p></h1>
                    <p className='text-gray-400 w-3/4 text-sm text-center mx-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint iure reiciendis soluta nam adipisci dignissimos non illo expedita eius nobis vitae nisi, repellat officiis, pariatur vel voluptates, eum praesentium? Minima.</p>
                    <Link to={'/signup'} type="button" className="text-white bg-sec-color font-medium rounded-md  px-6 py-3 text-center text-sm hover:bg-main-color trans w-fit mx-auto">Get started</Link>
                </div>
            </div>

            <LazyImage  style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}} src="/public/testHero.png" alt="heroIMG" className=' rounded-t-md w-3/4 sm:w-[60%] border-2    mx-auto  border-b-0 shadow-[0px_7px_29px_0px_rgba(0, 0, 0, 1)]' loader={<div className='w-3/4 sm:w-[60%] h-60 md:h-96 bg-gray-100 mx-auto rounded-md  animate-pulse' />} />
            
            
        </div>
    )
}

export default HeroSection