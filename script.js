const names = [
    "Sophia",
    "Jackson",
    "Olivia",
    "Liam",
    "Emma",
    "Noah",
    "Ava",
    "Aiden",
    "Isabella",
    "Lucas",
    "Mia",
    "Caden",
    "Amelia",
    "Ethan",
    "Harper",
    "Mason",
    "Evelyn",
    "Logan",
    "Abigail",
    "Elijah",
    "Emily",
    "Oliver",
    "Elizabeth",
    "Carter",
    "Mila",
    "Benjamin",
    "Ella",
    "William",
    "Avery",
    "James",
    "Sofia",
    "Alexander",
    "Camila",
    "Michael",
    "Scarlett",
    "Sebastian",
    "Victoria",
    "Mateo",
    "Luna",
    "Daniel",
    "Grace",
    "Henry",
    "Chloe",
    "Jackson",
    "Penelope",
    "Levi",
    "Layla",
    "Wyatt",
    "Riley",
    "Julian",
    "Zoey",
    "Evan",
    "Nora",
    "Leo",
    "Hannah",
    "David",
    "Aria",
    "Jack",
    "Addison",
    "Gabriel",
    "Ellie",
    "Samuel",
    "Stella",
    "John",
    "Natalie",
    "Anthony",
    "Zoe",
    "Luke",
    "Hazel",
    "Christopher",
    "Violet",
    "Joshua",
    "Aurora",
    "Andrew",
    "Savannah",
    "Joseph",
    "Audrey",
    "Levi",
    "Brooklyn",
    "Isaac",
    "Claire",
    "Nathan",
    "Bella",
    "Ryan",
    "Skylar",
    "Caleb",
    "Lucy",
    "Jonathan",
    "Paisley",
    "Hunter",
    "Everly",
    "Christian",
    "Anna"
  ];

const search = document.getElementById("search")
const searchBtn = document.getElementById("search-btn")
const suggestions = document.getElementById("suggestions")
const selectedName = document.getElementById("selected-name")
let filteredNames = []
let activeSuggestionIndex = 0

suggestions.style.left = `${search.getBoundingClientRect().left}px`

const addAllSuggestions = () => {
    suggestions.innerHTML = ""
    filteredNames = names.filter(name => name.includes(search.value))
    if(search.value === "" || filteredNames.length === 0) {
        const suggestionEle = document.createElement("div")
        suggestionEle.classList.add("no-suggestion")
        suggestionEle.innerText = "No Suggestions"
        suggestions.appendChild(suggestionEle)
    } else {
        for(const index in filteredNames) {
            const suggestionEle = document.createElement("button")
            suggestionEle.classList.add("suggestion")
            if(index == activeSuggestionIndex) {
                suggestionEle.classList.add("active")
            }
            suggestionEle.innerText = filteredNames[index];
            suggestionEle.addEventListener("click", () => {
                search.value = filteredNames[index]
                searchBtn.click()
            })
            suggestions.appendChild(suggestionEle)
        }
    }

    if(activeSuggestionIndex >= 0) {
        const activeSuggestion = document.querySelector(".active")
        suggestions.scrollTop = activeSuggestion.offsetTop - suggestions.clientHeight + activeSuggestion.clientHeight
    }
}

window.addEventListener("resize", () => {
    suggestions.style.left = `${search.getBoundingClientRect().left}px`
})

search.addEventListener("focus", () => {
    suggestions.style.visibility = "visible"
    activeSuggestionIndex = 0
    addAllSuggestions()
})

search.addEventListener("input", () => {
    activeSuggestionIndex = 0
    addAllSuggestions()
})

search.addEventListener("keyup", ({key}) => {
    if(key === "Enter") {
        if(activeSuggestionIndex < filteredNames.length) {
            search.value = filteredNames[activeSuggestionIndex]
        }
        searchBtn.click()
        search.blur()
        activeSuggestionIndex = 0
    }
})

search.addEventListener("keydown", ({key}) => {
    if(key === "ArrowDown") {
        activeSuggestionIndex = (activeSuggestionIndex + 1) % filteredNames.length
        addAllSuggestions()
    }
    if(key === "ArrowUp") {
        activeSuggestionIndex = (activeSuggestionIndex - 1 + filteredNames.length) % filteredNames.length
        addAllSuggestions()
    }
})

searchBtn.addEventListener("click", () => {
    selectedName.innerText = search.value
    activeSuggestionIndex = 0
})

document.addEventListener("click", (e) => {
    if(e.target !== search) {
        suggestions.style.visibility = "hidden"
        activeSuggestionIndex = 0
    }
})
