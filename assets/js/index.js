const nav = function () {

  const hamburger = document.querySelector('#nav-toggle input')
  const navPanel = document.getElementById('nav-panel')
  const body = document.querySelector('body')
  const svgEl = document.getElementsByClassName('cls-1')
  const svgEl2 = document.getElementsByClassName('cls-2')

  hamburger.addEventListener('change', function () {
    if (hamburger.checked === true) {
      navPanel.style.opacity = 1
      navPanel.style.transition = 'opacity .5s ease-out'
      navPanel.style.visibility = 'visible'
      body.style.overflow = 'hidden'
      if (body.id === 'blog' || body.id === 'about') {
        for (let i = 0; i < svgEl.length; i++) {
          svgEl[i].classList.add('nav-active')
          svgEl2[i].classList.add('nav-active')
        }
      }
    } else {
      navPanel.style.opacity = 0
      navPanel.style.transition = 'opacity .5s ease-in-out'
      body.style.removeProperty('overflow')
      if (body.id === 'blog' || body.id === 'about') {
        for (let i = 0; i < svgEl.length; i++) {
          svgEl[i].classList.remove('nav-active')
          svgEl2[i].classList.remove('nav-active')
        }
      }
      setTimeout(function () {
        navPanel.style.visibility = 'hidden'
      }, 450)
    }
  }, false)

}

nav()
