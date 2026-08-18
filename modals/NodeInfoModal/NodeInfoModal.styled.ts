import { magma, styled } from "react-magma-dom";

export const NodeInfoList = styled.ul`
  margin: 0;
  padding: 0;
`;

export const NodeInfoListItem = styled.li`
  list-style: none;
  padding: ${magma.spaceScale.spacing03} 0;
  border-top: 1px solid ${magma.colors.border};
`;
