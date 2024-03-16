"use client"

import { FC, PointerEvent, useCallback, useState } from 'react';
import { useMyPresence, useOthers } from '../../../../liveblocks.config';
import LiveCursors from './LiveCursors';
import CursorChat from './CursorChat';
import { CursorMode, CursorState } from '@/types/cursorTypes';

const LiveCursor: FC = () => {
    const others = useOthers();
    const [{ cursor }, updateMyPresence] = useMyPresence() as any;
    
    const [cursorState, setCursorState] = useState({
        mode: CursorMode.Hidden,

    })
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

    return (
        <div
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            onPointerDown={handlePointerDown}
            className='border-5 border-green-600'
        >

            {cursor && (
                <CursorChat 
                    cursor={cursor} cursorState={{
                        mode: CursorMode.Hidden
                    }} setCursorState={function (cursorState: CursorState): void {
                        throw new Error('Function not implemented.');
                    } } updateMyPresence={function (presence: Partial<{ cursor: { x: number; y: number; }; cursorColor: string; message: string; }>): void {
                        throw new Error('Function not implemented.');
                    } }                />
            )}

            <LiveCursors others={others} />
        </div>
    )
};

export default LiveCursor;
