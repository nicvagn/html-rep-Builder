import { Game } from './game.js';
import { Comments, Lichess } from './interfaces.js';
export declare const parseComments: (strings: string[]) => Comments;
export declare const makeGame: (pgn: string, lichess?: Lichess) => Game;
