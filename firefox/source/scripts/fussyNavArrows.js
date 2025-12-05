const tinyAnnoyingArrows = document.querySelectorAll('.breadcrumbs img')

Array.from(tinyAnnoyingArrows).forEach((e) => {
    e.src = browser.runtime.getURL(`assets/arrow-white.png`);
});