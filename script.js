// idk lol

document.querySelectorAll(".button, .social-button").forEach((button) => {
  button.addEventListener("click", () => {
    console.log(`${button.textContent} button clicked`);
  });
});

// subs

async function getData() {
  const data = await fetch(
    "https://corsproxy.io/?https://studio.nia-statistics.com/api/channel/UCPW_cNzrDSf0xejLOKvV7Cg"
  ).then((resp) => resp.json());
  elementContent = document.getElementById("elementID").innerHTML;
  var prevsubs = parseFloat(elementContent.replace(/,/g, ""));
  var currentsubs = data.channels.counts[2].count;
  var c = new CountUp("elementID", prevsubs, currentsubs);
  c.start();
}
getData();
setInterval(getData, 2 * 1000); // 2 seconds update time

// lanyard

const LANYARD_WS = "wss://api.lanyard.rest/socket";
const LANYARD_OP = {
  PRESENCE: 0,
  HELLO: 1,
  INITIALIZE: 2,
  HEARTBEAT: 3,
};
const EVENTS_TO_CALLBACK = ["INIT_STATE", "PRESENCE_UPDATE"];
const DISCORD_ID = "902294338283929611";

let spotifyBarTimer = null;

function initializeLanyard(callback) {
  let ws = new WebSocket(LANYARD_WS);

  ws.onmessage = ({ data }) => {
    const received = JSON.parse(data);

    switch (received.op) {
      case LANYARD_OP.HELLO: {
        ws.send(
          JSON.stringify({
            op: LANYARD_OP.INITIALIZE,
            d: { subscribe_to_id: DISCORD_ID },
          })
        );

        setInterval(() => {
          ws.send(JSON.stringify({ op: LANYARD_OP.HEARTBEAT }));
        }, 1000 * 30);
        break;
      }

      case LANYARD_OP.PRESENCE: {
        if (EVENTS_TO_CALLBACK.includes(received.t)) {
          callback(received.d);
        }
        break;
      }
    }
  };

  ws.onclose = () => initializeLanyard(callback);
}

initializeLanyard((data) => {
  setupBasicInfo(data);
  setupSpotify(data);
});

function setupBasicInfo({ discord_user, discord_status, activities }) {
  const { username, discriminator, avatar } = discord_user;
  const colorCodes = {
    online: "#30d158",
    offline: "#8e8e93",
    idle: "#ffd60a",
    dnd: "#ff453a",
  };

  let status = discord_status;

  for (const activity of activities) {
    if (activity.type === 4) {
      status = activity.state;
      break;
    }
  }

  const descriptionElement = document.getElementById("description");
  descriptionElement.innerText = `@${username} [${status}]`;
  descriptionElement.style.color = colorCodes[discord_status];
}

function setupSpotify({ listening_to_spotify, spotify }) {
  if (spotifyBarTimer) clearInterval(spotifyBarTimer);

  const spotifyElement = document.getElementById("spotify-song");

  if (!listening_to_spotify) {
    spotifyElement.innerText = "No song currently playing";
    return;
  }

  const { song, artist } = spotify;

  spotifyElement.innerText = `Currently playing: ${song} by ${artist}`;
}

// view count

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-N0508K6X7P');
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-N0508K6X7P');
