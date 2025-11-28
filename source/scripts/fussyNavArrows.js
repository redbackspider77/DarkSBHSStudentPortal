const tinyAnnoyingArrows = document.querySelectorAll('.breadcrumbs img')

Array.from(tinyAnnoyingArrows).forEach((e) => {
    e.src = chrome.runtime.getURL(`assets/arrow-white.png`);
});