// PropType
// import PropTypes from 'prop-types';
// Components
import { useSelector } from 'react-redux';
import SingleMessage from './SingleMessage';
// style
import './style.scss';

function AllMessages() {
  const messages = useSelector((state) => state.messages.listMessages);
  // console.log(messages);
  return (
    // <div className="allMessages__container">
    <div className={`${(messages.length === 0) ? 'allMessages__isNotVisible' : 'allMessages__container'}`}>
      {
        messages.map((message) => (
          <SingleMessage messageId={message.id} messageType={message.type} messageContent={message.content} key={message.id} />
        ))
      }
    </div>
  );
}
// <SingleMessage messageId="1" messageType="success" messageContent="Chargement réussi" />
// <SingleMessage messageId="2" messageType="error" messageContent="Erreur de chargement de la page demandée" />

// AllMessages.propTypes = {

// };

export default AllMessages;
