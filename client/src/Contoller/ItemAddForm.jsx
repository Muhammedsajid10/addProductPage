import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Multiselect from 'multiselect-react-dropdown';
import { translate } from '@vitalets/google-translate-api';
import Swal from 'sweetalert2';
import './ItemAddForm.css';

const ItemAddForm = () => {
    const data = [
        { name: 'food', id: 1 },
        { name: 'electronics', id: 2 },
        { name: 'electrical', id: 3 }
    ];

    const [itemNameEnglish, setItemNameEn] = useState('');
    const [itemNameArabic, setItemNameAr] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('product');
    const [variantAvailable, setVariants] = useState({ color: false, size: false });
    const [category, setCategory] = useState([]);
    const [vatMethod, setVatMethod] = useState('inclusive');
    const [files, setImages] = useState([]);

    const handleImageChange = (e) => {
        setImages([...e.target.files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('itemNameEnglish', itemNameEnglish);
        formData.append('itemNameArabic', itemNameArabic);
        formData.append('price', price);
        formData.append('type', type);
        formData.append('variantAvailable', JSON.stringify(variantAvailable));
        // formData.append('variantAvailable', variantAvailable);
        category.forEach(cat => formData.append('category', cat));
        formData.append('vatMethod', vatMethod);
        files.forEach(file => formData.append('files', file));

        const authToken = localStorage.getItem('authToken');
        try {
            const response = await axios.post('http://localhost:9000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${authToken}`
                }
            });
            console.log(response.data);
            Swal.fire({
                icon: 'success',
                title: 'Item Added Successfully',
                showConfirmButton: false,
                timer: 1500
            });

            //Clear form fields after successfully submission
            setItemNameEn('');
            setItemNameAr('');
            setPrice('');
            setType('product');
            setVariants({ color: false, size: false });
            setCategory([]);
            setVatMethod('inclusive');
            setImages([]);
        } catch (error) {
            console.error(error);
        }
    };

    // const handleEnglishToArabicTranslation = async (englishText) => {
    //     try {
    //         const response = await axios.post('http://localhost:9000/translate', { englishText });
    //         setItemNameAr(response.data.translatedText);
    //     } catch (error) {
    //         console.error('Error translating text:', error);
    //     }
    // };

    // const handleEnglishToArabicTranslation = async (englishText) => {
    //     try {
    //         const response = await axios.post('http://localhost:9000/translate', {
    //             text: englishText,
    //             to: 'ar'
    //         });
    //         setItemNameAr(response.data.translatedText);
    //     } catch (error) {
    //         console.error('Error translating text:', error);
    //     }
    // };





    const handleEnglishInpChange = (e) => {
        setItemNameEn(e.target.value);
        // handleEnglishToArabicTranslation(e.target.value)
    }

    return (
        <div className='container'>
            <div className='formcontainer'>

                <Form onSubmit={handleSubmit} className='form'>
                    <h2 style={{ margin: "20px", fontFamily: "monospace", color: "darkgray" }}>ItemAdd</h2>
                    <Form.Group controlId="itemNameEn">
                        <Form.Label>Item Name (English)</Form.Label>
                        <Form.Control type="text" value={itemNameEnglish} onChange={handleEnglishInpChange} />
                    </Form.Group>
                    <Form.Group controlId="itemNameAr">
                        <Form.Label>Item Name (Arabic)</Form.Label>
                        <Form.Control type="text" dir="rtl" value={itemNameArabic} onChange={(e) => setItemNameAr(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </Form.Group>
                    <hr />
                    <Form.Group controlId="type">
                        <Form.Check
                            type="radio"
                            label="Service"
                            value="service"
                            checked={type === 'service'}
                            onChange={() => setType('service')}
                        />
                        <Form.Check
                            type="radio"
                            label="Product"
                            value="product"
                            checked={type === 'product'}
                            onChange={() => setType('product')}
                        />

                    </Form.Group>
                    <hr />
                    <Form.Group controlId="variants">
                        <Form.Label>Variant Available</Form.Label>
                        <Form.Check
                            type="checkbox"
                            label="Color"
                            checked={variantAvailable.color}
                            onChange={(e) => setVariants({ ...variantAvailable, color: e.target.checked })}
                        />
                        <Form.Check
                            type="checkbox"
                            label="Size"
                            checked={variantAvailable.size}
                            onChange={(e) => setVariants({ ...variantAvailable, size: e.target.checked })}
                        />
                    </Form.Group>
                    <hr />
                    <Form.Group controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Multiselect
                            options={data}
                            onSelect={(selectedList) => setCategory(selectedList.map(item => item.name))}
                            onRemove={(selectedList) => setCategory(selectedList.map(item => item.name))}
                            displayValue="name"
                            placeholder="Select Categories"
                        />
                    </Form.Group>
                    <Form.Group controlId="vatMethod">
                        <Form.Label>VAT Method</Form.Label>
                        <Form.Control as="select" value={vatMethod} onChange={(e) => setVatMethod(e.target.value)}>
                            <option value="inclusive">Inclusive</option>
                            <option value="exclusive">Exclusive</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="images">
                        <Form.Label>Upload Product Images</Form.Label>
                        <Form.Control type="file" multiple onChange={handleImageChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>

                </Form>
            </div>
        </div>

    );
};

export default ItemAddForm;
