import Link from 'next/link';
import React from 'react';

const NotFoundPage = () => {
    return (
        <>
            <div className='w-[100%]'>
                <div className='flex h-[100vh] pl-10  w-[90%] '>
                    <div className='flex w-1/2 justify-center items-center ml-20'>
                        <img className='h-[80vh] mt-10' src="/notfound.jpg" alt="" />
                    </div>
                    <div className="flex flex-col w-1/2 items-center justify-center min-h-screen  text-gray-800">
                        <h1 className=" text-[12em] text-center font-bold uppercase text-gray-900 transform text-shadow">
                            404
                        </h1>
                        <h2 className="text-3xl font-semibold mb-2">Oops! Page Not Found</h2>
                        <div className="mb-1">
                            <img
                                src="https://i.pinimg.com/564x/1a/68/14/1a68141a996be5eab90985bb4a20fe17.jpg"
                                alt="Robot Not Found"
                                className="w-80 h-32 object-cover"
                            />
                        </div>
                        <p className="text-lg text-center w-[450px] mb-8">
                            Sorry, we couldn't find the page you're looking for.
                            But don't worry, you can explore more clay products on our homepage.
                        </p>

                        <Link
                            href="/"
                            className="px-6 py-3 bg-red-900 text-white text-lg font-medium rounded-full shadow-lg hover:bg-red-700 transition duration-300"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotFoundPage;