const serialize = value => JSON.stringify(value);

const deserialize = serializedState => JSON.parse(serializedState);

const save = (key, value) => {
  try {
    const serializedState = serialize(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error(`Failed to save '${key}' to localStorage: ${error.message}`);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState ? deserialize(serializedState) : undefined;
  } catch (error) {
    console.error(
      `Failed to load '${key}' from localStorage: ${error.message}`
    );
    return undefined;
  }
};

const storage = {
  save,
  load,
};

export default storage;
