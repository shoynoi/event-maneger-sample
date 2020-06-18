import React from 'react';
import PropTypes from 'prop-types';
import Pikaday from 'pikaday';
import 'pikaday/css/pikaday.css';
import { formatDate, isEmptyObject, validateEvent } from '../helpers/helper';

class EventForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      event: props.event,
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    // Refを作成(初期化時点ではcurrent属性の値はnull)
    this.dateInput = React.createRef();
  }

  componentDidMount() {
    new Pikaday({
      // renderメソッドの要素にrefが渡されると、そのノードへの参照はrefのcurrent属性でアクセスできる
      // refの更新は`componentDidMount`か`componentDidUpdate`の前に行われる
      field: this.dateInput.current,
      onSelect: (date) => {
        const formattedDate = formatDate(date);
        this.dateInput.current.value = formattedDate;
        this.updateEvent('event_date', formattedDate);
      },
    });
  }

  updateEvent(key, value) {
    this.setState((prevState) => ({
      event: {
        // `setState()`のマージは浅く(shallow)行われる
        // https://medium.com/@imrobinkim/how-state-updates-are-merged-in-react-e07fc669fec2
        ...prevState.event,
        [key]: value,
      },
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    const { event } = this.state;
    const errors = validateEvent(event);

    if (!isEmptyObject(errors)) {
      this.setState({ errors });
    } else {
      const { onSubmit } = this.props;
      onSubmit(event);
    }
  }

  handleInputChange(event) {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.updateEvent(name, value);
  }

  renderErrors() {
    const { errors } = this.state;

    if (isEmptyObject(errors)) {
      return null;
    }

    return (
      <div className="errors">
        <h3>The following errors prohibited the event form being saved:</h3>
        <ul>
          {Object.values(errors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h2>New Event</h2>
        {this.renderErrors()}
        <form className="eventForm" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="event_type">
              <strong>Type:</strong>
              <input
                type="text"
                id="event_type"
                name="event_type"
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="event_date">
              <strong>Date:</strong>
              <input
                type="text"
                id="event_date"
                name="event_date"
                // ref属性を用いてReact要素に紐付け
                ref={this.dateInput}
                autoComplete="off"
              />
            </label>
          </div>
          <div>
            <label htmlFor="title">
              <strong>Title:</strong>
              <textarea
                name="title"
                id="title"
                cols="30"
                rows="10"
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="speaker">
              <strong>Speaker:</strong>
              <input
                type="text"
                id="speaker"
                name="speaker"
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="host">
              <strong>Host:</strong>
              <input
                type="text"
                id="host"
                name="host"
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="published">
              <strong>Publish:</strong>
              <input
                type="checkbox"
                id="published"
                name="published"
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div className="form-actions">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    );
  }
}

EventForm.propTypes = {
  event: PropTypes.shape(),
  // `isRequired`: propsが渡されなかったときに警告を表示
  onSubmit: PropTypes.func.isRequired,
};

EventForm.defaultProps = {
  event: {
    event_type: '',
    event_date: '',
    title: '',
    speaker: '',
    host: '',
    published: false,
  },
};

export default EventForm;