export default function getDisable() {
  Array.from(document.querySelectorAll('.btn')).forEach((element) => {
    const button = element;
    button.disabled = true;
    button.style.pointerEvents = 'none';
  });
}
