import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Flex, TextField } from "@radix-ui/themes";
import * as Dialog from "@radix-ui/react-dialog";

export const DialogBox = ({
  isOpen,
  onClose,
  title,
  description,
  onSave,
  onDelete,
  initialValue,
}) => {
  const [editedValue, setEditedValue] = useState(initialValue);

  useEffect(() => {
    setEditedValue(initialValue);
  }, [initialValue]);

  const handleChange = (e) => {
    setEditedValue(e.target.value);
  };

  const handleSave = () => {
    onSave(editedValue);
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onClose={onClose}>
      <Dialog.Trigger as={Button} style={{ display: "none" }} />
      <Dialog.Overlay
        className="dialog-overlay"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
      />
      <Dialog.Content
        className="dialog-content"
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          width: "400px",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Dialog.Title style={{ marginBottom: "10px" }}>{title}</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          {description}
        </Dialog.Description>
        {onSave && (
          <TextField.Input
            value={editedValue}
            onChange={handleChange}
            placeholder={initialValue || "---"}
            style={{ width: "100%", marginBottom: "10px" }}
          />
        )}
        <Flex gap="3" mt="4" justify="end">
          <Button variant="soft" color="gray" onClick={onClose}>
            Cancel
          </Button>
          {onSave && <Button onClick={handleSave}>Save</Button>}
          {onDelete && <Button onClick={onDelete}>Delete</Button>}
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

DialogBox.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
  initialValue: PropTypes.string,
};
