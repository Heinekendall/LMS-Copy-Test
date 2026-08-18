import { magma, styled, TabPanel } from "react-magma-dom";

export const TabsLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
  column-gap: ${magma.spaceScale.spacing02};
  align-items: start;
  width: 100%;
  min-width: 0;
`;

export const TabsColumn = styled.div`
  min-width: 0;
`;

export const PanelsColumn = styled.div`
  width: 100%;
  min-width: 0;
`;

export const StyledTabPanel = styled(TabPanel)`
  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
`;
