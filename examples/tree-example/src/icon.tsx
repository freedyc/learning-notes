import { Component, FC } from 'react';

export const Circle: FC<{ color?: string}> = ({ color }) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="8" fill={ color || "#52C41A" }/>
    </svg>
)

export const Square: FC<{ color?: string}> = ({ color }) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="18" height="18" fill={ color || "#00B2FE" }/>
    </svg>
)

export const Triangle: FC<{ color?: string}> = ({ color }) => (
    <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 0L18 13H0L9 0Z" fill={ color || "#FDAC41"}/>
    </svg>
)

export const DiamondShape: FC<{ color?: string}> = ({ color }) => (
    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 0L18 8L9 16L0 8L9 0Z" fill={ color || '#FF0000'}/>
    </svg>
)

export type IconType = {
    circle: FC<{ color?: string}>,
    square: FC<{ color?: string}>,
    triangle: FC<{ color?: string}>,
    diamondShape: FC<{ color?: string}>,
} 

const icon: IconType = {
    circle: Circle,
    square: Square,
    triangle: Triangle,
    diamondShape: DiamondShape,
}


export default icon;
