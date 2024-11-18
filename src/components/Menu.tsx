'use client';

import { usePathname } from 'next/navigation'
import { useIsManager } from '../app/hooks/useIsManager';
import { useIsAdmin } from '../app/hooks/useIsAdmin';
import Link from 'next/link';

export function Menu() {
    const {isAdmin} = useIsAdmin();
    const {isManager} = useIsManager();
    const currentPath = usePathname();
    return (
        <div className="p-6">
        <div className="relative z-10 flex w-screen justify-center">
             	<ul className="center m-0 flex list-none rounded-md bg-white p-1 shadow-[0_2px_10px] shadow-blackA4">
                 <li>
                <Link
						className="block select-none rounded px-3 py-2 text-[15px] font-medium leading-none text-violet11 no-underline outline-none hover:bg-violet3"
						href="/"
					>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            style={{ color: currentPath === '/' ? 'black' : 'gray' }}>
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    </Link>
                    </li>
                {isAdmin && (
                    <li>
                    <Link
						className="block select-none rounded px-3 py-2 text-[15px] font-medium leading-none text-violet11 no-underline outline-none hover:bg-violet3"
						href="/admin"
					>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            id="svg822"
                            className="h-6 w-6"
                            fill="#fff"
                            stroke="#fff"
                            version="1.1"
                            viewBox="0 0 30 30"
                        >
                            <g id="SVGRepo_iconCarrier">
                                <g id="layer1" transform="translate(0 -289.063)">
                                    <path
                                        id="path852"
                                        fill={currentPath === '/admin' ? 'black' : 'gray' }
                                        fillOpacity="1"
                                        stroke="none"
                                        strokeDasharray="none"
                                        strokeMiterlimit="4"
                                        strokeOpacity="1"
                                        strokeWidth="0.5"
                                        d="M11.916 6.281a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4 4 4 0 0 0-4-4m-3.453 8.834a9 9 0 0 0-5.48 8.024 11.9 11.9 0 0 0 8.99 4.091c1.966 0 3.81-.491 5.443-1.334a10.3 10.3 0 0 1-1.13-1.939c-.989-2.19-1.497-4.824-1.557-7.387l-.006-.252-2.721 4.256zm13.574.194c-1.745 0-4.86 1.943-4.86 1.943.11 4.632 1.95 9.757 4.86 9.72h.01c.818-.01 1.542-.436 2.133-1.056.59-.62 1.076-1.444 1.474-2.37.797-1.85 1.242-4.108 1.242-5.97v-.267l-.224-.143s-.72-.458-1.643-.916c-.922-.458-2.02-.941-2.988-.941zm0 .97h.004c.6 0 1.685.41 2.557.842.728.362 1.123.614 1.298.723-.039 1.662-.438 3.695-1.136 5.318-.367.852-.81 1.587-1.283 2.084-.474.496-.95.747-1.44.754z"
                                        opacity="0.91"
                                        transform="translate(0 287)"
                                    ></path>
                                </g>
                            </g>
                        </svg>
                    </Link>
                    </li>
                )}
                {isManager && (
                    <li>
                    <Link
						className="block select-none rounded px-3 py-2 text-[15px] font-medium leading-none text-violet11 no-underline outline-none hover:bg-violet3"
						href="/manager"
					>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlSpace="preserve"
                            id="Capa_1"
                            className="h-5 w-5"
                            fill={currentPath === '/manager' ? 'black' : 'gray' }
                            version="1.1"
                            viewBox="0 0 218.582 218.582"
                        >
                            <path
                                id="SVGRepo_iconCarrier"
                                d="M160.798 64.543a13.2 13.2 0 0 0-4.046-4.005 67 67 0 0 0-.712-9.385c.373-4.515 1.676-29.376-13.535-40.585C133.123 3.654 122.676 0 112.294 0c-8.438 0-16.474 2.398-22.629 6.752-5.543 3.922-8.596 8.188-10.212 11.191-4.78.169-14.683 2.118-19.063 14.745-4.144 11.944-.798 19.323 1.663 22.743a66 66 0 0 0-.223 5.106 13.2 13.2 0 0 0-4.046 4.005c-2.74 4.229-3.206 9.9-1.386 16.859 3.403 13.012 11.344 15.876 15.581 16.451 2.61 5.218 8.346 15.882 14.086 21.24 2.293 2.14 5.274 3.946 8.86 5.37 4.577 1.816 9.411 2.737 14.366 2.737s9.789-.921 14.366-2.737c3.586-1.424 6.567-3.23 8.86-5.37 5.74-5.358 11.476-16.022 14.086-21.24 4.236-.575 12.177-3.44 15.581-16.452 1.82-6.957 1.354-12.629-1.386-16.857m-8.289 14.328c-2.074 7.932-5.781 9.116-7.807 9.116-.144 0-.252-.008-.316-.013-2.314-.585-4.454.631-5.466 2.808-1.98 4.256-8.218 16.326-13.226 21.001-1.377 1.285-3.304 2.425-5.726 3.386-6.796 2.697-14.559 2.697-21.354 0-2.422-.961-4.349-2.101-5.726-3.386-5.008-4.675-11.246-16.745-13.226-21.001-.842-1.81-2.461-2.953-4.314-2.953a4.7 4.7 0 0 0-1.153.146 4 4 0 0 1-.315.013c-2.025 0-5.732-1.185-7.807-9.115-1.021-3.903-1.012-7.016.024-8.764.603-1.016 1.459-1.358 1.739-1.446 2.683-.291 4.299-2.64 4.075-5.347-.005-.066-.18-2.39.042-5.927 3.441-1.479 8.939-4.396 13.574-9.402 2.359-2.549 4.085-5.672 5.314-8.537 3.351 2.736 8.095 5.951 14.372 8.729 10.751 4.758 32.237 7.021 41.307 7.794.375 4.317.156 7.263.15 7.333-.236 2.715 1.383 5.066 4.075 5.357.28.088 1.136.431 1.739 1.446 1.037 1.747 1.046 4.86.025 8.762m32.064 66.779-43.715-17.485a5 5 0 0 0-6.558 2.942l-10.989 30.382-2.176-6.256 3.462-8.463a5.003 5.003 0 0 0-4.628-6.894H98.614a5 5 0 0 0-4.628 6.894l3.462 8.463-2.176 6.256-10.989-30.382a4.997 4.997 0 0 0-6.558-2.942L34.009 145.65c-13.424 5.369-22.098 18.182-22.098 32.641v35.291a5 5 0 0 0 5 5h184.76a5 5 0 0 0 5-5v-35.291c0-14.459-8.674-27.271-22.098-32.641m-1.519 47.068a5 5 0 0 1-5 5h-33.57a5 5 0 0 1-5-5v-15.59a5 5 0 0 1 5-5h33.57a5 5 0 0 1 5 5z"
                            ></path>
                        </svg>
                    </Link>
                    </li>)}
                </ul>
            </div>
        </div >
    )
}