const getItemInMemory = (key) => JSON.parse(localStorage.getItem(key));

const saveItemInMemory = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const removeItemInMemory = (key) => {
  localStorage.removeItem(key);
};

export default { getItemInMemory, saveItemInMemory, removeItemInMemory };
