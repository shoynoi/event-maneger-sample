import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Event = ({ event, onDelete }) => (
  <div className="eventContainer">
    <h2>
      {event.event_date}
      {' - '}
      {event.event_type}
      <Link to={`/events/${event.id}/edit`}>Edit</Link>
      <button className="delete" type="button" onClick={() => onDelete(event.id)}>
        Delete
      </button>
    </h2>
    <ul>
      <li>
        <strong>Type:</strong>
        {' '}
        {event.event_type}
      </li>
      <li>
        <strong>Date:</strong>
        {' '}
        {event.event_date}
      </li>
      <li>
        <strong>Title:</strong>
        {' '}
        {event.title}
      </li>
      <li>
        <strong>Speaker:</strong>
        {' '}
        {event.speaker}
      </li>
      <li>
        <strong>Host:</strong>
        {' '}
        {event.host}
      </li>
      <li>
        <strong>Published:</strong>
        {' '}
        {event.published ? 'yes' : 'no'}
      </li>
    </ul>
  </div>
);

Event.propTypes = {
  // 指定された形式を満たしているどうかをチェック
  event: PropTypes.shape(),
  onDelete: PropTypes.func.isRequired,
};

// `props`に値が渡されなかった際のデフォルト値を定義(また、defaultPropsにも型チェックが適用される)
Event.defaultProps = {
  event: undefined,
};

export default Event;
