import React, { ReactElement, ReactNode } from "react";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import useTheme from "../customHooks/useTheme";

type BasicModalProps = {
  open: boolean;
  heading: string;
  children: ReactNode;
  onClose?: () => void;
};
const style = {
  position: "fixed",
  width: { md: "30vw", xs: "50vw" },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  display: "grid",
};

export default function BasicModal({
  open,
  heading,
  onClose,
  children,
}: BasicModalProps): ReactElement {
  const { theme } = useTheme();
  const modalGridStyle = onClose
    ? { grid: "1fr 1fr 2fr /1fr 9fr", p: 1 }
    : { grid: "1fr 2fr/1fr 2fr", p: 4 };
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box sx={{ ...style, ...theme.box, ...modalGridStyle }}>
          <span style={{ gridColumn: "9/10", cursor: "pointer" }}>
            {onClose ? (
              <CloseIcon sx={{ ...theme.icon }} onClick={onClose} />
            ) : null}
          </span>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              ...theme.typography,
              textAlign: "center",
              gridColumn: "1/10",
            }}
          >
            {heading}
          </Typography>
          <div style={{ gridColumn: "1/10" }}>{children}</div>
        </Box>
      </Modal>
    </div>
  );
}
