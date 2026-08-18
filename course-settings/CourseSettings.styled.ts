import {
  Card,
  CardBody,
  Heading,
  magma,
  Paragraph,
  styled,
} from "react-magma-dom";

export const CourseSettingsGrid = styled.div`
  display: grid;
  width: 100%;
  max-width: 1378px;
  padding: 0 ${magma.spaceScale.spacing06} ${magma.spaceScale.spacing06};
  gap: ${magma.spaceScale.spacing05} ${magma.spaceScale.spacing06};
  grid-template-columns: minmax(250px, 1fr);

  @media (min-width: ${magma.breakpoints.medium}px) {
    grid-template-columns: repeat(2, minmax(250px, 1fr));
  }
`;

export const CourseSettingsTileCard = styled(Card)`
  border: none;
`;

const TILE_ICON_SIZE = 24;

export const CourseSettingsTileBody = styled(CardBody)`
  display: flex;
  flex-direction: column;
  gap: ${magma.spaceScale.spacing02};
  padding: ${magma.spaceScale.spacing05};

  @media (min-width: ${magma.breakpoints.small}px) {
    padding: ${magma.spaceScale.spacing05};
  }
`;

export const CourseSettingsTileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${magma.spaceScale.spacing05};
  min-width: 0;
`;

export const CourseSettingsTileIcon = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
`;

export const CourseSettingsTileHeading = styled(Heading)`
  flex: 1;
  min-width: 0;
  color: ${magma.colors.primary};
  font-weight: 600;
`;

export const CourseSettingsTileDescription = styled(Paragraph)`
  padding-left: calc(${TILE_ICON_SIZE}px + ${magma.spaceScale.spacing05});
  color: ${magma.colors.neutral700};
`;
