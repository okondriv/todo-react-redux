
export default function getHandlers() {
    let doneFilter = function(){
        this.canHandle = (filterObject) => filterObject.hasOwnProperty('status') && filterObject.status === 'done';
        this.isSuitable = (item, filterObject) => item.done;
    };

    let activeFilter = function(){
        this.canHandle = (filterObject) => filterObject.hasOwnProperty('status') && filterObject.status === 'active';
        this.isSuitable = (item, filterObject) => !item.done;
    };

    let groupFilter =  function(){
        this.canHandle = (filterObject) => filterObject.hasOwnProperty('group') && filterObject.group !== '';
        this.isSuitable = (item, filterObject) =>  item.group.id === filterObject.group;
    };

    let defaultFilter =  function(){
        this.canHandle = (filterObject) => true;
        this.isSuitable = (item, filterObject) => true;
    };

    var array = [];
    array.push(new doneFilter());
    array.push(new activeFilter());
    array.push(new defaultFilter());
    array.push(new groupFilter());
    return array;
}