const categoryTargets = {
    Artists: "team-artists",
    Devs: "team-Devs"
};

function createTeamCard(member) {
    const card = document.createElement("article");
    card.className = "team-card";

    const image = document.createElement("img");
    image.className = "team-card-image";
    image.src = member.profileImage;
    image.alt = `${member.name} profile image`;

    const name = document.createElement("h3");
    name.textContent = member.name;

    const socials = document.createElement("div");
    socials.className = "team-card-socials";

    member.socials.forEach((social) => {
        const link = document.createElement("a");
        link.href = social.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        if (social.icon) {
            link.classList.add("has-icon");

            const icon = document.createElement("img");
            icon.className = "team-card-social-icon";
            icon.src = social.icon;
            icon.alt = social.name;
            link.appendChild(icon);
        } else {
            const label = document.createElement("span");
            label.textContent = social.name;
            link.appendChild(label);
        }

        socials.appendChild(link);
    });

    card.append(image, name, socials);

    if (member.quote) {
        const quote = document.createElement("p");
        quote.className = "team-card-quote";
        quote.textContent = `"${member.quote}"`;
        card.appendChild(quote);
    }

    return card;
}

async function loadTeamCards() {
    const response = await fetch("team.json");
    const teamData = await response.json();

    Object.entries(categoryTargets).forEach(([category, targetId]) => {
        const target = document.getElementById(targetId);

        if (!target || !teamData[category]) {
            return;
        }

        teamData[category].forEach((member) => {
            target.appendChild(createTeamCard(member));
        });
    });
}

loadTeamCards();
