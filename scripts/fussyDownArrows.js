panelTexts = document.querySelectorAll('.jpane-toggler span'); 

Array.from(panelTexts).forEach(e => {
    e.innerHTML = "<b style='color: #698BD8;'>▼</b> &nbsp;&nbsp;&nbsp;" + e.innerHTML
});

/* to do: add to manifest and finish this to replace with ▼s */