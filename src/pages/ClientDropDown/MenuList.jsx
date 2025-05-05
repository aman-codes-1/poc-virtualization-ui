import React, { memo } from "react";
import { createItemData } from "../../lib/helper";
import { FixedSizeList as List, areEqual } from "react-window";
import "./style.css";

const MenuList = ({ options, handleAdd, toggleItemActive, items }) => {
  const itemSize = 35;
  const height = 250;

  const handleItemClicked = (e, index) => {
    handleAdd(e, index);
  };

  const Row = memo(({ data, index, style }) => {
    const { items } = data;
    const item = items[index];
    return (
      <div
        className={item.isActive ? "listItem_clicked" : "listItem"}
        onClick={(e) => handleItemClicked(e, index)}
        style={style}
      >
        {options[index].email}
      </div>
    );
  }, areEqual);

  const itemData = createItemData(items, toggleItemActive);

  return (
    <List
      className="menulist"
      overscanCount={3}
      itemData={itemData}
      height={height}
      itemCount={options.length}
      itemSize={itemSize}
    >
      {Row}
    </List>
  );
};

export default MenuList;
