import delay from './delay';

const groups = [
  {
    id: 'birthday-buying',
    title: 'Birthday Buying',
    items: ['buy-bread', 'buy-present', 'buy-milk'],
    userId: 'olya-haida'
  },
  {
    id: 'repair',
    title: 'Repair',
    items: ['repair-smth'],
    userId: 'petro-haida'
  },
  {
    id: 'repair-notes',
    title: 'Repair notes',
    items: ['write-docs'],
    userId: 'olya-haida'
  }
];

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (group) => {
  return group.title.toLowerCase().split(' ').join('-');
};

class GroupApi {
  static getAllGroups() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], groups));
      }, delay);
    });
  }

  static saveGroup(group) {
  group = Object.assign({}, group); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minGroupNameLength = 3;
        if (group.title.length < minGroupNameLength) {
          reject(`Title must be at least ${minGroupNameLength} characters.`);
        }

        if (group.id) {
          const existingGroupIndex = groups.findIndex(a => a.id == group.id);
          groups.splice(existingGroupIndex, 1, group);
        } else {
          group.userId = 'olya-haida';
          group.id = generateId(group);
          groups.push(group);
        }

        resolve(group);
      }, delay);
    });
  }

  static deleteGroup(groupId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfGroupToDelete = groups.findIndex(group => {
          group.id == groupId;
        });
        groups.splice(indexOfGroupToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default GroupApi;