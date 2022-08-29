import * as React from 'react';

export interface Props {
  condition: boolean;
  children: React.ReactNode
}

/**
 * Shows the child nodes if the supplied condition is true
 */
const ShowIf: React.FC<Props> = ({condition, children}) => <>{(condition && children) || null}</>;

export default ShowIf;
