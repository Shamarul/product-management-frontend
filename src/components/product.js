import React, { useState, useEffect } from "react";
import ProductServices from '../services/productServices';
import 'antd/dist/antd.css';
import { Space, Table, Modal, Button, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

export default function Product() {

    const [productList, setProductList] = useState([]);
    const [modalTitle, setModalTitle] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [addName, setAddName] = useState('');
    const [addQuantity, setAddQuantity] = useState('')
    const [delId, setDelId] = useState(0);
    const [updateId, setUpdateId] = useState(0);

    const navigate = useNavigate();

    const columns = [
        {
          title: 'Id',
          dataIndex: 'id',
          key: 'id',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Quantity',
          dataIndex: 'quantity',
          key: 'quantity',
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <div style={{color: 'red'}} onClick={()=>{showModal(); setModalTitle('Delete Modal'); setDelId(record.id)}}>Delete</div>
              <div style={{color: 'blue'}} onClick={()=>{
                showModal(); setModalTitle('Update Modal'); setUpdateId(record.id); 
                setAddName(record.name); setAddQuantity(record.quantity);}
                }>
                    Update
            </div>
            </Space>
          ),
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            ProductServices.getProduct().then(
                (response) => {
                    // alert(response);
                    console.log(response);
                    setProductList(response.data.products);
                },
                error => {
                    console.log(error);
                    // alert(error.response.data.message);
                    navigate('/'); // When token expired go back to login page
                    
                }
            );
        };
    
        fetchData();
    }, []);

    const showModal = () => {
        setIsModalVisible(true);
    };
    
    const handleOk = () => {
        if(modalTitle === 'Add Modal') {
            if(addName && addQuantity) {
                ProductServices.addProduct(addName, addQuantity).then(
                    (response) => {
                        // alert(response);
                        console.log(response.data.product);
                        if(productList) {
                            setProductList([...productList, response.data.product]);
                        } else {
                            setProductList([response.data.product]);
                        }
                    },
                    error => {
                        console.log(error);
                        navigate('/'); // When token expired go back to login page
                        // alert(error.response.data.message);
                        
                    }
                );
            } else {
                alert('Please fill in the input')
                return;
            }
        } else if(modalTitle === 'Delete Modal') {
            ProductServices.deleteProduct(delId).then(
                (response) => {
                    // alert(response);
                    console.log(response);
                    setProductList(productList.filter(item => item.id !== delId));
                },
                error => {
                    console.log(error);
                    navigate('/'); // When token expired go back to login page
                    // alert(error.response.data.message);
                    
                }
            );
        } else if(modalTitle === 'Update Modal') {
            ProductServices.updateProduct(updateId, addName, addQuantity).then(
                (response) => {
                    let objIndex = productList.findIndex((obj => obj.id === updateId));
                    productList[objIndex].name = addName;
                    productList[objIndex].quantity = addQuantity;
                    let updateArray = _.cloneDeep(productList)
                    setProductList(updateArray);
                },
                error => {
                    console.log(error);
                    navigate('/'); // When token expired go back to login page
                    // alert(error.response.data.message);
                    
                }
            );
        }

        setIsModalVisible(false);
        setAddName('');
        setAddQuantity('');
    };
    
    const handleCancel = () => {
        setIsModalVisible(false);
        setAddName('');
        setAddQuantity('');
    };
  
    return (
      <div style={{padding: 20}}>
        <h1>Products</h1>
        <Table columns={columns} dataSource={productList} />
        <Button onClick={()=>{showModal(); setModalTitle('Add Modal')}} type="primary">Add Product</Button>
        <Modal title={modalTitle} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            {(modalTitle === 'Add Modal' || modalTitle === 'Update Modal')  && 
                <div>
                    <Input placeholder="Product Name" value={addName} onChange={(e)=>{setAddName(e.target.value)}} />
                    <div style={{padding: 10}} />
                    <Input placeholder="Quantity" type="number" value={addQuantity} onChange={(e)=>{setAddQuantity(e.target.value)}} />
                </div>
            }
            {modalTitle === 'Delete Modal' &&
                <div>
                    <p>Are you sure want to delete this id: <b style={{color:'red'}}>{delId}</b> product ?</p>
                </div>
            }
        </Modal>
      </div>
    )
  }