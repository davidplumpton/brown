function nextPage() {
    var sites = getSites();
    sites.sort(compareSite);
    var site = sites[0];
    var now = new Date().getTime();
    if (site.nextTime > now) {
        //var notification = window.webkitNotifications.createNotification('icon.png', 'No sites pending', 'You have no more pending sites to visit. Relax!')
        //notification.show();
        alert('No more sites')
    }
    var url = site.url;
    if (url.indexOf('http') == -1)
    {
        url = 'http://' + url;
    }
    site.nextTime = now + getDelay(site);
    sites.sort(compareSite);
    chrome.tabs.create({url: url, selected: false});
    storeSites(sites);
}

chrome.commands.onCommand.addListener(function(command) {
	if (command == 'code_brown') {
		nextPage();
	}
});

