import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const TaskListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

export const TaskContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  border-bottom: 1px solid #1890ff;
`;

export const TaskId = styled.span`
  margin-right: 5px;
`;

export const TaskTitle = styled.span<{ isComplete: boolean }>`
  text-decoration: ${(props) => (props.isComplete ? 'line-through' : 'none')};
  font-size: 18px;
`;