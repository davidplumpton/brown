function deleteRow(e)
{
    var i = parseInt($(this).attr('data-idx'))
    var sites = getSites();
    sites = sites.slice(0, i).concat(sites.slice(i + 1, sites.length));
    storeSites(sites);
    display();
}

function addRow()
{
    var url = $('#new-url').val();
    var frequency = $('#new-frequency').val();
    var site = {url: url, nextTime: 0, frequency: frequency};
    var sites = getSites();
    sites = [site].concat(sites);
    storeSites(sites);
    display();
}

function exportConfig()
{
    var configText = localStorage[storage];
    $('#import-config').after('<input type="text" id="config"/><br/>');
    $('#config').val(configText);
}

function showImportConfig()
{
    $('#import-config').after('<input type="text" id="config"/><br/><input type="submit" value="Save Config" onClick="javascript:importConfig();"/>');
}

function importConfig()
{
    var configText = $('#config').val();
    localStorage[storage] = configText;
    display();
}

function openUrl(url)
{
    var fullUrl = url;
    if (url.indexOf('http') == -1)
    {
        fullUrl = 'http://' + url;
    }
    chrome.tabs.create({url: fullUrl, selected: false});
    sites = getSites();
    var now = new Date().getTime();
    for (var i = 0; i < sites.length; i++)
    {
        var site = sites[i];
        if (url == site.url)
        {
            site.nextTime = now + getDelay(site);
            sites.sort(compareSite);
            storeSites(sites);
            return;
        }
    }
}

function openSiteLine() {
    var i = parseInt($(this).attr('data-idx'))
    var sites = getSites();
    openUrl(sites[i].url)
}

function display()
{
    var sites = getSites();
    var s = '<table><tr><td>Freq</td><td>Hours</td><td>Del</td><td>Site</td></tr>';
    var now = new Date().getTime();
    for (var i = 0; i < sites.length; i++)
    {
        var site = sites[i];
        s += '<tr><td>' + site.frequency + '</td><td>';
        var delay = site.nextTime - now; 
        if (delay <= 0) {
            s += 'Due';
        } else {
            s += Math.ceil(delay / 60 / 60 / 1000);
        }
        s += '</td><td><img src="delete.png" class="delete" data-idx="' + i + '" /></td>';
        s += '<td><a href="#" class="link" data-idx="' + i + '" >' + site.url + '</a></td></tr>';
    }
    s += '</table>';
    $('#container').html(s);
    $('.delete').click(deleteRow)
    $('.link').click(openSiteLine)
}


document.addEventListener('DOMContentLoaded', function () {
    $('#add-button').click(addRow)
    $('#export-config').click(exportConfig)
    $('#import-config').click(showImportConfig)
  display();
});

