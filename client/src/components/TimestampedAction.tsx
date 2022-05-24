import React from 'react';

interface TimestampedActionProps {
  message: string;
  timestamp: string;
  index: number;
  currentOrb: number;
}

function TimestampedAction({
  message,
  timestamp,
  index,
  currentOrb,
}: TimestampedActionProps) {
  return (
    <li className={`timestamped-action ${index < currentOrb && 'old'}`}>
      {timestamp}
      {' '}
      {message}
    </li>
  );
}

export default TimestampedAction;
