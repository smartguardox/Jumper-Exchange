import { type RootNode } from 'node_modules/@strapi/blocks-react-renderer/dist/BlocksRenderer';
import { CustomRichBlocks } from 'src/components/Blog';
import {
  LeftTextBox,
  QuestsPageElementContainer,
} from '../../QuestsMissionPage.style';
import { DescriptionTitleTypography } from '../DescriptionBox/DescriptionBox.style';

interface StepsBoxProps {
  steps?: RootNode[];
  baseUrl: string;
}

export const StepsBox = ({ steps, baseUrl }: StepsBoxProps) => {
  return (
    <QuestsPageElementContainer>
      <LeftTextBox>
        <DescriptionTitleTypography variant="headerMedium">
          Steps to complete the mission
        </DescriptionTitleTypography>
      </LeftTextBox>
      <CustomRichBlocks
        id={1}
        baseUrl={baseUrl}
        content={steps}
        variant={'superfest'}
      />
    </QuestsPageElementContainer>
  );
};