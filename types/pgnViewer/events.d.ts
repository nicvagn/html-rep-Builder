import PgnViewer from './pgnViewer.js';
export declare function stepwiseScroll(inner: (e: WheelEvent, scroll: boolean) => void): (e: WheelEvent) => void;
export declare function eventRepeater(action: () => void, e: Event): void;
export declare const onKeyDown: (ctrl: PgnViewer) => (e: KeyboardEvent) => void;
