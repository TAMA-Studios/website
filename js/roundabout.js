fetch('employeeinfo.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('roundabout');
    
    for (const name in data) {
      const person = data[name],
            borderColor = person.color || '#333';
      
      const image = person.pfp 
        ? `<img src="${person.pfp}" alt="${name || ''}" style="border-radius:50%;width:150px;border:2px solid ${borderColor}">` 
        : '';
      const email = person.email ? `<h4>${person.email}</h4>` : '';
      const id = person.id ? `<h5><small>ID: ${person.id}</small></h5>` : '';
      
      const extraRoles = [person.role2, person.role3, person.role4, person.role5].filter(Boolean)

      const arrow = extraRoles.length > 0 // Dropdown arrow SVG
        ? `<svg class="dropdown-arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:16px;transition:transform .3s ease"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.43057 8.51192C4.70014 8.19743 5.17361 8.161 5.48811 8.43057L12 14.0122L18.5119 8.43057C18.8264 8.16101 19.2999 8.19743 19.5695 8.51192C19.839 8.82642 19.8026 9.29989 19.4881 9.56946L12.4881 15.5695C12.2072 15.8102 11.7928 15.8102 11.5119 15.5695L4.51192 9.56946C4.19743 9.29989 4.161 8.82641 4.43057 8.51192Z" fill="#30bcfc"/></svg>`
        : '';
      
      const mainRoleDisplay = person.role // Main role and extra roles 
        ? `<h3 class="main-role" style="cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px">${person.role}${arrow}</h3>` 
        : '';
      const extraRolesDisplay = extraRoles.length > 0 
        ? `<ul class="extra-roles" style="max-height:0;overflow:hidden;transition:max-height .5s ease-out;list-style:none;padding:0;margin:0">${extraRoles.map(role => `<li>${role}</li>`).join('')}</ul>` 
        : '';
      
      const card = document.createElement('div');
      card.classList.add("roundaboutCard");
      card.style.border = `4px solid ${borderColor}`;
      card.innerHTML = `${image}<h2>${name || ''}</h2>${mainRoleDisplay}${extraRolesDisplay}${email}${id}`;
      
      if (extraRoles.length > 0) { // If has extra roles, add dropdown
        card.querySelector('.main-role').addEventListener('click', () => {
          const extraList = card.querySelector('.extra-roles');
          const isOpen = extraList.style.maxHeight && extraList.style.maxHeight !== "0px";
          extraList.style.maxHeight = isOpen ? "0" : extraList.scrollHeight + "px";
          card.querySelector('.dropdown-arrow').style.transform = isOpen ? "rotate(0deg)" : "rotate(180deg)";
        });
      }
      container.appendChild(card);
    }
  });