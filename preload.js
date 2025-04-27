document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("button").addEventListener("click", () => {
    console.log("Test");
  });
});

// window.test = "testing";

const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("test", "Hello World");
