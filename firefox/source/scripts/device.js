const charging = document.querySelector('img[src*="/images/stories/intranet/student/byod/Charge-Station-Instructions.png"]');

if (charging) {
    charging.src = browser.runtime.getURL(`assets/Charge-Station-Instructions-noQR.png`);
}