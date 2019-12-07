const setup = () => {
  const qs = document.querySelector.bind(document)
  const qsa = document.querySelectorAll.bind(document)

  function loadStyle (href) {
    const linkElement = document.createElement('link')
    linkElement.rel = 'stylesheet'
    linkElement.href = href
    document.head.appendChild(linkElement)
  }

  function loadScript (src, callback) {
    const scriptElement = document.createElement('script')
    scriptElement.src = src
    callback && scriptElement.addEventListener('load', callback)
    document.body.appendChild(scriptElement)
  }

  // highlight prismjs
  // -----------------------------------------------------------------------------
  const codeElements = qsa('.post-content pre code')
  if (codeElements.length) {
    // // code card polyfill
    // codeElements.forEach(item => {
    //   item.classList.length || item.classList.add('language-none')
    // })

    // loadStyle('https://unpkg.com/prismjs/themes/prism-okaidia.css')
    loadScript('https://unpkg.com/prismjs/prism.js')
  }

  // gallery
  // -----------------------------------------------------------------------------
  qsa('.kg-gallery-image > img').forEach(item => {
    const container = item.closest('.kg-gallery-image')
    const width = item.attributes.width.value
    const height = item.attributes.height.value
    const ratio = width / height
    container.style.flex = ratio + ' 1 0%'
  })

  const galleryContainers = qsa('.kg-gallery-container')
  if (galleryContainers.length) {
    loadStyle('https://unpkg.com/lightgallery.js/dist/css/lightgallery.min.css')
    loadScript('https://unpkg.com/lightgallery.js/dist/js/lightgallery.js', () => {
      galleryContainers.forEach(item => {
        item.querySelectorAll('.kg-gallery-image').forEach(sub => {
          sub.dataset.src = sub.children[0].src
        })
        window.lightGallery(item, { selector: '.kg-gallery-image' })
      })
    })
  }

  // subscribe hidden form value
  // -----------------------------------------------------------------------------
  qsa('input[name=location]').forEach(item => { item.value = item.value || window.location.href })
  qsa('input[name=referrer]').forEach(item => { item.value = item.value || document.referrer })
}

window.addEventListener('load', setup)