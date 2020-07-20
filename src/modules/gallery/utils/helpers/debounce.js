function debounce(fn, delay, immediate) {
  let timeout;

  return (...args) => {
    const later = () => {
      if (!immediate) {
        timeout = null;
        fn.call(null, args);
      }
    };

    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, delay);

    if (callNow) {
      fn.call(null, args);
    }
  };
}

export { debounce };
