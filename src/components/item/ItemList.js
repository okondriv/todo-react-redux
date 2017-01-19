import React, {PropTypes} from 'react';
import ItemListRow from './ItemListRow';

const ItemList = ({items}) => {
    return (
        <div>
        {items.map(item => 
            <ItemListRow key={item.id} item={item} /> 
        )}
        </div>
    );
};

ItemList.propTypes = {
    items: PropTypes.array.isRequired
};

export default ItemList;