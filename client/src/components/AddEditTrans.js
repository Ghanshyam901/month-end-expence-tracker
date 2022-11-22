import { Form, Input, message, Modal, Select } from "antd";
import "../resources/default-layout.css";

import axios from "axios";
import React, { useState } from "react";
import Spinner from "./Spinner";

function AddEditTrans({
  setshowAddEditTransactionModel,
  showAddEditTransactionModel,
  SelectedItemForEdit,
  setSelectedItemForEdit,
  getTransactions,
}) {
  const [loading, Setloading] = useState(false);

  const onFinish = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("monthend-db-user"));

      Setloading(true);
      if(SelectedItemForEdit){
        await axios.post("/api/transactions/edit-transaction", {
         payload:{
          ...values,
          userid: user._id,
         },
         transactionId:SelectedItemForEdit._id
        });
        getTransactions();
        message.success("Transaction updated successfully");
      }else{
        await axios.post("/api/transactions/add-transaction", {
          ...values,
          userid: user._id,
        });
        getTransactions();
        message.success("Transaction added successfully");
      }

      setshowAddEditTransactionModel(false);
      setSelectedItemForEdit(null)

      Setloading(false);
    } catch (error) {
      console.log("fill all data");
      message.error("something went wrong..t");
      Setloading(false);
    }
  };

  return (
 
    <Modal bodyStyle={{
      backgroundColor: '#d3dbe0'
  }}
   
      title={SelectedItemForEdit ? "Edit Transaction " :"Add Transaction"}
      open={showAddEditTransactionModel}
      onCancel={() => setshowAddEditTransactionModel(false)}
      footer={false}
    >
      {loading && <Spinner />}
      <Form layout="vertical" className="transactions-form" onFinish={onFinish} initialValues={SelectedItemForEdit} >
        <Form.Item label="Amount" name="amount">
          <Input type="text" />
        </Form.Item>

        <Form.Item label="Type" name="type">
          <Select>
            <Select.Option value="Income">Income</Select.Option>
            <Select.Option value="Expence">Expence</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Category" name="category">
          <Select>
            <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="freelance">FreeLance</Select.Option>
            <Select.Option value="investment">Investment</Select.Option>

            <Select.Option value="entertainement">Entertainement</Select.Option>
            <Select.Option value="food">food</Select.Option>
            <Select.Option value="travel">Travel</Select.Option>

            <Select.Option value="education">Education</Select.Option>
            <Select.Option value="medical">Medical</Select.Option>
            <Select.Option value="tax">Tax</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Date" name="date">
          <Input type="Date" />
        </Form.Item>

        <Form.Item label="Reference" name="reference">
          <Input type="text " />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input type="text " />
        </Form.Item>

        <div className="d-flex justify-content-end">
          <button className="primary" type="submit">
            save
          </button>
        </div>
      </Form>
    </Modal>
    
  );
}

export default AddEditTrans;
