export function addClass(el, className) {
  if (el.classList) {
    el.classList.add(className)
  } else {
    el.className += ` ${className}`
  }
}

export function removeClass(el, className) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
}

export function hasClass (el, className) {
  if (el.classList) {
    el.classList.contains(className)
  } else {
    new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className)
  }
}

export function isMobile () {
  return (/Android|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent || navigator.vendor || window.opera)
}
