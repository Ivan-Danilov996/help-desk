export default function setDisable() {
  Array.from(document.querySelectorAll('.btn')).forEach((element) => {
    const button = element;
    button.disabled = false;
    button.style.pointerEvents = 'auto';
  });
}
