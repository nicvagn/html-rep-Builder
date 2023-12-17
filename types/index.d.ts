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
