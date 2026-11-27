"use strict";

const root = document.documentElement;
const themeButton = document.querySelector("#theme-toggle");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
const preferenceKey = "smartsupport.handbook.preferences";

function readPreferences() {
  try {
    return JSON.parse(window.localStorage.getItem(preferenceKey)) || {};
  } catch {
    return {};
  }
}

const preferences = readPreferences();

function savePreferences() {
  try {
    window.localStorage.setItem(preferenceKey, JSON.stringify(preferences));
  } catch {
    // Certains navigateurs bloquent le stockage pour les fichiers locaux.
  }
}

function updateTheme() {
  const dark = preferences.theme
    ? preferences.theme === "dark"
    : systemTheme.matches;
  root.dataset.theme = dark ? "dark" : "light";
  themeButton.setAttribute("aria-pressed", String(dark));
}

themeButton.addEventListener("click", () => {
  preferences.theme = root.dataset.theme === "dark" ? "light" : "dark";
  updateTheme();
  savePreferences();
});
systemTheme.addEventListener("change", updateTheme);
updateTheme();

const menu = document.querySelector("#menu-toggle");
const navLinks = Array.from(document.querySelectorAll("#toc a"));

menu.addEventListener("click", () => {
  menu.setAttribute("aria-expanded", String(menu.getAttribute("aria-expanded") === "false"));
});

function setCurrentSection() {
  const target = document.getElementById(window.location.hash.slice(1));
  const sectionId = target?.closest("main > section")?.id || "apercu";
  navLinks.forEach(link => {
    if (link.hash === "#" + sectionId) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

navLinks.forEach(link => {
  link.addEventListener("click", () => menu.setAttribute("aria-expanded", "false"));
});
window.addEventListener("hashchange", setCurrentSection);
setCurrentSection();

const filters = {
  sprint: document.querySelector("#filter-sprint"),
  priority: document.querySelector("#filter-priority"),
  status: document.querySelector("#filter-status"),
};
const filterEntries = Object.entries(filters);
const taskRows = Array.from(document.querySelectorAll("#backlog tbody tr"));
const backlogCount = document.querySelector("#backlog-count");
const noTasks = document.querySelector("#no-tasks");

function updateBacklog() {
  let visible = 0;
  taskRows.forEach(row => {
    row.hidden = filterEntries.some(([key, control]) => control.value && row.dataset[key] !== control.value);
    visible += Number(!row.hidden);
  });
  backlogCount.textContent = visible === 1 ? "1 tâche affichée." : visible + " tâches affichées.";
  noTasks.hidden = visible > 0;
  preferences.filters = Object.fromEntries(filterEntries.map(([key, control]) => [key, control.value]));
  savePreferences();
}

function resetFilters(sprint = "") {
  filters.sprint.value = sprint;
  filters.priority.value = "";
  filters.status.value = "";
  updateBacklog();
}

filterEntries.forEach(([key, control]) => {
  const remembered = preferences.filters?.[key];
  if (Array.from(control.options).some(option => option.value === remembered)) {
    control.value = remembered;
  }
  control.addEventListener("change", updateBacklog);
});
document.querySelector("#reset-filters").addEventListener("click", () => resetFilters());
document.querySelectorAll("[data-filter-sprint]").forEach(link => {
  link.addEventListener("click", () => resetFilters(link.dataset.filterSprint));
});
updateBacklog();

taskRows.forEach(row => {
  if (!row.dataset.issueUrl?.startsWith("https://")) return;
  const link = document.createElement("a");
  link.href = row.dataset.issueUrl;
  link.textContent = "Ouvrir l’issue";
  row.querySelector(".issue-link").replaceChildren(link);
});

const searchInput = document.querySelector("#search");
const searchPanel = document.querySelector("#search-panel");
const searchCount = document.querySelector("#search-count");
const searchResults = document.querySelector("#search-results");

function normalize(text) {
  return text.normalize("NFD").replace(/\p{M}/gu, "").toLocaleLowerCase("fr");
}

const sections = Array.from(document.querySelectorAll("main > section"));
const searchIndex = sections.flatMap(section => {
  const heading = document.getElementById(section.getAttribute("aria-labelledby")).textContent;
  const blocks = Array.from(section.querySelectorAll("[data-search-block], p, article h2, h3, li, tbody tr"));
  const searchable = blocks.filter(block => {
    if (block.matches("[data-search-block]")) return true;
    return !block.closest("[data-search-block]") && !block.querySelector("[data-search-block]");
  });
  const entries = searchable.map((block, index) => {
    const text = block.matches("tr")
      ? Array.from(block.cells, cell => cell.textContent.trim()).join(" · ")
      : block.textContent.replace(/\s+/g, " ").trim();
    const summary = block.querySelector("summary");
    block.id ||= block.querySelector(".copy-id")?.dataset.copy || section.id + "-bloc-" + (index + 1);
    return {
      target: block,
      title: summary ? heading + " · " + summary.textContent.trim() : heading,
      text,
      normalized: normalize(text),
    };
  });
  return [{ target: section, title: heading, text: "", normalized: normalize(heading) }, ...entries];
});

function findResults() {
  const query = normalize(searchInput.value.trim());
  const terms = query.split(/\s+/);
  searchPanel.hidden = !query;
  searchResults.replaceChildren();
  if (!query) return;

  const matches = searchIndex.filter(entry => terms.every(term => entry.normalized.includes(term)));
  searchCount.textContent = matches.length === 0 ? "Aucun résultat."
    : matches.length === 1 ? "1 résultat." : matches.length + " résultats.";

  matches.forEach(({ target, title, text, normalized }) => {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#" + target.id;
    link.textContent = title;
    link.addEventListener("click", () => {
      if (target instanceof HTMLDetailsElement) target.open = true;
      if (target.matches("#backlog tbody tr") && target.hidden) resetFilters();
    });
    item.append(link);
    if (text) {
      const start = Math.max(0, normalized.indexOf(terms[0]) - 65);
      const end = Math.min(start + 195, text.length);
      const snippet = document.createElement("span");
      snippet.className = "search-snippet";
      snippet.textContent = (start ? "…" : "") + text.slice(start, end) + (end < text.length ? "…" : "");
      item.append(snippet);
    }
    searchResults.append(item);
  });
}

searchInput.addEventListener("input", findResults);
document.querySelector(".search-form").addEventListener("submit", event => {
  event.preventDefault();
  findResults();
  if (!searchPanel.hidden) searchPanel.scrollIntoView({ block: "start" });
});
document.querySelector("#search-close").addEventListener("click", () => {
  searchInput.value = "";
  findResults();
  searchInput.focus();
});

const feedback = document.querySelector("#feedback");
let feedbackTimer;

function copyWithSelection(text) {
  const field = document.createElement("textarea");
  field.value = text;
  field.className = "sr-only";
  field.readOnly = true;
  document.body.append(field);
  field.select();
  let copied;
  try {
    copied = document.execCommand("copy");
  } finally {
    field.remove();
  }
  if (!copied) throw new Error("Copie non disponible");
}

document.querySelectorAll("[data-copy]").forEach(button => {
  button.addEventListener("click", async () => {
    const text = button.dataset.copy;
    try {
      try {
        if (!navigator.clipboard?.writeText) throw new Error("Presse-papiers non disponible");
        await navigator.clipboard.writeText(text);
      } catch {
        copyWithSelection(text);
        button.focus();
      }
      feedback.textContent = "Copié · " + text;
    } catch {
      button.focus();
      feedback.textContent = "Copie indisponible · " + text;
    }
    window.clearTimeout(feedbackTimer);
    feedbackTimer = window.setTimeout(() => { feedback.textContent = ""; }, 3500);
  });
});

let printDetails = [];
window.addEventListener("beforeprint", () => {
  printDetails = Array.from(document.querySelectorAll("details:not([open])"));
  printDetails.forEach(details => { details.open = true; });
});
window.addEventListener("afterprint", () => {
  printDetails.forEach(details => { details.open = false; });
  printDetails = [];
});
document.querySelector("#print").addEventListener("click", () => window.print());

root.classList.add("has-js");
