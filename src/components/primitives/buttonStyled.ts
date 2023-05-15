import styled from "styled-components";

export const TaskButton = styled.button`
  cursor: pointer;
  display: inline-block;
  padding: 8px ;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: 4px;
  background-color: #1890ff;
  color: #fff;
  transition: background-color 0.3s;
  margin: 5px;

  &:hover {
    background-color: #40a9ff;
  }
`;
