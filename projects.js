async function getjson() {
    try {
        const response = await fetch('/projects.json');
        console.log(response);
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch JSON data:", error);
    }
}

async function main() {
 let projects = await getjson();
 let maindiv = document.getElementById('projects');

    for (const project of projects) {
        console.log(project);
        let proj = document.createElement('div');
        proj.classList.add('project');

        let name = document.createElement('h2');
        name.textContent = project['name'];
        name.classList.add('project-name');
        name.classList.add('ubuntu-medium');

        let type = document.createElement('p');
        type.textContent = project['type'];
        type.classList.add('project-type');
        type.classList.add('ubuntu-medium');

        let description = document.createElement('i');
        description.textContent = project['description'];
        // description.classList.add('ubuntu-medium');
        description.classList.add('project-description');

        let links = project["links"];

        let socks = document.createElement("div")

        for (const link of links) {
            let sock = document.createElement("a");
            let img = document.createElement("img");
            img.src = link["icon"];
            img.alt = link["name"];
            img.classList.add("sock-icon");
            sock.appendChild(img);
            sock.href = link["url"];
            socks.appendChild(sock);
        }

        socks.classList.add("socks");


        proj.appendChild(name);
        proj.appendChild(type);
        proj.appendChild(description);
        proj.appendChild(socks)

        maindiv.appendChild(proj);
    }
}

document.addEventListener('DOMContentLoaded', main)