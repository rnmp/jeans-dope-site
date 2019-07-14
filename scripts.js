function getFontEditorTarget(event) {
  return document.getElementById(event.target.dataset.target)
}

function changeFontAlignment (event) {
  getFontEditorTarget(event).style.textAlign = event.target.value
}

document.querySelectorAll('.font-editor-alignment').forEach(
  function (alignmentEditor) {
    alignmentEditor.addEventListener('click', changeFontAlignment)
  },
)

function changeFontSize (event) {
  getFontEditorTarget(event).style.fontSize = event.target.value + "px"
  console.log(event.target.value)
}

document.querySelectorAll('.font-editor-size').forEach(
  function (sizeEditor) {
    sizeEditor.addEventListener('input', changeFontSize)
  }
)
