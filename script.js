


const urlInput = document.getElementById("url-input");
const errorMessageEl = document.getElementById("error-message");
const activeBtn = document.getElementById("active-btn");
const linkHistoryEl = document.getElementById("link-history");

const hamMenu = document.querySelector('.ham-menu');
const headerNav = document.querySelector(".header-nav");


hamMenu.addEventListener('click', () => {
    hamMenu.classList.toggle("active")
    headerNav.classList.toggle("active");
})




// form layout
const getUrlInput = () => {
    return urlInput.ariaValueMax.trim().toLocaleLowerCase()
}

async function shortenUrl(urlLink){
    const apiUrl = `https://cors-anywhere.herokuapp.com/https://cleanuri.com/api/v1/shorten`

    const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www.form-urlencoded'
        },
        body: new URLSearchParams({
            'url': urlLink
        })
    })

    if(res.ok){
        const data = await res.json()
        displayToLinksHistory(urlLink, data)
    }else {
        console.error(`Error shortening URL: ${res.statusText}`)
    }
}

const isValidUrl = (url) => {
    try{
        new URL(url)
        return true
    } catch (_) {
        return false
    }
}

const displayToLinksHistory = (originalLink,  urlData) =>{
    const linkItem = document.createElement('div')
    linkItem.classList.add('item')

    linkItem.innerHTML = `
    <p class='link'>${originalLink}</p>
    <hr/>

    <div class="short-link">
    <p>${urlData.result_url}</p>
    <button class='copy-link-btn'>Copy</button>
    </div>
    `

    linkHistoryEl.appendChild(linkItem)

    linkItem.querySelector('.copy-link-btn').addEventListener('click', (e) =>{
        let copyUrl = urlData.result_url
        navigator.clipboard.writeText(copyUrl) 

        e.target.style.backgroundColor = 'pink'
        e.target.textContent = 'Copied!'

        setTimeout(() => {
            e.target.style.backgroundColor = 'blue'
            e.target.textContent = 'Copy'
        }, 1500);
    })
}

activeBtn.addEventListener('click', () => {
    userUrl = getUrlInput()

    if (userUrl || !isValidUrl(userUrl)) {
        errorMessageEl.classList.add('error')
        urlInput.classList.remove('error')  
    }else{
        errorMessageEl.classList.remove('error')
        urlInput.classList.remove('error')
        urlInput.value = ""
        linkHistoryEl.classList.add('active')
        shortenUrl(userUrl)
    }
})