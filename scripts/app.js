"use strict";

let habbits = [];
const HABBIT_KEY = "HABBIT_KEY";
const page = {
  menu: document.querySelector(".menu_list"),
  header: {
    h1: document.querySelector(".h1"),
    progressPercent: document.querySelector(".progress_percent"),
    progressCover: document.querySelector(".progress__cover"),
  },
};

// utils

function loadData() {
  const habbitsString = localStorage.getItem(HABBIT_KEY);
  const habbitsArray = JSON.parse(habbitsString);
  if (Array.isArray(habbitsArray)) {
    habbits = habbitsArray;
  }
}

function saveData() {
  localStorage.setItem(HABBIT_KEY, JSON.stringify(habbits));
}

// render
function rerenderMenu(activeHabbit) {
  if (!activeHabbit) {
    return;
  }
  for (const habbit of habbits) {
    const existed = document.querySelector(`[habbit-id="${habbit.id}"]`);
    if (!existed) {
      const element = document.createElement("button");
      element.setAttribute("habbit-id", habbit.id);
      element.classList.add("menu_item");
      element.addEventListener("click", () => rerender(habbit.id));
      element.innerHTML = `<img src="./images/${habbit.icon}.svg" alt="${habbit.name}" />`;
      if (activeHabbit.id === habbit.id) {
        element.classList.add("menu_item__active");
      }
      page.menu.appendChild(element);
      continue;
    }

    if (activeHabbit.id === habbit.id) {
      existed.classList.add("menu_item__active");
    } else {
      existed.classList.remove("menu_item__active");
    }
  }
}

function rerenderHeader(activeHabbit) {
  page.header.h1.innerText = activeHabbit.name;
  const percent = (activeHabbit.days.length * 100) / activeHabbit.target;
  page.header.progressPercent.innerText = percent.toFixed(0) + '%';
  page.header.progressCover.setAttribute('style', `width: ${percent}%`)
}

function rerender(activeHabbitId) {
  const activeHabbit = habbits.find((habbit) => habbit.id === activeHabbitId);
  rerenderMenu(activeHabbit);
  rerenderHeader(activeHabbit);
}

// init

(() => {
  loadData();
  rerender(habbits[0].id);
})();
