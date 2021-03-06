import React from 'react';
import Card from '../Card';
import List from '../List';
import styles from './DragLayer.module.scss';
import { useDragLayer } from 'react-dnd';

function getCardPreviewStyle(offset) {
  const transform = `translate(${offset.x}px, ${offset.y}px) rotate(5deg)`;
  return {
    transform,
    WebkitTransform: transform,
    minWidth: '18rem',
    maxWidth: '18rem'
  };
}

function renderItem(item, offSet) {
  if (offSet) {
    switch (item.type) {
      case 'CARD':
        return (
          <div className={`${styles.dragging_layer}`} style={getCardPreviewStyle(offSet)}>
            <Card cardId={item.id} />
          </div>
        );
      case 'LIST':
        return (
          <div className={`${styles.dragging_layer}`} style={getCardPreviewStyle(offSet)}>
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

  return isDragging ? renderItem(item, currentOffset) : null;
};

export default DragLayer;
