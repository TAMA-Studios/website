// function to get the json file containing the members
async function memjson() {
    try {
        const response = await fetch('/team.json');
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch JSON data:", error);
    }
}
// main function for generating the members section
async function main() {
    let members = await memjson();
    let memdiv = document.getElementById("team");
    for (const member of members) {
        let card = document.createElement("div");
        card.classList.add("memcard");

        let name = document.createElement("h2");
        name.textContent = member["name"];

        let role = document.createElement("p");
        role.textContent = member["role"];

        let quote = document.createElement("i");
        quote.textContent = member["quote"];

        let socials = member["socials"];

        let socks = document.createElement("div")

        for (const social of socials) {
            let sock = document.createElement("a");
            let img = document.createElement("img");
            img.src = social["icon"];
            img.alt = social["name"];
            img.classList.add("sock-icon");
            sock.appendChild(img);
            sock.href = social["url"];
            socks.appendChild(sock);
        }

        socks.classList.add("socks");

        name.classList.add("ubuntu-medium");
        name.classList.add("name");

        role.classList.add("ubuntu-medium");
        role.classList.add("role");

        quote.classList.add("quote");

        card.appendChild(name);
        card.appendChild(role);
        card.appendChild(quote);
        card.appendChild(socks);

        memdiv.appendChild(card);

    }
}

// run main() on DOM load
document.addEventListener('DOMContentLoaded', main);