export function groupsFormattedForDropdownHelper(groups) {
  return groups.map(group => {
    return {
      value: group.id,
      text: group.title
    };
  });
}