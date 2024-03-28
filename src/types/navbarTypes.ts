import { MutableRefObject, ChangeEvent } from 'react';

export type ActiveElement = {
    name: string;
    value: string;
    icon: string;
} | null;

export type NavbarProps = {
    activeElement?: ActiveElement;
    imageInputRef?: MutableRefObject<HTMLInputElement | null>;
    handleImageUpload?: (e: ChangeEvent<HTMLInputElement>) => void;
    handleActiveElement?: (element: ActiveElement) => void;
};
