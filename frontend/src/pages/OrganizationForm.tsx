import { useState } from 'react';
import '../index.css';

const OrganizationForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Button to open the modal */}
      <button className="btn edit-btn" onClick={openModal}>
        Create Organization
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Create New Organization</h2>
            
            {/* Form */}
            <form>
              <label>
                Organization Name:
                <input type="text" name="organizationName" required />
              </label>
              <label>
                Description:
                <textarea name="description" required />
              </label>
              <button type="submit">Submit</button>
              <button type="button" onClick={closeModal}>
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationForm;
