import React from "react";
import Image from 'next/image';

interface CardProps {
    children: React.ReactNode;
    title: string;
    imgSrc?: string;
}

export function Card({ children, title, imgSrc }: CardProps) {
    return (<div className="card bg-base-100 w-96 shadow-xl">
        {imgSrc && <figure>
            <Image
                src={imgSrc}
                alt={title} />
        </figure>
        }
        <div className="card-body">
            <h2 className="card-title">{title}</h2>
            {children}
        </div>
    </div>)
}