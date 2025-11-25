charging = document.querySelector('img[src*="/images/stories/intranet/student/byod/Charge-Station-Instructions.png"]');

if (charging) {
    charging.src = 'chrome-extension://hcfafjbkapoalclkgllghflfinhmkoia/assets/Charge-Station-Instructions-noQR.png';
}