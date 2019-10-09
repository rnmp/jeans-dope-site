// Font Editors

var DefaultFontSize = 100
var FontWeight = {
  'Hairline': 100,
  'Thin': 200,
  'Light': 300,
  'Regular': 400,
  'Semi': 600,
  'Bold': 700,
}

function generateFontSizeRange (onInput) {
  var range = document.createElement('input')
  range.type = 'range'
  range.min = 20
  range.max = 200
  range.increment = 1
  range.value = DefaultFontSize
  range.addEventListener('input', onInput)

  return range
}

function generateFontOptionsSelect (options, defaultOptionName, onChange) {
  var currentOption = document.createElement('div')
  currentOption.innerHTML = defaultOptionName

  var allOptions = document.createElement('div')
  allOptions.className = 'select-options'

  var toggleActive = function () { allOptions.classList.toggle('is-active') }


  window.addEventListener('click', function () {
    allOptions.classList.remove('is-active')
  })

  currentOption.addEventListener('click', function (event) {
    event.stopPropagation()
    toggleActive()
  })

  Object.entries(options).map(function (option) {
    _option = document.createElement('div')
    _option.innerHTML = option[0]

    _option.addEventListener('click', function (event) {
      event.stopPropagation()

      currentOption.innerHTML = option[0]
      onChange(option[1])
      toggleActive()
    })

    _option.addEventListener('mouseover', function () {
      onChange(option[1])
    })

    allOptions.append(_option)
  })

  var select = document.createElement('div')
  select.className = 'select'
  select.append(currentOption, allOptions)

  return select
}

function generateFontEditorControls (typefaceName, options, defaultOptionName, preview) {
  var container = document.createElement('div')
  container.className = 'font-editor-controls'

  var name = document.createElement('div')
  name.innerText = typefaceName


  var fontOptions = generateFontOptionsSelect(options, defaultOptionName, function (newOption) {
    preview.style.fontWeight = FontWeight[newOption.weight]
    preview.style.fontFamily = newOption.family
  })

  var range = generateFontSizeRange(function (event) {
    preview.style.fontSize = event.target.value + "px"
  })


  container.append(name, fontOptions, range)

  return container
}

function generatePreview (defaultText, defaultOption) {
  var preview = document.createElement('div')
  preview.contentEditable = true
  preview.spellcheck = false
  preview.innerText = defaultText
  preview.style.fontSize = DefaultFontSize + 'px'
  preview.style.fontWeight = FontWeight[defaultOption.weight]
  preview.style.fontFamily = defaultOption.family
  preview.style.display = 'inline-block'

  preview.addEventListener('focus', function () { preview.style.display = 'block' })
  preview.addEventListener('blur', function () { preview.style.display = 'inline-block' })

  return preview
}


document.querySelectorAll('.font-editor').forEach(function (fontEditor) {
  var dataset = fontEditor.dataset
  var options = JSON.parse(Array.from(fontEditor.children).find(function (x) {
    return x.classList.contains('font-options-json')
  }).innerHTML)
  var defaultOption = options[dataset.defaultFontOption]

  var preview = generatePreview(dataset.defaultText, defaultOption)
  var controls = generateFontEditorControls(dataset.typefaceName, options, dataset.defaultFontOption, preview)

  fontEditor.append(controls, preview)
})

// Homepage

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
