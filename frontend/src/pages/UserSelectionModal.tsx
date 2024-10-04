// UserSelectionModal.tsx
import React from 'react';
import '../index.css';

type UserSelectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  users: { _id: string; name: string }[]; // Assuming you pass a list of users
  onSelectUser: (userId: string) => void;
};

const UserSelectionModal: React.FC<UserSelectionModalProps> = ({ isOpen, onClose, users, onSelectUser }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="text-2xl font-bold mb-4">Select a User to Add</h2>
        <ul className="user-list">
          {users.map((user) => (
            <li key={user._id} className="user-item">
              <button
                className="user-select-btn"
                onClick={() => {
                  onSelectUser(user._id);
                  onClose(); // Close the modal after selecting a user
                }}
              >
                {user.name}
              </button>
            </li>
          ))}
        </ul>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default UserSelectionModal;
