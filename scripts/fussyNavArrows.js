let tinyAnnoyingArrows = document.querySelectorAll('.breadcrumbs img')

Array.from(tinyAnnoyingArrows).forEach((e) => {
    e.src = 'chrome-extension://hcfafjbkapoalclkgllghflfinhmkoia/assets/arrow-white.png';
});