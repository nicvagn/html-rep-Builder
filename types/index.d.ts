import { Controller } from "./repertoire-controller.mjs";
/**
 * constants used for setting and getting from local
 */
export declare const GAMEs = "Example-Games";
export declare const LINEs = "Repertoire-Lines";
export declare const REPs = "Repertoires";
export declare const MAIN = "Repertoire-Builder";
import "../css/styles.css";
export declare var controller: Controller;
/**
 * transform base lichessURL's into something we can embed
 * @param URLInput the raw input url
 * @returns embeddable URL string
 */
export declare function getEmbeddingStr(URLInput: string): string;
/**
 * show the Repertoire Builder splash screen.
 */
export declare function showSplashScreen(): void;
/**
 * exit delete mode
 */
export declare function exitDeleteMode(): void;
/**
 * enter a mode where the next deletable thing chosen is deleted
 */
export declare function enterDeleteMode(): void;
/**
 * check the delete mode bool
 * @returns deleteMode
 */
export declare function checkDeleteMode(): boolean;
