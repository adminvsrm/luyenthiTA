// import PropTypes from "prop-types";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  Typography,
} from "@mui/material";
import MyCustomQuizzChip from "../common/MyCustomQuizzChip";
import { useState } from "react";
import { quizActions } from "../redux/reducer/QuizReducer";
import { useDispatch } from "react-redux";

export default function QuizzStatus({
  qaList,
  answer,
  setIndex,
  index: qIndex,
  submit,
  setSubmit,
}) {
  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmit = () => {
    setSubmit(true);
    setIndex(0);
    setOpenDialog(false);
  };

  const handleContinue = () => {
    dispatch(quizActions.resetQuiz());
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: { xs: "start", md: "center" },
        gap: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{ color: "primary.black", textAlign: "center" }}
      >
        TRẠNG THÁI LÀM BÀI
      </Typography>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
        }}
      >
        {qaList.map((item, index) => (
          <MyCustomQuizzChip
            key={index}
            index={index}
            variant="outlined"
            isDone={!!answer[index]}
            isActive={qIndex === index}
            setIndex={setIndex}
            submit={submit}
            result={answer[index] && +answer[index] === item.RightOptionIndex}
          />
        ))}
      </Stack>
      <Box sx={{ mb: 3, width: "100%", mt: 1.5 }}>
        {!submit && (
          <Button
            variant="contained"
            sx={{
              width: "100%",
              alignSelf: "center",
              color: "white",
              "&:not(:disabled)": {
                background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                transition:
                  "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                  opacity: 0.8,
                  transform: "scale(1.05)",
                  boxShadow: "0 4px 20px rgba(255, 0, 0, 0.2)",
                },
              },
            }}
            size="large"
            onClick={handleOpenDialog}
          >
            NỘP BÀI
          </Button>
        )}
        {submit && (
          <Button
            variant="outlined"
            sx={{ width: "100%" }}
            size="large"
            onClick={handleContinue}
          >
            LÀM BÀI TẬP KHÁC
          </Button>
        )}
      </Box>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogContent
          sx={{
            paddingBottom: "0.5rem",
          }}
        >
          <a>Bạn có chắc chắn muốn nộp bài?</a>
        </DialogContent>
        <DialogActions>
          <Box
            display="flex"
            justifyContent="right"
            width="100%"
            size="large"
            sx={{
              margin: "0 1rem 0.5rem",
            }}
            gap={1}
          >
            <Button onClick={handleCloseDialog}>Hủy</Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="error"
              autoFocus
            >
              Nộp
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

QuizzStatus.propTypes = {
  qaList: PropTypes.array.isRequired,
  answer: PropTypes.array.isRequired,
  setIndex: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  submit: PropTypes.bool.isRequired,
  setSubmit: PropTypes.func.isRequired,
};
