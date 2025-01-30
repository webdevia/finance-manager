import React, { ReactNode } from 'react';
import CenterLayout from '../Layouts/CenterLayout/CenterLayout';
import LeftRightLayout from '../Layouts/LeftRightLayout/LeftRightLayout';

type ButtonPosition = 'left' | 'right';

type CenterButton = {
  button: ReactNode;
};

type LeftRightButton = CenterButton & {
  buttonPosition: ButtonPosition;
};
type ActionButtons = CenterButton[] | LeftRightButton[];

const isLeftRightButton = (buttons: ActionButtons): buttons is LeftRightButton[] => {
  return (buttons[0] as LeftRightButton).buttonPosition !== undefined;
};

const buttonMapper = (button: LeftRightButton) => button.button;

const buttonFilter = (position: ButtonPosition) => (button: LeftRightButton) => button.buttonPosition === position;
const leftButtonFilter = buttonFilter('left');
const rightButtonFilter = buttonFilter('right');

export type ActionButtonsProps = {
  buttons: ActionButtons;
};

const ActionButtons = ({ buttons }: ActionButtonsProps) =>
  isLeftRightButton(buttons) ? (
    <LeftRightLayout
      left={buttons.filter(leftButtonFilter).map(buttonMapper)}
      right={buttons.filter(rightButtonFilter).map(buttonMapper)}
    />
  ) : (
    <CenterLayout center={buttons.map(buttonMapper)} />
  );

export default ActionButtons;
