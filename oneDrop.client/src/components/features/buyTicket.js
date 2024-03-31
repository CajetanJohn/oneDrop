export default function BuyTicket ({ onClose, onBack, onNext }) {
    return (
        <div className="modal">
          <div className="modal-content">
            <h2>Buy Ticket Component</h2>
            {/* Add content specific to the Buy Ticket view */}
            <button onClick={onBack}>Back</button>
            <button onClick={onNext}>Next</button>
          </div>
        </div>
      );
}
    