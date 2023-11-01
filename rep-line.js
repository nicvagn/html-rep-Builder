/* a js chess repertoire including lines and example games made for shcc
 * Copyright (C) 2023 Nicolas Vaagen
 *
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of  MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * a chess repertoire line. It's primary use is in a rep builder GUI, so it needs to have a visual
 * component
 */
export class RepLine extends HTMLButtonElement {

  /**
   * construct a new repertoire line
   * @param {string} name the name of the line
   * @param {string} url a lichess embedded study url
   */
  constructor(name, url){
    this.url = url;
    this.exampleGames = [];
    super(name);
  }
}