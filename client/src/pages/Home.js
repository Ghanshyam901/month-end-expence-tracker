// import { Form, Input, Modal, Select } from "antd";
import { DatePicker, message, Select, Table } from "antd";
import "../resources/default-layout.css";

import axios from "axios";
import React, { useEffect, useState } from "react";
import AddEditTrans from "../components/AddEditTrans";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import "../resources/Transaction.css";

import { UnorderedListOutlined, AreaChartOutlined,EditOutlined, DeleteOutlined} from "@ant-design/icons";
import Analatics from "../components/Analatics";

const { RangePicker } = DatePicker;

function Home() {
  const [showAddEditTransactionModel, setshowAddEditTransactionModel] =
    useState(false);
  const [loading, Setloading] = useState(false);
  const [TransactionData, setTransactionData] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedRange, setSelectedRange] = useState([]);
  const [type, setType] = useState("all");
  const [SelectedItemForEdit,setSelectedItemForEdit] = useState(null)


  const [viewType, setViewType] = useState("table");

  const getTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("monthend-db-user"));

      Setloading(true);
      const result = await axios.post(
        "/api/transactions/get-all-transaction ",
        {
          userid: user._id,
          frequency,
          ...(frequency === "custom" && { selectedRange }),
          type,
        }
      );
      console.log(result.data);
      setTransactionData(result.data);
      Setloading(false);
    } catch (error) {
      Setloading(false);
      message.error("Something went wrong...");
    }
  };

  const deleteTransactions = async (record) => {
    try {
      // const user = JSON.parse(localStorage.getItem("monthend-db-user"));

      Setloading(true);
      await axios.post(
        "/api/transactions/delete-transaction",
        {
          transactionId: record._id
        }
      );
      // console.log(result.data);
        message.success("transaction deleted successfully");
        getTransactions();
      Setloading(false);
    } catch (error) {
      Setloading(false);
      message.error("Something went wrong...");
    }
  };

  useEffect(() => {
    getTransactions();
  }, [frequency, selectedRange, type]);

  // col...
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },{
      title:'Actions',
      dataIndex :'actions',
      render:(text,record)=>{
        return <div className="d-flex">
            <EditOutlined onClick={()=>{
              setSelectedItemForEdit(record)
              setshowAddEditTransactionModel(true)
            }} />
            <DeleteOutlined className="mx-3" onClick={()=>{deleteTransactions(record)}} />
        </div>
      }
    }
  ];

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <div className="home filter d-flex justify-content-between align-item-center">
        <div className="d-flex homeModal">
          <div className="d-flex flex-column">
            <h5>Select frequency</h5>
            <Select value={frequency} onChange={(value) => setFrequency(value)}>
              <Select.Option value="7">Last 1 week</Select.Option>
              <Select.Option value="30">Last 1 month</Select.Option>
              <Select.Option value="365">Last 1 year</Select.Option>
              <Select.Option value="custom">Custom frequency</Select.Option>
            </Select>

            {frequency === "custom" && (
              <div className="mt-3">
                <RangePicker
                  value={selectedRange}
                  onChange={(values) => setSelectedRange(values)}
                />
              </div>
            )}
          </div>

          <div className="d-flex flex-column mx-5">
            <h5>Select Type</h5>
            <Select value={type} onChange={(value) => setType(value)}>
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="Expence">Expence</Select.Option>
              <Select.Option value="Income">Income</Select.Option>
            </Select>
          </div>
        </div>
        <div className="d-flex">
          <div>
            <div className="view-switch-card mx-5 ">
              <UnorderedListOutlined
                className={`mx-3 ${
                  viewType === "table" ? "active-icon" : "inactive-icon"
                }`}
                onClick={()=>setViewType('table')}
              />
              <AreaChartOutlined
                className={`${
                  viewType === "analytics" ? "active-icon" : "inactive-icon"
                }`}
                onClick={()=>setViewType('analytics')}
              />
            </div>
          </div>
          <button
            className="primary"
            onClick={() => {
              setshowAddEditTransactionModel(true);
            }}
          >
            add new data
          </button>
        </div>
      </div>

      <div className="table-analitics">
            {viewType === 'table' ? <div className="table">
          <Table columns={columns} dataSource={TransactionData} />
        </div> : <Analatics transactions={TransactionData} />}
      </div>

      {showAddEditTransactionModel && (
        <AddEditTrans
          showAddEditTransactionModel={showAddEditTransactionModel}
          setshowAddEditTransactionModel={setshowAddEditTransactionModel}
          SelectedItemForEdit ={SelectedItemForEdit}
          getTransactions={getTransactions}
          setSelectedItemForEdit={setSelectedItemForEdit}
        />
      )}
    </DefaultLayout>
  );
}

export default Home;
