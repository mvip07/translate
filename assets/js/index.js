const fromText = document.querySelector(".from-text"),
    to_text = document.querySelector(".to-text"),
    selectTag = document.querySelectorAll("select"),
    exchangeIcon = document.querySelector(".exchange"),
    translateBtn = document.querySelector("button"),
    icons = document.querySelectorAll(".row i")

selectTag.forEach((tag, id) => {
    for (let country_code in countries) {
        let selected
        if (id == 0 && country_code == "en-GB") {
            selected = "selected"
        } else if (id == 1 && country_code == "uz-UZ") {
            selected = "selected"
        }

        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`
        tag.insertAdjacentHTML('beforeend', option)
    }
})

exchangeIcon.addEventListener("click", () => {
    let tempText = fromText.value
    tempLang = selectTag[0].value
    fromText.value = to_text.value
    selectTag[0].value = selectTag[1].value
    to_text.value = tempText
    selectTag[1].value = tempLang
})

translateBtn.addEventListener("click", () => {
    let text = fromText.value,
        translateFrom = selectTag[0].value,
        translateTo = selectTag[1].value

    if (!text) return
    to_text.setAttribute("placeholder", "Translating...")
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`

    fetch(apiUrl).then((res) => res.json())
        .then((res) => {
            to_text.value = res.responseData.translatedText
            to_text.setAttribute("placeholder", "Translation")
        })
        .catch((err) => console.log(err))
})

icons.forEach(icon => {
    icon.addEventListener('click', ({ target }) => {
        if (target.classList.contains("fa-copy")) {
            if (target.id == "form") {
                if (fromText.value != "") {
                    target.parentElement.classList.add("active")
                    fromText.setSelectionRange(0, 99999);
                    setTimeout(() => {
                        target.parentElement.classList.remove("active")
                    }, 1000);
                    navigator.clipboard.writeText(fromText.value);
                }
            } else {
                if (to_text.value != "") {
                    target.parentElement.classList.add("active")
                    to_text.setSelectionRange(0, 99999);
                    setTimeout(() => {
                        target.parentElement.classList.remove("active")
                    }, 1000);
                    navigator.clipboard.writeText(to_text.value);
                }
            }
        } else {
            let utterance;
            if (target.id == "form") {
                utterance = new SpeechSynthesisUtterance(fromText.value)
                utterance.lang = selectTag[0].value
            } else {
                utterance = new SpeechSynthesisUtterance(to_text.value)
                utterance.lang = selectTag[1].value
            }
            speechSynthesis.speak(utterance)
        }
    })
})

// fromText.addEventListener('input', () => {
//     let text = fromText.value,
//         translateFrom = selectTag[0].value,
//         translateTo = selectTag[1].value

//     if (!text) return
//     to_text.setAttribute("placeholder", "Translating...")
//     let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`

//     fetch(apiUrl)
//         .then((res) => res.json())
//         .then((res) => {
//             to_text.value = res.responseData.translatedText
//             to_text.setAttribute("placeholder", "Translation")
//         })
//         .catch((err) => console.log(err))
// })