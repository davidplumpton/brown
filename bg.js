function ls() {
localStorage[storage] = JSON.stringify( [{"url":"http://www.reddit.com/r/android","nextTime":1306190245826,"frequency":"2d"},{"url":"news.ycombinator.com","nextTime":1306192456427,"frequency":"15h"},{"url":"peakoil.com","nextTime":1306205362964,"frequency":"2d"},{"url":"http://android.stackexchange.com/","nextTime":1306205632402,"frequency":"2d"},{"url":"twitter.com","nextTime":1306217695633,"frequency":"22h"},{"url":"www.smbc-comics.com","nextTime":1306217721440,"frequency":"22h"},{"url":"dilbert.com","nextTime":1306217847186,"frequency":"22h"},{"url":"freshmeat.net","nextTime":1306223619681,"frequency":"3d"},{"url":"reddit.com/r/worldnews","nextTime":1306224846872,"frequency":"1d"},{"url":"spacedaily.com","nextTime":1306224863078,"frequency":"1d"},{"url":"reddit.com/r/atheism","nextTime":1306224871344,"frequency":"1d"},{"url":"online-go.com/games/mygames.php","nextTime":1306225061095,"frequency":"1d"},{"url":"stackoverflow.com","nextTime":1306225070113,"frequency":"1d"},{"url":"reddit.com","nextTime":1306225257757,"frequency":"1d"},{"url":"neatorama.com","nextTime":1306225267105,"frequency":"1d"},{"url":"boingboing.net","nextTime":1306225276436,"frequency":"1d"},{"url":"slashdot.org","nextTime":1306225350405,"frequency":"1d"},{"url":"reddit.com/r/technology","nextTime":1306225385622,"frequency":"1d"},{"url":"reddit.com/r/programming","nextTime":1306225398494,"frequency":"1d"},{"url":"nzherald.co.nz","nextTime":1306225405995,"frequency":"1d"},{"url":"senseis.xmp.net/?WuRenGo3","nextTime":1306225413791,"frequency":"1d"},{"url":"quora.com","nextTime":1306225420567,"frequency":"1d"},{"url":"www.dvorak.org/blog","nextTime":1306225490021,"frequency":"1d"},{"url":"reddit.com/r/linux","nextTime":1306226711327,"frequency":"4d"},{"url":"reddit.com/r/ubuntu","nextTime":1306228902665,"frequency":"7d"},{"url":"thedailywtf.com","nextTime":1306311918173,"frequency":"2d"},{"url":"www.reddit.com/r/scifi","nextTime":1306312226093,"frequency":"2d"},{"url":"salon.com","nextTime":1306312290745,"frequency":"2d"},{"url":"theoildrum.com","nextTime":1306312558066,"frequency":"2d"},{"url":"dzone.com","nextTime":1306312732113,"frequency":"2d"},{"url":"xkcd.com","nextTime":1306312743969,"frequency":"2d"},{"url":"reddit.com/r/androidapps","nextTime":1306312815457,"frequency":"2d"},{"url":"radar.oreilly.com/","nextTime":1306313315545,"frequency":"2d"},{"url":"reddit.com/r/business","nextTime":1306313327815,"frequency":"2d"},{"url":"sciam.com","nextTime":1306313342560,"frequency":"2d"},{"url":"time.com","nextTime":1306313416962,"frequency":"2d"},{"url":"penny-arcade.com/comic","nextTime":1306314340751,"frequency":"2d"},{"url":"newscientist.com","nextTime":1306314393981,"frequency":"2d"},{"url":"wired.com","nextTime":1306314892907,"frequency":"2d"},{"url":"twit.tv","nextTime":1306362941880,"frequency":"4d"},{"url":"computerworld.co.nz","nextTime":1306397191220,"frequency":"1w"},{"url":"reddit.com/r/economics","nextTime":1306398578528,"frequency":"3d"},{"url":"storagemojo.com","nextTime":1306484931067,"frequency":"2w"},{"url":"bitcoinwatch.com","nextTime":1306743936670,"frequency":"1w"},{"url":"www.h2database.com/html/changelog.html","nextTime":1307089006833,"frequency":"4w"},{"url":"well-of-souls.com/outsider","nextTime":1308041050650,"frequency":"4w"}])
}

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

