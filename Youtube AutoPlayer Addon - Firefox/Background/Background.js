/* Retrieve any previously set cookie and send to content script */

function getActiveTab() {
    return browser.tabs.query({
        active: true,
        currentWindow: true
    });
}

function cookieUpdate() {
    getActiveTab().then((tabs) => {
        // get any previously set cookie for the current tab 
        var gettingCookies = browser.cookies.get({
            url: tabs[0].url,
            name: "YouTube_AutoPlayer"
        });
        gettingCookies.then((cookie) => {
            if (cookie) {
                //var cookieVal = JSON.parse(cookie.value);
                browser.tabs.sendMessage(tabs[0].id, cookie.value);
                //browser.tabs.sendMessage(tabs[0].id, {color: cookieVal.color});
            }
        });
    });
}
setInterval(cookieUpdate, 5000);
// update when the tab is updated
browser.tabs.onUpdated.addListener(cookieUpdate);
// update when the tab is activated
//browser.tabs.onActivated.addListener(cookieUpdate);