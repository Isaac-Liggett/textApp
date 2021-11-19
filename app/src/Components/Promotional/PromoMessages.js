import './PromotionalMessages.css';
import TextMessage from '../Text/TextMessage';

const PromoMessages = () => {
  return(
    <div className="container promo-messages">
      <TextMessage text="Hey! Have you heard about this new app called TextApp?" colour="blue" sender="left" />
      <TextMessage text="No what is it" colour="green" sender="right" />
      <TextMessage text="Its a state of the art communications software" colour="blue" sender="left" />
      <TextMessage text="Oh wow! I must sign up" colour="green" sender="right" />
      <TextMessage text="Where do I go next?" colour="green" sender="right" />
    </div>
  );
}

export default PromoMessages;