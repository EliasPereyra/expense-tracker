import React, { useState, useContext, useEffect } from "react";
import { useSpeechContext } from "@speechly/react-client";
import { v4 as uuidv4 } from "uuid";
import {
  TextField,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

import { ExpenseTrackerContext } from "../../../context/context";
import formatDate from "../../../utils/formDate";

import Snackbar from "../../Snackbar/Snackbar";
import {
  incomeCategories,
  expenseCategories,
} from "../../../constants/categories";
import useStyles from "./styles";

const initialState = {
  amount: "",
  category: "",
  type: "Income",
  date: formatDate(new Date()),
};

const NewTransactionForm = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { addTransaction } = useContext(ExpenseTrackerContext);
  const { segment } = useSpeechContext();
  const [formData, setFormData] = useState(initialState);

  const createTransaction = () => {
    if (Number.isNaN(Number(formData.amount)) || !formData.date.includes("-"))
      return;

    if (
      incomeCategories
        .map((incomeCategory) => incomeCategory.type)
        .includes(formData.category)
    ) {
      setFormData({ ...formData, type: "Income" });
    } else if (
      expenseCategories
        .map((expenseCategory) => expenseCategory.type)
        .includes(formData.category)
    ) {
      setFormData({ ...formData, type: "Expense" });
    }

    setOpen(true);
    addTransaction({
      ...formData,
      amount: Number(formData.amount),
      id: uuidv4(),
    });
    setFormData(initialState);
  };

  useEffect(() => {
    if (segment) {
      if (segment.intent.intent === "add_expense") {
        setFormData({ ...formData, type: "Expense" });
      } else if (segment.intent.intent === "add_income") {
        setFormData({ ...formData, type: "Income" });
      } else if (
        segment.isFinal &&
        segment.intent.intent === "create_transaction"
      ) {
        return createTransaction();
      } else if (
        segment.isFinal &&
        segment.intent.intent === "cancel_transaction"
      ) {
        return setFormData(initialState);
      }

      segment.entities.forEach((segment) => {
        const category = `${segment.value.charAt(0)}${segment.value
          .slice(1)
          .toLowerCase()}}`;

        switch (segment.type) {
          case "amount":
            setFormData({ ...formData, amount: segment.amount });
            break;
          case "category":
            if (incomeCategories.map((incomeCategory) => incomeCategory.type).includes(category)) {
              setFormData({ ...formData, type: "Income", category });
            } else if (
              expenseCategories.map((expenseCategory) => expenseCategory.type).includes(category)
            ) {
              setFormData({ ...formData, type: "Expense", category });
            }
            break;
          case "date":
            setFormData({ ...formData, date: segment.value });
            break;
          default:
            break;
        }
      });

      if (
        segment.isFinal &&
        formData.amount &&
        formData.type &&
        formData.category &&
        formData.date
      ) {
        createTransaction();
      }
    }
  }, [segment]);

  const selectedCategories =
    formData.type === "Income" ? incomeCategories : expenseCategories;

  return (
    <Grid container spacing={2}>
      <Snackbar open={open} setOpen={setOpen} />
      <Grid item xs={12}>
        <Typography align="center" variant="subtitle2" gutterBottom>
          {segment ? (
            <div className="segment">
              {segment.words.map((word) => word.value).join(" ")}
            </div>
          ) : null}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            {selectedCategories.map((category) => (
              <MenuItem key={category.type} value={category.type}>
                {category.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <TextField
          type="number"
          label="Amount"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="date"
          label="Date"
          value={formData.date}
          onChange={(e) =>
            setFormData({ ...formData, date: formatDate(e.target.value) })
          }
          fullWidth
        />
      </Grid>
      <Button
        className={classes.button}
        variant="outlined"
        color="primary"
        onClick={createTransaction}
        fullWidth
      >
        Create
      </Button>
    </Grid>
  );
};

export default NewTransactionForm;
