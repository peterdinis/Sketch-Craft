'use client';

import { FC, PointerEvent, useCallback, useEffect, useState } from 'react';
import { useBroadcastEvent, useEventListener, useMyPresence, useOthers } from '../../../../liveblocks.config';
import LiveCursors from './LiveCursors';
import CursorChat from './CursorChat';
import { CursorMode, CursorState, Reaction } from '@/types/cursorTypes';
import ReactionSelector from '../reactions/ReactionButton';
import FlyingReaction from '../reactions/FlyingReactionButton';
import useInterval from '@/hooks/useInterval';
import {format} from "date-fns";

const LiveCursor: FC = () => {
    const others = useOthers();
    const [{ cursor }, updateMyPresence] = useMyPresence() as any;
    const [reactions, setReactions] = useState<Reaction[]>([]);
    const [cursorState, setCursorState] = useState<CursorState>({
        mode: CursorMode.Hidden,
    });

    const brodcast = useBroadcastEvent();

    useInterval(() =>{
        setReactions((reactions) => reactions.filter((r) => {
            r.timestamp >Date.now() - 4000
        }))
    }, 1000);   

    useInterval(() => {
        if(cursorState.mode === CursorMode.Reaction && cursor && cursorState.isPressed) {
            setReactions((reactions) => reactions.concat([
                {
                    point: {x: cursor.x, y: cursor.y},
                    value: cursorState.reaction,
                    timestamp: format(new Date(), 'yyyy-MM-dd') as any,
                }
            ]))
            brodcast({
                x: cursor.x,
                y: cursor.y,
                value: cursorState.reaction
            });
        }
    }, 500);

    useEventListener((eventD) => {
        const event = eventD as any;
        setReactions((reactions) => reactions.concat([
            {
                point: {x: event.x!, y: event.y!},
                value: event.value,
                timestamp: format(new Date(), 'yyyy-MM-dd') as any,
            }
        ]))
    })

    const handlePointerMove = useCallback((event: PointerEvent) => {
        event.preventDefault();

        if (
            cursor === null ||
            cursorState.mode !== CursorMode.ReactionSelector
        ) {
            const x =
                event.clientX - event.currentTarget.getBoundingClientRect().x;
            const y =
                event.clientY - event.currentTarget.getBoundingClientRect().y;
            updateMyPresence({ cursor: { x, y } });
        }
    }, []);

    const handlePointerDown = useCallback(
        (event: React.PointerEvent) => {
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
            setCursorState((state: CursorState) =>
                cursorState.mode === CursorMode.Reaction
                    ? { ...state, isPressed: true }
                    : state,
            );
        },
        [cursorState.mode, setCursorState],
    );

    const handlePointerUp = useCallback(() => {
        setCursorState((state: CursorState) =>
            cursorState.mode === CursorMode.Reaction
                ? { ...state, isPressed: false }
                : state,
        );
    }, [cursorState.mode, setCursorState]);

    useEffect(() => {
        const onKeyUp = (e: KeyboardEvent) => {
            if (e.key === '/') {
                setCursorState({
                    mode: CursorMode.Chat,
                    previousMessage: null,
                    message: '',
                });
            } else if (e.key === 'Escape') {
                updateMyPresence({ message: '' });
                setCursorState({ mode: CursorMode.Hidden });
            } else if (e.key === 'e') {
                setCursorState({ mode: CursorMode.ReactionSelector });
            }
        };

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === '/') {
                e.preventDefault();
            }
        };

        window.addEventListener('keyup', onKeyUp);
        window.addEventListener('keydown', onKeyDown);

        return () => {
            window.removeEventListener('keyup', onKeyUp);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [updateMyPresence]);

    return (
        <div
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerMove}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            className='h-100[vh] w-full flex justify-center items-center text-center'
        >   

            <h1 className='text-2xl text-white'>Sketch Craft</h1>

            {reactions.map((r) => {
                <FlyingReaction 
                    key={r.timestamp.toString()}
                    x={r.point.x}
                    y={r.point.y}
                    timestamp={r.timestamp}
                    value={r.value}

                />
            })}
            {cursor && (
                <CursorChat
                    cursor={cursor}
                    cursorState={cursorState}
                    setCursorState={setCursorState}
                    updateMyPresence={updateMyPresence}
                />
            )}

            {cursorState.mode === CursorMode.ReactionSelector && (
                <ReactionSelector
                    setReaction={(reaction: any) => {
                        setReactions(reaction);
                    }}
                />
            )}

            <LiveCursors others={others} />
        </div>
    );
};

export default LiveCursor;
