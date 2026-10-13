async function getjson() {
    try {
        const response = await fetch('/partners.json');
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch JSON data:", error);
    }
}

async function main() {
    let partners = await getjson();
    let maindiv = document.getElementById('partners');


}

document.addEventListener('DOMContentLoaded', main)