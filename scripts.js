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
