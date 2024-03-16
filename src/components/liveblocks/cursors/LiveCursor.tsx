import { FC, PointerEvent, useCallback } from 'react';
import { useMyPresence, useOthers } from '../../../../liveblocks.config';
import LiveCursors from './LiveCursors';

const LiveCursor: FC = () => {
    const others = useOthers();
    const [{ cursor }, updateMyPresence] = useMyPresence() as any;

    const handlePointerMove = useCallback((event: PointerEvent) => {
        event.preventDefault();

        const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
        const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

        updateMyPresence({ cursor: { x, y } });
    }, []);

    const handlePointerLeave = useCallback((event: PointerEvent) => {
        event.preventDefault();
        updateMyPresence({ cursor: null, message: null });
    }, []);

    const handlePointerDown = useCallback((event: PointerEvent) => {
        event.preventDefault();
        const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
        const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

        updateMyPresence({ cursor: { x, y } });
    }, []);

    return <></>;
};

export default LiveCursor;
