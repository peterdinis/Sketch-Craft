import { FC, memo } from 'react';
import { NavbarProps } from '@/types/navbarTypes';
import ActiveUsers from '../liveblocks/users/ActiveUsers';

const Navigation: FC<NavbarProps> = ({
    activeElement,
    imageInputRef,
    handleImageUpload,
    handleActiveElement,
}) => {
    return (
        <>
            <nav className='flex select-none items-center justify-between gap-4 bg-primary-black px-5 text-white'>
                LOGO LATER
                <ActiveUsers />
            </nav>
        </>
    );
};

export default memo(
    Navigation,
    (prevProps, nextProps) =>
        prevProps.activeElement === nextProps.activeElement,
);
