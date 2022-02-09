import React from 'react';
import { useDragLayer } from 'react-dnd';
import Card from '../Card';
import styles from './DragLayer.module.scss';
import List from '../List';

function getCardPreviewStyle(offset) {
  const transform = `translate(${offset.x}px, ${offset.y}px) rotate(5deg)`;
  return {
    transform,
    WebkitTransform: transform,
    width: '17rem'
  };
}

function renderItem(item, offSet) {
  if (offSet) {
    switch (item.type) {
      case 'CARD':
        return (
          <div style={getCardPreviewStyle(offSet)}>
            <Card cardId={item.id} />
          </div>
        );
      case 'LIST':
        return (
          <div style={getCardPreviewStyle(offSet)}>
            <List listId={item.id} />
          </div>
        );
      default:
        return null;
    }
  }
  return null;
}

const DragLayer = () => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset()
  }));

  if (!isDragging) return null;
  return <div className={`${styles.dragging_layer}`}>{renderItem(item, currentOffset)}</div>;
};

export default DragLayer;
