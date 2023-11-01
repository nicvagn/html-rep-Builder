"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var repertoire_controller_mjs_1 = require("./repertoire-controller.mjs");
//open a rep from local storage
/**
 * open a repertoire from local storage
 * @param {string} repName the name of the rep
 */
function openRepertoire(repName) {
    repertoire_controller_mjs_1.openRep = GetFromLocalStorage(repName);
}
// this function converts JSON into string to be entered into localStorage
/**
 * converts json into a json string ready to be stored locally in localStorage
 * @param {*} data the json to be converted to string
 * @returns JSON converted to string for local storage
 */
function createStringForLocalStorage(data) {
    if (typeof data != "string") {
        data = JSON.stringify(data);
    }
    return data;
}
// this function gets string from localStorage and converts it into JSON
/**
 * retrieve from local storage
 * @param {string} key the key of the item to be retrieve
 * @returns the retrieve item
 */
function GetFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}
// A global variable should be defined to hold the URL for the file to be downloaded
var textFileUrl = null;
/**
 * For generating a text file URL containing given text
 * @param {string} txt the text to use when creating the file URL
 * @returns created URL
 */
function generateTextFileUrl(txt) {
    var fileData = new Blob([txt], { type: 'text/plain' });
    // If a file has been previously generated, revoke the existing URL
    if (textFileUrl !== null) {
        window.URL.revokeObjectURL(textFile);
    }
    textFileUrl = window.URL.createObjectURL(fileData);
    // Returns a reference to the global variable holding the URL
    return textFileUrl;
}
;
/**
 * create the download link for rep
 * Generate the file download URL and assign it to the link
 */
function show_download() {
    var downloadLink = document.getElementById('downloadLink');
    downloadLink.document.getElementById(id).style.visibility = "visible";
    window.addEventListener("load", function () {
        downloadLink.href = generateTextFileUrl(repertoire_controller_mjs_1.openRep);
    });
}
