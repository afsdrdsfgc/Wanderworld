const world = document.querySelector('#world-container');
const join = document.querySelector('#joinbtn')
let username = null


async function rendermap() {
  const response = await fetch('https://tinkr.tech/sdb/poly/wander');
  const data = await response.json();
  world.innerHTML = ""
  for(const player of data.players){
    const newplayer = document.createElement('div')
    newplayer.style.position = 'absolute'
    newplayer.style.left = player.x + 'px'
    newplayer.style.top = player.y + 'px'
    const player_sprite = document.createElement('img')
    player_sprite.src = 'https://tinkr.tech' + player.image
    player_sprite.style.imageRendering = 'pixelated'
    newplayer.appendChild(player_sprite)
    const player_name = document.createElement('p')
    player_name.textContent = player.username
    player_name.style.color = 'white'
    newplayer.appendChild(player_name)
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
  console.log(result)
})