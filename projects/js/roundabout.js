fetch('projects.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('roundabout');

    for (const key in data) {
      const project = data[key];
      const name = key || 'Unnamed Project';
      const borderColor = project.color || '#333';

      const img = project.pfp
        ? `<img src="${project.pfp}" alt="${name}" style="border-radius: 50%; width: 150px; height: 150px; object-fit: cover; border: 2px solid ${borderColor};">`
        : '';

      const links = [];

      if (project.Curseforge && project.Curseforge !== "N/A")
        links.push(`<a href="${project.Curseforge}" target="_blank">CurseForge</a>`);

      if (project.Modrinth && project.Modrinth !== "N/A")
        links.push(`<a href="${project.Modrinth}" target="_blank">Modrinth</a>`);

      if (project.Discord && project.Discord !== "N/A")
        links.push(`<a href="${project.Discord}" target="_blank">Discord</a>`);

      if (project.GitHub && project.GitHub !== "N/A")
        links.push(`<a href="${project.GitHub}" target="_blank">GitHub</a>`);

      if (project.Wiki && project.Wiki !== "N/A")
        links.push(`<a href="${project.Wiki}" target="_blank">Wiki</a>`);

      const linkHTML = links.length > 0
        ? `<div style="margin-top: 10px; display: flex; flex-direction: column; gap: 6px;">
              ${links.join('')}
           </div>`
        : '';

      // Handle up to 15 tags
      const tagFields = Array.from({ length: 15 }, (_, i) => `tag${i + 1}`);
      const tagElements = tagFields
        .map(tag => project[tag])
        .filter(tag => tag && tag !== "N/A")
        .map(tag => `<span style="
            background-color: ${borderColor};
            color: #000;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            display: inline-block;
          ">${tag}</span>`);

      const tagsHTML = tagElements.length > 0
        ? `<div style="margin-top: 12px; display: flex; flex-wrap: wrap; gap: 6px; justify-content: center;">
              ${tagElements.join('')}
           </div>`
        : '';

      const card = document.createElement('div');
      card.style.border = `4px solid ${borderColor}`;
      card.style.padding = '16px';
      card.style.borderRadius = '12px';
      card.style.margin = '12px';
      card.style.textAlign = 'center';
      card.style.background = '#1e1e1e';
      card.style.width = '220px';

      card.innerHTML = `
        ${img}
        <h2>${name}</h2>
        ${tagsHTML}
        ${linkHTML}
      `;

      container.appendChild(card);
    }
  });
