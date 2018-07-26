function isValidInteger(str, options) {
  const n = parseInt(str);
  if (isNaN(n)) return false;
  if (options.min && n < options.min) return false;
  if (options.max && n > options.max) return false;
  return true;
}

export { isValidInteger };
