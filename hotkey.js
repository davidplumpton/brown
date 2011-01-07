document.addEventListener('keyup', handleHotKey, false);

function handleHotKey(e)
{
    // Look for Ctrl-Y
    if (e.keyCode == 89 && e.ctrlKey && !e.shiftKey && !e.altKey)
    {
        var port = chrome.extension.connect({name: "Brown"});
        port.postMessage({command: "nextPage"});
    }
}
