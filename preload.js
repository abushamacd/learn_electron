// document.addEventListener("DOMContentLoaded", () => {
//   document.querySelector("button").addEventListener("click", () => {
//     console.log("Test");
//   });
// });

// window.test = "testing";

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("test", {
  send: async (payload) => {
    const res = await ipcRenderer.invoke("rptomp", payload);

    console.log(res);
  },
});

// data get from main
ipcRenderer.on("send", (event, data) => {
  console.log(data);
});

// send to main
ipcRenderer.invoke("rptomp", "Renderer to main");
