const world = document.querySelector('#world-container');



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
    player_sprite.src = player.image
    newplayer.appendChild(player_sprite)
    world.appendChild(newplayer)
  }
}

rendermap()

setInterval(rendermap, 1000);