import { BaseUserMeta, User } from '@liveblocks/client';

export type LiveCursorProps = {
    others: readonly User<any, BaseUserMeta>[];
};

export enum CursorMode {
    Hidden,
    Chat,
    ReactionSelector,
    Reaction,
}

export type Reaction = {
    value: string;
    timestamp: number;
    point: { x: number; y: number };
};

export type CursorState =
    | {
          mode: CursorMode.Hidden;
      }
    | {
          mode: CursorMode.Chat;
          message: string;
          previousMessage: string | null;
      }
    | {
          mode: CursorMode.ReactionSelector;
      }
    | {
          mode: CursorMode.Reaction;
          reaction: string;
          isPressed: boolean;
      };

export type CursorChatProps = {
    cursor: { x: number; y: number };
    cursorState: CursorState;
    setCursorState: (cursorState: CursorState) => void;
    updateMyPresence: (
        presence: Partial<{
            cursor: { x: number; y: number };
            cursorColor: string;
            message: string;
        }>,
    ) => void;
};
