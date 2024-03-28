import { FC } from 'react';
import LiveCursor from '../liveblocks/cursors/LiveCursor';
import Navigation from '../shared/Navigation';

const HeroWrapper: FC = () => {
    return (
        <div>
        <Navigation />
        <LiveCursor />
        </div>
    )
};

export default HeroWrapper;
