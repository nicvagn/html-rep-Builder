import { Opts } from './interfaces.js';
export default function (element: HTMLElement, cfg: Partial<Opts>): {
    pgn: string;
    fen?: string | undefined;
    chessground: import("chessground/config.js").Config;
    orientation?: "white" | "black" | undefined;
    showPlayers: import("./interfaces.js").ShowPlayers;
    showMoves: import("./interfaces.js").ShowMoves;
    showClocks: boolean;
    showControls: boolean;
    initialPly: number | "last";
    scrollToMove: boolean;
    drawArrows: boolean;
    menu: {
        getPgn: {
            enabled?: boolean | undefined;
            fileName?: string | undefined;
        };
    };
    lichess: import("./interfaces.js").Lichess;
    classes?: string | undefined;
    translate?: import("./interfaces.js").Translate | undefined;
};
