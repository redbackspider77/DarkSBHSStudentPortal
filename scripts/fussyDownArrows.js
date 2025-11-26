/* to do: finish*/

panelTexts = document.querySelectorAll('.jpane-toggler span'); 

Array.from(panelTexts).forEach(e => {
    e.innerHTML = '<b id="toggler" style="color: #698BD8;"">▼</b> &nbsp;&nbsp;&nbsp;' + e.innerHTML
});