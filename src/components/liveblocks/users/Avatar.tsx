import { FC } from 'react';
import styles from './Avatar.module.css';

interface IAvatarProps {
    src: string;
    name: string;
}

const Avatar: FC<IAvatarProps> = ({ src, name }: IAvatarProps) => {
    return (
        <div data-tooltip={name} className={styles.avatar}>
            <img
                src={src}
                height={48}
                width={48}
                className={styles.avatar_picture}
            />
        </div>
    );
};

export default Avatar;