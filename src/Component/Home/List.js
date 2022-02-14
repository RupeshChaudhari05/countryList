import React from 'react';
import Item from './Item';

const List = ({ list }) => {
  return list.sort((a, b) => a.rank - b.rank).map((item, index) => <Item data={item} key={index}></Item>);
};

export default React.memo(List);
