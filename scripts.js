function getFontEditorTarget(event) {
  return document.getElementById(event.target.dataset.target)
}

function changeFontSize (event) {
  getFontEditorTarget(event).style.fontSize = event.target.value + "px"
}

document.querySelectorAll('.font-editor-size').forEach(
  function (sizeEditor) {
    sizeEditor.addEventListener('input', changeFontSize)
  }
)

function changeFontFamily (event) {
  getFontEditorTarget(event).style.fontFamily = event.target.value
}

document.querySelectorAll('.font-editor-family').forEach(
  function (familyEditor) {
    familyEditor.addEventListener('change', changeFontFamily)
  }
)

document.querySelectorAll('.font-editor-preview').forEach(
  function (preview) {
    var handler = function () { preview.classList.toggle('is-editing') }

    preview.addEventListener('focus', handler)
    preview.addEventListener('blur', handler)
  }
)

function changeFontWeight (event) {
  switch (event.target.value) {
    case 'Light':
      return getFontEditorTarget(event).style.fontWeight = 300
    case 'Semi':
      return getFontEditorTarget(event).style.fontWeight = 600
    case 'Bold':
      return getFontEditorTarget(event).style.fontWeight = 700
    default:
      return getFontEditorTarget(event).style.fontWeight = 400
  }
}

document.querySelectorAll('.font-editor-weight').forEach(
  function (weightEditor) {
    weightEditor.addEventListener('change', changeFontWeight)
  }
)

var body = document.querySelector('body.homepage')
if (body) {
  window.addEventListener('scroll', enjoyLife)
  enjoyLife()
}

function enjoyLife () {
  var percentageScrolled = (window.scrollY) / window.innerHeight
  var difference = percentageScrolled
  var backgroundColor

  if (difference === 0) {
    backgroundColor = '#f33'
  } else if (difference < 1.0) {
    backgroundColor = blendColors('#f33', '#000', difference)
  } else {
    backgroundColor = '#000'
  }

  body.style.backgroundColor = backgroundColor

  if (difference > .5) {
    body.classList.remove('homepage')
  } else {
    body.classList.add('homepage')
  }
}

function blendColors(color1, color2, percentage) {
  if (color1.length === 4) {
    color1 = color1[1] + color1[1] + color1[2] + color1[2] + color1[3] + color1[3]
  } else {
    color1 = color1.substring(1)
  }

  if (color2.length === 4) {
    color2 = color2[1] + color2[1] + color2[2] + color2[2] + color2[3] + color2[3]
  } else {
    color2 = color2.substring(1)
  }

  color1 = [parseInt(color1[0] + color1[1], 16), parseInt(color1[2] + color1[3], 16), parseInt(color1[4] + color1[5], 16)]
  color2 = [parseInt(color2[0] + color2[1], 16), parseInt(color2[2] + color2[3], 16), parseInt(color2[4] + color2[5], 16)]

  var result = [
      (1 - percentage) * color1[0] + percentage * color2[0],
      (1 - percentage) * color1[1] + percentage * color2[1],
      (1 - percentage) * color1[2] + percentage * color2[2],
  ]

  result = '#' + toHex(result[0]) + toHex(result[1]) + toHex(result[2])

  return result
}

function toHex(num) {
  var hex = Math.round(num).toString(16)
  if (hex.length == 1) { hex = '0' + hex }

  return hex
}
