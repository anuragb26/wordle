import React, { ReactElement, ReactNode } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

type BasicModalProps = { open: boolean; heading: string; children: ReactNode };
const style = {
  position: "fixed",
  width: { md: "30vw", xs: "50vw" },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({
  open,
  heading,
  children,
}: BasicModalProps): ReactElement {
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: "center" }}
          >
            {heading}
          </Typography>
          <Divider />
          {children}
        </Box>
      </Modal>
    </div>
  );
}
