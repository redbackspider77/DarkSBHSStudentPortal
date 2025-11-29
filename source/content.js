/*
        {
            "matches": ["https://student.sbhs.net.au/*"],
            "exclude_matches": ["https://student.sbhs.net.au/interviews/*"],
            "js": ["scripts/fussyNavArrows.js"],
            "css": ["styles/main.css"],
            "run_at": "document_end"
        },
        {
            "matches": ["https://student.sbhs.net.au/award-scheme"],
            "css": ["styles/award.css"]
        },
        {
            "matches": ["https://student.sbhs.net.au/help"],
            "css": ["styles/help.css"]
        },
        {
            "matches": ["https://student.sbhs.net.au/timetable"],
            "css": ["styles/tt.css"]
        },
        {
            "matches": ["https://student.sbhs.net.au/diary"],
            "css": ["styles/diary.css"]
        },
        {
            "matches": ["https://student.sbhs.net.au/feedback"],
            "css": ["styles/feedback.css"]
        },
        {
            "matches": ["https://student.sbhs.net.au/search*"],
            "css": ["styles/search.css"],
            "js": ["scripts/searchArrow.js"],
            "run_at": "document_end"
        },
        {
            "matches": ["https://student.sbhs.net.au/device"],
            "js": ["scripts/fussyQR.js"],
            "run_at": "document_end"
        }

*/

const possibleSubDirs = ['award-scheme', 'diary', 'feedback', 'help', 'home', 'search', 'timetable'];

function injectCSS(file) {
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
        const path = location.pathname;

        injectCSS('main.css');

        const subdirectory = path.split('/')[1];

        if (possibleSubDirs.includes(subdirectory)) {
            injectCSS(subdirectory + '.css');
        }
    } else {
        const existing = document.head.querySelectorAll('link.darkSBHS');

        Array.from(existing).forEach(e => {
            e.remove();
        });
    }
}

chrome.storage.local.get(['enabled'], (data) => {
    updateTheme(data.enabled ?? true);
});

chrome.storage.onChanged.addListener(changes => {
    if (changes.enabled) {
        updateTheme(changes.enabled.newValue);
    }
});

function runJS(name) {
    import(chrome.runtime.getURL(`scripts/${name}.js`))
        .catch(err => console.error(err));
}

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