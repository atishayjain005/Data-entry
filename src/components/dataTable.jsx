import { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Container,
  Button,
  Heading,
  Section,
  Separator,
} from "@radix-ui/themes";
import { DialogBox } from "./dialogBox";

export default function DataTable() {
  const [tData, setTData] = useState([]);
  const [editedIndex, setEditedIndex] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://assets.alippo.com/catalog/static/data.json"
      );
      const resp = await data.json();
      setTData(resp);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (index, name) => {
    setEditedIndex(index);
    setEditedName(name);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (newValue) => {
    const updatedData = [...tData];
    updatedData[editedIndex].name = newValue;
    setTData(updatedData);
    setIsEditModalOpen(false);
    setEditedIndex(null);
  };

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    const updatedData = [...tData];
    updatedData.splice(deleteIndex, 1);
    setTData(updatedData);
    setIsDeleteModalOpen(false);
    setDeleteIndex(null);
  };

  return (
    <Section style={{ backgroundColor: "rgb(239, 239, 239)" }}>
      <Container size="4">
        <Box
          style={{
            backgroundColor: "rgb(244, 251, 255)",
            padding: "3em",
            borderRadius: "2em",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          }}
        >
          <Grid className="table-header" columns="6" gap="3" width="auto">
            <Heading color="indigo">S.no.</Heading>
            <Heading color="indigo">Name</Heading>
            <Heading color="indigo">City</Heading>
            <Heading color="indigo">Age</Heading>
            <Heading color="indigo">Pincode</Heading>
            <Heading color="indigo">Actions</Heading>
          </Grid>
          <Separator my="3" size="4" />
          {tData &&
            tData.map((userData, index) => {
              const { name, city, age, pinCode } = userData;
              return (
                <Box key={index}>
                  <Grid columns="6" gap="3" width="auto" align="center">
                    <Box>{index + 1}</Box>
                    <Box>{name || "---"}</Box>
                    <Box>{city || "---"}</Box>
                    <Box>{age || "---"}</Box>
                    <Box>{pinCode || "---"}</Box>
                    <Box>
                      <Button
                        color="indigo"
                        size="3"
                        variant="soft"
                        onClick={() => handleEdit(index, name)}
                        mr="3"
                      >
                        Edit
                      </Button>
                      <Button
                        color="crimson"
                        size="3"
                        variant="soft"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Grid>
                  {index !== tData.length - 1 && <Separator my="3" size="4" />}
                </Box>
              );
            })}
          <DialogBox
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            title="Edit Name"
            description="Make changes to the name."
            onSave={handleSaveEdit}
            initialValue={editedName}
          />
          <DialogBox
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            title="Delete Confirmation"
            description={`Are you sure you want to delete entry no. ${
              deleteIndex + 1
            }?`}
            onDelete={confirmDelete}
          />
        </Box>
      </Container>
    </Section>
  );
}
