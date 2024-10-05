document.querySelectorAll('.button, .social-button').forEach(button => {
    button.addEventListener('click', () => {
        console.log(`${button.textContent} button clicked`);
    });
});

async function getData() {
    const data = await fetch('https://corsproxy.io/?https://studio.nia-statistics.com/api/channel/UCPW_cNzrDSf0xejLOKvV7Cg').then(resp=>resp.json());
    document.querySelector('#elementID').innerHTML = data.channels.counts[2].count
    }
    getData();
    setInterval(getData, 2*1000); // 2 seconds update time