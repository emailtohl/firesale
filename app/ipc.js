const { remote, ipcRenderer, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const mainProcess = remote.require('./main');
const currentWindow = remote.getCurrentWindow();

let _resolve = null;

const loadFile = exports.loadFile = (filePath) => {
    mainProcess.openFile(currentWindow, filePath);
    return new Promise((resolve, reject) => {
        _resolve = resolve;
    });
};

ipcRenderer.on('file-opened', (event, file, content) => {
    if (_resolve) {
        _resolve(content);
        _resolve = null;
    }
});