let count = 0
let clicksPerClick = 1
let upgradesUnlocked = false
let clicksPerSecond = 0
let autoUpgradeLevel = 0

function clickBell() {
  counter.classList.remove('hidden')
  count += clicksPerClick

  if (count > 10 && !upgradesUnlocked) {
    upgradesUnlocked = true
    upgrades.classList.remove('hidden')
  }

  render()
}

function handleClickUpgrade() {
  if (count < 10) {
    return
  }

  count -= 10
  clicksPerClick += 1
  render()
  clickUpgrade.classList.add('hidden')
}

function handleAutoUpgrade() {
  const price = (autoUpgradeLevel + 1) * 20
  if (count < price) {
    return
  }

  count -= price
  autoUpgradeLevel += 1
  clicksPerSecond = 1

  const duration = 1000 / autoUpgradeLevel
  startAutoClicker(duration)
  render()
}

// autoclicker checker
let interval = null
function startAutoClicker(duration) {
  if (interval) {
    clearInterval(interval)
  }
  interval = setInterval(() => {
    count += clicksPerSecond
    render()
  }, duration)
}

function render() {
  counter.innerHTML = count + " " + pluralize(count, "click")
}

function pluralize(count, word) {
  return count === 1 ? word : word + 's'
}