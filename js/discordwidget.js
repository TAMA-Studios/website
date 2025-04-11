fetch('https://discord.com/api/guilds/1185850346879336568/widget.json')
    .then(response => response.json())
    .then(data => {
        const discordSection = document.getElementById('discord');

        const serverName = data.name;
        const onlineCount = data.presence_count;
        const inviteUrl = data.instant_invite;

        const wrapper = document.createElement('div');
        wrapper.style.maxWidth = '400px';
        wrapper.style.margin = '20px auto';
        wrapper.style.padding = '16px';
        wrapper.style.borderRadius = '12px';
        wrapper.style.border = '4px solid transparent';
        wrapper.style.backgroundClip = 'padding-box, border-box';
        wrapper.style.backgroundOrigin = 'border-box';
        wrapper.style.backgroundImage = 'linear-gradient(#111, #111), linear-gradient(90deg, #30bcfc, #00b9fe)';
        wrapper.style.textAlign = 'center';
        wrapper.style.color = 'white';

        wrapper.innerHTML = `
            <p style="font-size: 1.2em; font-weight: bold;">${serverName}</p>
            <p>Online Members: ${onlineCount}</p>
            <p><a href="${inviteUrl}" target="_blank" style="color:rgb(255, 255, 255); text-decoration: none; font-weight: bold;">Join Server</a></p>
            <div style="margin-top: 12px; text-align: left;">
                <h3 style="margin-bottom: 8px; font-size: 1em;">Online Members:</h3>
                <ul style="list-style: none; padding: 0; margin: 0;">
                    ${data.members.map(member => `
                        <li style="margin-bottom: 4px; display: flex; align-items: center; gap: 8px;">
                            <img src="${member.avatar_url}" alt="${member.username}" style="width: 20px; height: 20px; border-radius: 50%;">
                            <span>${member.username}</span>
                        </li> 
                    `).join('')}
                </ul>
            </div>
        `;

        const h2 = discordSection.querySelector('h2');
        h2.insertAdjacentElement('afterend', wrapper);
    })
    .catch(error => {
        console.error('Error fetching Discord widget data:', error);
        const discordSection = document.getElementById('discord');
        const h2 = discordSection.querySelector('h2');
        const errorMsg = document.createElement('p');
        errorMsg.textContent = 'Failed to load Discord widget.';
        h2.insertAdjacentElement('afterend', errorMsg);
    });
