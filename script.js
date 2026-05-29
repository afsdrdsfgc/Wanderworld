const world = document.querySelector('#world-container');
const joinbtn = document.querySelector('#joinbtn');
const sendbtn = document.querySelector('#sendbtn');
const chatInput = document.querySelector('#chat-input');
let username = null
let playerKey = null;





async function rendermap() {
  const response = await fetch('https://tinkr.tech/sdb/poly/wander');
  const data = await response.json();
  world.innerHTML = ""
  for(const player of data.players){
    const newplayer = document.createElement('div')
    newplayer.style.position = "absolute"
    newplayer.style.left = player.x + 'px';
    newplayer.style.top = player.y + 'px';
    const player_sprite = document.createElement('img')
    player_sprite.src = 'https://tinkr.tech' + player.image
    player_sprite.style.imageRendering = 'pixelated'
    newplayer.appendChild(player_sprite)
    const player_name = document.createElement('p')
    player_name.textContent = player.username
    player_name.style.color = 'white'
    newplayer.appendChild(player_name)
    if (player.message !== "") {
        const bubble = document.createElement('div');
        bubble.className = 'speech-bubble';
        bubble.textContent = player.message;
        newplayer.appendChild(bubble);
      }
    console.log(newplayer)
    world.appendChild(newplayer)
  }
}


rendermap()

setInterval(rendermap, 1000);

joinbtn.addEventListener('click', async function() {
  if (username === null){
    username = prompt('What is your username?')}
  const response = await fetch('https://tinkr.tech/sdb/poly/wander', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      },    
      body: JSON.stringify({
        "action": "join",
        'username': username
      })
    })
  const result = await response.json();
  if(result.player_key) playerKey = result.player_key;
})
world.addEventListener('click', function(e) {
  const rect = world.getBoundingClientRect();
  let x = Math.round(e.clientX - rect.left);
  let y = Math.round(e.clientY - rect.top); 
 
  x = Math.max(0, Math.min(800, x));
  y = Math.max(0, Math.min(600, y));
 

  fetch("https://tinkr.tech/sdb/poly/wander",{
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "move",
      player_key: playerKey,   
      x:x,
      y:y
    })
  })
})

  async function sendMessage() {
  const text = chatInput.value.trim();
  if(!text) return;
  chatInput.value = "";

  await fetch('https://tinkr.tech/sdb/poly/wander', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: "talk",
      player_key: playerKey, 
      message: text
    })
  });
  rendermap();
}
sendbtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendMessage(); })