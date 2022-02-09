import React from 'react';
import { useSelector } from 'react-redux';
import BoardCreateModal from '../components/home/BoardCreateModal';
import BoardDisplay from '../components/home/BoardDisplay';
import BoardsSection from '../components/home/BoardsSection';

const HomePage = () => {
  const boardsUS = useSelector((state) => state.boards);
  const boards = Object.keys(boardsUS);
  const starred = boards.filter((id) => boardsUS[id].starred);
  const recent = boards
    .filter((id) => !starred.includes(id) && boardsUS[id].accessed)
    .sort((a, b) => boardsUS[b].accessed - boardsUS[a].accessed)
    .slice(0, 4);

  return (
    <div className="content container-fluid py-4 bg-white">
      {/**
       * Boards Section
       */}
      <BoardsSection title="Starred Boards" icon="fa-regular fa-star">
        {starred.map((boardId) => (
          <BoardDisplay key={boardId} boardId={boardId} />
        ))}
      </BoardsSection>

      <BoardsSection title="Recently Viewed" icon="fa-regular fa-clock">
        {recent?.map((boardId) => (
          <BoardDisplay key={boardId} boardId={boardId} />
        ))}
      </BoardsSection>

      <BoardsSection title="Your Workspace" icon="fa-brands fa-trello">
        {boards?.map((boardId) => (
          <BoardDisplay key={boardId} boardId={boardId} />
        ))}
        <BoardCreateModal />
      </BoardsSection>
    </div>
  );
};

export default HomePage;
