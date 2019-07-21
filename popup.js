let nameInput = document.getElementById('nameInput');
let bookmarkButton = document.getElementById('bookmarkButton');

chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    nameInput.setAttribute('value', tabs[0].title);
    nameInput.focus();

    bookmarkButton.addEventListener('click', (event) => {
        const title = tabs[0].title;
        const url = tabs[0].url;

        alert(url);

        chrome.storage.sync.get('bookmarks', (bookmarks) => {
            bookmarks.push({title: title, url: url});
            chrome.storage.sync.set({bookmarks: bookmarks}, () => {
                console.log("Bookmark added");
            });
        })
    });
});