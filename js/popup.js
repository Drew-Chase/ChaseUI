/**
 * Opens a popup with the specified name and data.
 *
 * @param {string} name - The name or path of the popup excluding the .html.
 * @param {Object} [data] - Optional data for the popup.
 * @return {Promise<JQuery<HTMLElement>|HTMLElement>} - A promise that is resolved when the popup is opened.
 */
async function openPopup(name, data = {}) {
    const html = $(await $.get(`${name}.html`));
    name = name.replace(/[^a-zA-Z]/g, "");
    let popup = $(`<div class='popup' id="${name}-popup">`);
    const popupContent = $(`<div class='popup-content'>`);
    for (let i = 0; i < html.length; i++) {
        popupContent.append(html[i]);
    }
    popupContent.append(`<button class="close"><i class="fa fa-close"></i></button>`)
    const bg = $('<div class="close popup-bg"></div>')
    bg.on("click", () => {
        closePopup(name);
    });

    popup.append(bg);
    popup.append(popupContent);

    popup.appendTo("body");
    setTimeout(() => {
        popup.addClass("active");
        popup.find(".close").on("click", () => {
            closePopup(name);
        });
    }, 100)

    return popup;
}

/**
 * Close the specified popup by removing the "active" class and removing it from the DOM after a delay.
 * @param {string} name - The name of the popup to close.
 * @return {void} - A promise that resolves after the popup has been closed.
 */
function closePopup(name) {
    const popup = $(`#${name}-popup.popup.active`);
    popup.removeClass("active");
    setTimeout(() => {
        popup.remove();
    }, 300)
}

/**
 * Display an alert popup with the given message.
 *
 * @param {string} message - The message to be displayed in the alert popup.
 * @param {function=} onclose - Optional callback function to be executed when the alert popup is closed.
 * @return {jQuery<HTMLElement>} - The jQuery object representing the alert popup.
 */
function alert(message, onclose = null) {
    const name = `alert-${new Date().getTime()}`
    let popup = $(`<div id="${name}-popup" class='popup'>`);
    const popupContent = $(`<div class='popup-content'>`);

    popupContent.append(`<h1>Alert</h1>`)
    popupContent.append(`<p>${message}</p>`)
    popupContent.append(`<button class="close primary">Close</button>`)
    const bg = $('<div class="close popup-bg"></div>')
    popup.append(popupContent);
    popup.append(bg);
    popup.appendTo("body");
    setTimeout(() => {
        popup.addClass("active");

        popup.find(".close").on("click", () => {
            closePopup(name);
            if (onclose)
                onclose();
        });
    }, 100)
    return popup;
}

export {openPopup, closePopup, alert};
