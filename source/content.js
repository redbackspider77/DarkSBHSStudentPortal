const possibleSubDirs = ['absences', 'award-scheme', 'diary', 'feedback', 'help', 'home', 'search', 'timetable'];

function injectCSS(file) {
    file += '.css';

    const href = chrome.runtime.getURL('styles/' + file);

    if (document.head.querySelector(`link.darkSBHS[href="${href}"]`)) {
        return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = chrome.runtime.getURL('styles/' + file);
    link.className = 'darkSBHS';
    document.head.appendChild(link);
}

function updateTheme(enabled) {
    if (enabled) {
        if (location.href.startsWith('https://login.sbhs.net.au/')) {
            injectCSS('login');
            return;
        }

        const path = location.pathname;

        injectCSS('main');

        const subdirectory = path.split('/')[1];

        if (possibleSubDirs.includes(subdirectory)) {
            injectCSS(subdirectory);
        } else if (subdirectory === '') {
            injectCSS('home');
        }
    } else {
        const existing = document.head.querySelectorAll('link.darkSBHS');

        Array.from(existing).forEach(e => {
            e.remove();
        });
    }
}

function runJS(name) {
    import(chrome.runtime.getURL(`scripts/${name}.js`))
        .catch(err => console.error(err));
}

function injectJS() {
    document.addEventListener("DOMContentLoaded", () => {
        runJS('fussyNavArrows');

        const subdir = location.pathname.split('/')[1];

        const jsModules = ['device', 'search']
        if (jsModules.includes(subdir)) {
            runJS(subdir);
        } else if (subdir === 'feedback') {         /* feedback page also has a button with the same problem as search's */
            runJS('search');
        }
    });
}

chrome.storage.local.get(['enabled'], (data) => {
    updateTheme(data.enabled ?? true);

    if ((data.enabled ?? true) && !location.href.startsWith('https://login.sbhs.net.au/')) injectJS();
});

chrome.storage.onChanged.addListener(changes => {
    if (changes.enabled) {
        updateTheme(changes.enabled.newValue);
    }
});