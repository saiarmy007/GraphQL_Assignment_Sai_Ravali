import { useState, useEffect } from 'react';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { useMutation } from '@apollo/client';
import { ADD_CAR, GET_CARS } from '../../queries';


const { Option } = Select;

const AddCar = props => {
    const { people } = props;
    const [addCar] = useMutation(ADD_CAR);

    const [form] = Form.useForm();
    const [, forceUpdate] = useState();

    useEffect(() => {
        forceUpdate({});
    }, []);

    const onFinish = values => {
        const { year, make, model, price, personId} = values;
        const id = uuidv4();
        
        addCar({
            variables: {
                id,
                year,
                make,
                model,
                price,
                personId
            },
            refetchQueries: [{query: GET_CARS, variables: {personId}}]
        })

        form.resetFields();
    }

    return (
        <Form
            form={form} 
            onFinish={onFinish}
            name='add-car-form' size='medium'
            layout='inline' 
            style={{marginBottom: '40px', width: '100%'}}>
            <Form.Item name='make' style={{marginBottom: '8px', width: '18%'}}
               rules={[{ required: true, message: 'Please input car make!'}]}>
                <Input placeholder='Tesla' />
            </Form.Item>
            <Form.Item name='model' style={{marginBottom: '8px', width: '18%'}}
               rules={[{ required: true, message: 'Please input car model!'}]}>
                <Input placeholder='Model 3' />
            </Form.Item>
            <Form.Item name='year' style={{marginBottom: '8px'}}
               rules={[{ required: true, message: 'Please input car year!'}]}>
                <InputNumber placeholder='2023' max={2022} min={1800} />
            </Form.Item>
            <Form.Item name='price' style={{marginBottom: '8px'}}
               rules={[{ required: true, message: 'Please input car price!'}]}>
                <InputNumber min={1000} formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}/>
            </Form.Item>
            <Form.Item name='personId' style={{marginBottom: '8px', width: '18%'}}
               rules={[{ required: true, message: 'Please select person ID!'}]}>
                <Select placeholder="Select Person">
                    { people.map(person => 
                        <Option key={person.id} value={person.id}>{person.firstName} {person.lastName}</Option>
                    )}
                  {/* <Option value="3">Steven</Option> */}
                </Select>
            </Form.Item>
            <Form.Item shouldUpdate={true}>
                {() => (
                    <Button type='primary' htmlType='submit'
                    disabled={
                        !form.isFieldsTouched(true) || 
                        form.getFieldsError().filter(({errors}) => errors.length).length
                        }>
                        Add Car
                    </Button>
                )}
            </Form.Item>
        </Form>
    )
}

export default AddCar;