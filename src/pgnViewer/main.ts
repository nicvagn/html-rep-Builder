import PgnViewer from './pgnViewer.js';
import view from './view/main.js';
import { init, attributesModule, classModule } from 'snabbdom';
import { Opts } from './interfaces.js';
import config from './config.js';

export default function start(element: HTMLElement, cfg: Partial<Opts>): PgnViewer {
  const patch = init([classModule, attributesModule]);

  const opts = config(element, cfg);

  const ctrl = new PgnViewer(opts, redraw);

  const blueprint = view(ctrl);
  element.innerHTML = '';
  let vnode = patch(element, blueprint);
  ctrl.div = vnode.elm as HTMLElement;

  function redraw() {
    vnode = patch(vnode, view(ctrl));
  }

  return ctrl;
}
