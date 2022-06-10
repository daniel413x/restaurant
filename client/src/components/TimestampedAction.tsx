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
    <div className={`timestamped-action ${index < currentOrb && 'old'}`}>
      {timestamp}
      {' '}
      {message}
    </div>
  );
}

export default TimestampedAction;
