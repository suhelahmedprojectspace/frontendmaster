// day-18
import React, { useState } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable
} from '@hello-pangea/dnd';


const KanbanBoard = () => {
    const [data,setData]=useState({
         tasks: {
      'task-1': { id: 'task-1', content: 'Learn React' },
      'task-2': { id: 'task-2', content: 'Build Kanban board' },
       'task-3': { id: 'task-3', content: 'Build frontend board' },
        'task-4': { id: 'task-4', content: 'Build sol board' },
         'task-5': { id: 'task-5', content: 'Build  board' }

    },
    columns:{
        'column-1':{
            id:'column-1',
            title:"To Do",
             taskIds: ['task-1', 'task-2','task-3','task-4','task-5'],
        }
    },
     columnOrder: ['column-1'],
    })
    const onDragEnd = (result) => {
  const { destination, source, draggableId } = result;

  // If dropped outside any list
  if (!destination) return;

  // If position is unchanged
  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }

  const column = data.columns[source.droppableId];
  const newTaskIds = Array.from(column.taskIds);
  newTaskIds.splice(source.index, 1);
  newTaskIds.splice(destination.index, 0, draggableId);

  const newColumn = {
    ...column,
    taskIds: newTaskIds,
  };

  setData({
    ...data,
    columns: {
      ...data.columns,
      [newColumn.id]: newColumn,
    },
  });
};

  return (
    <div>
        <DragDropContext onDragEnd={onDragEnd}>
         <div className='flex gap-5'>
            {data.columnOrder.map((columnId) => {
  const column = data.columns[columnId];
  const tasks = column.taskIds.map(taskId => data.tasks[taskId]);
  return (
    <Droppable droppableId={column.id} key={column.id}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{ border: '1px solid lightgray', padding: 10, width: 250, minHeight: 300 }}
        >
          <h2>{column.title}</h2>
          {tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    padding: 16,
                    marginBottom: 8,
                    backgroundColor: snapshot.isDragging ? 'lightgreen' : 'white',
                    border: '1px solid lightgray',
                    borderRadius: 4,
                    ...provided.draggableProps.style,
                  }}
                >
                  {task.content}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
})}

          </div>  
        </DragDropContext>
    </div>
  )
}

export default KanbanBoard