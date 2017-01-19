import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const items = [
  {
    id: "write-docs",
    title: "Write docs",
    status: "active",
    userId: "olya-haida"
  },
  {
    id: "buy-bread",
    title: "Buy bread",
    status: "done",
    authorId: "olya-haida"
  },
  {
    id: "buy-milk",
    title: "Buy milk",
    status: "active",
    authorId: "olya-haida"
  },
  {
    id: "repair-smth",
    title: "Repair smth",
    status: "active",
    authorId: "petro-haida"
  },
  {
    id: "buy-present",
    title: "Buy present",
    status: "done",
    authorId: "petro-haida"
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

const generateId = (item) => {
  return replaceAll(item.title, ' ', '-');
};

class ItemApi {
  static getAllItems() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], items));
      }, delay);
    });
  }

  static saveItem(item) {
    item = Object.assign({}, item);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minItemTitleLength = 1;
        if (item.title.length < minItemTitleLength) {
          reject(`Title must be at least ${minItemTitleLength} characters.`);
        }

        if (item.id) {
          const existingItemIndex = items.findIndex(a => a.id == item.id);
          items.splice(existingItemIndex, 1, item);
        } else {
          item.id = generateId(item);
          items.push(item);
        }

        resolve(item);
      }, delay);
    });
  }

  static deleteItem(itemId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfItemToDelete = items.findIndex(item => {
          item.id == itemId;
        });
        items.splice(indexOfItemToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default ItemApi;