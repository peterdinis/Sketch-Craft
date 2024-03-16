'use client';

import { FC, PointerEvent, useCallback, useState } from 'react';
import { useMyPresence, useOthers } from '../../../../liveblocks.config';
import LiveCursors from './LiveCursors';
import CursorChat from './CursorChat';
import { CursorMode, CursorState } from '@/types/cursorTypes';

const LiveCursor: FC = () => {
    const others = useOthers();
    const [{ cursor }, updateMyPresence] = useMyPresence() as any;

    const [cursorState, setCursorState] = useState<CursorState>({
        mode: CursorMode.Hidden,
    });
    const handlePointerMove = useCallback((event: PointerEvent) => {
        event.preventDefault();

        const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
        const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

        updateMyPresence({ cursor: { x, y } });
    }, []);

    const handlePointerDown = useCallback(
        (event: React.PointerEvent) => {
            // get the cursor position in the canvas
            const x =
                event.clientX - event.currentTarget.getBoundingClientRect().x;
            const y =
                event.clientY - event.currentTarget.getBoundingClientRect().y;

            updateMyPresence({
                cursor: {
                    x,
                    y,
                },
            });

            // if cursor is in reaction mode, set isPressed to true
            setCursorState((state: CursorState) =>
                cursorState.mode === CursorMode.Reaction
                    ? { ...state, isPressed: true }
                    : state,
            );
        },
        [cursorState.mode, setCursorState],
    );

    // hide the cursor when the mouse is up
    const handlePointerUp = useCallback(() => {
        setCursorState((state: CursorState) =>
            cursorState.mode === CursorMode.Reaction
                ? { ...state, isPressed: false }
                : state,
        );
    }, [cursorState.mode, setCursorState]);

    return (
        <div
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerMove}
            onPointerDown={handlePointerDown}
            className='border-5 border-green-600'
        >
            {cursor && (
                <CursorChat
                    cursor={cursor}
                    cursorState={cursorState}
                    setCursorState={setCursorState}
                    updateMyPresence={updateMyPresence}
                />
            )}

            <LiveCursors others={others} />
        </div>
    );
};

export default LiveCursor;
