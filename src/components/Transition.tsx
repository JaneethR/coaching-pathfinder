
import React, { ReactNode } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

interface TransitionProps {
  children: ReactNode;
  transitionKey: string;
  classNames?: string;
  timeout?: number;
}

const Transition: React.FC<TransitionProps> = ({
  children,
  transitionKey,
  classNames = 'page',
  timeout = 500
}) => {
  return (
    <TransitionGroup className="transition-container">
      <CSSTransition
        key={transitionKey}
        timeout={timeout}
        classNames={classNames}
        unmountOnExit
      >
        <div className="transition-page">{children}</div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Transition;
