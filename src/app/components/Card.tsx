import React from "react";

interface CardProps {
    children: React.ReactNode;
    title: string;
    imgSrc?: string;
}

export function Card({ children, title, imgSrc }: CardProps) {
    return (<div className="card bg-base-100 w-96 shadow-xl">
        {imgSrc && <figure>
            <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt={title} />
        </figure>
        }
        <div className="card-body">
            <h2 className="card-title">{title}</h2>
            {children}
        </div>
    </div>)
}