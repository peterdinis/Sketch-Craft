'use client';

import { FC } from 'react';
import { useOthers } from '../../../liveblocks.config';

const CollaborativeApp: FC = () => {
    const others = useOthers();
    const userCount = others.length;

    return <div>There are {userCount} other user(s) online</div>;
};

export default CollaborativeApp;
