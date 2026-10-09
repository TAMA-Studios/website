
async function memjson() {
    try {
        const response = await fetch('/team.json');
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch JSON data:", error);
    }
}

async function main() {
    let members = await memjson();
    let memdiv = document.getElementById("team");
    for (const member of members) {
        let mem = document.createElement("div");
        mem.classList.add("team-member");

        let memname = document.createElement("h4");
        memname.textContent = member["name"];
        memname.classList.add("ubuntu-bold");
        mem.appendChild(memname);
        let td = document.createElement("div");
        td.classList.add("team-tag-box");
        for (const tag of member["role"]) {
            let tg = document.createElement("p");
            tg.textContent = tag;
            tg.classList.add("team-tag");
            tg.classList.add("ubuntu-medium");
            td.appendChild(tg);
        }
        mem.appendChild(td);


        memdiv.appendChild(mem);

    }
}


document.addEventListener('DOMContentLoaded', main);